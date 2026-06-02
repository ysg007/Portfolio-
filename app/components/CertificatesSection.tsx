'use client';
import { useEffect, useRef, useState } from 'react';

interface Cert {
  name: string;
  org: string;
  date: string;
  duration?: string;
  detail?: string;
  credId?: string;
  color: string;
  logoColor: string;
  logoText: string;
  logoShape: string;
}

const CERTS: Cert[] = [
  { name:'Full Stack Developer with AI Program', org:'HCL Technologies', date:'Feb–May 2026', duration:'240 hrs', detail:'Full Stack Development · AI Integration · CI/CD · Cloud Deployment', color:'rgba(0,150,255,0.08)', logoColor:'#0076CE', logoText:'HCL', logoShape:'rect' },
  { name:'Cybersecurity Fundamental Apprentice', org:'Palo Alto Networks', date:'Jun 2025', detail:'Foundational cybersecurity landscape knowledge', color:'rgba(250,100,0,0.08)', logoColor:'#FA6400', logoText:'PANW', logoShape:'circle' },
  { name:'Security Operations Fundamental Apprentice', org:'Palo Alto Networks', date:'Jun 2025', detail:'SOC principles and technologies', color:'rgba(250,100,0,0.08)', logoColor:'#FA6400', logoText:'PANW', logoShape:'circle' },
  { name:'Network Security Apprentice', org:'Palo Alto Networks', date:'Jun 2025', detail:'Enterprise network defense fundamentals', color:'rgba(250,100,0,0.08)', logoColor:'#FA6400', logoText:'PANW', logoShape:'circle' },
  { name:'Cloud Security Fundamental Apprentice', org:'Palo Alto Networks', date:'Jun 2025', detail:'Cloud security principles', color:'rgba(250,100,0,0.08)', logoColor:'#FA6400', logoText:'PANW', logoShape:'circle' },
  { name:'BASH', org:'IIT Bombay', date:'Nov 2025', credId:'402652046S', detail:'Shell Scripting · Bash Commands · Automation', color:'rgba(150,20,20,0.08)', logoColor:'#990000', logoText:'IITB', logoShape:'hex' },
  { name:'Git Training', org:'IIT Bombay', date:'May 2025', credId:'4026520ZU8', detail:'Git Commands · Workflow · Branching · Merging', color:'rgba(150,20,20,0.08)', logoColor:'#990000', logoText:'IITB', logoShape:'hex' },
  { name:'Linux Training', org:'IIT Bombay', date:'Jan 2025', credId:'4026520B1A', detail:'Linux OS · Command Line · System Management', color:'rgba(150,20,20,0.08)', logoColor:'#990000', logoText:'IITB', logoShape:'hex' },
  { name:'Data Analytics Job Simulation', org:'Deloitte', date:'Apr 2026', credId:'MykmJJYzynSDdGXZo', detail:'Data Analytics · Business Intelligence', color:'rgba(130,0,200,0.08)', logoColor:'#86BC25', logoText:'D.', logoShape:'circle' },
  { name:'Cyber Job Simulation', org:'Deloitte', date:'Jul 2025', credId:'FqqeXTiusMnDbGEHh', detail:'Cybersecurity · Threat Analysis · SOC', color:'rgba(130,0,200,0.08)', logoColor:'#86BC25', logoText:'D.', logoShape:'circle' },
];

function OrgLogo({ color, text, shape }: { color: string; text: string; shape: string }) {
  const base = {
    width: '44px', height: '44px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0,
    fontFamily: "'Courier New',monospace", fontWeight: 700,
    fontSize: text.length > 2 ? '0.55rem' : '0.85rem',
    color: '#fff', letterSpacing: '0.05em',
  };
  if (shape === 'rect') return (
    <div style={{ ...base, background: color, borderRadius: '8px', border: `1px solid ${color}44` }}>{text}</div>
  );
  if (shape === 'hex') return (
    <div style={{ ...base, background: color, borderRadius: '6px 12px 6px 12px', border: `1px solid ${color}44` }}>{text}</div>
  );
  return (
    <div style={{ ...base, background: color, borderRadius: '50%', border: `1px solid ${color}44` }}>{text}</div>
  );
}

function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn); };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.9)', backdropFilter:'blur(16px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'#0d0d0f', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'20px', width:'100%', maxWidth:'520px', padding:'2.5rem', position:'relative', animation:'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
        <button onClick={onClose} style={{ position:'absolute', top:'1.2rem', right:'1.2rem', width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem' }}>✕</button>

        {/* Logo + Org */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
          <OrgLogo color={cert.logoColor} text={cert.logoText} shape={cert.logoShape}/>
          <div>
            <div style={{ fontFamily:"'Courier New',monospace", fontSize:'0.6rem', letterSpacing:'0.25em', textTransform:'uppercase', color: cert.logoColor, marginBottom:'0.2rem' }}>{cert.org}</div>
            <div style={{ fontFamily:"'Georgia',serif", fontSize:'clamp(1rem,2.5vw,1.4rem)', fontWeight:700, color:'#fff', lineHeight:1.2 }}>{cert.name}</div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:'rgba(255,255,255,0.06)', marginBottom:'1.5rem' }}/>

        {/* Details */}
        <div style={{ display:'flex', flexDirection:'column', gap:'0.8rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)' }}>Issued</span>
            <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.68rem', color:'rgba(255,255,255,0.7)' }}>{cert.date}{cert.duration ? ` · ${cert.duration}` : ''}</span>
          </div>
          {cert.credId && (
            <div style={{ display:'flex', justifyContent:'space-between', gap:'1rem' }}>
              <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', flexShrink:0 }}>Credential ID</span>
              <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.62rem', color:'rgba(255,255,255,0.5)', wordBreak:'break-all', textAlign:'right' }}>{cert.credId}</span>
            </div>
          )}
          {cert.detail && (
            <div style={{ padding:'0.8rem 1rem', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'10px', fontFamily:"'Georgia',serif", fontSize:'0.85rem', color:'rgba(255,255,255,0.55)', lineHeight:1.7 }}>
              {cert.detail}
            </div>
          )}
        </div>

        {/* Org badge */}
        <div style={{ marginTop:'1.5rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: cert.logoColor, boxShadow:`0 0 8px ${cert.logoColor}` }}/>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)' }}>Verified by {cert.org}</span>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

export default function CertificatesSection() {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current.querySelectorAll('[data-cert-reveal]'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
        );
      }
    };
    run();
  }, []);

  // Group by org
  const orgs = ['HCL Technologies', 'Palo Alto Networks', 'IIT Bombay', 'Deloitte'];

  return (
    <>
      <div ref={sectionRef} style={{ background:'#060606', padding:'clamp(4rem,10vh,8rem) clamp(1.5rem,7vw,7rem)', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <span data-cert-reveal style={{ fontFamily:"'Courier New',monospace", fontSize:'0.68rem', letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(255,165,60,0.8)', display:'block', marginBottom:'1.2rem' }}>Certifications</span>
          <h2 data-cert-reveal style={{ fontFamily:"'Georgia',serif", fontSize:'clamp(2.4rem,5vw,4.5rem)', fontWeight:700, color:'#fff', marginBottom:'clamp(2rem,5vh,4rem)', letterSpacing:'-0.02em' }}>Credentials</h2>

          {orgs.map(org => {
            const orgCerts = CERTS.filter(c => c.org === org);
            const orgColor = orgCerts[0].logoColor;
            return (
              <div key={org} data-cert-reveal style={{ marginBottom:'2.5rem' }}>
                {/* Org header */}
                <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'1rem' }}>
                  <OrgLogo color={orgColor} text={orgCerts[0].logoText} shape={orgCerts[0].logoShape}/>
                  <div>
                    <div style={{ fontFamily:"'Georgia',serif", fontSize:'clamp(1rem,1.8vw,1.2rem)', fontWeight:700, color:'#fff' }}>{org}</div>
                    <div style={{ fontFamily:"'Courier New',monospace", fontSize:'0.6rem', letterSpacing:'0.18em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>{orgCerts.length} Certificate{orgCerts.length > 1 ? 's' : ''}</div>
                  </div>
                </div>

                {/* Cert cards */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'0.8rem', paddingLeft:'3.5rem' }}>
                  {orgCerts.map((cert, i) => (
                    <div key={i} onClick={() => setActiveCert(cert)}
                      style={{ background: cert.color, border:`1px solid ${orgColor}22`, borderRadius:'12px', padding:'1.1rem 1.3rem', cursor:'pointer', transition:'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.borderColor = `${orgColor}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${orgColor}18`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = `${orgColor}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                    >
                      <div style={{ fontFamily:"'Georgia',serif", fontSize:'0.9rem', fontWeight:700, color:'#fff', marginBottom:'0.4rem', lineHeight:1.3 }}>{cert.name}</div>
                      <div style={{ fontFamily:"'Courier New',monospace", fontSize:'0.58rem', letterSpacing:'0.15em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>{cert.date}{cert.duration ? ` · ${cert.duration}` : ''}</div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height:'1px', background:'rgba(255,255,255,0.04)', marginTop:'2rem' }}/>
              </div>
            );
          })}
        </div>
      </div>

      {activeCert && <CertModal cert={activeCert} onClose={() => setActiveCert(null)}/>}
    </>
  );
}
