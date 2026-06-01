'use client';
import { useEffect, useRef, useState } from 'react';
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress,setProgress]=useState(0);
  const [phase,setPhase]=useState(0);
  const rafRef=useRef<ReturnType<typeof setTimeout>>();
  useEffect(()=>{
    let p=0;
    const run=()=>{p+=Math.random()*2.2+0.5;if(p>=100){p=100;setProgress(100);setTimeout(onDone,700);return;}setProgress(Math.floor(p));setPhase(p<33?0:p<66?1:2);rafRef.current=setTimeout(run,28);};
    rafRef.current=setTimeout(run,80);
    return()=>clearTimeout(rafRef.current);
  },[onDone]);
  const labels=['Initializing...','Loading assets...','Almost ready...'];
  return(
    <div style={{position:'fixed',inset:0,background:'#000',zIndex:9999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:"'Courier New',monospace"}}>
      <div style={{marginBottom:'3rem',textAlign:'center'}}>
        <div style={{fontSize:'clamp(2rem,5vw,3.5rem)',fontFamily:"'Georgia',serif",fontWeight:700,letterSpacing:'-0.03em',color:'#fff',lineHeight:0.9}}>
          <span style={{display:'block'}}>Yash</span>
          <span style={{display:'block',color:'transparent',WebkitTextStroke:'1.5px rgba(255,255,255,0.5)'}}>Gehlot</span>
        </div>
        <div style={{marginTop:'1rem',fontSize:'0.62rem',letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(255,165,60,0.7)'}}>Portfolio</div>
      </div>
      <div style={{width:'min(320px,70vw)',marginBottom:'1.2rem'}}>
        <div style={{height:'1px',background:'rgba(255,255,255,0.08)',borderRadius:'1px',overflow:'hidden'}}>
          <div style={{height:'100%',width:`${progress}%`,background:'linear-gradient(90deg,rgba(255,120,30,0.9),rgba(255,200,80,0.8))',transition:'width 0.1s linear',boxShadow:'0 0 10px rgba(255,165,60,0.6)'}}/>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',width:'min(320px,70vw)'}}>
        <span style={{fontSize:'0.6rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.3)'}}>{labels[phase]}</span>
        <span style={{fontSize:'0.6rem',color:'rgba(255,165,60,0.7)'}}>{progress}%</span>
      </div>
    </div>
  );
}
