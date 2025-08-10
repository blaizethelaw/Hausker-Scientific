'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ChevronDown, Mail, Linkedin, Menu, X, Microscope, Dna, FlaskConical,
  CheckCircle, ArrowRight, Award, Zap, Target, BarChart, Globe, FileText
} from 'lucide-react'

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<'home'|'about'|'services'|'case-studies'|'contact'>('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ids = ['home','about','services','case-studies','contact'] as const
    const obs = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActiveSection(vis[0].target.id as typeof ids[number])
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0,0.25,0.5,0.75,1] }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    const onScroll = () => setScrolled(window.scrollY > 50)
    const onMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('scroll', onScroll)
    window.addEventListener('mousemove', onMove)
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); obs.disconnect() }
  }, [])

  const navItems = useMemo(() => (
    ['Home','About','Services','Case Studies','Contact'] as const
  ), [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setIsMenuOpen(false) }
  }

  return (
    <div className="min-h-screen font-sans">
      <ParticleBackground mouse={mousePosition} />
      <Header
        scrolled={scrolled}
        active={activeSection}
        isOpen={isMenuOpen}
        setOpen={setIsMenuOpen}
        navItems={navItems}
        onJump={scrollTo}
      />
      <main>
        <Hero onPrimary={() => scrollTo('contact')} onSecondary={() => scrollTo('services')} />
        <About />
        <Services />
        <CaseStudies />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function ParticleBackground({ mouse }: { mouse: {x:number; y:number} }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(0, 217, 255, 0.15) 0%, transparent 40%)` }}
      />
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-cyan-400/20 animate-pulse" style={{
          width: `${Math.random() * 4 + 1}px`, height: `${Math.random() * 4 + 1}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`, animationDuration: `${Math.random() * 10 + 5}s`
        }} />
      ))}
    </div>
  )
}

function Header({ scrolled, active, isOpen, setOpen, navItems, onJump }:{
  scrolled: boolean;
  active: string;
  isOpen: boolean;
  setOpen: (v:boolean)=>void;
  navItems: readonly ["Home","About","Services","Case Studies","Contact"];
  onJump: (id:string)=>void;
}) {
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onJump('home')}>
            <Dna className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Hausker Scientific
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const id = item.toLowerCase().replace(' ', '-')
              const isActive = active === id
              return (
                <button key={item} onClick={() => onJump(id)} className={`text-sm font-medium transition-colors relative ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}>
                  {item}
                  {isActive && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-cyan-400 rounded-full" />}
                </button>
              )
            })}
            <button onClick={() => onJump('contact')} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
              Schedule Consultation
            </button>
          </nav>
          <button onClick={() => setOpen(!isOpen)} className="md:hidden text-gray-300 hover:text-cyan-400">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-slate-900/95 backdrop-blur-lg">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button key={item} onClick={() => onJump(item.toLowerCase().replace(' ', '-'))} className="block w-full text-left py-2 text-gray-300 hover:text-cyan-400">
                {item}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

function Hero({ onPrimary, onSecondary }:{ onPrimary: ()=>void; onSecondary: ()=>void }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Accelerating Your Science
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Expert Laboratory Services for Preclinical Discovery and Gene Therapy Development
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-4xl mx-auto">
          Specialized, flexible, and rapid-response laboratory services for early-stage biotechnology companies and academic labs in the Greater Philadelphia area.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button onClick={onPrimary} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
            Schedule Free Discovery Call
          </button>
          <button onClick={onSecondary} className="px-8 py-4 border border-cyan-500/50 text-cyan-400 rounded-full font-medium hover:bg-cyan-500/10 transition-all duration-300">
            Explore Services
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-1">
            <Microscope className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Early-Stage Discovery</h3>
            <p className="text-gray-400">Leverage high-throughput C. elegans models to validate targets and screen compounds.</p>
            <ArrowRight className="w-5 h-5 text-cyan-400 mt-4 group-hover:translate-x-2 transition-transform" />
          </div>
          <div className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 transform hover:-translate-y-1">
            <FlaskConical className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Gene Therapy CMC</h3>
            <p className="text-gray-400">De-risk your path to the clinic with expert AAV process and analytical support.</p>
            <ArrowRight className="w-5 h-5 text-green-400 mt-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-cyan-400" />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">About Alana Hausker</span>
        </h2>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl blur-xl opacity-30" />
              <Image src="https://i.imgur.com/Bq2qFSo.jpeg" alt="Alana Hausker" width={800} height={800} className="relative w-full h-auto rounded-2xl shadow-2xl border-2 border-slate-700" />
            </div>
          </div>
          <div className="md:col-span-3 space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              My journey includes developing groundbreaking AAV purification methods at Tosoh Bioscience, supporting gene therapy programs at Spark Therapeutics, and advancing pediatric disease research at CHOP.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              With a published peer-reviewed study on AAV capsid separation and expertise spanning from early discovery to late-stage development, I offer unique insights and capabilities to accelerate your research.
            </p>
            <div className="relative mt-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl blur-2xl opacity-20" />
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-bold text-white mb-4">My Approach</h3>
                <div className="space-y-4">
                  <Item color="text-cyan-400" title="Collaborative" copy="I work as an extension of your team, ensuring open communication and alignment on project goals." />
                  <Item color="text-green-400" title="Rigorous" copy="Committed to the highest standards of scientific rigor, ensuring robust and defensible data." />
                  <Item color="text-blue-400" title="Responsive" copy="As a local partner, I provide accessibility and hands-on support that larger organizations cannot match." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Item({ color, title, copy }:{ color:string; title:string; copy:string }){
  return (
    <div className="flex items-start space-x-3">
      <CheckCircle className={`w-6 h-6 ${color} flex-shrink-0 mt-1`} />
      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-gray-400 text-sm">{copy}</p>
      </div>
    </div>
  )
}

function Services(){
  const [active, setActive] = useState<'celegans'|'aav'>('celegans')
  return (
    <section id="services" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16"><span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Specialized Services</span></h2>
        <div className="flex flex-col md:flex-row justify-center mb-12 space-y-4 md:space-y-0 md:space-x-4">
          <Tab onClick={() => setActive('celegans')} active={active==='celegans'} icon={<Microscope className="w-5 h-5 mr-2"/>} label="C. elegans Solutions" color="from-cyan-500 to-blue-500" />
          <Tab onClick={() => setActive('aav')} active={active==='aav'} icon={<FlaskConical className="w-5 h-5 mr-2"/>} label="AAV & Gene Therapy" color="from-green-500 to-emerald-500" />
        </div>
        {active==='celegans' ? <Celegans /> : <AAV />}
      </div>
    </section>
  )
}

function Tab({ onClick, active, icon, label, color }:{ onClick:()=>void; active:boolean; icon:React.ReactNode; label:string; color:string }){
  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-full font-medium transition-all duration-300 w-full md:w-auto flex items-center justify-center ${active ? `bg-gradient-to-r ${color} text-white shadow-lg` : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}>{icon}{label}</button>
  )
}

function Card({ border, icon, title, bullets }:{ border:string; icon:React.ReactNode; title:string; bullets:string[] }){
  return (
    <div className={`group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border ${border} transition-all duration-300 hover:shadow-2xl`}>
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <ul className="space-y-2 text-gray-400">
        {bullets.map((b,i) => (
          <li key={i} className="flex items-start"><CheckCircle className="w-4 h-4 mt-1 mr-2 flex-shrink-0 text-cyan-400" /><span>{b}</span></li>
        ))}
      </ul>
    </div>
  )
}

function Celegans(){
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-4">In‑Vivo Insights, Faster</h3>
        <p className="text-xl text-gray-300">High‑Throughput C. elegans Screening & Validation Services</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card border="border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-500/20" icon={<Target className="w-10 h-10 text-cyan-400" />} title="High‑Throughput Screening" bullets={["Automated compound library screening","Lifespan & motility analysis","WormWatcher Robot & CX5 imaging"]} />
        <Card border="border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/20" icon={<Dna className="w-10 h-10 text-blue-400" />} title="Target Validation" bullets={["RNA interference studies","Age‑synchronized populations","Phenotypic analysis"]} />
        <Card border="border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20" icon={<Zap className="w-10 h-10 text-purple-400" />} title="Mitochondrial Function" bullets={["Heteroplasmy quantification","UPRmt stress response","Disease modeling expertise"]} />
      </div>
    </div>
  )
}

function AAV(){
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-4">De‑Risk Your Path to Clinic</h3>
        <p className="text-xl text-gray-300">AAV Downstream Process & Analytical Support</p>
      </div>
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/30 mb-8">
        <div className="flex items-start space-x-4">
          <FileText className="w-8 h-8 text-green-400 flex-shrink-0" />
          <div>
            <h4 className="text-xl font-bold text-white mb-2">Featured Publication</h4>
            <p className="text-gray-300 mb-2">"Separation of full and empty adeno-associated virus capsids by anion-exchange chromatography using choline-type salts"</p>
            <p className="text-gray-400 text-sm">Analytical Biochemistry, 2024 — Demonstrating a novel method for solving one of gene therapy's biggest manufacturing challenges.</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card border="border-green-500/20 hover:border-green-500/50 hover:shadow-green-500/20" icon={<BarChart className="w-10 h-10 text-green-400" />} title="Process Optimization" bullets={["Chromatography development","Full/empty separation","ÄKTA system expertise"]} />
        <Card border="border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-emerald-500/20" icon={<FlaskConical className="w-10 h-10 text-emerald-400" />} title="Analytical Methods" bullets={["HPLC method development","Titer & purity assessment","SOP development"]} />
        <Card border="border-teal-500/20 hover:border-teal-500/50 hover:shadow-teal-500/20" icon={<Globe className="w-10 h-10 text-teal-400" />} title="On‑Site Support" bullets={["Local Philadelphia presence","Equipment training","Rapid troubleshooting"]} />
      </div>
    </div>
  )
}

function CaseStudies(){
  return (
    <section id="case-studies" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16"><span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Case Studies</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
            <Award className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Novel AAV Purification Method Development</h3>
            <div className="space-y-4 text-gray-300">
              <div><h4 className="font-semibold text-cyan-400">Challenge:</h4><p>Inefficient separation of full and empty AAV capsids was limiting product purity and yield.</p></div>
              <div><h4 className="font-semibold text-green-400">Solution:</h4><p>Developed innovative anion-exchange chromatography method using choline-type salts, optimizing buffer conditions and gradient profiles.</p></div>
              <div><h4 className="font-semibold text-purple-400">Result:</h4><p>Achieved superior separation with >95% purity. Method published in peer-reviewed journal and adopted by multiple gene therapy programs.</p></div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
            <Target className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">High‑Throughput Compound Screening</h3>
            <div className="space-y-4 text-gray-300">
              <div><h4 className="font-semibold text-cyan-400">Challenge:</h4><p>Academic team needed to screen 10,000+ compounds but lacked automated in‑vivo testing capacity.</p></div>
              <div><h4 className="font-semibold text-green-400">Solution:</h4><p>Implemented automated lifespan analysis using C. elegans disease model with WormWatcher Robot and custom analysis pipeline.</p></div>
              <div><h4 className="font-semibold text-purple-400">Result:</h4><p>Identified 2 lead compounds showing 30% lifespan extension. Data supported successful grant renewal and IND‑enabling studies.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Credentials(){
  return (
    <section className="py-16 bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-gray-400 mb-8 text-lg font-semibold tracking-wider uppercase">Trusted by Leading Institutions</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center">
          {['CHOP','Spark Therapeutics','Tosoh Bioscience','Analytical Biochemistry'].map((name) => (
            <div key={name} className="text-gray-500 hover:text-white transition-colors duration-300"><p className="text-2xl font-bold">{name}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact(){
  const [form, setForm] = useState({ name:'', company:'', email:'', message:'' })
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [note, setNote] = useState('')

  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setStatus('success'); setNote('Thank you! I will get back to you within 24 hours.'); setForm({ name:'', company:'', email:'', message:'' })
    } catch (err:any) {
      setStatus('error'); setNote(err.message || 'Something went wrong. Please email us directly.')
    }
  }

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16"><span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Let's Discuss Your Project</span></h2>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Name" id="name" value={form.name} onChange={v => setForm({ ...form, name:v })} required />
              <Field label="Company" id="company" value={form.company} onChange={v => setForm({ ...form, company:v })} required />
            </div>
            <Field label="Email" id="email" type="email" value={form.email} onChange={v => setForm({ ...form, email:v })} required />
            <Field label="Project Description" id="message" textarea value={form.message} onChange={v => setForm({ ...form, message:v })} required />
            <button type="submit" disabled={status==='sending'} className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-lg font-medium hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait">
              {status==='sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
          {status !== 'idle' && (
            <p className={`mt-4 text-center ${status==='success' ? 'text-green-400' : status==='error' ? 'text-red-400' : 'text-gray-400'}`}>{note}</p>
          )}
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-400">
            <a href="mailto:alana@hauskersci.com" className="flex items-center hover:text-cyan-400 transition-colors"><Mail className="w-5 h-5 mr-2" /> alana@hauskersci.com</a>
            <a href="https://www.linkedin.com/in/alana-hausker/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-cyan-400 transition-colors"><Linkedin className="w-5 h-5 mr-2" /> LinkedIn Profile</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, id, value, onChange, required, type = 'text', textarea }:{ label:string; id:string; value:string; onChange:(v:string)=>void; required?:boolean; type?:string; textarea?:boolean }){
  return (
    <div>
      <label htmlFor={id} className="block text-gray-300 mb-2">{label}</label>
      {textarea ? (
        <textarea id={id} value={value} onChange={e => onChange(e.target.value)} rows={5} className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors" placeholder={label} required={required} />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors" placeholder={label} required={required} />
      )}
    </div>
  )
}

function Footer(){
  return (
    <footer className="bg-slate-900 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Dna className="w-6 h-6 text-cyan-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Hausker Scientific Solutions</span>
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Hausker Scientific Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
