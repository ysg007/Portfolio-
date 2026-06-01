'use client';
import { useEffect, useState } from 'react';
const SLIDES=[{src:'/ng1.jpg',label:'Dashboard'},{src:'/ng2.jpg',label:'AI Assistant'},{src:'/ng3.jpg',label:'Home'},{src:'/ng4.jpg',label:'Upload'},{src:'/ng5.jpg',label:'Login'},{src:'/ng6.jpg',label:'Register'}];
export default function NgCarousel() {
  const [active,setActive]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setActive(p=>(p+1)%SLIDES.length),2500);return()=>clearInterval(t);},[]);
  return(
    <div style={{position:'relative',width:'100%',height:'220px',borderRadius:'12px',overflow:'hidden',background:'#0a0a14',border:'1px solid rgba(255,255,255,0.08)',marginBottom:'1.2rem'}}>
      {SLIDES.map((s,i)=>(
        <img key={i} src={s.src} alt={s.label} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'top left',opacity:active===i?1:0,transform:active===i?'scale(1)':'scale(1.03)',transition:'opacity 0.7s ease,transform 0.7s ease'}}/>
      ))}
      <div style={{position:'absolute',top:'0.6rem',right:'0.7rem',fontFamily:"'Courier New',monospace",fontSize:'0.55rem',letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.6)',background:'rgba(0,0,0,0.55)',padding:'0.2rem 0.6rem',borderRadius:'4px',zIndex:2}}>{SLIDES[active].label}</div>
      <div style={{position:'absolute',bottom:'0.6rem',left:'50%',transform:'translateX(-50%)',display:'flex',gap:'0.4rem',zIndex:2}}>
        {SLIDES.map((_,i)=>(<button key={i} onClick={()=>setActive(i)} style={{width:'6px',height:'6px',borderRadius:'50%',border:'none',padding:0,cursor:'pointer',background:active===i?'rgba(255,165,60,0.95)':'rgba(255,255,255,0.25)',transition:'background 0.3s',transform:active===i?'scale(1.3)':'scale(1)'}}/>))}
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'40%',background:'linear-gradient(to top,rgba(0,0,0,0.7),transparent)',zIndex:1,pointerEvents:'none'}}/>
    </div>
  );
}
