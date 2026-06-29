import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { DEFAULT_STATE_DATA, DEFAULT_PANEL_TECH, calculateAssessment } from '@/lib/solar/data'

let clientPromise
async function connectToMongo() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const client = new MongoClient(process.env.MONGO_URL)
      await client.connect()
      const db = client.db(process.env.DB_NAME)
      await seedDefaults(db)
      return db
    })().catch((e) => {
      // reset on failure so the next request retries cleanly
      clientPromise = undefined
      throw e
    })
  }
  return clientPromise
}

async function seedDefaults(db) {
  // ---- Single Admin: always synchronized with env credentials ----
  // Delete any/all existing admins to enforce single-admin invariant.
  const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase()
  const adminUsername = process.env.ADMIN_USERNAME || ''
  const adminPassword = process.env.ADMIN_PASSWORD || ''
  if (adminEmail && adminUsername && adminPassword) {
    await db.collection('users').deleteMany({ role: 'admin', $and: [{ $or: [{ email: { $ne: adminEmail } }, { username: { $ne: adminUsername } }] }] })
    const existing = await db.collection('users').findOne({ role: 'admin' })
    if (!existing) {
      await db.collection('users').insertOne({
        id: uuidv4(),
        email: adminEmail,
        username: adminUsername,
        name: 'Administrator',
        passwordHash: await bcrypt.hash(adminPassword, 8),
        role: 'admin',
        phone: '',
        createdAt: new Date(),
      })
    } else {
      // Refresh password to match env (keeps single source of truth)
      const ok = await bcrypt.compare(adminPassword, existing.passwordHash)
      if (!ok) {
        await db.collection('users').updateOne({ id: existing.id }, { $set: { passwordHash: await bcrypt.hash(adminPassword, 8), email: adminEmail, username: adminUsername } })
      } else if (existing.email !== adminEmail || existing.username !== adminUsername) {
        await db.collection('users').updateOne({ id: existing.id }, { $set: { email: adminEmail, username: adminUsername } })
      }
    }
  }
  // Demo customer (keep for testing)
  const demoExists = await db.collection('users').findOne({ email: 'demo@solarsmart.in' })
  if (!demoExists) {
    await db.collection('users').insertOne({
      id: uuidv4(),
      email: 'demo@solarsmart.in',
      username: 'democustomer',
      name: 'Demo Customer',
      passwordHash: await bcrypt.hash('demo123', 8),
      role: 'customer',
      phone: '',
      createdAt: new Date(),
    })
  }
  // Seed/refresh state data & panels — re-seed if count mismatches latest defaults
  const stateCount = await db.collection('state_data').countDocuments()
  if (stateCount !== DEFAULT_STATE_DATA.length) {
    // Preserve admin overrides where state name matches; otherwise reset
    const existing = await db.collection('state_data').find({}).toArray()
    const existingMap = new Map(existing.map(e => [e.state, e]))
    await db.collection('state_data').deleteMany({})
    const merged = DEFAULT_STATE_DATA.map(s => {
      const prev = existingMap.get(s.state)
      return {
        id: prev?.id || uuidv4(),
        ...s,
        // keep admin overrides if present
        tariff: prev?.tariff ?? s.tariff,
        sunHours: prev?.sunHours ?? s.sunHours,
        netMetering: prev?.netMetering ?? s.netMetering,
      }
    })
    await db.collection('state_data').insertMany(merged)
  }
  if ((await db.collection('panel_tech').countDocuments()) === 0) {
    await db.collection('panel_tech').insertMany(DEFAULT_PANEL_TECH.map(p => ({ ...p })))
  }
  if ((await db.collection('schemes').countDocuments()) === 0) {
    await db.collection('schemes').insertMany([
      { id: uuidv4(), name: 'PM Surya Ghar Muft Bijli Yojana', scope: 'Central', summary: 'Central subsidy: ₹30k for 1kW, ₹60k for 2kW, ₹78k for 3kW+. Free electricity up to 300 units for eligible households.', updatedAt: new Date() },
      { id: uuidv4(), name: 'CM Solar Power Scheme', scope: 'Delhi', summary: 'Additional ₹2,000/kW state subsidy (up to 10 kW) on top of central subsidy.', updatedAt: new Date() },
      { id: uuidv4(), name: 'UP Solar Rooftop Subsidy', scope: 'Uttar Pradesh', summary: 'Additional ₹15,000/kW state subsidy (up to 2 kW residential).', updatedAt: new Date() },
      { id: uuidv4(), name: 'Surya Gujarat', scope: 'Gujarat', summary: 'State subsidy plus central. Net metering up to 1 MW.', updatedAt: new Date() },
    ])
  }
}

function handleCORS(res) {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.headers.set('Access-Control-Allow-Credentials', 'true')
  return res
}

export async function OPTIONS() { return handleCORS(new NextResponse(null, { status: 200 })) }

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
function getAuth(request) {
  const h = request.headers.get('authorization') || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : null
  if (!token) return null
  try { return jwt.verify(token, process.env.JWT_SECRET) } catch { return null }
}
function strip(doc) {
  if (!doc) return doc
  const { _id, passwordHash, ...rest } = doc
  return rest
}
function ok(data, status=200) { return handleCORS(NextResponse.json(data, { status })) }
function err(msg, status=400) { return handleCORS(NextResponse.json({ error: msg }, { status })) }

// ===== Captcha removed =====

// Strict email RFC 5322 (simplified) + extra checks
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/
function isValidEmail(e) {
  if (!e || typeof e !== 'string') return false
  if (e.length > 254) return false
  if (!EMAIL_RE.test(e)) return false
  const tld = e.split('.').pop()
  if (!tld || tld.length < 2) return false
  return true
}
const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method
  try {
    const db = await connectToMongo()

    // ===== AUTH =====
    if (route === '/auth/register' && method === 'POST') {
      const body = await request.json()
      const { email, username, password, name, phone } = body

      if (!email || !password || !name || !username) return err('username, email, password and name are required')
      if (!isValidEmail(email)) return err('Please enter a valid email address (e.g. you@example.com)')
      if (!USERNAME_RE.test(username)) return err('Username must be 3-20 characters, letters/numbers/underscore only')
      if (typeof password !== 'string' || password.length < 6) return err('Password must be at least 6 characters')
      // password complexity: at least one letter and one number
      if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return err('Password must contain at least one letter and one number')

      const lowerEmail = email.toLowerCase()
      const conflict = await db.collection('users').findOne({ $or: [{ email: lowerEmail }, { username }] })
      if (conflict) {
        if (conflict.email === lowerEmail) return err('Email already registered')
        return err('Username already taken')
      }
      const user = {
        id: uuidv4(),
        email: lowerEmail,
        username,
        name, phone: phone || '',
        role: 'customer', // never allow self-admin via register
        passwordHash: await bcrypt.hash(password, 8),
        createdAt: new Date(),
      }
      await db.collection('users').insertOne(user)
      const token = signToken(user)
      return ok({ token, user: strip(user) })
    }

    if (route === '/auth/login' && method === 'POST') {
      const body = await request.json()
      const { identifier, password, role } = body

      if (!identifier || !password) return err('Email/username and password are required')

      // Login by email OR username
      const ident = String(identifier).trim()
      const lowerId = ident.toLowerCase()
      const user = await db.collection('users').findOne({ $or: [{ email: lowerId }, { username: ident }] })
      if (!user) return err('Invalid credentials', 401)
      const okPw = await bcrypt.compare(password, user.passwordHash)
      if (!okPw) return err('Invalid credentials', 401)
      if (role && user.role !== role) return err(`This account is not ${role === 'admin' ? 'an admin' : 'a customer'}`, 403)
      const token = signToken(user)
      return ok({ token, user: strip(user) })
    }

    if (route === '/auth/me' && method === 'GET') {
      const auth = getAuth(request)
      if (!auth) return err('unauthorized', 401)
      const user = await db.collection('users').findOne({ id: auth.id })
      return ok({ user: strip(user) })
    }

    // ===== STATIC DATA =====
    if (route === '/states' && method === 'GET') {
      const data = await db.collection('state_data').find({}).toArray()
      return ok(data.map(strip))
    }
    if (route === '/panels' && method === 'GET') {
      const data = await db.collection('panel_tech').find({}).toArray()
      return ok(data.map(strip))
    }
    if (route === '/schemes' && method === 'GET') {
      const data = await db.collection('schemes').find({}).sort({ updatedAt: -1 }).toArray()
      return ok(data.map(strip))
    }

    // ===== ASSESSMENT =====
    if (route === '/assess' && method === 'POST') {
      const auth = getAuth(request)
      const body = await request.json()
      const stateData = await db.collection('state_data').find({}).toArray()
      const panels = await db.collection('panel_tech').find({}).toArray()
      const result = calculateAssessment(body, stateData, panels)
      const record = {
        id: uuidv4(),
        userId: auth?.id || null,
        userEmail: auth?.email || null,
        createdAt: new Date(),
        ...result,
      }
      if (auth) {
        await db.collection('assessments').insertOne(record)
        // notify
        await db.collection('notifications').insertOne({
          id: uuidv4(), userId: auth.id, type: 'assessment',
          title: 'New Assessment Completed',
          message: `Recommended ${result.recommendedKw} kW ${result.recommendedPanel.panelName}. Estimated annual savings ₹${result.recommendedPanel.annualSavings.toLocaleString('en-IN')}.`,
          read: false, createdAt: new Date(),
        })
      }
      return ok(strip(record))
    }

    if (route === '/assessments' && method === 'GET') {
      const auth = getAuth(request)
      if (!auth) return err('unauthorized', 401)
      const q = auth.role === 'admin' ? {} : { userId: auth.id }
      const items = await db.collection('assessments').find(q).sort({ createdAt: -1 }).toArray()
      return ok(items.map(strip))
    }

    if (route.startsWith('/assessments/') && method === 'GET') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const id = route.split('/')[2]
      const item = await db.collection('assessments').findOne({ id })
      if (!item) return err('not found', 404)
      if (auth.role !== 'admin' && item.userId !== auth.id) return err('forbidden', 403)
      return ok(strip(item))
    }

    // ===== INSTALLATIONS =====
    if (route === '/installations' && method === 'POST') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const body = await request.json()
      const install = {
        id: uuidv4(), userId: auth.id, userEmail: auth.email,
        installerName: body.installerName || '',
        capacityKw: Number(body.capacityKw) || 0,
        panelTech: body.panelTech || '',
        installDate: body.installDate || new Date().toISOString().slice(0,10),
        warrantyYears: Number(body.warrantyYears) || 25,
        nextMaintenance: body.nextMaintenance || null,
        notes: body.notes || '',
        createdAt: new Date(),
      }
      await db.collection('installations').insertOne(install)
      await db.collection('notifications').insertOne({
        id: uuidv4(), userId: auth.id, type: 'installation',
        title: 'Installation Registered',
        message: `${install.capacityKw} kW ${install.panelTech} installation recorded.`,
        read: false, createdAt: new Date(),
      })
      return ok(strip(install))
    }
    if (route === '/installations' && method === 'GET') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const q = auth.role === 'admin' ? {} : { userId: auth.id }
      const items = await db.collection('installations').find(q).sort({ createdAt: -1 }).toArray()
      return ok(items.map(strip))
    }
    if (route.startsWith('/installations/') && method === 'DELETE') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const id = route.split('/')[2]
      const it = await db.collection('installations').findOne({ id })
      if (!it) return err('not found', 404)
      if (auth.role !== 'admin' && it.userId !== auth.id) return err('forbidden', 403)
      await db.collection('installations').deleteOne({ id })
      return ok({ deleted: true })
    }

    // ===== NOTIFICATIONS =====
    if (route === '/notifications' && method === 'GET') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const items = await db.collection('notifications').find({ userId: auth.id }).sort({ createdAt: -1 }).limit(50).toArray()
      return ok(items.map(strip))
    }
    if (route.startsWith('/notifications/') && route.endsWith('/read') && method === 'POST') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const id = route.split('/')[2]
      await db.collection('notifications').updateOne({ id, userId: auth.id }, { $set: { read: true } })
      return ok({ ok: true })
    }

    // ===== PROFILE =====
    if (route === '/profile' && method === 'PUT') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const body = await request.json()
      const update = {}
      if (body.name !== undefined) update.name = body.name
      if (body.phone !== undefined) update.phone = body.phone
      if (body.address !== undefined) update.address = body.address
      if (body.city !== undefined) update.city = body.city
      if (body.state !== undefined) update.state = body.state
      if (body.pincode !== undefined) update.pincode = body.pincode
      if (Object.keys(update).length === 0) return err('No fields to update')
      await db.collection('users').updateOne({ id: auth.id }, { $set: update })
      const user = await db.collection('users').findOne({ id: auth.id })
      return ok({ user: strip(user) })
    }

    if (route === '/profile/password' && method === 'POST') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const { currentPassword, newPassword } = await request.json()
      if (!currentPassword || !newPassword) return err('currentPassword and newPassword required')
      if (newPassword.length < 6) return err('Password must be at least 6 characters')
      const user = await db.collection('users').findOne({ id: auth.id })
      const okPw = await bcrypt.compare(currentPassword, user.passwordHash)
      if (!okPw) return err('Current password is incorrect', 401)
      await db.collection('users').updateOne({ id: auth.id }, { $set: { passwordHash: await bcrypt.hash(newPassword, 8) } })
      return ok({ message: 'Password changed' })
    }

    if (route === '/profile/email' && method === 'POST') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const { newEmail, password } = await request.json()
      if (!newEmail || !password) return err('newEmail and password required')
      const user = await db.collection('users').findOne({ id: auth.id })
      const okPw = await bcrypt.compare(password, user.passwordHash)
      if (!okPw) return err('Password is incorrect', 401)
      const taken = await db.collection('users').findOne({ email: newEmail.toLowerCase() })
      if (taken) return err('Email already in use', 400)
      await db.collection('users').updateOne({ id: auth.id }, { $set: { email: newEmail.toLowerCase() } })
      const updated = await db.collection('users').findOne({ id: auth.id })
      const token = signToken(updated)
      return ok({ user: strip(updated), token })
    }

    if (route === '/profile/clear-data' && method === 'POST') {
      const auth = getAuth(request); if (!auth) return err('unauthorized', 401)
      const [a, i, n] = await Promise.all([
        db.collection('assessments').deleteMany({ userId: auth.id }),
        db.collection('installations').deleteMany({ userId: auth.id }),
        db.collection('notifications').deleteMany({ userId: auth.id }),
      ])
      return ok({ assessments: a.deletedCount, installations: i.deletedCount, notifications: n.deletedCount })
    }

    // ===== ADMIN =====
    if (route === '/admin/users' && method === 'GET') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const users = await db.collection('users').find({}).toArray()
      return ok(users.map(strip))
    }
    if (route.startsWith('/admin/users/') && method === 'DELETE') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const id = route.split('/')[3]
      if (id === auth.id) return err('You cannot delete your own account', 400)
      const user = await db.collection('users').findOne({ id })
      if (!user) return err('User not found', 404)
      // Cascade: delete user's assessments, installations, notifications
      await Promise.all([
        db.collection('users').deleteOne({ id }),
        db.collection('assessments').deleteMany({ userId: id }),
        db.collection('installations').deleteMany({ userId: id }),
        db.collection('notifications').deleteMany({ userId: id }),
      ])
      return ok({ deleted: true, email: user.email })
    }
    if (route === '/admin/stats' && method === 'GET') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const [users, customers, assessments, installations, schemes] = await Promise.all([
        db.collection('users').countDocuments(),
        db.collection('users').countDocuments({ role: 'customer' }),
        db.collection('assessments').countDocuments(),
        db.collection('installations').countDocuments(),
        db.collection('schemes').countDocuments(),
      ])
      const totalKwAgg = await db.collection('assessments').aggregate([{ $group: { _id: null, kw: { $sum: '$recommendedKw' }, savings: { $sum: '$recommendedPanel.annualSavings' }, co2: { $sum: '$recommendedPanel.co2SavedTonnes' } } }]).toArray()
      const totals = totalKwAgg[0] || { kw: 0, savings: 0, co2: 0 }
      return ok({ users, customers, assessments, installations, schemes, totalKw: totals.kw, totalSavings: totals.savings, totalCo2: totals.co2 })
    }
    if (route === '/admin/schemes' && method === 'POST') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const body = await request.json()
      const doc = { id: uuidv4(), name: body.name, scope: body.scope || 'Central', summary: body.summary || '', updatedAt: new Date() }
      await db.collection('schemes').insertOne(doc)
      return ok(strip(doc))
    }
    if (route.startsWith('/admin/schemes/') && method === 'PUT') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const id = route.split('/')[3]
      const body = await request.json()
      await db.collection('schemes').updateOne({ id }, { $set: { name: body.name, scope: body.scope, summary: body.summary, updatedAt: new Date() } })
      const doc = await db.collection('schemes').findOne({ id })
      return ok(strip(doc))
    }
    if (route.startsWith('/admin/schemes/') && method === 'DELETE') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const id = route.split('/')[3]
      await db.collection('schemes').deleteOne({ id })
      return ok({ deleted: true })
    }
    if (route === '/admin/panels' && method === 'PUT') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const body = await request.json() // {id, ...fields}
      if (!body.id) return err('id required')
      const { id, ...fields } = body
      await db.collection('panel_tech').updateOne({ id }, { $set: fields })
      const doc = await db.collection('panel_tech').findOne({ id })
      return ok(strip(doc))
    }
    if (route === '/admin/states' && method === 'PUT') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const body = await request.json() // {state, tariff, sunHours, netMetering}
      await db.collection('state_data').updateOne({ state: body.state }, { $set: { tariff: Number(body.tariff), sunHours: Number(body.sunHours), netMetering: body.netMetering } })
      const doc = await db.collection('state_data').findOne({ state: body.state })
      return ok(strip(doc))
    }
    if (route === '/admin/notify' && method === 'POST') {
      const auth = getAuth(request); if (!auth || auth.role !== 'admin') return err('forbidden', 403)
      const body = await request.json() // {userId|'all', title, message}
      let userIds = []
      if (body.userId === 'all') {
        const users = await db.collection('users').find({ role: 'customer' }).toArray()
        userIds = users.map(u => u.id)
      } else userIds = [body.userId]
      const docs = userIds.map(uid => ({ id: uuidv4(), userId: uid, type: 'admin', title: body.title, message: body.message, read: false, createdAt: new Date() }))
      if (docs.length) await db.collection('notifications').insertMany(docs)
      return ok({ sent: docs.length })
    }

    if (route === '/' && method === 'GET') return ok({ message: 'SolarSmart India API', version: '1.0.0' })

    return err(`Route ${route} not found`, 404)
  } catch (e) {
    console.error('API Error', e)
    return err('Internal server error: ' + e.message, 500)
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
