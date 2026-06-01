'use client';
import { useEffect } from 'react';
import NgCarousel from './NgCarousel';
interface Project { num:string; name:string; longDesc:string; tags:string[]; features:string[]; showCarousel?:boolean; }
export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:9999,background:'rgba(0,0,0,0.88)',backdropFilter:'blur(14px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'1.5rem'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#0c0c0e',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'20px',width:'100%',maxWidth:'780px',maxHeight:'88vh',overflowY:'auto',padding:'clamp(1.5rem,4vw,2.8rem)',position:'relative',animation:'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)'}}>
        <button onClick={onClose} style={{position:'absolute',top:'1.2rem',right:'1.2rem',width:'36px',height:'36px',borderRadius:'50%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.7)',fontSize:'1rem',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        <div style={{marginBottom:'1.5rem'}}>
          <span style={{fontFamily:"'Courier New',monospace",fontSize:'0.62rem',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(255,165,60,0.75)'}}>Project {project.num}</span>
          <h2 style={{fontFamily:"'Georgia',serif",fontSize:'clamp(1.8rem,4vw,2.8rem)',fontWeight:700,color:'#fff',marginTop:'0.3rem',letterSpacing:'-0.02em'}}>{project.name}</h2>
        </div>
        {project.showCarousel && <div style={{marginBottom:'1.8rem',borderRadius:'12px',overflow:'hidden'}}><NgCarousel/></div>}
        <p style={{fontFamily:"'Georgia',serif",fontSize:'clamp(0.9rem,1.5vw,1.02rem)',color:'rgba(255,255,255,0.62)',lineHeight:1.85,marginBottom:'1.8rem'}}>{project.longDesc}</p>
        <div style={{marginBottom:'1.8rem'}}>
          <span style={{fontFamily:"'Courier New',monospace",fontSize:'0.62rem',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(255,165,60,0.75)',display:'block',marginBottom:'1rem'}}>Key Features</span>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem'}}>
            {project.features.map((f,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.6rem',padding:'0.7rem 0.9rem',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'8px'}}>
                <span style={{color:'rgba(255,165,60,0.8)',fontSize:'0.8rem'}}>✦</span>
                <span style={{fontFamily:"'Georgia',serif",fontSize:'0.85rem',color:'rgba(255,255,255,0.58)',lineHeight:1.5}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span style={{fontFamily:"'Courier New',monospace",fontSize:'0.62rem',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(255,165,60,0.75)',display:'block',marginBottom:'0.8rem'}}>Tech Stack</span>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
            {project.tags.map(t=>(<span key={t} style={{fontFamily:"'Courier New',monospace",fontSize:'0.65rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,165,60,0.85)',border:'1px solid rgba(255,165,60,0.25)',padding:'0.35rem 0.85rem',borderRadius:'100px',background:'rgba(255,165,60,0.05)'}}>{t}</span>))}
          </div>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
