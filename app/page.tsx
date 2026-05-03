'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Globe2, Search, Pin, PinOff, Sun, Moon, Coffee, Clock, Users, Copy, Check, ChevronDown, X, RotateCcw } from 'lucide-react'

interface Zone {
  id: string; code: string; name: string; timezone: string; continent: Continent; city: string
}
type Continent = 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Pacific'

const ZONES: Zone[] = [
  { id:'Asia/Kolkata',         code:'IN', name:'India',              city:'New Delhi',     timezone:'Asia/Kolkata',          continent:'Asia' },
  { id:'Asia/Shanghai',        code:'CN', name:'China',              city:'Beijing',       timezone:'Asia/Shanghai',         continent:'Asia' },
  { id:'Asia/Tokyo',           code:'JP', name:'Japan',              city:'Tokyo',         timezone:'Asia/Tokyo',            continent:'Asia' },
  { id:'Asia/Seoul',           code:'KR', name:'South Korea',        city:'Seoul',         timezone:'Asia/Seoul',            continent:'Asia' },
  { id:'Asia/Singapore',       code:'SG', name:'Singapore',          city:'Singapore',     timezone:'Asia/Singapore',        continent:'Asia' },
  { id:'Asia/Bangkok',         code:'TH', name:'Thailand',           city:'Bangkok',       timezone:'Asia/Bangkok',          continent:'Asia' },
  { id:'Asia/Ho_Chi_Minh',     code:'VN', name:'Vietnam',            city:'Ho Chi Minh',   timezone:'Asia/Ho_Chi_Minh',      continent:'Asia' },
  { id:'Asia/Jakarta',         code:'ID', name:'Indonesia',          city:'Jakarta',       timezone:'Asia/Jakarta',          continent:'Asia' },
  { id:'Asia/Kuala_Lumpur',    code:'MY', name:'Malaysia',           city:'Kuala Lumpur',  timezone:'Asia/Kuala_Lumpur',     continent:'Asia' },
  { id:'Asia/Manila',          code:'PH', name:'Philippines',        city:'Manila',        timezone:'Asia/Manila',           continent:'Asia' },
  { id:'Asia/Karachi',         code:'PK', name:'Pakistan',           city:'Karachi',       timezone:'Asia/Karachi',          continent:'Asia' },
  { id:'Asia/Dhaka',           code:'BD', name:'Bangladesh',         city:'Dhaka',         timezone:'Asia/Dhaka',            continent:'Asia' },
  { id:'Asia/Colombo',         code:'LK', name:'Sri Lanka',          city:'Colombo',       timezone:'Asia/Colombo',          continent:'Asia' },
  { id:'Asia/Kathmandu',       code:'NP', name:'Nepal',              city:'Kathmandu',     timezone:'Asia/Kathmandu',        continent:'Asia' },
  { id:'Asia/Rangoon',         code:'MM', name:'Myanmar',            city:'Naypyidaw',     timezone:'Asia/Rangoon',          continent:'Asia' },
  { id:'Asia/Taipei',          code:'TW', name:'Taiwan',             city:'Taipei',        timezone:'Asia/Taipei',           continent:'Asia' },
  { id:'Asia/Hong_Kong',       code:'HK', name:'Hong Kong',          city:'Hong Kong',     timezone:'Asia/Hong_Kong',        continent:'Asia' },
  { id:'Asia/Ulaanbaatar',     code:'MN', name:'Mongolia',           city:'Ulaanbaatar',   timezone:'Asia/Ulaanbaatar',      continent:'Asia' },
  { id:'Asia/Almaty',          code:'KZ', name:'Kazakhstan',         city:'Almaty',        timezone:'Asia/Almaty',           continent:'Asia' },
  { id:'Asia/Tashkent',        code:'UZ', name:'Uzbekistan',         city:'Tashkent',      timezone:'Asia/Tashkent',         continent:'Asia' },
  { id:'Asia/Kabul',           code:'AF', name:'Afghanistan',        city:'Kabul',         timezone:'Asia/Kabul',            continent:'Asia' },
  { id:'Asia/Tehran',          code:'IR', name:'Iran',               city:'Tehran',        timezone:'Asia/Tehran',           continent:'Asia' },
  { id:'Asia/Baghdad',         code:'IQ', name:'Iraq',               city:'Baghdad',       timezone:'Asia/Baghdad',          continent:'Asia' },
  { id:'Asia/Riyadh',          code:'SA', name:'Saudi Arabia',       city:'Riyadh',        timezone:'Asia/Riyadh',           continent:'Asia' },
  { id:'Asia/Dubai',           code:'AE', name:'UAE',                city:'Dubai',         timezone:'Asia/Dubai',            continent:'Asia' },
  { id:'Asia/Qatar',           code:'QA', name:'Qatar',              city:'Doha',          timezone:'Asia/Qatar',            continent:'Asia' },
  { id:'Asia/Kuwait',          code:'KW', name:'Kuwait',             city:'Kuwait City',   timezone:'Asia/Kuwait',           continent:'Asia' },
  { id:'Asia/Muscat',          code:'OM', name:'Oman',               city:'Muscat',        timezone:'Asia/Muscat',           continent:'Asia' },
  { id:'Asia/Amman',           code:'JO', name:'Jordan',             city:'Amman',         timezone:'Asia/Amman',            continent:'Asia' },
  { id:'Asia/Jerusalem',       code:'IL', name:'Israel',             city:'Jerusalem',     timezone:'Asia/Jerusalem',        continent:'Asia' },
  { id:'Asia/Beirut',          code:'LB', name:'Lebanon',            city:'Beirut',        timezone:'Asia/Beirut',           continent:'Asia' },
  { id:'Europe/Istanbul',      code:'TR', name:'Turkey',             city:'Istanbul',      timezone:'Europe/Istanbul',       continent:'Asia' },
  { id:'Asia/Baku',            code:'AZ', name:'Azerbaijan',         city:'Baku',          timezone:'Asia/Baku',             continent:'Asia' },
  { id:'Asia/Tbilisi',         code:'GE', name:'Georgia',            city:'Tbilisi',       timezone:'Asia/Tbilisi',          continent:'Asia' },
  { id:'Asia/Yerevan',         code:'AM', name:'Armenia',            city:'Yerevan',       timezone:'Asia/Yerevan',          continent:'Asia' },
  { id:'Asia/Nicosia',         code:'CY', name:'Cyprus',             city:'Nicosia',       timezone:'Asia/Nicosia',          continent:'Asia' },
  { id:'Europe/London',        code:'GB', name:'United Kingdom',     city:'London',        timezone:'Europe/London',         continent:'Europe' },
  { id:'Europe/Paris',         code:'FR', name:'France',             city:'Paris',         timezone:'Europe/Paris',          continent:'Europe' },
  { id:'Europe/Berlin',        code:'DE', name:'Germany',            city:'Berlin',        timezone:'Europe/Berlin',         continent:'Europe' },
  { id:'Europe/Rome',          code:'IT', name:'Italy',              city:'Rome',          timezone:'Europe/Rome',           continent:'Europe' },
  { id:'Europe/Madrid',        code:'ES', name:'Spain',              city:'Madrid',        timezone:'Europe/Madrid',         continent:'Europe' },
  { id:'Europe/Lisbon',        code:'PT', name:'Portugal',           city:'Lisbon',        timezone:'Europe/Lisbon',         continent:'Europe' },
  { id:'Europe/Amsterdam',     code:'NL', name:'Netherlands',        city:'Amsterdam',     timezone:'Europe/Amsterdam',      continent:'Europe' },
  { id:'Europe/Brussels',      code:'BE', name:'Belgium',            city:'Brussels',      timezone:'Europe/Brussels',       continent:'Europe' },
  { id:'Europe/Zurich',        code:'CH', name:'Switzerland',        city:'Zurich',        timezone:'Europe/Zurich',         continent:'Europe' },
  { id:'Europe/Vienna',        code:'AT', name:'Austria',            city:'Vienna',        timezone:'Europe/Vienna',         continent:'Europe' },
  { id:'Europe/Warsaw',        code:'PL', name:'Poland',             city:'Warsaw',        timezone:'Europe/Warsaw',         continent:'Europe' },
  { id:'Europe/Stockholm',     code:'SE', name:'Sweden',             city:'Stockholm',     timezone:'Europe/Stockholm',      continent:'Europe' },
  { id:'Europe/Oslo',          code:'NO', name:'Norway',             city:'Oslo',          timezone:'Europe/Oslo',           continent:'Europe' },
  { id:'Europe/Copenhagen',    code:'DK', name:'Denmark',            city:'Copenhagen',    timezone:'Europe/Copenhagen',     continent:'Europe' },
  { id:'Europe/Helsinki',      code:'FI', name:'Finland',            city:'Helsinki',      timezone:'Europe/Helsinki',       continent:'Europe' },
  { id:'Europe/Prague',        code:'CZ', name:'Czech Republic',     city:'Prague',        timezone:'Europe/Prague',         continent:'Europe' },
  { id:'Europe/Budapest',      code:'HU', name:'Hungary',            city:'Budapest',      timezone:'Europe/Budapest',       continent:'Europe' },
  { id:'Europe/Bucharest',     code:'RO', name:'Romania',            city:'Bucharest',     timezone:'Europe/Bucharest',      continent:'Europe' },
  { id:'Europe/Sofia',         code:'BG', name:'Bulgaria',           city:'Sofia',         timezone:'Europe/Sofia',          continent:'Europe' },
  { id:'Europe/Athens',        code:'GR', name:'Greece',             city:'Athens',        timezone:'Europe/Athens',         continent:'Europe' },
  { id:'Europe/Kiev',          code:'UA', name:'Ukraine',            city:'Kyiv',          timezone:'Europe/Kiev',           continent:'Europe' },
  { id:'Europe/Moscow',        code:'RU', name:'Russia (Moscow)',    city:'Moscow',        timezone:'Europe/Moscow',         continent:'Europe' },
  { id:'Atlantic/Reykjavik',   code:'IS', name:'Iceland',            city:'Reykjavik',     timezone:'Atlantic/Reykjavik',    continent:'Europe' },
  { id:'Europe/Dublin',        code:'IE', name:'Ireland',            city:'Dublin',        timezone:'Europe/Dublin',         continent:'Europe' },
  { id:'Europe/Tallinn',       code:'EE', name:'Estonia',            city:'Tallinn',       timezone:'Europe/Tallinn',        continent:'Europe' },
  { id:'America/New_York',     code:'US', name:'USA (New York)',     city:'New York',      timezone:'America/New_York',      continent:'Americas' },
  { id:'America/Chicago',      code:'US', name:'USA (Chicago)',      city:'Chicago',       timezone:'America/Chicago',       continent:'Americas' },
  { id:'America/Denver',       code:'US', name:'USA (Denver)',       city:'Denver',        timezone:'America/Denver',        continent:'Americas' },
  { id:'America/Los_Angeles',  code:'US', name:'USA (Los Angeles)',  city:'Los Angeles',   timezone:'America/Los_Angeles',   continent:'Americas' },
  { id:'Pacific/Honolulu',     code:'US', name:'USA (Honolulu)',     city:'Honolulu',      timezone:'Pacific/Honolulu',      continent:'Americas' },
  { id:'America/Toronto',      code:'CA', name:'Canada (Toronto)',   city:'Toronto',       timezone:'America/Toronto',       continent:'Americas' },
  { id:'America/Vancouver',    code:'CA', name:'Canada (Vancouver)', city:'Vancouver',     timezone:'America/Vancouver',     continent:'Americas' },
  { id:'America/Mexico_City',  code:'MX', name:'Mexico',             city:'Mexico City',   timezone:'America/Mexico_City',   continent:'Americas' },
  { id:'America/Sao_Paulo',    code:'BR', name:'Brazil',             city:'São Paulo',     timezone:'America/Sao_Paulo',     continent:'Americas' },
  { id:'America/Argentina/Buenos_Aires', code:'AR', name:'Argentina', city:'Buenos Aires', timezone:'America/Argentina/Buenos_Aires', continent:'Americas' },
  { id:'America/Santiago',     code:'CL', name:'Chile',              city:'Santiago',      timezone:'America/Santiago',      continent:'Americas' },
  { id:'America/Bogota',       code:'CO', name:'Colombia',           city:'Bogotá',        timezone:'America/Bogota',        continent:'Americas' },
  { id:'America/Lima',         code:'PE', name:'Peru',               city:'Lima',          timezone:'America/Lima',          continent:'Americas' },
  { id:'America/Caracas',      code:'VE', name:'Venezuela',          city:'Caracas',       timezone:'America/Caracas',       continent:'Americas' },
  { id:'Africa/Johannesburg',  code:'ZA', name:'South Africa',       city:'Johannesburg',  timezone:'Africa/Johannesburg',   continent:'Africa' },
  { id:'Africa/Cairo',         code:'EG', name:'Egypt',              city:'Cairo',         timezone:'Africa/Cairo',          continent:'Africa' },
  { id:'Africa/Lagos',         code:'NG', name:'Nigeria',            city:'Lagos',         timezone:'Africa/Lagos',          continent:'Africa' },
  { id:'Africa/Nairobi',       code:'KE', name:'Kenya',              city:'Nairobi',       timezone:'Africa/Nairobi',        continent:'Africa' },
  { id:'Africa/Addis_Ababa',   code:'ET', name:'Ethiopia',           city:'Addis Ababa',   timezone:'Africa/Addis_Ababa',    continent:'Africa' },
  { id:'Africa/Accra',         code:'GH', name:'Ghana',              city:'Accra',         timezone:'Africa/Accra',          continent:'Africa' },
  { id:'Africa/Casablanca',    code:'MA', name:'Morocco',            city:'Casablanca',    timezone:'Africa/Casablanca',     continent:'Africa' },
  { id:'Africa/Dar_es_Salaam', code:'TZ', name:'Tanzania',           city:'Dar es Salaam', timezone:'Africa/Dar_es_Salaam',  continent:'Africa' },
  { id:'Australia/Sydney',     code:'AU', name:'Australia (Sydney)',    city:'Sydney',     timezone:'Australia/Sydney',      continent:'Pacific' },
  { id:'Australia/Melbourne',  code:'AU', name:'Australia (Melbourne)', city:'Melbourne',  timezone:'Australia/Melbourne',   continent:'Pacific' },
  { id:'Australia/Perth',      code:'AU', name:'Australia (Perth)',     city:'Perth',      timezone:'Australia/Perth',       continent:'Pacific' },
  { id:'Australia/Brisbane',   code:'AU', name:'Australia (Brisbane)',  city:'Brisbane',   timezone:'Australia/Brisbane',    continent:'Pacific' },
  { id:'Pacific/Auckland',     code:'NZ', name:'New Zealand',           city:'Auckland',   timezone:'Pacific/Auckland',      continent:'Pacific' },
  { id:'Pacific/Fiji',         code:'FJ', name:'Fiji',                  city:'Suva',       timezone:'Pacific/Fiji',          continent:'Pacific' },
]

const DEFAULT_PLANNER = ['Asia/Kolkata', 'Europe/London', 'America/New_York']

function flag(code: string) {
  return code.toUpperCase().split('').map(c => String.fromCodePoint(c.charCodeAt(0) - 65 + 0x1F1E6)).join('')
}
function getTime(tz: string, now: Date, h12: boolean) {
  return now.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: h12 })
}
function getHHMM(tz: string, now: Date, h12: boolean) {
  return now.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: h12 })
}
function getDateStr(tz: string, now: Date) {
  return now.toLocaleDateString('en-IN', { timeZone: tz, weekday: 'short', day: 'numeric', month: 'short' })
}
function getLocalHour(tz: string, now: Date): number {
  return parseInt(now.toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false }), 10)
}
function getLocalDate(tz: string, now: Date): string {
  return now.toLocaleDateString('en-CA', { timeZone: tz })
}
function getOffsetMinutes(tz: string, now: Date): number {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
  const parts = fmt.formatToParts(now)
  const get = (t: string) => parseInt(parts.find(p => p.type === t)?.value ?? '0', 10)
  const local = new Date(get('year'), get('month') - 1, get('day'), get('hour') === 24 ? 0 : get('hour'), get('minute'), get('second'))
  return Math.round((local.getTime() - now.getTime()) / 60000)
}
function formatOffset(diffMins: number): string {
  if (diffMins === 0) return 'Same time'
  const abs = Math.abs(diffMins)
  const h = Math.floor(abs / 60); const m = abs % 60
  const sign = diffMins > 0 ? '+' : '−'
  return `${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : 'h'}`
}
type DayPeriod = 'morning' | 'day' | 'evening' | 'night'
function getDayPeriod(hour: number): DayPeriod {
  if (hour >= 6 && hour < 9)  return 'morning'
  if (hour >= 9 && hour < 18) return 'day'
  if (hour >= 18 && hour < 21) return 'evening'
  return 'night'
}
const PERIOD_STYLES: Record<DayPeriod, { bg: string; icon: React.ElementType; iconColor: string }> = {
  morning: { bg: 'bg-amber-500/5 border-amber-500/15',  icon: Coffee, iconColor: 'text-amber-400' },
  day:     { bg: 'bg-sky-500/5 border-sky-500/15',       icon: Sun,    iconColor: 'text-yellow-400' },
  evening: { bg: 'bg-orange-500/5 border-orange-500/15', icon: Sun,    iconColor: 'text-orange-400' },
  night:   { bg: 'bg-indigo-500/5 border-indigo-500/15', icon: Moon,   iconColor: 'text-indigo-300' },
}
const CONTINENTS: (Continent | 'All')[] = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Pacific']
type PageTab = 'clock' | 'planner'

export default function WorldClockPage() {
  const [now, setNow]                   = useState<Date | null>(null)
  const [h12, setH12]                   = useState(false)
  const [query, setQuery]               = useState('')
  const [continent, setContinent]       = useState<Continent | 'All'>('All')
  const [pinned, setPinned]             = useState<string[]>([])
  const [tab, setTab]                   = useState<PageTab>('clock')
  const [refTz, setRefTz]               = useState('Asia/Kolkata')
  const [refOpen, setRefOpen]           = useState(false)
  const [refQuery, setRefQuery]         = useState('')
  const [plannerZones, setPlannerZones] = useState<string[]>(DEFAULT_PLANNER)
  const [copied, setCopied]             = useState<string | null>(null)
  const refRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try { const p = JSON.parse(localStorage.getItem('hz-worldclock-pins') ?? '[]'); setPinned(p) } catch {}
    try {
      const prefs = JSON.parse(localStorage.getItem('hz-worldclock-prefs') ?? '{}')
      if (prefs.refTz) setRefTz(prefs.refTz)
      if (prefs.h12 !== undefined) setH12(prefs.h12)
      if (prefs.plannerZones) setPlannerZones(prefs.plannerZones)
    } catch {}
  }, [])

  useEffect(() => {
    if (pinned.length) localStorage.setItem('hz-worldclock-pins', JSON.stringify(pinned))
  }, [pinned])

  useEffect(() => {
    localStorage.setItem('hz-worldclock-prefs', JSON.stringify({ refTz, h12, plannerZones }))
  }, [refTz, h12, plannerZones])

  useEffect(() => {
    function h(e: MouseEvent) {
      if (refRef.current && !refRef.current.contains(e.target as Node)) setRefOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  function resetAll() {
    localStorage.removeItem('hz-worldclock-pins')
    localStorage.removeItem('hz-worldclock-prefs')
    setPinned([])
    setPlannerZones(DEFAULT_PLANNER)
    setRefTz('Asia/Kolkata')
    setH12(false)
    setTab('clock')
    setQuery('')
    setContinent('All')
  }

  const togglePin = useCallback((id: string) => {
    setPinned(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  }, [])

  const addToPlanner = useCallback((id: string) => {
    setPlannerZones(p => p.includes(id) ? p : [...p, id])
  }, [])

  function copyTime(tz: string) {
    if (!now) return
    navigator.clipboard.writeText(getHHMM(tz, now, h12))
    setCopied(tz)
    setTimeout(() => setCopied(null), 1500)
  }

  if (!now) return (
    <div className="flex items-center justify-center h-screen gap-2 text-white/30 text-sm">
      <Clock size={14} className="animate-pulse" /> Loading…
    </div>
  )

  const refOffset = getOffsetMinutes(refTz, now)
  const refZone   = ZONES.find(z => z.id === refTz) ?? ZONES[0]
  const pinnedZones = ZONES.filter(z => pinned.includes(z.id))
  const refFilteredZones = ZONES.filter(z =>
    !refQuery || z.name.toLowerCase().includes(refQuery.toLowerCase()) || z.city.toLowerCase().includes(refQuery.toLowerCase())
  ).slice(0, 12)

  const filtered = ZONES.filter(z => {
    if (continent !== 'All' && z.continent !== continent) return false
    if (!query) return true
    const q = query.toLowerCase()
    return z.name.toLowerCase().includes(q) || z.city.toLowerCase().includes(q) || z.timezone.toLowerCase().includes(q)
  })

  return (
    <div className="min-h-screen bg-[#080808]">

      {/* ── App Header ─────────────────────────────────────────────────────────── */}
      <header className="h-12 border-b border-white/[0.06] flex items-center px-5 gap-3 bg-[#0a0a0a] sticky top-0 z-40">
        <div className="w-6 h-6 rounded-lg bg-sky-500/15 border border-sky-500/20 flex items-center justify-center">
          <Globe2 size={12} className="text-sky-400" />
        </div>
        <span className="text-white text-sm font-semibold">World Clock</span>
        <span className="text-white/20 text-[10px] font-mono">clock.harshz.com</span>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={resetAll} title="Reset all — clears pins and preferences"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-white/30 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 text-[10px] transition-all">
            <RotateCcw size={9} /> Reset
          </button>
          <a href="https://harshz.com" target="_blank" rel="noreferrer"
            className="text-white/20 hover:text-white/50 text-[10px] transition-colors">
            harshz.com →
          </a>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-white text-xl font-semibold">World Clock</h1>
            <p className="text-white/35 text-sm">Live time across {ZONES.length} cities</p>
          </div>
          {/* Reference picker */}
          <div ref={refRef} className="relative">
            <button onClick={() => setRefOpen(o => !o)}
              className="flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-xl px-3 py-2 text-sm transition-all">
              <span className="text-lg leading-none">{flag(refZone.code)}</span>
              <div className="text-left">
                <p className="text-white text-xs font-medium leading-tight">{refZone.name}</p>
                <p className="text-white/40 text-[10px]">{getHHMM(refTz, now, h12)} · Reference</p>
              </div>
              <ChevronDown size={12} className="text-white/30 ml-1" />
            </button>
            {refOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                <div className="p-2 border-b border-white/[0.07]">
                  <input autoFocus value={refQuery} onChange={e => setRefQuery(e.target.value)}
                    placeholder="Search reference city…"
                    className="w-full bg-white/5 rounded-lg px-2.5 py-1.5 text-white text-xs placeholder:text-white/25 focus:outline-none" />
                </div>
                <div className="max-h-56 overflow-y-auto">
                  {refFilteredZones.map(z => (
                    <button key={z.id} onClick={() => { setRefTz(z.id); setRefOpen(false); setRefQuery('') }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/[0.06] transition-colors text-left ${refTz === z.id ? 'bg-white/[0.05]' : ''}`}>
                      <span className="text-base">{flag(z.code)}</span>
                      <div>
                        <p className="text-white text-xs">{z.name}</p>
                        <p className="text-white/30 text-[10px]">{z.city}</p>
                      </div>
                      {refTz === z.id && <span className="ml-auto text-sky-400 text-[10px]">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reference bar */}
        <div className="border border-sky-500/20 bg-sky-500/[0.04] rounded-2xl px-5 py-3 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none">{flag(refZone.code)}</span>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">Reference · {refZone.city}</p>
              <p className="text-white text-2xl font-bold font-mono tracking-tight leading-none mt-0.5">{getTime(refTz, now, h12)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <div>
              <p className="text-white/60 text-sm font-medium">{getDateStr(refTz, now)}</p>
              <p className="text-white/25 text-[10px]">{refZone.timezone}</p>
            </div>
            <button onClick={() => setH12(v => !v)}
              className="ml-4 text-[10px] bg-white/5 border border-white/10 hover:border-white/20 px-2.5 py-1.5 rounded-lg text-white/40 hover:text-white/70 transition-all font-mono">
              {h12 ? '12h' : '24h'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl mb-5">
          <button onClick={() => setTab('clock')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded-lg transition-all ${tab === 'clock' ? 'bg-white text-gray-900' : 'text-white/40 hover:text-white/70'}`}>
            <Globe2 size={11} /> World Clock
          </button>
          <button onClick={() => setTab('planner')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded-lg transition-all ${tab === 'planner' ? 'bg-white text-gray-900' : 'text-white/40 hover:text-white/70'}`}>
            <Users size={11} /> Meeting Planner
            {plannerZones.length > 0 && <span className="bg-sky-500/20 text-sky-400 text-[9px] px-1 rounded">{plannerZones.length}</span>}
          </button>
        </div>

        {tab === 'clock' && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2">
                <Search size={12} className="text-white/25 flex-shrink-0" />
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search country or city…"
                  className="flex-1 bg-transparent text-white text-xs placeholder:text-white/20 focus:outline-none" />
                {query && <button onClick={() => setQuery('')}><X size={11} className="text-white/25 hover:text-white/50" /></button>}
              </div>
              <div className="flex gap-1">
                {CONTINENTS.map(c => (
                  <button key={c} onClick={() => setContinent(c)}
                    className={`px-2.5 py-2 rounded-lg text-[10px] font-medium transition-all ${continent === c ? 'bg-white text-gray-900' : 'bg-white/[0.03] border border-white/[0.07] text-white/35 hover:text-white/60'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {pinnedZones.length > 0 && continent === 'All' && !query && (
              <div className="mb-5">
                <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2 px-1 flex items-center gap-1.5">
                  <Pin size={9} /> Pinned
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {pinnedZones.map(z => (
                    <ClockCard key={z.id} zone={z} now={now} refOffset={refOffset}
                      refDate={getLocalDate(refTz, now)} h12={h12} pinned={true}
                      onPin={togglePin} onCopy={copyTime} copied={copied} onAddToPlanner={addToPlanner} />
                  ))}
                </div>
                <div className="border-t border-white/[0.06] mt-4 mb-4" />
              </div>
            )}

            {filtered.length === 0
              ? <div className="text-center py-12 text-white/25 text-sm">No results for "{query}"</div>
              : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {filtered.map(z => (
                    <ClockCard key={z.id} zone={z} now={now} refOffset={refOffset}
                      refDate={getLocalDate(refTz, now)} h12={h12} pinned={pinned.includes(z.id)}
                      onPin={togglePin} onCopy={copyTime} copied={copied} onAddToPlanner={addToPlanner} />
                  ))}
                </div>
              )
            }
          </>
        )}

        {tab === 'planner' && (
          <MeetingPlanner zones={plannerZones}
            onRemove={id => setPlannerZones(p => p.filter(x => x !== id))}
            onAdd={id => { if (!plannerZones.includes(id)) setPlannerZones(p => [...p, id]) }}
            refTz={refTz} now={now} h12={h12} />
        )}
      </div>
    </div>
  )
}

function ClockCard({ zone, now, refOffset, refDate, h12, pinned, onPin, onCopy, copied, onAddToPlanner }: {
  zone: Zone; now: Date; refOffset: number; refDate: string; h12: boolean
  pinned: boolean; onPin: (id: string) => void; onCopy: (id: string) => void
  copied: string | null; onAddToPlanner: (id: string) => void
}) {
  const hour = getLocalHour(zone.timezone, now)
  const period = getDayPeriod(hour)
  const { bg, icon: PeriodIcon, iconColor } = PERIOD_STYLES[period]
  const localDate = getLocalDate(zone.timezone, now)
  const dateDiff = Math.round((new Date(localDate).getTime() - new Date(refDate).getTime()) / 86400000)
  const offset = getOffsetMinutes(zone.timezone, now)
  const diffFromRef = offset - refOffset
  const offsetStr = formatOffset(diffFromRef)
  const isSame = diffFromRef === 0
  const timeStr = getTime(zone.timezone, now, h12)
  const ssStr = timeStr.split(':')[2]?.replace(/\s?(AM|PM)/, '') ?? ''
  const ampm = h12 ? (timeStr.includes('AM') ? 'AM' : 'PM') : ''

  return (
    <div className={`group relative border rounded-2xl p-3.5 transition-all hover:scale-[1.01] ${bg}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl leading-none">{flag(zone.code)}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onCopy(zone.id)} title="Copy time"
            className="w-5 h-5 flex items-center justify-center text-white/30 hover:text-white/70 rounded">
            {copied === zone.id ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
          </button>
          <button onClick={() => onAddToPlanner(zone.id)} title="Add to planner"
            className="w-5 h-5 flex items-center justify-center text-white/30 hover:text-white/70 rounded">
            <Users size={10} />
          </button>
          <button onClick={() => onPin(zone.id)} title={pinned ? 'Unpin' : 'Pin'}
            className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${pinned ? 'text-sky-400' : 'text-white/30 hover:text-white/70'}`}>
            {pinned ? <PinOff size={10} /> : <Pin size={10} />}
          </button>
        </div>
        <PeriodIcon size={11} className={`${iconColor} opacity-60`} />
      </div>
      <p className="text-white text-[11px] font-medium leading-tight truncate mb-0.5">{zone.name}</p>
      <p className="text-white/30 text-[9px] truncate mb-2">{zone.city}</p>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-white text-xl font-bold font-mono tracking-tight leading-none">
          {h12 ? timeStr.replace(/:\d\d\s?(AM|PM)/, '') : timeStr.replace(/:\d\d$/, '')}
        </span>
        <span className="text-white/25 text-[10px] font-mono">{h12 ? (timeStr.match(/:\d\d\s?(AM|PM)$/)?.[0] ?? '') : ':' + ssStr}</span>
        {ampm && <span className="text-white/40 text-[10px] font-medium">{ampm}</span>}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-white/30 text-[9px]">
          {getDateStr(zone.timezone, now)}
          {dateDiff !== 0 && (
            <span className={`ml-1 px-1 rounded text-[8px] font-medium ${dateDiff > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {dateDiff > 0 ? `+${dateDiff}d` : `${dateDiff}d`}
            </span>
          )}
        </p>
        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${isSame ? 'text-white/25' : diffFromRef > 0 ? 'text-emerald-400/80' : 'text-amber-400/80'}`}>
          {offsetStr}
        </span>
      </div>
    </div>
  )
}

function MeetingPlanner({ zones, onRemove, onAdd, refTz, now, h12 }: {
  zones: string[]; onRemove: (id: string) => void; onAdd: (id: string) => void
  refTz: string; now: Date; h12: boolean
}) {
  const [addQuery, setAddQuery] = useState('')
  const [showAdd, setShowAdd]   = useState(false)
  const [highlightHour, setHighlightHour] = useState<number | null>(null)
  const currentRefHour = getLocalHour(refTz, now)
  const refOffsetMins  = getOffsetMinutes(refTz, now)
  const plannerData = zones.map(tz => {
    const z = ZONES.find(x => x.id === tz); if (!z) return null
    return { zone: z, diffMins: getOffsetMinutes(tz, now) - refOffsetMins }
  }).filter(Boolean) as { zone: Zone; diffMins: number }[]

  const addResults = ZONES.filter(z =>
    !zones.includes(z.id) &&
    (z.name.toLowerCase().includes(addQuery.toLowerCase()) || z.city.toLowerCase().includes(addQuery.toLowerCase()))
  ).slice(0, 8)

  const overlapHours: number[] = []
  for (let h = 0; h < 24; h++) {
    const allBusiness = plannerData.every(({ diffMins }) => {
      const localH = ((h + Math.round(diffMins / 60)) % 24 + 24) % 24
      return localH >= 9 && localH < 17
    })
    if (allBusiness) overlapHours.push(h)
  }

  function cellColor(refHour: number, diffMins: number): string {
    const localH = ((refHour + Math.round(diffMins / 60)) % 24 + 24) % 24
    if (localH >= 9 && localH < 17) return 'bg-emerald-500/25 text-emerald-300'
    if ((localH >= 7 && localH < 9) || (localH >= 17 && localH < 20)) return 'bg-amber-500/15 text-amber-400/70'
    return 'bg-white/[0.03] text-white/15'
  }

  function fmt24(h: number) {
    return h12 ? `${h === 0 ? 12 : h > 12 ? h - 12 : h}${h < 12 ? 'a' : 'p'}` : `${String(h).padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">Meeting Planner</p>
          <p className="text-white/35 text-xs">Find the best time to meet across timezones</p>
        </div>
        {overlapHours.length > 0 ? (
          <div className="text-right">
            <p className="text-emerald-400 text-xs font-medium">{overlapHours.length} overlap hours</p>
            <p className="text-white/30 text-[10px]">{fmt24(overlapHours[0])}:00 – {fmt24(overlapHours[overlapHours.length - 1] + 1)}:00</p>
          </div>
        ) : (
          <p className="text-amber-400/60 text-xs">No full business-hour overlap</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {plannerData.map(({ zone }) => (
          <div key={zone.id} className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-xl px-2.5 py-1.5">
            <span className="text-sm">{flag(zone.code)}</span>
            <span className="text-white text-xs">{zone.name}</span>
            <span className="text-white/25 text-[10px]">{getHHMM(zone.timezone, now, h12)}</span>
            <button onClick={() => onRemove(zone.id)} className="text-white/20 hover:text-white/60 ml-1"><X size={10} /></button>
          </div>
        ))}
        <div className="relative">
          <button onClick={() => setShowAdd(v => !v)}
            className="flex items-center gap-1.5 bg-white/5 border border-dashed border-white/20 hover:border-white/40 rounded-xl px-2.5 py-1.5 text-white/40 hover:text-white/70 text-xs transition-all">
            + Add timezone
          </button>
          {showAdd && (
            <div className="absolute left-0 top-full mt-1 w-56 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
              <input autoFocus value={addQuery} onChange={e => setAddQuery(e.target.value)}
                placeholder="Search…" className="w-full bg-transparent px-3 py-2 text-white text-xs placeholder:text-white/25 focus:outline-none border-b border-white/[0.07]" />
              {addResults.map(z => (
                <button key={z.id} onClick={() => { onAdd(z.id); setShowAdd(false); setAddQuery('') }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/[0.06] text-left">
                  <span>{flag(z.code)}</span>
                  <div>
                    <p className="text-white text-xs">{z.name}</p>
                    <p className="text-white/30 text-[10px]">{z.city}</p>
                  </div>
                </button>
              ))}
              {addResults.length === 0 && <p className="text-white/25 text-xs px-3 py-3">No results</p>}
            </div>
          )}
        </div>
      </div>

      <div className="border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/[0.06] bg-white/[0.02]">
          <div className="w-36 flex-shrink-0 px-3 py-2 text-white/20 text-[9px] uppercase tracking-wider">City</div>
          <div className="flex-1 flex">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} onMouseEnter={() => setHighlightHour(i)} onMouseLeave={() => setHighlightHour(null)}
                className={`flex-1 text-center text-[8px] py-1.5 transition-colors cursor-pointer ${
                  i === currentRefHour ? 'text-sky-400 font-bold' :
                  overlapHours.includes(i) ? 'text-emerald-400/60' :
                  highlightHour === i ? 'text-white/40' : 'text-white/15'
                } ${highlightHour === i ? 'bg-white/[0.04]' : ''}`}>
                {i % 3 === 0 ? fmt24(i) : ''}
              </div>
            ))}
          </div>
        </div>

        {plannerData.map(({ zone, diffMins }) => (
          <div key={zone.id} className="flex border-b border-white/[0.04] last:border-0 hover:bg-white/[0.01] transition-colors">
            <div className="w-36 flex-shrink-0 px-3 py-2.5 flex items-center gap-2">
              <span className="text-sm">{flag(zone.code)}</span>
              <div className="min-w-0">
                <p className="text-white text-[10px] font-medium truncate">{zone.name}</p>
                <p className="text-white/25 text-[9px] font-mono">{getHHMM(zone.timezone, now, h12)}</p>
              </div>
            </div>
            <div className="flex-1 flex">
              {Array.from({ length: 24 }, (_, i) => {
                const localH = ((i + Math.round(diffMins / 60)) % 24 + 24) % 24
                return (
                  <div key={i} onMouseEnter={() => setHighlightHour(i)} onMouseLeave={() => setHighlightHour(null)}
                    title={`${fmt24(localH)}:00 local`}
                    className={`flex-1 flex items-center justify-center py-2.5 text-[8px] font-mono transition-colors cursor-pointer
                      ${cellColor(i, diffMins)}
                      ${overlapHours.includes(i) ? 'ring-1 ring-inset ring-emerald-500/20' : ''}
                      ${i === currentRefHour ? 'ring-1 ring-inset ring-sky-500/40' : ''}
                      ${highlightHour === i ? 'brightness-125' : ''}`}>
                    {highlightHour === i ? localH : ''}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {overlapHours.length > 0 && (
          <div className="flex bg-emerald-500/[0.03] border-t border-emerald-500/10">
            <div className="w-36 flex-shrink-0 px-3 py-1.5">
              <p className="text-emerald-400 text-[9px] font-medium">Best overlap</p>
            </div>
            <div className="flex-1 flex">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className={`flex-1 py-1.5 ${overlapHours.includes(i) ? 'bg-emerald-500/20' : ''}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-[10px] text-white/25 px-1">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500/25 inline-block" />Business (9–17)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500/15 inline-block" />Early/Evening</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-white/[0.03] border border-white/10 inline-block" />Night</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm border border-sky-500/40 inline-block" />Now</span>
      </div>
    </div>
  )
}
