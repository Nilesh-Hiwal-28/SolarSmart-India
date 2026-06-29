'use client'

import { useEffect, useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import {
  Sun, Zap, Leaf, IndianRupee, Battery, Calendar, Bell, FileText, LogOut,
  Home as HomeIcon, Settings, Users, BarChart3, ShieldCheck, Wrench, Plus, Trash2,
  TrendingUp, Award, Gauge, ArrowRight, ArrowLeft, Sparkles, MapPin, Calculator, Share2,
  MessageCircle, Mail, Link2, Grid3x3, Maximize2, Pencil, RefreshCw,
  Eye, EyeOff, Lock, KeyRound, User, AtSign, Phone, MapPinned, RotateCcw
} from 'lucide-react'
import Image from 'next/image'

const Logo = ({ size = 40, className = '' }) => (
  <div className={`relative ${className}`} style={{width: size, height: size}}>
    <Image src="/logo.png" alt="SolarSmart India" fill className="object-contain" priority sizes={`${size}px`}/>
  </div>
)

function PasswordInput({ value, onChange, placeholder, required, id }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input id={id} type={show?'text':'password'} value={value} onChange={onChange} placeholder={placeholder} required={required} className="pr-10"/>
      <button type="button" onClick={()=>setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1" tabIndex={-1} aria-label={show?'Hide password':'Show password'}>
        {show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
      </button>
    </div>
  )
}

const API = '/api'

async function api(path, opts = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  if (token) headers.Authorization = `Bearer ${token}`
  const r = await fetch(API + path, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Request failed')
  return data
}

const inr = (n) => '₹' + Math.round(n || 0).toLocaleString('en-IN')

// ============= Landing =============
function Landing({ onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50">
      <header className="container py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={56}/>
          <div>
            <h1 className="font-bold text-xl tracking-tight">SolarSmart India</h1>
            <p className="text-xs text-muted-foreground">Smart Choices. Bright Future.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onLogin('customer')} className="border-sky-300 text-sky-700 hover:bg-sky-50">Customer Login</Button>
          <Button onClick={() => onLogin('admin')} className="bg-slate-900 hover:bg-slate-800">
            <ShieldCheck className="w-4 h-4 mr-2" /> Admin Login
          </Button>
        </div>
      </header>

      <section className="container py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">PM Surya Ghar Muft Bijli Yojana eligible</Badge>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Turn your rooftop into a
            <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent"> power plant.</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl">
            Get a personalized rooftop solar assessment for any property in India in under 60 seconds. See your savings, subsidy, payback period, EMI plan and CO₂ impact — instantly.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button size="lg" onClick={() => onLogin('customer')} className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90 shadow-lg shadow-sky-200">
              Start Free Assessment <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onLogin('customer')} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              I have an installation
            </Button>
          </div>
          <div className="flex gap-6 mt-10 text-sm text-muted-foreground">
            <div><b className="text-foreground text-xl block">₹78k</b> Central subsidy</div>
            <div><b className="text-foreground text-xl block">25 yrs</b> Panel lifespan</div>
            <div><b className="text-foreground text-xl block">4-7 yrs</b> Typical payback</div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-sky-300 to-emerald-300 rounded-3xl blur-2xl opacity-40"></div>
          <div className="relative grid grid-cols-2 gap-4">
            {[
              { icon: Zap, label: 'Capacity', val: '5.2 kW', c: 'sky' },
              { icon: IndianRupee, label: 'Annual Saving', val: '₹68,400', c: 'emerald' },
              { icon: Leaf, label: 'CO₂ Saved/yr', val: '6.4 tonnes', c: 'green' },
              { icon: Battery, label: 'Payback', val: '4.8 years', c: 'cyan' },
            ].map((c, i) => (
              <Card key={i} className="border-sky-200 bg-white/80 backdrop-blur shadow-xl">
                <CardContent className="p-6">
                  <c.icon className={`w-8 h-8 text-${c.c}-500 mb-3`} />
                  <div className="text-sm text-muted-foreground">{c.label}</div>
                  <div className="text-2xl font-bold mt-1">{c.val}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ============= Auth Modal =============
function AuthModal({ mode, onClose, onAuthed }) {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ identifier: '', email: '', username: '', password: '', name: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const isAdmin = mode === 'admin'

  // For admin, force login tab only — no register option exposed
  useEffect(() => { if (isAdmin) setTab('login') }, [isAdmin])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let body, endpoint
      if (tab === 'login') {
        endpoint = '/auth/login'
        body = {
          identifier: form.identifier,
          password: form.password,
          role: isAdmin ? 'admin' : 'customer',
        }
      } else {
        endpoint = '/auth/register'
        body = {
          email: form.email,
          username: form.username,
          password: form.password,
          name: form.name,
          phone: form.phone,
        }
      }
      const r = await api(endpoint, { method: 'POST', body })
      localStorage.setItem('token', r.token)
      localStorage.setItem('user', JSON.stringify(r.user))
      toast.success(`Welcome, ${r.user.name}!`)
      onAuthed(r.user)
    } catch (err) {
      toast.error(err.message)
    }
    finally { setLoading(false) }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isAdmin ? <ShieldCheck className="w-5 h-5 text-slate-700"/> : <Logo size={24}/>}
            {isAdmin ? 'Admin Portal' : 'Customer Portal'}
          </DialogTitle>
          <DialogDescription>
            {isAdmin ? 'Restricted access — authorized personnel only.' : 'Track assessments, installations & savings.'}
          </DialogDescription>
        </DialogHeader>

        {!isAdmin ? (
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </Tabs>
        ) : null}

        <form onSubmit={submit} className="space-y-3 mt-2">
          {tab === 'register' && !isAdmin && (<>
            <div><Label>Full Name *</Label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name"/></div>
            <div><Label>Username *</Label>
              <Input required value={form.username} onChange={e=>setForm({...form,username:e.target.value.replace(/[^a-zA-Z0-9_]/g,'')})} placeholder="3-20 chars, letters/numbers/_"/>
              <p className="text-xs text-muted-foreground mt-1">Used for login — must be unique.</p>
            </div>
            <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></div>
            <div><Label>Phone (optional)</Label><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91…"/></div>
            <div><Label>Password *</Label><PasswordInput required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Min 6, letters + numbers"/></div>
          </>)}

          {tab === 'login' && (<>
            <div>
              <Label>{isAdmin ? 'Admin Email or Username' : 'Email or Username'} *</Label>
              <Input required value={form.identifier} onChange={e=>setForm({...form,identifier:e.target.value})} placeholder={isAdmin?'Enter credential':'you@example.com or username'} autoComplete="username"/>
            </div>
            <div><Label>Password *</Label><PasswordInput required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
          </>)}

          {/* CAPTCHA removed */}

          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90">
            {loading ? 'Please wait…' : (tab === 'login' ? (isAdmin ? 'Admin Sign In' : 'Sign In') : 'Create Account')}
          </Button>
        </form>

        {!isAdmin && (
          <p className="text-xs text-center text-muted-foreground mt-2">
            By registering you confirm the information provided is accurate.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ============= Assessment Wizard =============
function AssessmentWizard({ onDone, initialForm, initialStep = 1 }) {
  const [step, setStep] = useState(initialStep)
  const [states, setStates] = useState([])
  const [panels, setPanels] = useState([])
  const [form, setForm] = useState(initialForm || {
    propertyType: 'residential', state: '', city: '',
    monthlyConsumption: 350, monthlyBill: 3200,
    roofArea: 600, roofType: 'flat', panelTechId: '', budget: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const isEditing = !!initialForm

  useEffect(() => {
    api('/states').then(setStates).catch(()=>{})
    api('/panels').then(setPanels).catch(()=>{})
  }, [])

  const cities = useMemo(() => states.find(s=>s.state===form.state)?.cities || [], [states, form.state])

  const compute = async () => {
    setLoading(true)
    try {
      const r = await api('/assess', { method: 'POST', body: { ...form, monthlyConsumption: Number(form.monthlyConsumption), monthlyBill: Number(form.monthlyBill), roofArea: Number(form.roofArea), budget: form.budget ? Number(form.budget) : null } })
      setResult(r); setStep(4)
    } catch (e) { toast.error(e.message) }
    finally { setLoading(false) }
  }

  if (result) return <AssessmentResult result={result} onDone={onDone} onRestart={() => { setResult(null); setStep(1); }} onEdit={() => { setResult(null); setStep(1); }} />

  return (
    <Card className="border-sky-200">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle>{isEditing ? 'Edit Assessment' : 'New Solar Assessment'}</CardTitle>
            <CardDescription>{isEditing ? 'Update any field and regenerate your plan' : 'Step ' + step + ' of 3 — answer a few questions to get your personalized plan'}</CardDescription>
          </div>
          <Badge variant="outline" className="border-sky-300 text-sky-700">{['Property','Energy','Roof'][step-1]}</Badge>
        </div>
        {/* Clickable step indicators */}
        <div className="flex items-center gap-2 mt-4">
          {['Property','Energy','Roof'].map((label, i) => {
            const s = i + 1
            const reached = step >= s
            const canJump = isEditing || step > s // allow forward jumps only if editing or already visited
            return (
              <button key={s} type="button" disabled={!canJump && step !== s} onClick={() => canJump && setStep(s)}
                className={`flex-1 flex items-center gap-2 p-2 rounded-lg text-xs transition ${step===s?'bg-sky-100 text-sky-900 font-semibold':reached?'bg-emerald-50 text-emerald-700 hover:bg-emerald-100':'bg-slate-50 text-slate-500'} ${canJump||step===s?'cursor-pointer':'cursor-not-allowed'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step===s?'bg-sky-500 text-white':reached?'bg-emerald-500 text-white':'bg-slate-300 text-white'}`}>{s}</span>
                {label}
              </button>
            )
          })}
        </div>
        <Progress value={(step/3)*100} className="mt-3"/>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 1 && (<>
          <div>
            <Label>Property Type</Label>
            <Select value={form.propertyType} onValueChange={v=>setForm({...form,propertyType:v})}>
              <SelectTrigger><SelectValue/></SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <Label>State / UT</Label>
              <Select value={form.state} onValueChange={v=>setForm({...form,state:v,city:''})}>
                <SelectTrigger><SelectValue placeholder="Select state or UT"/></SelectTrigger>
                <SelectContent className="max-h-72">
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground">States</div>
                  {states.filter(s=>!s.isUT).map(s=><SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>)}
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground mt-2">Union Territories</div>
                  {states.filter(s=>s.isUT).map(s=><SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>City / District</Label>
              <Input list="city-list" placeholder={form.state?'Type or pick a district':'Pick state first'} disabled={!form.state}
                value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
              <datalist id="city-list">
                {cities.map(c=><option key={c} value={c}/>)}
              </datalist>
              <p className="text-xs text-muted-foreground mt-1">Type any city/district — suggestions appear as you type.</p>
            </div>
          </div>
        </>)}
        {step === 2 && (<>
          <div>
            <Label>Monthly Electricity Consumption (units / kWh)</Label>
            <Input type="number" value={form.monthlyConsumption} onChange={e=>setForm({...form,monthlyConsumption:e.target.value})}/>
            <p className="text-xs text-muted-foreground mt-1">Check your bill — usually 200-800 units for homes.</p>
          </div>
          <div>
            <Label>Monthly Electricity Bill (₹)</Label>
            <Input type="number" value={form.monthlyBill} onChange={e=>setForm({...form,monthlyBill:e.target.value})}/>
          </div>
          <div>
            <Label>Budget (₹) — optional</Label>
            <Input type="number" placeholder="Leave blank for best recommendation" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/>
          </div>
        </>)}
        {step === 3 && (<>
          <div>
            <Label>Available Roof Area (sq.ft)</Label>
            <Input type="number" value={form.roofArea} onChange={e=>setForm({...form,roofArea:e.target.value})}/>
            <p className="text-xs text-muted-foreground mt-1">1 kW solar needs ~80 sqft of shadow-free roof.</p>
          </div>
          <div>
            <Label>Roof Type</Label>
            <Select value={form.roofType} onValueChange={v=>setForm({...form,roofType:v})}>
              <SelectTrigger><SelectValue/></SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat (RCC)</SelectItem>
                <SelectItem value="sloped">Sloped / Tiled</SelectItem>
                <SelectItem value="metal">Metal Sheet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Preferred Panel Technology — optional</Label>
            <Select value={form.panelTechId} onValueChange={v=>setForm({...form,panelTechId:v})}>
              <SelectTrigger><SelectValue placeholder="Auto-recommend best fit"/></SelectTrigger>
              <SelectContent>{panels.map(p=><SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </>)}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={()=>step>1?setStep(step-1):onDone()}>Back</Button>
        {step < 3 ? (
          <Button onClick={()=>setStep(step+1)} disabled={step===1 && (!form.state||!form.city)} className="bg-sky-500 hover:bg-sky-600">Next <ArrowRight className="w-4 h-4 ml-1"/></Button>
        ) : (
          <Button onClick={compute} disabled={loading} className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90">{loading?'Calculating…':'Generate My Plan'}<Sparkles className="w-4 h-4 ml-2"/></Button>
        )}
      </CardFooter>
    </Card>
  )
}

// ============= EMI Calculator =============
function EMICalculator({ netCost, annualSavings }) {
  const [principal, setPrincipal] = useState(netCost)
  const [rate, setRate] = useState(9.5)
  const [tenure, setTenure] = useState(5)
  useEffect(() => { setPrincipal(netCost) }, [netCost])

  const months = tenure * 12
  const r = rate / 12 / 100
  const emi = principal * r * Math.pow(1+r, months) / (Math.pow(1+r, months) - 1)
  const totalPayable = emi * months
  const totalInterest = totalPayable - principal
  const monthlySavings = annualSavings / 12
  const netMonthly = monthlySavings - emi // positive = you save even after EMI

  return (
    <Card className="border-cyan-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-sky-600"/>Solar Loan / EMI Calculator</CardTitle>
        <CardDescription>Most PSU & private banks offer rooftop solar loans at 8-11% for 5-10 years.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Loan Amount (₹)</Label>
            <Input type="number" value={principal} onChange={e=>setPrincipal(Number(e.target.value)||0)}/>
            <p className="text-xs text-muted-foreground mt-1">Net cost after subsidy</p>
          </div>
          <div>
            <Label>Interest Rate: {rate}% p.a.</Label>
            <Slider value={[rate]} min={7} max={14} step={0.25} onValueChange={v=>setRate(v[0])} className="mt-3"/>
          </div>
          <div>
            <Label>Tenure: {tenure} years</Label>
            <Slider value={[tenure]} min={1} max={10} step={1} onValueChange={v=>setTenure(v[0])} className="mt-3"/>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-sky-50 border-sky-200"><CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Monthly EMI</div>
            <div className="text-2xl font-bold text-sky-700">{inr(emi)}</div>
          </CardContent></Card>
          <Card className="bg-emerald-50 border-emerald-200"><CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Monthly Savings</div>
            <div className="text-2xl font-bold text-emerald-700">{inr(monthlySavings)}</div>
          </CardContent></Card>
          <Card className={netMonthly>=0?'bg-green-50 border-green-300':'bg-orange-50 border-orange-200'}><CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Net Monthly {netMonthly>=0?'Surplus':'Outgo'}</div>
            <div className={`text-2xl font-bold ${netMonthly>=0?'text-green-700':'text-orange-700'}`}>{inr(Math.abs(netMonthly))}</div>
          </CardContent></Card>
          <Card><CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Total Interest</div>
            <div className="text-2xl font-bold">{inr(totalInterest)}</div>
          </CardContent></Card>
        </div>

        {netMonthly >= 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-200 rounded-lg p-4 text-sm">
            <b className="text-emerald-800">🎉 Zero-out-of-pocket plan!</b> Your solar savings exceed your EMI by {inr(netMonthly)}/month. The system pays for itself while you earn extra.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ============= Roof Visualizer =============
function RoofVisualizer({ roofArea, recommendedKw, panelName, spaceNeededSqftPerKw, panelCount }) {
  // Each ~400W panel ~17 sqft (~1.0m × 2.0m landscape). Use scaling for visual.
  const usedArea = recommendedKw * spaceNeededSqftPerKw
  const utilization = Math.min(100, (usedArea / roofArea) * 100)
  // For visual: assume square roof, draw a grid
  const cols = Math.ceil(Math.sqrt(panelCount * 1.6))
  const rows = Math.ceil(panelCount / cols)
  const cells = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const idx = i * cols + j
      cells.push({ active: idx < panelCount, key: `${i}-${j}` })
    }
  }
  return (
    <Card className="border-sky-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Grid3x3 className="w-5 h-5 text-sky-600"/>Roof Layout Visualization</CardTitle>
        <CardDescription>{panelCount} panels of {panelName} on your {roofArea} sqft roof</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-[1fr_240px] gap-6 items-center">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-xl border-2 border-dashed border-slate-300 relative">
            <div className="text-xs text-slate-600 mb-3 flex justify-between"><span>← Roof outline ({roofArea} sqft) →</span><span>{utilization.toFixed(0)}% used</span></div>
            <div className="grid gap-1.5" style={{gridTemplateColumns:`repeat(${cols}, 1fr)`}}>
              {cells.map(c => (
                <div key={c.key} className={`aspect-[2/1] rounded ${c.active?'bg-gradient-to-br from-sky-500 to-sky-700 shadow-inner border border-sky-800':'bg-white/40 border border-slate-300 border-dashed'}`}>
                  {c.active && <div className="w-full h-full grid grid-cols-3 gap-px p-0.5">{[...Array(6)].map((_,i)=><div key={i} className="bg-sky-300/30 rounded-sm"/>)}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gradient-to-br from-sky-500 to-sky-700 rounded"/><span>Solar Panel ({panelCount} × 400W)</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border border-slate-300 border-dashed rounded"/><span>Free roof area</span></div>
            <Separator/>
            <div><div className="text-xs text-muted-foreground">Capacity</div><div className="font-bold">{recommendedKw} kW</div></div>
            <div><div className="text-xs text-muted-foreground">Roof used</div><div className="font-bold">{Math.round(usedArea)} / {roofArea} sqft</div></div>
            <div><div className="text-xs text-muted-foreground">Free space left</div><div className="font-bold text-emerald-600">{Math.max(0, roofArea - Math.round(usedArea))} sqft</div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
const Separator = () => <div className="h-px bg-slate-200 my-2"/>

// ============= Share Buttons =============
function ShareButtons({ result, final }) {
  const rec = final || result.recommendedPanel
  const kw = final ? final.kw : result.recommendedKw
  const url = typeof window !== 'undefined' ? window.location.origin : ''
  const text = `🌞 My SolarSmart India Plan:\n\n📍 ${result.inputs.city}, ${result.inputs.state}\n⚡ ${kw} kW ${rec.panelName}\n💰 Annual savings: ₹${rec.annualSavings.toLocaleString('en-IN')}\n🏦 Subsidy: ₹${rec.subsidy.toLocaleString('en-IN')}\n💸 Net cost: ₹${rec.netCost.toLocaleString('en-IN')}\n⏱ Payback: ${rec.payback} years\n🌱 CO₂ reduction: ${rec.co2SavedTonnes}t/year\n\nCheck yours at ${url}`
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(text)}`
  const mailto = `mailto:?subject=${encodeURIComponent('My Solar Plan from SolarSmart India')}&body=${encodeURIComponent(text)}`
  const copyLink = () => { navigator.clipboard.writeText(text); toast.success('Report summary copied!') }
  return (
    <Card className="border-emerald-200 bg-emerald-50/40">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-600"/>
            <div>
              <div className="font-semibold">Share your solar plan</div>
              <div className="text-xs text-muted-foreground">Spread awareness about clean energy</div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50"><MessageCircle className="w-4 h-4 mr-1"/>WhatsApp</Button></a>
            <a href={mailto}><Button variant="outline" size="sm" className="border-sky-300 text-sky-700 hover:bg-sky-50"><Mail className="w-4 h-4 mr-1"/>Email</Button></a>
            <Button variant="outline" size="sm" onClick={copyLink}><Link2 className="w-4 h-4 mr-1"/>Copy</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============= Assessment Result =============
function AssessmentResult({ result, onDone, onRestart, onEdit }) {
  const r = result
  const initialPanel = r.recommendedPanel
  const [selectedPanelId, setSelectedPanelId] = useState(initialPanel.panelId)
  const [selectedKw, setSelectedKw] = useState(r.recommendedKw)

  const baseAnalysis = r.analyses.find(a => a.panelId === selectedPanelId) || initialPanel
  const maxFeasibleSelected = baseAnalysis.maxFeasibleKw

  // Clamp kw within selected panel's feasibility (and residential 10kW cap)
  useEffect(() => {
    const cap = r.inputs.propertyType === 'residential' ? Math.min(10, maxFeasibleSelected) : maxFeasibleSelected
    if (selectedKw > cap) setSelectedKw(Math.max(1, Math.round(cap * 10) / 10))
    if (selectedKw < 1) setSelectedKw(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPanelId, maxFeasibleSelected])

  // Compute final plan via linear scaling of the base analysis to selectedKw
  const clientSubsidy = (kw) => {
    if (r.inputs.propertyType !== 'residential') return 0
    if (kw <= 0) return 0
    if (kw <= 1) return 30000
    if (kw <= 2) return 60000
    return 78000
  }
  const final = useMemo(() => {
    const base = baseAnalysis
    const refKw = r.recommendedKw || 1
    const ratio = selectedKw / refKw
    const installCost = Math.round(base.installCost * ratio)
    const subsidy = clientSubsidy(selectedKw)
    const netCost = Math.max(0, installCost - subsidy)
    const annualGen = Math.round(base.annualGen * ratio)
    const annualSavings = Math.round(annualGen * r.tariffUsed)
    const payback = annualSavings > 0 ? Math.round((netCost / annualSavings) * 10) / 10 : 99
    const lifetimeSavings = Math.round(base.lifetimeSavings * ratio)
    const roi = netCost > 0 ? Math.round(((lifetimeSavings - netCost) / netCost) * 100) : 0
    const co2SavedTonnes = Math.round((base.co2SavedTonnes * ratio) * 10) / 10
    const treesEquivalent = Math.round(co2SavedTonnes * 50)
    const panelCount = Math.ceil(selectedKw * 1000 / 400)
    const roofAreaNeeded = Math.round(selectedKw * base.spaceNeededSqftPerKw)
    return {
      ...base,
      kw: selectedKw,
      installCost, subsidy, netCost,
      annualGen, annualSavings, payback,
      lifetimeSavings, roi,
      co2SavedTonnes, treesEquivalent,
      panelCount, roofAreaNeeded,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKw, selectedPanelId])

  const isCustomized = selectedPanelId !== initialPanel.panelId || selectedKw !== r.recommendedKw

  const downloadPDF = async () => {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    let y = 15
    doc.setFillColor(14, 165, 233); doc.rect(0, 0, 210, 25, 'F')
    doc.setTextColor(255); doc.setFontSize(20); doc.text('SolarSmart India', 14, 16)
    doc.setFontSize(10); doc.text('Rooftop Solar Assessment Report', 14, 22)
    doc.setTextColor(0); y = 35
    doc.setFontSize(14); doc.text('Customer Inputs', 14, y); y += 7
    doc.setFontSize(10)
    const lines = [
      `Location: ${r.inputs.city}, ${r.inputs.state}`,
      `Property Type: ${r.inputs.propertyType}`,
      `Roof Area: ${r.inputs.roofArea} sqft  |  Roof Type: ${r.inputs.roofType}`,
      `Monthly Consumption: ${r.inputs.monthlyConsumption} kWh  |  Monthly Bill: Rs.${r.inputs.monthlyBill}`,
      `State Tariff: Rs.${r.tariffUsed}/unit  |  Sun Hours: ${r.sunHoursUsed}/day`,
      `Date Generated: ${new Date().toLocaleString('en-IN')}`,
    ]
    lines.forEach(l => { doc.text(l, 14, y); y += 6 })
    y += 4
    doc.setFontSize(14); doc.text(isCustomized ? 'Your Final Selected Plan' : 'System Recommendation', 14, y); y += 7
    doc.setFontSize(11); doc.setTextColor(14, 165, 233)
    doc.text(`${final.kw} kW ${final.panelName} System`, 14, y); y += 7
    doc.setTextColor(0); doc.setFontSize(10)
    const recLines = [
      `Maximum feasible (this panel): ${final.maxFeasibleKw} kW`,
      `Selected capacity: ${final.kw} kW`,
      `Number of panels (~400W each): ${final.panelCount}`,
      `Roof area needed: ${final.roofAreaNeeded} sqft of your ${r.inputs.roofArea} sqft`,
      ``,
      `Install cost: Rs.${final.installCost.toLocaleString('en-IN')}`,
      `Govt subsidy (PM Surya Ghar): Rs.${final.subsidy.toLocaleString('en-IN')}`,
      `Your net investment: Rs.${final.netCost.toLocaleString('en-IN')}`,
      ``,
      `Annual electricity generation: ${final.annualGen.toLocaleString('en-IN')} kWh`,
      `Annual savings: Rs.${final.annualSavings.toLocaleString('en-IN')}`,
      `Payback period: ${final.payback} years`,
      `${final.lifespanYears}-year ROI: ${final.roi}%`,
      `Lifetime savings: Rs.${final.lifetimeSavings.toLocaleString('en-IN')}`,
      `Annual CO2 reduction: ${final.co2SavedTonnes} tonnes (~${final.treesEquivalent} trees)`,
      ``,
      `Net metering: ${r.netMeteringPolicy}`,
    ]
    recLines.forEach(l => { if (l) doc.text(l, 14, y); y += 6 })
    y += 4
    doc.setFontSize(14); doc.text('Panel Comparison Reference', 14, y); y += 7
    doc.setFontSize(8)
    doc.text('Technology              MaxKW   Cost(Rs)   AnnSave   Payback  ROI    CO2/y', 14, y); y += 5
    r.analyses.forEach(a => {
      doc.text(`${a.panelName.padEnd(22).slice(0,22)} ${String(a.maxFeasibleKw).padStart(6)}  ${String(a.netCost).padStart(8)}  ${String(a.annualSavings).padStart(8)}  ${String(a.payback).padStart(5)}y  ${String(a.roi).padStart(5)}% ${a.co2SavedTonnes}t`, 14, y); y += 5
    })
    if (isCustomized) {
      y += 5; doc.setFontSize(8); doc.setTextColor(60)
      doc.text('Note: Customer customized the plan from the system recommendation. Above is the customer-selected final plan.', 14, y)
    }
    doc.setFontSize(8); doc.setTextColor(120)
    doc.text('Generated by SolarSmart India. Estimates based on standard assumptions; actual results may vary.', 14, 285)
    doc.save(`SolarSmart-${r.inputs.city}-${final.kw}kW-${Date.now()}.pdf`)
    toast.success('Report downloaded')
  }

  const StatCard = ({ icon: Icon, label, value, sub, color }) => (
    <Card className={`border-${color}-200`}>
      <CardContent className="p-5">
        <Icon className={`w-7 h-7 text-${color}-500 mb-2`}/>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </CardContent>
    </Card>
  )

  const residentialCap = r.inputs.propertyType === 'residential' ? Math.min(10, maxFeasibleSelected) : maxFeasibleSelected

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 text-white border-0">
        <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge className="bg-white/20 text-white hover:bg-white/20 mb-2">{isCustomized ? 'Your Final Plan' : 'System Recommendation'}</Badge>
            <h2 className="text-3xl font-bold">{final.kw} kW {final.panelName} System</h2>
            <p className="opacity-90 mt-1">For {r.inputs.city}, {r.inputs.state} — {final.summary}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {onEdit && <Button onClick={onEdit} className="bg-white/15 text-white border border-white/40 hover:bg-white/25"><Pencil className="w-4 h-4 mr-2"/>Edit Inputs</Button>}
            <Button onClick={downloadPDF} className="bg-white text-sky-600 hover:bg-white/90"><FileText className="w-4 h-4 mr-2"/>Download PDF</Button>
            <Button variant="outline" onClick={onRestart} className="bg-transparent text-white border-white/40 hover:bg-white/10"><RefreshCw className="w-4 h-4 mr-2"/>New Assessment</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={IndianRupee} label="Annual Savings" value={inr(final.annualSavings)} sub={`Tariff ₹${r.tariffUsed}/unit`} color="emerald"/>
        <StatCard icon={Calendar} label="Payback Period" value={`${final.payback} yrs`} sub={`Net cost ${inr(final.netCost)}`} color="sky"/>
        <StatCard icon={TrendingUp} label={`${final.lifespanYears}-yr ROI`} value={`${final.roi}%`} sub={`Lifetime ${inr(final.lifetimeSavings)}`} color="cyan"/>
        <StatCard icon={Leaf} label="CO₂ Reduced" value={`${final.co2SavedTonnes}t/yr`} sub={`≈ ${final.treesEquivalent} trees`} color="green"/>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-5">
          <div className="text-xs text-muted-foreground">Annual Generation</div>
          <div className="text-2xl font-bold">{final.annualGen.toLocaleString('en-IN')} kWh</div>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="text-xs text-muted-foreground">Central Subsidy (PM Surya Ghar)</div>
          <div className="text-2xl font-bold text-emerald-700">{inr(final.subsidy)}</div>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="text-xs text-muted-foreground">Max Feasible (this panel)</div>
          <div className="text-2xl font-bold">{final.maxFeasibleKw} kW</div>
        </CardContent></Card>
      </div>

      <RoofVisualizer roofArea={r.inputs.roofArea} recommendedKw={final.kw} panelName={final.panelName} spaceNeededSqftPerKw={final.spaceNeededSqftPerKw} panelCount={final.panelCount}/>

      <EMICalculator netCost={final.netCost} annualSavings={final.annualSavings}/>

      <Card>
        <CardHeader>
          <CardTitle>Solar Panel Comparison</CardTitle>
          <CardDescription>Compare all panel technologies available in the Indian rooftop market — then customize your plan below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="financial">
            <TabsList>
              <TabsTrigger value="financial">💰 Financial</TabsTrigger>
              <TabsTrigger value="sustainability">🌱 Sustainability</TabsTrigger>
              <TabsTrigger value="technical">⚙️ Technical</TabsTrigger>
            </TabsList>
            <TabsContent value="financial" className="mt-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {r.analyses.map(a => (
                  <Card key={a.panelId} className={a.panelId===selectedPanelId?'border-sky-500 border-2 ring-2 ring-sky-100':a.panelId===initialPanel.panelId?'border-emerald-300':''}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{a.panelName}</div>
                        {a.panelId===selectedPanelId && <Badge className="bg-sky-500">Selected</Badge>}
                        {a.panelId!==selectedPanelId && a.panelId===initialPanel.panelId && <Badge variant="outline" className="border-emerald-400 text-emerald-700">Best</Badge>}
                      </div>
                      <Row label="Max feasible" val={`${a.maxFeasibleKw} kW`} bold/>
                      <Row label="Install cost" val={inr(a.installCost)}/>
                      <Row label="Subsidy" val={inr(a.subsidy)}/>
                      <Row label="Net cost" val={inr(a.netCost)} bold/>
                      <Row label="Annual savings" val={inr(a.annualSavings)}/>
                      <Row label="Payback" val={`${a.payback} yrs`}/>
                      <Row label={`${a.lifespanYears}yr ROI`} val={`${a.roi}%`} bold/>
                      <Row label="Lifetime savings" val={inr(a.lifetimeSavings)}/>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="sustainability" className="mt-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {r.analyses.map(a => (
                  <Card key={a.panelId} className={a.panelId===selectedPanelId?'border-emerald-500 border-2 ring-2 ring-emerald-100':''}>
                    <CardContent className="p-4 space-y-2">
                      <div className="font-semibold">{a.panelName}</div>
                      <Row label="CO₂/year" val={`${a.co2SavedTonnes}t`}/>
                      <Row label="Trees equivalent" val={a.treesEquivalent}/>
                      <Row label="Lifespan" val={`${a.lifespanYears} yrs`}/>
                      <Row label="Degradation" val={`${a.degradationPerYear}%/yr`}/>
                      <Row label="Lifetime CO₂" val={`${(a.co2SavedTonnes*a.lifespanYears).toFixed(1)}t`} bold/>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="technical" className="mt-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {r.analyses.map(a => (
                  <Card key={a.panelId} className={a.panelId===selectedPanelId?'border-cyan-500 border-2 ring-2 ring-cyan-100':''}>
                    <CardContent className="p-4 space-y-2">
                      <div className="font-semibold">{a.panelName}</div>
                      <Row label="Efficiency" val={`${a.efficiency}%`}/>
                      <Row label="Max feasible" val={`${a.maxFeasibleKw} kW`} bold/>
                      <Row label="Roof area needed" val={`${a.roofAreaNeeded} sqft`}/>
                      <Row label="Panels needed" val={a.panelCount}/>
                      <Row label="Warranty" val={`${a.warrantyYears} yrs`}/>
                      <Row label="Annual gen" val={`${a.annualGen.toLocaleString('en-IN')} kWh`}/>
                      <div className="pt-2 border-t">
                        <div className="text-xs text-emerald-700 font-medium mb-1">Pros:</div>
                        <ul className="text-xs space-y-0.5">{a.pros.map((p,i)=><li key={i}>• {p}</li>)}</ul>
                        <div className="text-xs text-red-700 font-medium mt-2 mb-1">Cons:</div>
                        <ul className="text-xs space-y-0.5">{a.cons.map((c,i)=><li key={i}>• {c}</li>)}</ul>
                        <div className="text-xs text-muted-foreground mt-2">Brands: {a.brands.join(', ')}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* ===== FINAL PLAN CUSTOMIZER ===== */}
      <Card className="border-2 border-sky-300 bg-gradient-to-br from-sky-50/60 to-emerald-50/60 shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-sky-900"><Sparkles className="w-5 h-5"/>Finalize Your Plan</CardTitle>
              <CardDescription>Now that you&apos;ve seen the comparison, pick the panel type and capacity that suits you. All metrics above update live.</CardDescription>
            </div>
            {isCustomized && (
              <Button size="sm" variant="outline" onClick={()=>{setSelectedPanelId(initialPanel.panelId); setSelectedKw(r.recommendedKw)}} className="border-sky-300 text-sky-700 hover:bg-sky-100">
                <RotateCcw className="w-3.5 h-3.5 mr-1"/>Reset to Recommended
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label className="text-sm font-medium mb-2 block">1. Choose your panel technology</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {r.analyses.map(a => (
                <button
                  key={a.panelId}
                  type="button"
                  onClick={()=>setSelectedPanelId(a.panelId)}
                  className={`text-left p-3 rounded-lg border-2 transition ${selectedPanelId===a.panelId?'border-sky-500 bg-sky-50 shadow-sm':'border-slate-200 bg-white hover:border-sky-300'}`}
                >
                  <div className="font-semibold text-sm">{a.panelName}</div>
                  <div className="text-xs text-muted-foreground mt-1">Max {a.maxFeasibleKw} kW • {a.efficiency}%</div>
                  <div className="text-xs text-sky-700 mt-1">{inr(Math.round(a.installCost / r.recommendedKw))}/kW</div>
                  {a.panelId === initialPanel.panelId && <Badge variant="outline" className="mt-2 border-emerald-400 text-emerald-700 text-[10px]">Recommended</Badge>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">2. Select system capacity</Label>
              <div className="text-2xl font-bold text-sky-700">{selectedKw} kW</div>
            </div>
            <Slider value={[selectedKw]} min={1} max={Math.max(1, residentialCap)} step={0.1} onValueChange={v=>setSelectedKw(Math.round(v[0]*10)/10)} className="mt-3"/>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1 kW</span>
              <span>Max {residentialCap} kW {r.inputs.propertyType==='residential' && residentialCap >= 10 && '(residential cap)'}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {[1, 2, 3, 5, 8, 10].filter(k => k <= residentialCap).map(k => (
                <Button key={k} type="button" variant={selectedKw===k?'default':'outline'} size="sm" onClick={()=>setSelectedKw(k)} className={selectedKw===k?'bg-sky-500 hover:bg-sky-600':''}>{k} kW</Button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-sky-200">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Your Final Plan Summary</div>
            <div className="text-lg font-bold mt-1">{final.kw} kW {final.panelName}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
              <div><div className="text-muted-foreground text-xs">Install Cost</div><div className="font-semibold">{inr(final.installCost)}</div></div>
              <div><div className="text-muted-foreground text-xs">After Subsidy</div><div className="font-semibold text-emerald-700">{inr(final.netCost)}</div></div>
              <div><div className="text-muted-foreground text-xs">Annual Savings</div><div className="font-semibold">{inr(final.annualSavings)}</div></div>
              <div><div className="text-muted-foreground text-xs">Payback</div><div className="font-semibold">{final.payback} yrs</div></div>
            </div>
          </div>

          <Button onClick={downloadPDF} className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90" size="lg">
            <FileText className="w-4 h-4 mr-2"/>Download Final Plan Report (PDF)
          </Button>
        </CardContent>
      </Card>

      <ShareButtons result={r} final={final}/>

      <Card className="bg-sky-50 border-sky-200">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-sky-600 mt-1"/>
            <div>
              <div className="font-semibold text-sky-900">Net Metering in {r.inputs.state}</div>
              <p className="text-sm text-sky-800 mt-1">{r.netMeteringPolicy}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
const Row = ({label, val, bold}) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className={bold?'font-bold':''}>{val}</span>
  </div>
)

// ============= Customer Dashboard =============
function CustomerDashboard({ user, onLogout, setUser }) {
  const [view, setView] = useState('home')
  const [assessments, setAssessments] = useState([])
  const [installations, setInstallations] = useState([])
  const [notifications, setNotifications] = useState([])
  const [schemes, setSchemes] = useState([])

  const refresh = async () => {
    try {
      const [a, i, n, s] = await Promise.all([api('/assessments'), api('/installations'), api('/notifications'), api('/schemes')])
      setAssessments(a); setInstallations(i); setNotifications(n); setSchemes(s)
    } catch (e) {}
  }
  useEffect(() => { refresh() }, [view])

  const unread = notifications.filter(n=>!n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/60 to-emerald-50/60">
      <DashHeader user={user} onLogout={onLogout} role="customer"/>
      <div className="container py-6 grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="space-y-1">
          <NavBtn icon={HomeIcon} label="Home" active={view==='home'} onClick={()=>setView('home')}/>
          <NavBtn icon={Sparkles} label="New Assessment" active={view==='new'} onClick={()=>setView('new')}/>
          <NavBtn icon={FileText} label="My Assessments" active={view==='assess'} onClick={()=>setView('assess')} badge={assessments.length}/>
          <NavBtn icon={Wrench} label="Installations" active={view==='install'} onClick={()=>setView('install')} badge={installations.length}/>
          <NavBtn icon={Bell} label="Notifications" active={view==='notif'} onClick={()=>setView('notif')} badge={unread}/>
          <NavBtn icon={Award} label="Govt Schemes" active={view==='schemes'} onClick={()=>setView('schemes')}/>
          <NavBtn icon={Settings} label="Profile" active={view==='profile'} onClick={()=>setView('profile')}/>
        </aside>
        <main>
          {view==='home' && <CustomerHome user={user} assessments={assessments} installations={installations} onNew={()=>setView('new')}/>}
          {view==='new' && <AssessmentWizard onDone={()=>setView('home')}/>}
          {view==='assess' && <AssessmentList items={assessments}/>}
          {view==='install' && <InstallationManager items={installations} onChange={refresh}/>}
          {view==='notif' && <NotificationList items={notifications} onChange={refresh}/>}
          {view==='schemes' && <SchemesView items={schemes}/>}
          {view==='profile' && <ProfileView user={user} onChange={refresh} setUser={setUser}/>}
        </main>
      </div>
    </div>
  )
}

function DashHeader({ user, onLogout, role }) {
  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={40}/>
          <div>
            <div className="font-bold leading-tight">SolarSmart India</div>
            <div className="text-xs text-muted-foreground capitalize">{role} Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}><LogOut className="w-4 h-4"/></Button>
        </div>
      </div>
    </header>
  )
}
function NavBtn({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${active?'bg-sky-100 text-sky-900 font-medium':'hover:bg-slate-100'}`}>
      <Icon className="w-4 h-4"/>
      <span className="flex-1 text-left">{label}</span>
      {badge>0 && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
    </button>
  )
}

function CustomerHome({ user, assessments, installations, onNew }) {
  const last = assessments[0]
  const totalSavings = assessments.reduce((s,a)=>s+(a.recommendedPanel?.annualSavings||0),0)
  const totalCO2 = assessments.reduce((s,a)=>s+(a.recommendedPanel?.co2SavedTonnes||0),0)
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 text-white border-0">
        <CardContent className="p-6 flex justify-between items-center flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold">Hi {user.name}, ready to go solar?</h2>
            <p className="opacity-90 mt-1">Get a personalized assessment in under a minute.</p>
          </div>
          <Button onClick={onNew} size="lg" className="bg-white text-sky-600 hover:bg-white/90"><Sparkles className="w-4 h-4 mr-2"/>Start New Assessment</Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><FileText className="w-5 h-5 text-sky-500 mb-1"/><div className="text-xs text-muted-foreground">Assessments</div><div className="text-2xl font-bold">{assessments.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><Wrench className="w-5 h-5 text-cyan-500 mb-1"/><div className="text-xs text-muted-foreground">Installations</div><div className="text-2xl font-bold">{installations.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><IndianRupee className="w-5 h-5 text-emerald-500 mb-1"/><div className="text-xs text-muted-foreground">Projected Savings/yr</div><div className="text-2xl font-bold">{inr(totalSavings)}</div></CardContent></Card>
        <Card><CardContent className="p-4"><Leaf className="w-5 h-5 text-green-500 mb-1"/><div className="text-xs text-muted-foreground">CO₂ Reduced/yr</div><div className="text-2xl font-bold">{totalCO2.toFixed(1)}t</div></CardContent></Card>
      </div>
      {last && (
        <Card>
          <CardHeader><CardTitle>Latest Assessment</CardTitle><CardDescription>{new Date(last.createdAt).toLocaleString('en-IN')} • {last.inputs.city}, {last.inputs.state}</CardDescription></CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-3 text-sm">
              <div><div className="text-muted-foreground">Capacity</div><div className="font-bold">{last.recommendedKw} kW</div></div>
              <div><div className="text-muted-foreground">Panel</div><div className="font-bold">{last.recommendedPanel.panelName}</div></div>
              <div><div className="text-muted-foreground">Net Cost</div><div className="font-bold">{inr(last.recommendedPanel.netCost)}</div></div>
              <div><div className="text-muted-foreground">Payback</div><div className="font-bold">{last.recommendedPanel.payback} yrs</div></div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AssessmentList({ items }) {
  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(null)
  if (editing) return (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={()=>setEditing(null)}><ArrowLeft className="w-4 h-4 mr-1"/>Back to history</Button>
      <AssessmentWizard initialForm={editing} onDone={()=>setEditing(null)}/>
    </div>
  )
  if (selected) return <AssessmentResult
    result={selected}
    onDone={()=>setSelected(null)}
    onRestart={()=>setSelected(null)}
    onEdit={()=>{ const inputs = { ...selected.inputs, budget: selected.inputs.budget || '' }; setEditing(inputs); setSelected(null) }}
  />
  if (!items.length) return (
    <Card className="border-dashed border-2 border-sky-200">
      <CardContent className="p-12 text-center">
        <FileText className="w-12 h-12 text-sky-400 mx-auto mb-3 opacity-70"/>
        <h3 className="font-semibold text-lg">No previous assessments yet</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">Start your first solar assessment to see your personalized recommendation, savings, payback period, and panel comparison here.</p>
      </CardContent>
    </Card>
  )
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">My Assessments ({items.length})</h2>
      {items.map(a => (
        <Card key={a.id} className="hover:shadow-md transition">
          <CardContent className="p-4 flex justify-between items-center flex-wrap gap-3">
            <div className="cursor-pointer flex-1" onClick={()=>setSelected(a)}>
              <div className="font-semibold">{a.recommendedKw} kW • {a.recommendedPanel.panelName}</div>
              <div className="text-sm text-muted-foreground">{a.inputs.city}, {a.inputs.state} • {new Date(a.createdAt).toLocaleDateString('en-IN')}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Annual Savings</div>
              <div className="font-bold text-emerald-600">{inr(a.recommendedPanel.annualSavings)}</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={()=>setSelected(a)}>View</Button>
              <Button size="sm" variant="outline" onClick={()=>setEditing({ ...a.inputs, budget: a.inputs.budget || '' })} className="border-sky-300 text-sky-700 hover:bg-sky-50"><Pencil className="w-3.5 h-3.5 mr-1"/>Edit & Recompute</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function InstallationManager({ items, onChange }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ installerName:'', capacityKw:5, panelTech:'Monocrystalline PERC', installDate:'', warrantyYears:25, nextMaintenance:'', notes:'' })
  const save = async () => {
    try { await api('/installations', { method: 'POST', body: form }); toast.success('Installation saved'); setOpen(false); onChange() }
    catch(e){ toast.error(e.message) }
  }
  const del = async (id) => { await api('/installations/'+id, { method:'DELETE' }); toast.success('Deleted'); onChange() }
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Installation Records</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-sky-500 hover:bg-sky-600"><Plus className="w-4 h-4 mr-1"/>Add Installation</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Record Installation</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Installer / Company</Label><Input value={form.installerName} onChange={e=>setForm({...form,installerName:e.target.value})}/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Capacity (kW)</Label><Input type="number" value={form.capacityKw} onChange={e=>setForm({...form,capacityKw:e.target.value})}/></div>
                <div><Label>Panel Technology</Label><Input value={form.panelTech} onChange={e=>setForm({...form,panelTech:e.target.value})}/></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Install Date</Label><Input type="date" value={form.installDate} onChange={e=>setForm({...form,installDate:e.target.value})}/></div>
                <div><Label>Warranty (years)</Label><Input type="number" value={form.warrantyYears} onChange={e=>setForm({...form,warrantyYears:e.target.value})}/></div>
              </div>
              <div><Label>Next Maintenance</Label><Input type="date" value={form.nextMaintenance} onChange={e=>setForm({...form,nextMaintenance:e.target.value})}/></div>
              <div><Label>Notes</Label><Textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
            </div>
            <DialogFooter><Button onClick={save}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {!items.length && (
        <Card className="border-dashed border-2 border-sky-200">
          <CardContent className="p-12 text-center">
            <Wrench className="w-12 h-12 text-sky-400 mx-auto mb-3 opacity-70"/>
            <h3 className="font-semibold text-lg">No installations recorded</h3>
            <p className="text-sm text-muted-foreground mt-1">Already have rooftop solar installed? Click &quot;Add Installation&quot; to track warranty, maintenance schedules and get service reminders.</p>
          </CardContent>
        </Card>
      )}
      {items.map(i => (
        <Card key={i.id}>
          <CardContent className="p-4 flex justify-between items-center flex-wrap gap-3">
            <div>
              <div className="font-semibold">{i.capacityKw} kW • {i.panelTech}</div>
              <div className="text-sm text-muted-foreground">{i.installerName} • Installed {i.installDate}</div>
              <div className="text-xs text-muted-foreground">Warranty: {i.warrantyYears}yrs {i.nextMaintenance && `• Next service: ${i.nextMaintenance}`}</div>
            </div>
            <Button size="sm" variant="outline" onClick={()=>del(i.id)}><Trash2 className="w-4 h-4"/></Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function NotificationList({ items, onChange }) {
  const mark = async (id) => { await api('/notifications/'+id+'/read', { method:'POST' }); onChange() }
  if (!items.length) return (
    <Card className="border-dashed border-2 border-sky-200">
      <CardContent className="p-12 text-center">
        <Bell className="w-12 h-12 text-sky-400 mx-auto mb-3 opacity-70"/>
        <h3 className="font-semibold text-lg">No notifications</h3>
        <p className="text-sm text-muted-foreground mt-1">You&apos;ll see assessment confirmations, maintenance reminders, and announcements here.</p>
      </CardContent>
    </Card>
  )
  return (
    <div className="space-y-2">
      {items.map(n => (
        <Card key={n.id} className={n.read?'opacity-60':'border-sky-200'}>
          <CardContent className="p-4 flex justify-between items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-sky-500"/>
                <span className="font-semibold">{n.title}</span>
                {!n.read && <Badge className="bg-sky-500 text-xs">New</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString('en-IN')}</p>
            </div>
            {!n.read && <Button size="sm" variant="ghost" onClick={()=>mark(n.id)}>Mark read</Button>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SchemesView({ items }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Government Schemes & Subsidies</h2>
      {items.map(s => (
        <Card key={s.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500"/>
              <span className="font-semibold">{s.name}</span>
              <Badge variant="outline">{s.scope}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{s.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProfileView({ user, onChange, setUser }) {
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({
    name: user.name || '', phone: user.phone || '',
    address: user.address || '', city: user.city || '',
    state: user.state || '', pincode: user.pincode || ''
  })
  const [pwd, setPwd] = useState({ open: false, current: '', next: '', confirm: '' })
  const [emailDlg, setEmailDlg] = useState({ open: false, newEmail: '', password: '' })
  const [clearOpen, setClearOpen] = useState(false)

  const saveProfile = async () => {
    try {
      const r = await api('/profile', { method: 'PUT', body: form })
      localStorage.setItem('user', JSON.stringify(r.user))
      if (setUser) setUser(r.user)
      toast.success('Profile updated'); setEdit(false); onChange()
    } catch(e) { toast.error(e.message) }
  }

  const changePassword = async () => {
    if (pwd.next !== pwd.confirm) return toast.error("Passwords don't match")
    if (pwd.next.length < 6) return toast.error('Password must be at least 6 characters')
    try {
      await api('/profile/password', { method: 'POST', body: { currentPassword: pwd.current, newPassword: pwd.next } })
      toast.success('Password changed successfully')
      setPwd({ open: false, current: '', next: '', confirm: '' })
    } catch(e) { toast.error(e.message) }
  }

  const changeEmail = async () => {
    try {
      const r = await api('/profile/email', { method: 'POST', body: { newEmail: emailDlg.newEmail, password: emailDlg.password } })
      localStorage.setItem('token', r.token)
      localStorage.setItem('user', JSON.stringify(r.user))
      if (setUser) setUser(r.user)
      toast.success('Email changed successfully')
      setEmailDlg({ open: false, newEmail: '', password: '' })
    } catch(e) { toast.error(e.message) }
  }

  const clearData = async () => {
    try {
      const r = await api('/profile/clear-data', { method: 'POST' })
      toast.success(`Cleared ${r.assessments} assessments, ${r.installations} installations, ${r.notifications} notifications`)
      setClearOpen(false); onChange()
    } catch(e) { toast.error(e.message) }
  }

  const initial = (user.name || user.email || '?').charAt(0).toUpperCase()

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 text-white text-2xl font-bold flex items-center justify-center shadow-lg">{initial}</div>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1"><AtSign className="w-3.5 h-3.5"/>{user.email}</CardDescription>
                <Badge variant="outline" className="mt-2 text-xs border-emerald-300 text-emerald-700">{user.role}</Badge>
              </div>
            </div>
            {!edit && <Button variant="outline" onClick={()=>setEdit(true)} className="border-sky-300 text-sky-700 hover:bg-sky-50"><Pencil className="w-4 h-4 mr-2"/>Edit Profile</Button>}
          </div>
        </CardHeader>
        <CardContent>
          {!edit ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <Field icon={User} label="Full Name" value={user.name}/>
              <Field icon={Phone} label="Phone" value={user.phone}/>
              <Field icon={MapPinned} label="Address" value={user.address} full/>
              <Field icon={MapPin} label="City" value={user.city}/>
              <Field icon={MapPin} label="State" value={user.state}/>
              <Field icon={MapPin} label="Pincode" value={user.pincode}/>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Full Name</Label><Input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div className="sm:col-span-2"><Label>Address</Label><Textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="House/Flat no., Street, Locality"/></div>
              <div><Label>City</Label><Input value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></div>
              <div><Label>State</Label><Input value={form.state} onChange={e=>setForm({...form,state:e.target.value})}/></div>
              <div><Label>Pincode</Label><Input value={form.pincode} onChange={e=>setForm({...form,pincode:e.target.value})}/></div>
              <div className="sm:col-span-2 flex gap-2 pt-2">
                <Button onClick={saveProfile} className="bg-sky-500 hover:bg-sky-600">Save Changes</Button>
                <Button variant="outline" onClick={()=>{ setEdit(false); setForm({ name:user.name||'', phone:user.phone||'', address:user.address||'', city:user.city||'', state:user.state||'', pincode:user.pincode||'' }) }}>Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Card */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-sky-600"/>Security &amp; Account</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <SecRow icon={KeyRound} title="Password" desc="Change your account password" actionLabel="Change Password" onClick={()=>setPwd({...pwd, open: true})}/>
          <SecRow icon={AtSign} title="Email Address" desc={user.email} actionLabel="Change Email" onClick={()=>setEmailDlg({...emailDlg, open: true})}/>
          <SecRow icon={RotateCcw} title="Clear My Data" desc="Delete all your assessments, installations and notifications" actionLabel="Clear All Data" danger onClick={()=>setClearOpen(true)}/>
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={pwd.open} onOpenChange={(v)=>setPwd({...pwd, open: v, current:'', next:'', confirm:''})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><KeyRound className="w-5 h-5"/>Change Password</DialogTitle>
            <DialogDescription>Enter your current password and choose a new one (min 6 characters).</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Current Password</Label><PasswordInput value={pwd.current} onChange={e=>setPwd({...pwd, current: e.target.value})}/></div>
            <div><Label>New Password</Label><PasswordInput value={pwd.next} onChange={e=>setPwd({...pwd, next: e.target.value})}/></div>
            <div><Label>Confirm New Password</Label><PasswordInput value={pwd.confirm} onChange={e=>setPwd({...pwd, confirm: e.target.value})}/></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setPwd({open:false, current:'', next:'', confirm:''})}>Cancel</Button>
            <Button onClick={changePassword} className="bg-sky-500 hover:bg-sky-600" disabled={!pwd.current||!pwd.next||!pwd.confirm}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Email Dialog */}
      <Dialog open={emailDlg.open} onOpenChange={(v)=>setEmailDlg({...emailDlg, open: v, newEmail:'', password:''})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><AtSign className="w-5 h-5"/>Change Email</DialogTitle>
            <DialogDescription>Current email: <b>{user.email}</b>. Confirm with your password.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>New Email</Label><Input type="email" value={emailDlg.newEmail} onChange={e=>setEmailDlg({...emailDlg, newEmail: e.target.value})}/></div>
            <div><Label>Current Password</Label><PasswordInput value={emailDlg.password} onChange={e=>setEmailDlg({...emailDlg, password: e.target.value})}/></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setEmailDlg({open:false, newEmail:'', password:''})}>Cancel</Button>
            <Button onClick={changeEmail} className="bg-sky-500 hover:bg-sky-600" disabled={!emailDlg.newEmail||!emailDlg.password}>Update Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clear Data Dialog */}
      <Dialog open={clearOpen} onOpenChange={setClearOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Clear all your data?</DialogTitle>
            <DialogDescription>This permanently deletes all your assessments, installations and notifications. Your profile and login stay intact. This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setClearOpen(false)}>Cancel</Button>
            <Button onClick={clearData} className="bg-red-600 hover:bg-red-700">Yes, clear my data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const Field = ({ icon: Icon, label, value, full }) => (
  <div className={full?'sm:col-span-2':''}>
    <div className="text-xs text-muted-foreground flex items-center gap-1"><Icon className="w-3 h-3"/>{label}</div>
    <div className="text-sm mt-1 font-medium">{value || <span className="text-muted-foreground italic">Not set</span>}</div>
  </div>
)
const SecRow = ({ icon: Icon, title, desc, actionLabel, onClick, danger }) => (
  <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg gap-3 flex-wrap">
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${danger?'bg-red-100 text-red-600':'bg-sky-100 text-sky-600'}`}><Icon className="w-4 h-4"/></div>
      <div>
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
    <Button size="sm" variant="outline" onClick={onClick} className={danger?'text-red-600 border-red-200 hover:bg-red-50':''}>{actionLabel}</Button>
  </div>
)

// ============= Admin Dashboard =============
function AdminDashboard({ user, onLogout }) {
  const [view, setView] = useState('home')
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [assessments, setAssessments] = useState([])
  const [installations, setInstallations] = useState([])
  const [schemes, setSchemes] = useState([])
  const [states, setStates] = useState([])
  const [panels, setPanels] = useState([])

  const refresh = async () => {
    try {
      const [st, u, a, i, sc, sd, p] = await Promise.all([
        api('/admin/stats'), api('/admin/users'), api('/assessments'),
        api('/installations'), api('/schemes'), api('/states'), api('/panels')
      ])
      setStats(st); setUsers(u); setAssessments(a); setInstallations(i); setSchemes(sc); setStates(sd); setPanels(p)
    } catch(e) {}
  }
  useEffect(() => { refresh() }, [view])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/60 to-emerald-50/60">
      <DashHeader user={user} onLogout={onLogout} role="admin"/>
      <div className="container py-6 grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="space-y-1">
          <NavBtn icon={BarChart3} label="Overview" active={view==='home'} onClick={()=>setView('home')}/>
          <NavBtn icon={Users} label="Users" active={view==='users'} onClick={()=>setView('users')} badge={users.length}/>
          <NavBtn icon={FileText} label="Assessments" active={view==='assess'} onClick={()=>setView('assess')} badge={assessments.length}/>
          <NavBtn icon={Wrench} label="Installations" active={view==='install'} onClick={()=>setView('install')} badge={installations.length}/>
          <NavBtn icon={Award} label="Schemes" active={view==='schemes'} onClick={()=>setView('schemes')}/>
          <NavBtn icon={Battery} label="Panel Tech" active={view==='panels'} onClick={()=>setView('panels')}/>
          <NavBtn icon={MapPin} label="State Data" active={view==='states'} onClick={()=>setView('states')}/>
          <NavBtn icon={Bell} label="Send Notification" active={view==='notify'} onClick={()=>setView('notify')}/>
        </aside>
        <main>
          {view==='home' && <AdminOverview stats={stats} assessments={assessments}/>}
          {view==='users' && <AdminUsers users={users} currentUserId={user.id} onChange={refresh}/>}
          {view==='assess' && <AdminAssessments items={assessments}/>}
          {view==='install' && <AdminInstallations items={installations}/>}
          {view==='schemes' && <AdminSchemes items={schemes} onChange={refresh}/>}
          {view==='panels' && <AdminPanels items={panels} onChange={refresh}/>}
          {view==='states' && <AdminStates items={states} onChange={refresh}/>}
          {view==='notify' && <AdminNotify users={users}/>}
        </main>
      </div>
    </div>
  )
}

function AdminOverview({ stats, assessments }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><Users className="w-5 h-5 text-sky-500 mb-1"/><div className="text-xs text-muted-foreground">Total Users</div><div className="text-2xl font-bold">{stats.users||0}</div></CardContent></Card>
        <Card><CardContent className="p-4"><FileText className="w-5 h-5 text-cyan-500 mb-1"/><div className="text-xs text-muted-foreground">Assessments</div><div className="text-2xl font-bold">{stats.assessments||0}</div></CardContent></Card>
        <Card><CardContent className="p-4"><Wrench className="w-5 h-5 text-emerald-500 mb-1"/><div className="text-xs text-muted-foreground">Installations</div><div className="text-2xl font-bold">{stats.installations||0}</div></CardContent></Card>
        <Card><CardContent className="p-4"><Award className="w-5 h-5 text-green-500 mb-1"/><div className="text-xs text-muted-foreground">Schemes</div><div className="text-2xl font-bold">{stats.schemes||0}</div></CardContent></Card>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-5"><Gauge className="w-6 h-6 text-sky-500 mb-2"/><div className="text-xs text-muted-foreground">Total Recommended Capacity</div><div className="text-2xl font-bold">{(stats.totalKw||0).toFixed(1)} kW</div></CardContent></Card>
        <Card><CardContent className="p-5"><IndianRupee className="w-6 h-6 text-emerald-500 mb-2"/><div className="text-xs text-muted-foreground">Projected Annual Savings</div><div className="text-2xl font-bold">{inr(stats.totalSavings)}</div></CardContent></Card>
        <Card><CardContent className="p-5"><Leaf className="w-6 h-6 text-green-500 mb-2"/><div className="text-xs text-muted-foreground">Projected CO₂ Reduction</div><div className="text-2xl font-bold">{(stats.totalCo2||0).toFixed(1)}t/yr</div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Assessments</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {assessments.slice(0,5).map(a => (
              <div key={a.id} className="flex justify-between items-center py-2 border-b last:border-0 text-sm">
                <div>
                  <div className="font-medium">{a.userEmail}</div>
                  <div className="text-xs text-muted-foreground">{a.inputs.city}, {a.inputs.state}</div>
                </div>
                <div className="text-right">
                  <div>{a.recommendedKw} kW</div>
                  <div className="text-xs text-muted-foreground">{inr(a.recommendedPanel?.annualSavings)}/yr</div>
                </div>
              </div>
            ))}
            {!assessments.length && <div className="text-center text-muted-foreground py-4">No data yet</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminUsers({ users, currentUserId, onChange }) {
  const [confirmDel, setConfirmDel] = useState(null)
  const del = async () => {
    try {
      const r = await api('/admin/users/'+confirmDel.id, { method: 'DELETE' })
      toast.success(`Deleted ${r.email}`); setConfirmDel(null); onChange()
    } catch(e) { toast.error(e.message); setConfirmDel(null) }
  }
  return (
    <Card><CardHeader><CardTitle>All Users ({users.length})</CardTitle><CardDescription>Deleting a user also removes their assessments, installations & notifications.</CardDescription></CardHeader><CardContent>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b"><tr><th className="py-2">Name</th><th>Email</th><th>Role</th><th>Phone</th><th>Joined</th><th></th></tr></thead>
          <tbody>{users.map(u => (
            <tr key={u.id} className="border-b last:border-0">
              <td className="py-3">{u.name}</td>
              <td>{u.email}</td>
              <td><Badge variant={u.role==='admin'?'default':'secondary'} className={u.role==='admin'?'bg-slate-800':''}>{u.role}</Badge></td>
              <td className="text-muted-foreground">{u.phone||'—'}</td>
              <td className="text-muted-foreground">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
              <td>
                {u.id === currentUserId ? (
                  <Badge variant="outline" className="text-xs">You</Badge>
                ) : (
                  <Button size="sm" variant="outline" onClick={()=>setConfirmDel(u)} className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                    <Trash2 className="w-3.5 h-3.5"/>
                  </Button>
                )}
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <Dialog open={!!confirmDel} onOpenChange={(v)=>!v&&setConfirmDel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete user?</DialogTitle>
            <DialogDescription>This permanently removes <b>{confirmDel?.email}</b> along with all their assessments, installations, and notifications. This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setConfirmDel(null)}>Cancel</Button>
            <Button onClick={del} className="bg-red-600 hover:bg-red-700">Yes, delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardContent></Card>
  )
}
function AdminAssessments({ items }) {
  return (
    <Card><CardHeader><CardTitle>All Assessments ({items.length})</CardTitle></CardHeader><CardContent>
      <div className="space-y-2">{items.map(a => (
        <div key={a.id} className="flex justify-between items-center py-2 border-b text-sm">
          <div><div className="font-medium">{a.userEmail||'Anonymous'}</div><div className="text-xs text-muted-foreground">{a.inputs.city}, {a.inputs.state} • {new Date(a.createdAt).toLocaleDateString('en-IN')}</div></div>
          <div className="text-right"><div>{a.recommendedKw} kW {a.recommendedPanel?.panelName}</div><div className="text-xs text-emerald-600">{inr(a.recommendedPanel?.annualSavings)}/yr</div></div>
        </div>
      ))}</div>
    </CardContent></Card>
  )
}
function AdminInstallations({ items }) {
  return (
    <Card><CardHeader><CardTitle>All Installations ({items.length})</CardTitle></CardHeader><CardContent>
      <div className="space-y-2">{items.map(i => (
        <div key={i.id} className="flex justify-between items-center py-2 border-b text-sm">
          <div><div className="font-medium">{i.userEmail}</div><div className="text-xs text-muted-foreground">{i.installerName} • {i.installDate}</div></div>
          <div className="text-right">{i.capacityKw} kW • {i.panelTech}</div>
        </div>
      ))}</div>
    </CardContent></Card>
  )
}

function AdminSchemes({ items, onChange }) {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({ name:'', scope:'Central', summary:'' })
  const save = async () => {
    if (edit) await api('/admin/schemes/'+edit, { method:'PUT', body: form })
    else await api('/admin/schemes', { method:'POST', body: form })
    toast.success('Saved'); setOpen(false); setEdit(null); setForm({name:'',scope:'Central',summary:''}); onChange()
  }
  const del = async (id) => { await api('/admin/schemes/'+id, { method:'DELETE' }); toast.success('Deleted'); onChange() }
  const openEdit = (s) => { setEdit(s.id); setForm({name:s.name,scope:s.scope,summary:s.summary}); setOpen(true) }
  return (
    <div className="space-y-3">
      <div className="flex justify-between"><h2 className="text-xl font-bold">Government Schemes</h2>
        <Dialog open={open} onOpenChange={(v)=>{setOpen(v);if(!v){setEdit(null);setForm({name:'',scope:'Central',summary:''})}}}>
          <DialogTrigger asChild><Button className="bg-sky-500 hover:bg-sky-600"><Plus className="w-4 h-4 mr-1"/>Add Scheme</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle>{edit?'Edit':'New'} Scheme</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div><Label>Scope</Label><Input value={form.scope} onChange={e=>setForm({...form,scope:e.target.value})}/></div>
              <div><Label>Summary</Label><Textarea value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})}/></div>
            </div>
            <DialogFooter><Button onClick={save}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {items.map(s => (
        <Card key={s.id}><CardContent className="p-4 flex justify-between items-start gap-3">
          <div><div className="font-semibold flex gap-2 items-center">{s.name}<Badge variant="outline">{s.scope}</Badge></div><p className="text-sm text-muted-foreground mt-1">{s.summary}</p></div>
          <div className="flex gap-1"><Button size="sm" variant="outline" onClick={()=>openEdit(s)}>Edit</Button><Button size="sm" variant="outline" onClick={()=>del(s.id)}><Trash2 className="w-4 h-4"/></Button></div>
        </CardContent></Card>
      ))}
    </div>
  )
}

function AdminPanels({ items, onChange }) {
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({})
  const save = async () => { await api('/admin/panels', { method:'PUT', body: { id: edit, ...form } }); toast.success('Saved'); setEdit(null); onChange() }
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Panel Technologies</h2>
      {items.map(p => (
        <Card key={p.id}><CardContent className="p-4">
          <div className="flex justify-between items-start"><div><div className="font-semibold">{p.name}</div><div className="text-sm text-muted-foreground">Efficiency {p.efficiency}% • Cost ₹{p.costPerKw}/kW • {p.lifespanYears} yr life</div></div><Button size="sm" variant="outline" onClick={()=>{setEdit(p.id);setForm({costPerKw:p.costPerKw,efficiency:p.efficiency,lifespanYears:p.lifespanYears,degradationPerYear:p.degradationPerYear})}}>Edit</Button></div>
          {edit===p.id && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              <div><Label>Cost/kW (₹)</Label><Input type="number" value={form.costPerKw} onChange={e=>setForm({...form,costPerKw:Number(e.target.value)})}/></div>
              <div><Label>Efficiency %</Label><Input type="number" step="0.1" value={form.efficiency} onChange={e=>setForm({...form,efficiency:Number(e.target.value)})}/></div>
              <div><Label>Lifespan (yrs)</Label><Input type="number" value={form.lifespanYears} onChange={e=>setForm({...form,lifespanYears:Number(e.target.value)})}/></div>
              <div><Label>Degradation %/yr</Label><Input type="number" step="0.05" value={form.degradationPerYear} onChange={e=>setForm({...form,degradationPerYear:Number(e.target.value)})}/></div>
              <div className="col-span-full"><Button onClick={save} className="bg-sky-500 hover:bg-sky-600">Save Changes</Button></div>
            </div>
          )}
        </CardContent></Card>
      ))}
    </div>
  )
}

function AdminStates({ items, onChange }) {
  const [edit, setEdit] = useState(null)
  const [form, setForm] = useState({})
  const save = async () => { await api('/admin/states', { method:'PUT', body: { state: edit, ...form } }); toast.success('Saved'); setEdit(null); onChange() }
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">State / UT Data ({items.length})</h2>
      {items.map(s => (
        <Card key={s.state}><CardContent className="p-4">
          <div className="flex justify-between items-start"><div><div className="font-semibold flex items-center gap-2">{s.state}{s.isUT && <Badge variant="outline" className="text-xs">UT</Badge>}</div><div className="text-sm text-muted-foreground">Tariff ₹{s.tariff}/unit • Sun {s.sunHours}h • {s.cities?.length||0} districts</div><div className="text-xs text-muted-foreground mt-1">{s.netMetering}</div></div><Button size="sm" variant="outline" onClick={()=>{setEdit(s.state);setForm({tariff:s.tariff,sunHours:s.sunHours,netMetering:s.netMetering})}}>Edit</Button></div>
          {edit===s.state && (
            <div className="space-y-2 mt-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Tariff ₹/unit</Label><Input type="number" step="0.1" value={form.tariff} onChange={e=>setForm({...form,tariff:e.target.value})}/></div>
                <div><Label>Sun Hours/day</Label><Input type="number" step="0.1" value={form.sunHours} onChange={e=>setForm({...form,sunHours:e.target.value})}/></div>
              </div>
              <div><Label>Net Metering Policy</Label><Textarea value={form.netMetering} onChange={e=>setForm({...form,netMetering:e.target.value})}/></div>
              <Button onClick={save} className="bg-sky-500 hover:bg-sky-600">Save</Button>
            </div>
          )}
        </CardContent></Card>
      ))}
    </div>
  )
}

function AdminNotify({ users }) {
  const [form, setForm] = useState({ userId:'all', title:'', message:'' })
  const send = async () => {
    const r = await api('/admin/notify', { method:'POST', body: form })
    toast.success(`Sent to ${r.sent} users`); setForm({ userId:'all', title:'', message:'' })
  }
  return (
    <Card><CardHeader><CardTitle>Send Notification</CardTitle></CardHeader><CardContent className="space-y-3 max-w-lg">
      <div><Label>Recipient</Label>
        <Select value={form.userId} onValueChange={v=>setForm({...form,userId:v})}>
          <SelectTrigger><SelectValue/></SelectTrigger>
          <SelectContent><SelectItem value="all">All Customers</SelectItem>{users.filter(u=>u.role==='customer').map(u=><SelectItem key={u.id} value={u.id}>{u.email}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div><Label>Title</Label><Input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
      <div><Label>Message</Label><Textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></div>
      <Button onClick={send} disabled={!form.title||!form.message} className="bg-sky-500 hover:bg-sky-600"><Bell className="w-4 h-4 mr-2"/>Send</Button>
    </CardContent></Card>
  )
}

// ============= Root App =============
function App() {
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const stored = localStorage.getItem('user')
    if (token && stored) {
      api('/auth/me').then(r => setUser(r.user)).catch(() => { localStorage.clear() }).finally(() => setLoading(false))
    } else setLoading(false)
  }, [])

  const logout = () => { localStorage.clear(); setUser(null); toast.success('Logged out') }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50"><div className="animate-pulse"><Logo size={80}/></div></div>

  if (!user) return (
    <>
      <Landing onLogin={setAuthMode}/>
      {authMode && <AuthModal mode={authMode} onClose={()=>setAuthMode(null)} onAuthed={u=>{setUser(u);setAuthMode(null)}}/>}
    </>
  )

  return user.role === 'admin' ? <AdminDashboard user={user} onLogout={logout}/> : <CustomerDashboard user={user} onLogout={logout} setUser={setUser}/>
}

export default App
