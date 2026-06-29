// SolarSmart India - state/UT + districts data, panel tech, and core calculation engine

export const DEFAULT_STATE_DATA = [
  // ===== STATES (28) =====
  { state: 'Andhra Pradesh', isUT: false, tariff: 7.2, sunHours: 5.6, netMetering: 'APERC net metering up to 1 MW.',
    cities: ['Anantapur','Chittoor','East Godavari','Guntur','Krishna','Kurnool','Nellore','Prakasam','Srikakulam','Visakhapatnam','Vizianagaram','West Godavari','YSR Kadapa','Vijayawada','Tirupati','Rajahmundry','Kakinada'] },
  { state: 'Arunachal Pradesh', isUT: false, tariff: 6.0, sunHours: 4.8, netMetering: 'APEDA net metering applicable.',
    cities: ['Itanagar','Tawang','Bomdila','Ziro','Pasighat','Tezu','Roing','Aalo','Khonsa','Naharlagun'] },
  { state: 'Assam', isUT: false, tariff: 6.8, sunHours: 4.7, netMetering: 'APDCL net metering allowed.',
    cities: ['Guwahati','Dibrugarh','Jorhat','Silchar','Tezpur','Tinsukia','Nagaon','Bongaigaon','Sivasagar','Karimganj','Dhubri','Goalpara','Barpeta'] },
  { state: 'Bihar', isUT: false, tariff: 7.4, sunHours: 5.1, netMetering: 'BERC net metering applicable.',
    cities: ['Patna','Gaya','Bhagalpur','Muzaffarpur','Darbhanga','Purnia','Arrah','Begusarai','Katihar','Munger','Chhapra','Saharsa','Hajipur','Sasaram','Dehri','Bettiah','Motihari','Madhubani','Samastipur','Siwan'] },
  { state: 'Chhattisgarh', isUT: false, tariff: 6.5, sunHours: 5.5, netMetering: 'CSPDCL net metering applicable.',
    cities: ['Raipur','Bhilai','Bilaspur','Korba','Durg','Rajnandgaon','Jagdalpur','Raigarh','Ambikapur','Dhamtari','Mahasamund','Kanker','Kondagaon'] },
  { state: 'Goa', isUT: false, tariff: 4.2, sunHours: 5.4, netMetering: 'GED net metering allowed.',
    cities: ['Panaji','Margao','Vasco da Gama','Mapusa','Ponda','Bicholim','Curchorem','Sanquelim','Canacona','Quepem','Pernem'] },
  { state: 'Gujarat', isUT: false, tariff: 6.5, sunHours: 5.8, netMetering: 'Surya Gujarat scheme. Net metering up to 1 MW.',
    cities: ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Gandhinagar','Junagadh','Anand','Navsari','Morbi','Mehsana','Bharuch','Vapi','Porbandar','Patan','Valsad','Gandhidham','Kutch','Amreli','Dahod','Surendranagar'] },
  { state: 'Haryana', isUT: false, tariff: 7.6, sunHours: 5.3, netMetering: 'DHBVN/UHBVN net metering allowed.',
    cities: ['Gurugram','Faridabad','Panipat','Hisar','Rohtak','Karnal','Sonipat','Yamunanagar','Panchkula','Ambala','Bhiwani','Sirsa','Kaithal','Rewari','Jind','Kurukshetra','Palwal','Mahendragarh','Fatehabad','Jhajjar','Charkhi Dadri','Nuh'] },
  { state: 'Himachal Pradesh', isUT: false, tariff: 5.4, sunHours: 5.1, netMetering: 'HPSEBL net metering applicable.',
    cities: ['Shimla','Dharamshala','Mandi','Solan','Kullu','Manali','Kangra','Hamirpur','Una','Bilaspur','Chamba','Kinnaur','Sirmaur','Lahaul & Spiti','Nahan','Palampur'] },
  { state: 'Jharkhand', isUT: false, tariff: 6.9, sunHours: 5.0, netMetering: 'JBVNL net metering applicable.',
    cities: ['Ranchi','Jamshedpur','Dhanbad','Bokaro','Hazaribagh','Deoghar','Giridih','Ramgarh','Phusro','Medininagar','Chaibasa','Dumka','Sahebganj','Pakur','Godda'] },
  { state: 'Karnataka', isUT: false, tariff: 8.2, sunHours: 5.5, netMetering: 'Net metering up to 1 MW under KERC.',
    cities: ['Bengaluru','Mysuru','Hubballi','Mangaluru','Belagavi','Davangere','Ballari','Tumakuru','Shivamogga','Vijayapura','Raichur','Bidar','Hassan','Udupi','Chitradurga','Chikkamagaluru','Kolar','Kalaburagi','Dharwad','Gadag','Koppal','Bagalkot','Yadgir','Mandya','Chamarajanagar'] },
  { state: 'Kerala', isUT: false, tariff: 7.3, sunHours: 5.0, netMetering: 'KSEB Soura scheme + net metering.',
    cities: ['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kollam','Alappuzha','Palakkad','Malappuram','Kannur','Kasaragod','Pathanamthitta','Kottayam','Idukki','Ernakulam','Wayanad'] },
  { state: 'Madhya Pradesh', isUT: false, tariff: 6.8, sunHours: 5.7, netMetering: 'Net metering up to 500 kW.',
    cities: ['Bhopal','Indore','Gwalior','Jabalpur','Ujjain','Sagar','Dewas','Satna','Ratlam','Rewa','Murwara','Singrauli','Burhanpur','Khandwa','Bhind','Chhindwara','Vidisha','Damoh','Mandsaur','Khargone','Neemuch','Pithampur','Hoshangabad','Itarsi','Sehore','Morena','Betul','Shahdol','Sidhi','Datia'] },
  { state: 'Maharashtra', isUT: false, tariff: 9.5, sunHours: 5.2, netMetering: 'Allowed up to 1 MW. Gross/net metering as per MERC.',
    cities: ['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur','Amravati','Kolhapur','Sangli','Jalgaon','Akola','Latur','Dhule','Ahmednagar','Chandrapur','Parbhani','Ichalkaranji','Jalna','Bhusawal','Panvel','Satara','Beed','Yavatmal','Kamptee','Gondia','Barshi','Wardha','Nanded','Thane','Navi Mumbai','Pimpri-Chinchwad','Vasai-Virar'] },
  { state: 'Manipur', isUT: false, tariff: 6.5, sunHours: 4.7, netMetering: 'MSPDCL net metering applicable.',
    cities: ['Imphal','Thoubal','Bishnupur','Churachandpur','Senapati','Ukhrul','Tamenglong','Chandel','Jiribam','Kakching','Kangpokpi','Noney','Pherzawl','Tengnoupal'] },
  { state: 'Meghalaya', isUT: false, tariff: 6.4, sunHours: 4.5, netMetering: 'MeECL net metering applicable.',
    cities: ['Shillong','Tura','Jowai','Nongstoin','Williamnagar','Baghmara','Resubelpara','Mawkyrwat','Khliehriat','Nongpoh','Ampati'] },
  { state: 'Mizoram', isUT: false, tariff: 6.2, sunHours: 4.6, netMetering: 'Power & Electricity Dept net metering.',
    cities: ['Aizawl','Lunglei','Champhai','Serchhip','Kolasib','Lawngtlai','Saiha','Mamit','Khawzawl','Hnahthial','Saitual'] },
  { state: 'Nagaland', isUT: false, tariff: 6.3, sunHours: 4.6, netMetering: 'DoP Nagaland net metering.',
    cities: ['Kohima','Dimapur','Mokokchung','Tuensang','Wokha','Zunheboto','Phek','Mon','Kiphire','Longleng','Peren'] },
  { state: 'Odisha', isUT: false, tariff: 6.9, sunHours: 5.2, netMetering: 'OERC net metering applicable.',
    cities: ['Bhubaneswar','Cuttack','Rourkela','Berhampur','Sambalpur','Puri','Balasore','Bargarh','Bhadrak','Baripada','Jharsuguda','Jeypore','Angul','Dhenkanal','Kendrapara','Jagatsinghpur','Paradip','Rayagada','Koraput','Kalahandi'] },
  { state: 'Punjab', isUT: false, tariff: 7.4, sunHours: 5.4, netMetering: 'PSPCL net metering allowed.',
    cities: ['Ludhiana','Amritsar','Jalandhar','Patiala','Bathinda','Mohali','Hoshiarpur','Pathankot','Moga','Abohar','Malerkotla','Khanna','Phagwara','Muktsar','Barnala','Rajpura','Firozpur','Kapurthala','Sangrur','Gurdaspur','Mansa','Faridkot','Tarn Taran','Nawanshahr'] },
  { state: 'Rajasthan', isUT: false, tariff: 7.8, sunHours: 6.2, netMetering: 'Net metering allowed; highest solar potential in India.',
    cities: ['Jaipur','Jodhpur','Udaipur','Kota','Ajmer','Bikaner','Bharatpur','Alwar','Sikar','Pali','Tonk','Nagaur','Bhilwara','Sri Ganganagar','Jhunjhunu','Hanumangarh','Churu','Banswara','Dungarpur','Barmer','Jaisalmer','Jhalawar','Chittorgarh','Sawai Madhopur','Bundi','Karauli','Dholpur','Dausa','Pratapgarh','Rajsamand'] },
  { state: 'Sikkim', isUT: false, tariff: 5.5, sunHours: 4.4, netMetering: 'PSED net metering applicable.',
    cities: ['Gangtok','Namchi','Geyzing','Mangan','Pakyong','Soreng','Rangpo','Singtam','Jorethang','Ravangla'] },
  { state: 'Tamil Nadu', isUT: false, tariff: 7.5, sunHours: 5.6, netMetering: 'TANGEDCO net feed-in tariff applicable.',
    cities: ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Tiruppur','Vellore','Erode','Thoothukudi','Dindigul','Thanjavur','Ranipet','Sivakasi','Karur','Udhagamandalam','Hosur','Nagercoil','Kanchipuram','Kumbakonam','Karaikkudi','Neyveli','Cuddalore','Kumarapalayam','Tiruvannamalai','Pollachi','Rajapalayam','Gudiyatham','Pudukkottai','Vaniyambadi'] },
  { state: 'Telangana', isUT: false, tariff: 8.5, sunHours: 5.6, netMetering: 'TSSPDCL net metering applicable.',
    cities: ['Hyderabad','Warangal','Nizamabad','Karimnagar','Khammam','Ramagundam','Mahbubnagar','Nalgonda','Adilabad','Suryapet','Miryalaguda','Jagtial','Mancherial','Siddipet','Medak','Bhongir','Vikarabad','Sangareddy','Wanaparthy','Kothagudem','Mahbubabad','Nirmal','Asifabad','Bhupalpally'] },
  { state: 'Tripura', isUT: false, tariff: 6.0, sunHours: 4.8, netMetering: 'TSECL net metering applicable.',
    cities: ['Agartala','Udaipur','Dharmanagar','Kailashahar','Belonia','Khowai','Ambassa','Ranir Bazar','Sonamura','Sabroom','Amarpur','Teliamura'] },
  { state: 'Uttar Pradesh', isUT: false, tariff: 7.0, sunHours: 5.3, netMetering: 'UPNEDA net metering + ₹15,000/kW state subsidy (up to 2kW residential).',
    cities: ['Lucknow','Kanpur','Noida','Ghaziabad','Varanasi','Agra','Meerut','Allahabad/Prayagraj','Bareilly','Aligarh','Moradabad','Saharanpur','Gorakhpur','Faizabad/Ayodhya','Firozabad','Jhansi','Muzaffarnagar','Mathura','Rampur','Shahjahanpur','Farrukhabad','Hapur','Etawah','Mirzapur','Bulandshahr','Sambhal','Amroha','Hardoi','Fatehpur','Raebareli','Orai','Sitapur','Bahraich','Modinagar','Unnao','Jaunpur','Lakhimpur','Hathras','Banda','Pilibhit','Mughalsarai','Barabanki','Khurja','Gonda','Mainpuri','Lalitpur','Etah','Deoria','Ujhani','Ghazipur','Sultanpur','Azamgarh','Bijnor','Sahaswan','Basti','Chandausi','Akbarpur'] },
  { state: 'Uttarakhand', isUT: false, tariff: 6.5, sunHours: 5.0, netMetering: 'UPCL net metering applicable.',
    cities: ['Dehradun','Haridwar','Rishikesh','Roorkee','Haldwani','Rudrapur','Kashipur','Nainital','Almora','Pithoragarh','Mussoorie','Tehri','Pauri','Chamoli','Bageshwar','Champawat','Uttarkashi','Rudraprayag','Srinagar'] },
  { state: 'West Bengal', isUT: false, tariff: 8.8, sunHours: 4.8, netMetering: 'WBSEDCL net metering applicable.',
    cities: ['Kolkata','Howrah','Durgapur','Siliguri','Asansol','Bardhaman','Malda','Baharampur','Habra','Kharagpur','Shantipur','Dankuni','Dhulian','Ranaghat','Haldia','Raiganj','Krishnanagar','Nabadwip','Medinipur','Jalpaiguri','Balurghat','Basirhat','Bankura','Chakdaha','Darjeeling','Alipurduar','Purulia','Jangipur','Bolpur','Bangaon','Cooch Behar'] },

  // ===== UNION TERRITORIES (8) =====
  { state: 'Andaman & Nicobar Islands', isUT: true, tariff: 5.5, sunHours: 5.4, netMetering: 'A&N Electricity Dept net metering.',
    cities: ['Port Blair','Car Nicobar','Mayabunder','Diglipur','Rangat','Hut Bay','Campbell Bay','Havelock','Neil Island'] },
  { state: 'Chandigarh', isUT: true, tariff: 4.5, sunHours: 5.3, netMetering: 'CREST net metering + state incentives.',
    cities: ['Chandigarh','Manimajra','Mani Majra','Sector 17','Sector 22','Sector 35','Industrial Area'] },
  { state: 'Dadra & Nagar Haveli and Daman & Diu', isUT: true, tariff: 4.0, sunHours: 5.5, netMetering: 'DNH/DD Electricity net metering.',
    cities: ['Daman','Diu','Silvassa','Amli','Naroli','Khanvel','Dadra'] },
  { state: 'Delhi', isUT: true, tariff: 8.0, sunHours: 5.0, netMetering: 'Net metering up to 1 MW. CM Solar Power Scheme adds ₹2,000/kW state subsidy (up to 10kW).',
    cities: ['New Delhi','North Delhi','South Delhi','East Delhi','West Delhi','Central Delhi','North East Delhi','North West Delhi','South East Delhi','South West Delhi','Shahdara','Dwarka','Rohini','Saket','Karol Bagh','Lajpat Nagar','Connaught Place','Pitampura','Janakpuri','Vasant Kunj','Mayur Vihar','Preet Vihar','Nehru Place'] },
  { state: 'Jammu & Kashmir', isUT: true, tariff: 5.2, sunHours: 5.0, netMetering: 'JKPDD net metering applicable.',
    cities: ['Srinagar','Jammu','Anantnag','Baramulla','Kathua','Udhampur','Sopore','Pulwama','Kupwara','Budgam','Doda','Kishtwar','Ramban','Reasi','Rajouri','Poonch','Samba','Bandipora','Ganderbal','Shopian','Kulgam'] },
  { state: 'Ladakh', isUT: true, tariff: 4.5, sunHours: 6.5, netMetering: 'LREDA net metering. Highest sun hours in India.',
    cities: ['Leh','Kargil','Drass','Nubra','Zanskar','Khaltsi','Nyoma','Durbuk','Diskit','Padum'] },
  { state: 'Lakshadweep', isUT: true, tariff: 4.0, sunHours: 5.7, netMetering: 'Lakshadweep Electricity Dept net metering.',
    cities: ['Kavaratti','Agatti','Amini','Andrott','Bitra','Chetlat','Kadmat','Kalpeni','Kiltan','Minicoy'] },
  { state: 'Puducherry', isUT: true, tariff: 5.5, sunHours: 5.5, netMetering: 'PED net metering applicable.',
    cities: ['Puducherry','Karaikal','Mahe','Yanam','Villianur','Ozhukarai','Ariyankuppam'] },
]

// PM Surya Ghar Muft Bijli Yojana (Feb 2024) — Central subsidy slabs for residential
export function centralSubsidy(kw) {
  if (kw <= 0) return 0
  if (kw <= 1) return 30000
  if (kw <= 2) return 60000
  return 78000 // 3kW and above capped at ₹78,000
}

// Solar Panel Technologies easily available in Indian rooftop market
export const DEFAULT_PANEL_TECH = [
  {
    id: 'mono-perc', name: 'Monocrystalline PERC',
    efficiency: 20.5, costPerKw: 60000, lifespanYears: 25, degradationPerYear: 0.5,
    co2PerKwh: 0.82, spaceNeededSqftPerKw: 80, warrantyYears: 25,
    pros: ['Highest efficiency in mainstream market','Excellent low-light performance','Sleek black aesthetics','Best ₹/kWh over lifetime'],
    cons: ['Higher upfront cost','Slightly heat-sensitive'],
    brands: ['Waaree','Adani Solar','Tata Power Solar','Vikram Solar','Loom Solar'],
    summary: 'Most popular choice for Indian rooftops — best balance of efficiency, durability and cost.'
  },
  {
    id: 'poly', name: 'Polycrystalline',
    efficiency: 16.5, costPerKw: 48000, lifespanYears: 25, degradationPerYear: 0.7,
    co2PerKwh: 0.82, spaceNeededSqftPerKw: 100, warrantyYears: 25,
    pros: ['Lowest upfront cost','Widely available','Proven technology'],
    cons: ['Lower efficiency — needs more roof area','Bluish look','Higher degradation than mono'],
    brands: ['Waaree','Vikram Solar','RenewSys','Goldi Solar'],
    summary: 'Budget option — fine if you have ample roof space and want lowest initial investment.'
  },
  {
    id: 'bifacial', name: 'Bifacial Monocrystalline',
    efficiency: 21.5, costPerKw: 70000, lifespanYears: 30, degradationPerYear: 0.45,
    co2PerKwh: 0.82, spaceNeededSqftPerKw: 75, warrantyYears: 30,
    pros: ['Generates from both sides (5-15% extra yield)','30-year warranty available','Lower degradation'],
    cons: ['Higher cost','Needs elevated/reflective mounting to extract benefit'],
    brands: ['Adani Solar','Waaree','Tata Power Solar','Vikram Solar'],
    summary: 'Premium choice — extra yield from rear-side, ideal if roof allows elevated mounting.'
  },
  {
    id: 'topcon', name: 'TOPCon N-Type',
    efficiency: 22.5, costPerKw: 75000, lifespanYears: 30, degradationPerYear: 0.4,
    co2PerKwh: 0.82, spaceNeededSqftPerKw: 72, warrantyYears: 30,
    pros: ['Highest efficiency available in India','Lowest degradation (~0.4%/yr)','Better high-temperature performance','30-year power warranty'],
    cons: ['Most expensive option','Newer — limited installer experience'],
    brands: ['Waaree','Adani Solar','Premier Energies','Vikram Solar'],
    summary: 'Cutting-edge N-type — best long-term ROI if budget allows. Becoming mainstream in 2024-25.'
  },
]

// Core calculation engine
export function calculateAssessment(input, stateData, panels) {
  const { state, monthlyConsumption, roofArea, propertyType, panelTechId, budget } = input

  const sd = stateData.find(s => s.state === state) || stateData[0]
  const tariff = sd.tariff
  const sunHours = sd.sunHours

  // Default selected panel for sizing
  const selectedPanel = panels.find(p => p.id === panelTechId) || panels.find(p => p.id === 'mono-perc') || panels[0]
  const maxByRoofSelected = roofArea / selectedPanel.spaceNeededSqftPerKw

  const dailyUnits = monthlyConsumption / 30
  const requiredKw = dailyUnits / (sunHours * 0.75)

  let recommendedKw = Math.min(requiredKw * 1.1, maxByRoofSelected)
  if (propertyType === 'residential') recommendedKw = Math.min(recommendedKw, 10)
  recommendedKw = Math.max(1, Math.round(recommendedKw * 10) / 10)

  // Per-panel analysis (each panel computes its own max feasible kW based on its footprint)
  const analyses = panels.map(p => {
    const maxFeasibleKw = Math.round((roofArea / p.spaceNeededSqftPerKw) * 10) / 10
    const installCost = recommendedKw * p.costPerKw
    const subsidy = propertyType === 'residential' ? centralSubsidy(recommendedKw) : 0
    const netCost = installCost - subsidy
    const annualGen = recommendedKw * sunHours * 365 * 0.75
    const annualSavings = annualGen * tariff
    const payback = annualSavings > 0 ? netCost / annualSavings : 99
    let lifetimeSavings = 0
    for (let y = 1; y <= p.lifespanYears; y++) {
      const yearGen = annualGen * Math.pow(1 - p.degradationPerYear/100, y-1)
      lifetimeSavings += yearGen * tariff * Math.pow(1.05, y-1)
    }
    const roi = ((lifetimeSavings - netCost) / netCost) * 100
    const co2Saved = annualGen * p.co2PerKwh / 1000
    const treesEquivalent = Math.round(co2Saved * 50)
    const roofAreaNeeded = recommendedKw * p.spaceNeededSqftPerKw
    // Number of panels (~400W each)
    const panelCount = Math.ceil(recommendedKw * 1000 / 400)
    return {
      panelId: p.id, panelName: p.name,
      maxFeasibleKw,
      installCost: Math.round(installCost),
      subsidy: Math.round(subsidy),
      netCost: Math.round(netCost),
      annualGen: Math.round(annualGen),
      annualSavings: Math.round(annualSavings),
      payback: Math.round(payback * 10) / 10,
      lifetimeSavings: Math.round(lifetimeSavings),
      roi: Math.round(roi),
      co2SavedTonnes: Math.round(co2Saved * 10) / 10,
      treesEquivalent,
      roofAreaNeeded: Math.round(roofAreaNeeded),
      panelCount,
      efficiency: p.efficiency,
      lifespanYears: p.lifespanYears,
      degradationPerYear: p.degradationPerYear,
      warrantyYears: p.warrantyYears,
      spaceNeededSqftPerKw: p.spaceNeededSqftPerKw,
      summary: p.summary,
      pros: p.pros, cons: p.cons, brands: p.brands
    }
  })

  let recommended = analyses.find(a => a.panelId === selectedPanel.id)
  if (!panelTechId) {
    const fits = analyses.filter(a => a.roofAreaNeeded <= roofArea && (!budget || a.netCost <= budget))
    recommended = (fits.length ? fits : analyses).sort((a,b) => b.lifetimeSavings - a.lifetimeSavings)[0]
  }

  return {
    inputs: input,
    stateInfo: { state: sd.state, isUT: sd.isUT, tariff: sd.tariff, sunHours: sd.sunHours, netMetering: sd.netMetering },
    maxFeasibleKw: Math.round(maxByRoofSelected * 10) / 10,
    recommendedKw,
    recommendedPanel: recommended,
    analyses,
    centralSubsidyApplied: recommended?.subsidy || 0,
    tariffUsed: tariff,
    sunHoursUsed: sunHours,
    netMeteringPolicy: sd.netMetering,
  }
}
