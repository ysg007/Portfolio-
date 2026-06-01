'use client';
import { useEffect, useRef } from 'react';
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot=dotRef.current!,ring=ringRef.current!;
    let mx=0,my=0,rx=0,ry=0;
    let raf:number;
    const onMove=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;};
    window.addEventListener('mousemove',onMove);
    const tick=()=>{raf=requestAnimationFrame(tick);dot.style.left=mx+'px';dot.style.top=my+'px';rx+=(mx-rx)*0.1;ry+=(my-ry)*0.1;ring.style.left=rx+'px';ring.style.top=ry+'px';};
    tick();
    const selectors='h1,h2,h3,h4,p,span,a,button';
    const bindEl=(el:Element)=>{
      if((el as HTMLElement).dataset.cb)return;
      (el as HTMLElement).dataset.cb='1';
      el.addEventListener('mouseenter',()=>{
        const col=window.getComputedStyle(el).color;
        const isOrange=col.includes('255, 165')||col.includes('255, 120');
        const isWhite=col.includes('255, 255, 255');
        if(el.tagName==='BUTTON'||el.tagName==='A'){ring.style.transform='translate(-50%,-50%) scale(2.2)';ring.style.borderColor='rgba(255,165,60,1)';ring.style.boxShadow='0 0 18px rgba(255,165,60,0.6)';}
        else if(isOrange){ring.style.borderColor='rgba(255,165,60,1)';ring.style.boxShadow='0 0 14px rgba(255,165,60,0.7)';}
        else if(isWhite){ring.style.borderColor='rgba(255,165,60,0.85)';dot.style.background='rgba(255,200,80,1)';}
      });
      el.addEventListener('mouseleave',()=>{ring.style.transform='translate(-50%,-50%) scale(1)';ring.style.borderColor='rgba(255,255,255,0.45)';ring.style.boxShadow='none';dot.style.background='rgba(255,165,60,1)';});
      el.addEventListener('click',()=>{ring.style.transition='transform 0.35s ease,opacity 0.35s ease';ring.style.transform='translate(-50%,-50%) scale(3.5)';ring.style.opacity='0';setTimeout(()=>{ring.style.transition='transform 0.2s ease,border-color 0.2s,box-shadow 0.2s,opacity 0.1s';ring.style.transform='translate(-50%,-50%) scale(1)';ring.style.opacity='1';},350);});
    };
    document.querySelectorAll(selectors).forEach(bindEl);
    const obs=new MutationObserver(()=>document.querySelectorAll(selectors).forEach(bindEl));
    obs.observe(document.body,{childList:true,subtree:true});
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('mousemove',onMove);obs.disconnect();};
  },[]);
  return(<>
    <div ref={ringRef} style={{position:'fixed',pointerEvents:'none',zIndex:10000,width:'30px',height:'30px',borderRadius:'50%',border:'1px solid rgba(255,255,255,0.45)',transform:'translate(-50%,-50%)',transition:'transform 0.22s ease,border-color 0.22s,box-shadow 0.22s,opacity 0.1s'}}/>
    <div ref={dotRef} style={{position:'fixed',pointerEvents:'none',zIndex:10001,width:'5px',height:'5px',borderRadius:'50%',background:'rgba(255,165,60,1)',transform:'translate(-50%,-50%)',boxShadow:'0 0 8px rgba(255,165,60,0.9)',transition:'background 0.2s,box-shadow 0.2s'}}/>
  </>);
}
