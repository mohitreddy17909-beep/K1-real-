/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SERVICES } from './data';
import ThreeCanvas from './components/ThreeCanvas';
import IsometricMetrics from './components/IsometricMetrics';
import ServiceCard from './components/ServiceCard';
import { 
  Building2, 
  Search, 
  SlidersHorizontal, 
  UserCheck, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck,
  Phone
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Verification' | 'Pricing' | 'Inspections'>('Verification');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  // Smooth scroll logic to target anchors
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle transparent search/clearance request
  const handleClearanceCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      setSearchFeedback('Please enter a village, layout, or plot number to check clearance.');
      setTimeout(() => setSearchFeedback(null), 4000);
      return;
    }

    setSearchFeedback(`Checking availability and land title flow clearance records for "${term}"...`);
    
    // Redirect to WhatsApp with prefilled inquiries block
    setTimeout(() => {
      setSearchFeedback(null);
      const queryText = encodeURIComponent(`Hi K1 Desk, I would like to check the title deeds, legal status, and layouts for: "${term}". Please share transparent documents and pricing details.`);
      window.location.href = `https://wa.me/919392140148?text=${queryText}`;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-500 selection:text-slate-900 flex flex-col relative overflow-x-hidden">
      
      {/* Absolute Ambient Background Lights to make the 3D elements bounce */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[700px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[1200px] right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[800px] left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* FLOATING GLASSMORPHIC HEADER */}
      <header className="sticky top-5 z-50 w-full max-w-7xl mx-auto px-4 md:px-8">
        <nav 
          className="glass-panel rounded-2xl px-6 py-4 flex items-center justify-between shadow-md transition-transform duration-300 hover:border-emerald-500/40 border border-slate-200"
          id="floating-navigation-bar"
        >
          {/* Logo brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToAnchor('hero-section')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white font-display font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-500/15 group-hover:rotate-6 transition-transform">
              K1
            </div>
            <div>
              <span className="font-display font-semibold text-lg text-slate-900 tracking-tight block">K1 Real Estate</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block -mt-1">GUNTUR AP</span>
            </div>
          </div>

          {/* Center Links - Glass hover highlight */}
          <div className="hidden md:flex items-center gap-8 text-xs font-display tracking-widest uppercase font-semibold text-slate-600">
            <button 
              onClick={() => scrollToAnchor('hero-section')} 
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Home Portal
            </button>
            <button 
              onClick={() => scrollToAnchor('metrics-anchor')} 
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Why K1
            </button>
            <button 
              onClick={() => scrollToAnchor('services-anchor')} 
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Digital Services
            </button>
          </div>

          {/* Inquire Instant Call scroll action */}
          <div className="flex items-center gap-4">
            <a
              href="tel:09392140148"
              className="px-5 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase bg-slate-900 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              id="header-inquire-btn"
            >
              Direct Call
              <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      </header>

      {/* HYPER-3D HERO CANVASES */}
      <section 
        className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 md:px-8 pt-10 pb-20 mt-[-60px]"
        id="hero-section"
      >
        {/* Native 3D connection particle mesh matrix loaded dynamically */}
        <ThreeCanvas />

        {/* Dense tech grid background overlaid underneath */}
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-25" />

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center pt-24">
          
          {/* Animated smart badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-display font-semibold text-xs tracking-wider uppercase mb-8 shadow-sm">
            <Sparkles size={14} className="fill-emerald-600/20 animate-spin" style={{ animationDuration: '6s' }} />
            <span>CRDA / DTCP Authorized Developers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight text-slate-900 leading-tight mb-6 select-none max-w-3xl">
            The Next Dimension of <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-600">Property Marketing</span> in Guntur
          </h1>

          <p className="text-slate-800 text-sm md:text-base leading-relaxed max-w-2xl font-sans mb-12">
            No more blind real estate acquisitions in AP. K1 provides absolute pricing transparency, authenticated layouts, and complete title ledger audits to guarantee secure, high-yield land assets.
          </p>

          {/* LARGE CONTACT NOW BUTTON (GREEN/BLUE THEME) */}
          <div className="relative z-20 w-full max-w-md px-4 mb-4">
            <a
              href="tel:09392140148"
              className="group relative flex items-center justify-center gap-3 py-5 px-8 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-400 hover:via-cyan-400 hover:to-emerald-400 text-slate-950 font-display font-black text-sm tracking-widest uppercase transition-all duration-300 active:scale-95 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/25"
              id="hero-contact-now-btn"
            >
              {/* Pulse glow background layer */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-300 -z-10" />
              
              <Phone size={18} className="fill-slate-950 stroke-slate-950 animate-pulse" />
              <span>Contact Now</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-xs text-slate-600 uppercase font-mono tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              CRDA Approved Layouts
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              DTCP Standard Blueprints
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              100% Direct Developer Terms
            </span>
          </div>

        </div>

        {/* Spatial Scroll Indicator */}
        <div 
          onClick={() => scrollToAnchor('metrics-anchor')}
          className="absolute bottom-8 cursor-pointer flex flex-col items-center text-slate-400 hover:text-emerald-600 transition-colors z-20"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase mb-1">Begin Tour</span>
          <div className="w-6 h-10 rounded-full border border-slate-300 p-1 flex justify-center">
            <div className="w-1.5 h-3 bg-emerald-500 rounded-full animate-bounce" />
          </div>
        </div>

      </section>

      {/* ISOMETRIC "SMART METRICS" SHOWCASE */}
      <section 
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-20"
        id="metrics-anchor"
      >
        <div className="text-center md:text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-display font-medium text-xs tracking-wider uppercase rounded-full mb-3">
            <SlidersHorizontal size={12} />
            Transparent Performance Indices
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
            Guntur’s Only <span className="text-emerald-600">Zero-Risk</span> Land Acquisition Portal
          </h2>
          <p className="text-slate-600 text-sm mt-4 leading-relaxed">
            Every transaction is backed by clear title deeds, transparent developer pricing, and full-disclosure on-site photographic audits. Hover over our smart cubes to see our certified track record around Guntur.
          </p>
        </div>

        {/* Isometric boxes grid */}
        <IsometricMetrics />
      </section>

      {/* LOCAL SERVICES HUB */}
      <section 
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-20 border-t border-slate-200"
        id="services-anchor"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-display font-medium text-xs tracking-wider uppercase rounded-full mb-3">
            <UserCheck size={12} />
            The K1 Unfair Advantage
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
            Cutting-Edge Property <span className="text-sky-600">Marketing Services</span>
          </h2>
          <p className="text-slate-600 text-sm mt-4 leading-relaxed">
            Our marketing stack ensures transparent and immersive visual updates, direct pricing, and direct physical inspections to connect Guntur sellers and international buyers cleanly.
          </p>
        </div>

        {/* Layered icon service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="services-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* DIRECT COMMUNICATION CENTER (NO LEAD FORMS) */}
      <section 
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-20"
        id="consultation-anchor"
      >
        <div className="glass-panel rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xl border border-slate-200 relative overflow-hidden" id="communication-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-display font-semibold text-xs tracking-wider uppercase mb-6">
              <Sparkles size={14} className="fill-emerald-600/20" />
              <span>Contact Desk</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              100% Transparent Physical Consultations
            </h2>
            
            <p className="text-slate-600 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
              We operate strictly without intermediaries or hidden markups. Drop by our office or contact our valuation desk directly for on-field plot walk-ins, genuine title papers, and immediate registration layout maps.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto mb-8">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Direct Landline</span>
                <span className="text-emerald-700 font-display font-bold text-lg leading-none">09392140148</span>
                <p className="text-slate-500 text-xs mt-1.5">Coordinate immediate site calls on demand.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Corporate Office</span>
                <span className="text-slate-800 font-display font-semibold text-sm block leading-tight">Hussain Nagar, Guntur, AP</span>
                <p className="text-slate-500 text-xs mt-1.5 border-t border-slate-100 pt-1.5">Open daily 9:00 AM - 7:00 PM for walk-ins.</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:09392140148"
                className="px-6 py-3.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 text-white"
              >
                <Phone size={14} />
                Call for Site Visit
              </a>
              <a
                href="tel:09392140148"
                className="px-6 py-3.5 rounded-xl font-display font-semibold text-xs tracking-wider uppercase border border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Call Office Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL CONTEXT MAP DETAILS */}
      <section className="w-full bg-slate-100 border-t border-slate-200 py-16 relative z-10" id="map-context-footer">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-display font-black text-lg flex items-center justify-center">
                K1
              </div>
              <span className="font-display font-semibold text-lg text-slate-800">K1 Real Estate Marketing</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-xs mx-auto md:mx-0">
              Transforming conventional real estate acquisitions into an immersive, zero-risk, high-velocity asset experience across Guntur corridor.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-slate-800 text-xs uppercase tracking-widest mb-4">
              Corporate Office Guntur
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed max-w-xs mx-auto md:mx-0">
              Hussain Nagar 1st line, Guntur-Ponnur Road Corridor,<br />
              Opposite Reliance Petrol Pump Extension Layout,<br />
              Guntur, Andhra Pradesh 522003
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-slate-800 text-xs uppercase tracking-widest mb-4">
              Digital Audit desk
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Connect directly with our Guntur Valuer on WhatsApp for active layout brochures.
            </p>
            <p className="text-emerald-700 font-display font-bold mt-2 text-sm">
              09392140148
            </p>
            <span className="text-[10px] font-mono text-slate-400 block mt-1">
              APPROVED PORTAL ARCHIVE: V2.8.4
            </span>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-slate-200/60 py-8 text-center border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} K1 Real Estate Marketing (Guntur, AP). All Rights Reserved.</p>
          <div className="flex gap-6 font-mono text-[10px] tracking-widest uppercase text-slate-500">
            <span>DTCP APPROVED</span>
            <span>CRDA INDEXED</span>
            <span>100% TRANSPARENT</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
