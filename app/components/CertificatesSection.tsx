'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Cert {
  name: string;
  org: string;
  date: string;
  duration?: string;
  detail?: string;
  credId?: string;
  color: string;
  borderColor: string;
  image?: string;
}

const ORGS = [
  { name:'HCL Technologies', logo:'/logo-hcl.jpeg', bg:'linear-gradient(135deg,#6c3fd6,#3b82f6)', borderColor:'rgba(108,63,214,0.4)' },
  { name:'Palo Alto Networks', logo:'/logo-paloalto.png', bg:'#f5f0ec', borderColor:'rgba(250,100,0,0.4)' },
  { name:'IIT Bombay', logo:'/logo-iitb.png', bg:'#fff', borderColor:'rgba(0,50,160,0.4)' },
  { name:'Deloitte', logo:'/logo-deloitte.jpeg', bg:'#000', borderColor:'rgba(134,188,37,0.4)' },
  { name:'MANIT Bhopal', logo:'/logo-manit.png', bg:'#fff8ee', borderColor:'rgba(180,120,0,0.4)' },
  { name:'Heritage Quiz', logo:'/logo-mygov.png', bg:'#f0f7ff', borderColor:'rgba(0,100,180,0.4)' },
  { name:'Dainik Bhaskar', logo:'/logo-dainikbhaskar.png', bg:'#fff', borderColor:'rgba(200,0,0,0.4)' },
];

const CERTS: Cert[] = [
  { name:'Full Stack Developer with AI Program', org:'HCL Technologies', date:'Jan–May 2026', duration:'240 hrs', detail:'Full Stack Development · AI Integration · CI/CD · Cloud Deployment · Git', color:'rgba(108,63,214,0.08)', borderColor:'rgba(108,63,214,0.25)', image:'/certificates/HCL__CERTIFICATE.jpeg' },
  { name:'Summer Internship – Palo Alto', org:'Palo Alto Networks', date:'Jun–Jul 2025', detail:'Summer Internship on Palo Alto at Medicaps University', color:'rgba(250,100,0,0.08)', borderColor:'rgba(250,100,0,0.25)', image:'/certificates/medicaps_summer_internship_certificate.jpeg' },
  { name:'Cybersecurity Fundamental Apprentice', org:'Palo Alto Networks', date:'Jun 2025', detail:'Foundational cybersecurity · threat detection · security operations', color:'rgba(250,100,0,0.08)', borderColor:'rgba(250,100,0,0.25)', image:'/certificates/pl_cybersecurity.jpeg' },
  { name:'Security Operations Fundamental Apprentice', org:'Palo Alto Networks', date:'Jun 2025', detail:'SOC principles · security monitoring · incident response', color:'rgba(250,100,0,0.08)', borderColor:'rgba(250,100,0,0.25)', image:'/certificates/pl_security_cert.jpeg' },
  { name:'Network Security Apprentice', org:'Palo Alto Networks', date:'Jun 2025', detail:'Enterprise network defense · firewall management', color:'rgba(250,100,0,0.08)', borderColor:'rgba(250,100,0,0.25)', image:'/certificates/pl_network_certficate.jpeg' },
  { name:'Cloud Security Fundamental Apprentice', org:'Palo Alto Networks', date:'Jun 2025', detail:'Cloud security principles · infrastructure protection', color:'rgba(250,100,0,0.08)', borderColor:'rgba(250,100,0,0.25)', image:'/certificates/pl_cloud_security.jpeg' },
  { name:'BASH Training', org:'IIT Bombay', date:'Nov 2025', credId:'402652046S', detail:'Shell Scripting · Bash Commands · Automation · Linux terminal', color:'rgba(0,50,160,0.08)', borderColor:'rgba(0,50,160,0.25)', image:'/certificates/iit_bombay_bash_certificate.jpeg' },
  { name:'Git Training', org:'IIT Bombay', date:'May 2025', credId:'4026520ZU8', detail:'Git Commands · Workflow · Branching · Merging · Version Control', color:'rgba(0,50,160,0.08)', borderColor:'rgba(0,50,160,0.25)', image:'/certificates/iit_bombay_cert.jpeg' },
  { name:'Linux Training', org:'IIT Bombay', date:'Jan 2025', credId:'4026520B1A', detail:'Linux OS · Command Line · System Management · File System', color:'rgba(0,50,160,0.08)', borderColor:'rgba(0,50,160,0.25)', image:'/certificates/iit_bombay_linux_certf.jpeg' },
  { name:'Data Analytics Job Simulation', org:'Deloitte', date:'Apr 2026', credId:'MykmJJYzynSDdGXZo', detail:'Data Analytics · Business Intelligence · Consulting simulation', color:'rgba(134,188,37,0.08)', borderColor:'rgba(134,188,37,0.25)', image:'/certificates/DELLOITE_CERT.jpeg' },
  { name:'Cyber Job Simulation', org:'Deloitte', date:'Jul 2025', credId:'FqqeXTiusMnDbGEHh', detail:'Cybersecurity · Threat Analysis · SOC operations', color:'rgba(134,188,37,0.08)', borderColor:'rgba(134,188,37,0.25)', image:'/certificates/Deloitte_cyber_stimulation.jpeg' },
  { name:'SPHURTI CAMP – INSPIRE', org:'MANIT Bhopal', date:'24–26 Mar 2023', detail:'Successfully participated in SPHURTI CAMP at MANIT Bhopal', color:'rgba(180,120,0,0.08)', borderColor:'rgba(180,120,0,0.25)', image:'/certificates/nit_bhopal_certficate.jpeg' },
  { name:'Heritage Quiz – Certificate of Participation', org:'Heritage Quiz', date:'2023', detail:'MyGov & Archaeological Survey of India · National heritage quiz', color:'rgba(0,100,180,0.08)', borderColor:'rgba(0,100,180,0.25)', image:'/certificates/heritage_quiz_certficate.jpeg' },
  { name:'Pratibha Samman – Certificate of Appreciation', org:'Dainik Bhaskar', date:'2018', detail:'98% marks in Class 10/12 · Ratlam district recognition', color:'rgba(200,0,0,0.08)', borderColor:'rgba(200,0,0,0.25)', image:'/certificates/dainik_bhaskar_certificate.jpeg' },
];

function ImageModal({ cert, onClose, onInfo }: { cert: Cert; onClose: () => void; onInfo: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn); };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:10000, background:'rgba(0,0,0,0.96)', backdropFilter:'blur(24px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:'900px', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
        <div style={{ fontFamily:"'Courier New',monospace", fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>{cert.org} — {cert.name}</div>
        <div style={{ display:'flex', gap:'0.6rem' }}>
          <button onClick={onInfo} style={{ padding:'0.4rem 1rem', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'6px', color:'rgba(255,255,255,0.6)', cursor:'pointer', fontFamily:"'Courier New',monospace", fontSize:'0.6rem', letterSpacing:'0.15em', textTransform:'uppercase' }}>Details</button>
          <button onClick={onClose} style={{ width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem' }}>✕</button>
        </div>
      </div>
      <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:'900px', borderRadius:'16px', overflow:'hidden', border:`1px solid ${cert.borderColor}`, boxShadow:`0 0 80px ${cert.borderColor}`, maxHeight:'80vh' }}>
        <img src={cert.image!} alt={cert.name} style={{ width:'100%', height:'auto', maxHeight:'80vh', objectFit:'contain', display:'block' }} />
      </div>
      <div style={{ marginTop:'1rem', fontFamily:"'Courier New',monospace", fontSize:'0.55rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.18)' }}>Click outside or press ESC to close</div>
    </div>
  );
}

function CertModal({ cert, orgData, onClose, onViewImage }: { cert: Cert; orgData: typeof ORGS[0]; onClose: () => void; onViewImage?: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn); };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.92)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'#0d0d0f', border:`1px solid ${cert.borderColor}`, borderRadius:'20px', width:'100%', maxWidth:'520px', padding:'2.5rem', position:'relative', animation:'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)', boxShadow:`0 0 60px ${cert.borderColor}` }}>
        <button onClick={onClose} style={{ position:'absolute', top:'1.2rem', right:'1.2rem', width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem' }}>✕</button>
        <div style={{ display:'flex', alignItems:'center', gap:'1.2rem', marginBottom:'1.8rem' }}>
          <div style={{ width:'56px', height:'56px', borderRadius:'12px', overflow:'hidden', background:orgData.bg, border:`1px solid ${cert.borderColor}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Image src={orgData.logo} alt={orgData.name} width={56} height={56} style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
          </div>
          <div>
            <div style={{ fontFamily:"'Courier New',monospace", fontSize:'0.6rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:'0.3rem' }}>{orgData.name}</div>
            <div style={{ fontFamily:"'Georgia',serif", fontSize:'clamp(1rem,2.5vw,1.3rem)', fontWeight:700, color:'#fff', lineHeight:1.25 }}>{cert.name}</div>
          </div>
        </div>
        <div style={{ height:'1px', background:cert.borderColor, marginBottom:'1.5rem' }}/>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.9rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)' }}>Issued</span>
            <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.7rem', color:'rgba(255,255,255,0.75)' }}>{cert.date}{cert.duration ? ` · ${cert.duration}` : ''}</span>
          </div>
          {cert.credId && (
            <div style={{ display:'flex', justifyContent:'space-between', gap:'1rem', alignItems:'flex-start' }}>
              <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', flexShrink:0 }}>Credential ID</span>
              <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.62rem', color:'rgba(255,255,255,0.5)', wordBreak:'break-all', textAlign:'right' }}>{cert.credId}</span>
            </div>
          )}
          {cert.detail && (
            <div style={{ padding:'1rem 1.2rem', background:'rgba(255,255,255,0.02)', border:`1px solid ${cert.borderColor}`, borderRadius:'10px', fontFamily:"'Georgia',serif", fontSize:'0.88rem', color:'rgba(255,255,255,0.55)', lineHeight:1.75 }}>{cert.detail}</div>
          )}
        </div>
        {cert.image && onViewImage && (
          <button onClick={onViewImage} style={{ marginTop:'1.5rem', width:'100%', padding:'0.75rem', background:'rgba(255,255,255,0.04)', border:`1px solid ${cert.borderColor}`, borderRadius:'10px', color:'#fff', cursor:'pointer', fontFamily:"'Courier New',monospace", fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem' }}>
            <span>🏆</span> View Certificate
          </button>
        )}
        <div style={{ marginTop:'1rem', display:'flex', alignItems:'center', gap:'0.6rem', padding:'0.6rem 1rem', background:'rgba(255,255,255,0.02)', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'rgba(100,220,100,0.8)', boxShadow:'0 0 8px rgba(100,220,100,0.6)', flexShrink:0 }}/>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)' }}>Verified by {orgData.name}</span>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

export default function CertificatesSection() {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);
  const [viewingImage, setViewingImage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current.querySelectorAll('[data-reveal]'), { opacity:0, y:40 }, { opacity:1, y:0, duration:0.7, stagger:0.1, ease:'power3.out', scrollTrigger:{ trigger:sectionRef.current, start:'top 80%' } });
      }
    };
    run();
  }, []);

  const getOrgData = (orgName: string) => ORGS.find(o => o.name === orgName) || ORGS[0];

  return (
    <>
      <div ref={sectionRef} style={{ background:'#060606', padding:'clamp(4rem,10vh,8rem) clamp(1.5rem,7vw,7rem)', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <span data-reveal style={{ fontFamily:"'Courier New',monospace", fontSize:'0.68rem', letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(255,165,60,0.8)', display:'block', marginBottom:'1.2rem' }}>Certifications</span>
          <h2 data-reveal style={{ fontFamily:"'Georgia',serif", fontSize:'clamp(2.4rem,5vw,4.5rem)', fontWeight:700, color:'#fff', marginBottom:'clamp(2rem,5vh,4rem)', letterSpacing:'-0.02em' }}>Credentials</h2>
          {ORGS.map(org => {
            const orgCerts = CERTS.filter(c => c.org === org.name);
            if (orgCerts.length === 0) return null;
            return (
              <div key={org.name} data-reveal style={{ marginBottom:'2.8rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.2rem' }}>
                  <div style={{ width:'48px', height:'48px', borderRadius:'10px', overflow:'hidden', background:org.bg, border:`1px solid ${org.borderColor}`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Image src={org.logo} alt={org.name} width={48} height={48} style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Georgia',serif", fontSize:'clamp(1rem,1.8vw,1.2rem)', fontWeight:700, color:'#fff' }}>{org.name}</div>
                    <div style={{ fontFamily:"'Courier New',monospace", fontSize:'0.6rem', letterSpacing:'0.18em', color:'rgba(255,255,255,0.3)', textTransform:'uppercase', marginTop:'0.15rem' }}>{orgCerts.length} Certificate{orgCerts.length > 1 ? 's' : ''}</div>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'0.8rem', paddingLeft:'4rem' }}>
                  {orgCerts.map((cert, i) => (
                    <div key={i} onClick={() => { setActiveCert(cert); setViewingImage(false); }}
                      style={{ background:cert.color, border:`1px solid ${cert.borderColor}`, borderRadius:'12px', padding:'1.1rem 1.3rem', cursor:'pointer', transition:'transform 0.22s ease, box-shadow 0.22s ease', position:'relative', overflow:'hidden' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-3px)'; el.style.boxShadow=`0 8px 24px ${cert.borderColor}`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(0)'; el.style.boxShadow='none'; }}
                    >
                      {cert.image && <div style={{ position:'absolute', top:'0.6rem', right:'0.6rem', width:'20px', height:'20px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.6rem' }}>🏆</div>}
                      <div style={{ fontFamily:"'Georgia',serif", fontSize:'0.9rem', fontWeight:700, color:'#fff', marginBottom:'0.5rem', lineHeight:1.3, paddingRight:cert.image ? '1.5rem' : '0' }}>{cert.name}</div>
                      <div style={{ fontFamily:"'Courier New',monospace", fontSize:'0.58rem', letterSpacing:'0.12em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>{cert.date}{cert.duration ? ` · ${cert.duration}` : ''}</div>
                      <div style={{ marginTop:'0.6rem', fontFamily:"'Courier New',monospace", fontSize:'0.55rem', color:'rgba(255,165,60,0.6)', letterSpacing:'0.1em' }}>Click for details →</div>
                    </div>
                  ))}
                </div>
                <div style={{ height:'1px', background:'rgba(255,255,255,0.04)', marginTop:'2.2rem' }}/>
              </div>
            );
          })}
        </div>
      </div>
      {activeCert && !viewingImage && (
        <CertModal cert={activeCert} orgData={getOrgData(activeCert.org)} onClose={() => setActiveCert(null)} onViewImage={activeCert.image ? () => setViewingImage(true) : undefined} />
      )}
      {activeCert && viewingImage && (
        <ImageModal cert={activeCert} onClose={() => { setActiveCert(null); setViewingImage(false); }} onInfo={() => setViewingImage(false)} />
      )}
    </>
  );
}
