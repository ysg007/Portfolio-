'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/VideoIntro.module.css';
const CinematicLayer = dynamic(() => import('./CinematicLayer'), { ssr: false });
const NgCarousel = dynamic(() => import('./NgCarousel'), { ssr: false });
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });
const CertificatesSection = dynamic(() => import('./CertificatesSection'), { ssr: false });
const IconPlay   = () => <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>;
const IconPause  = () => <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>;
const IconMute   = () => <svg viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/></svg>;
const IconUnmute = () => <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/></svg>;
const ROLES=['Software Developer','Cybersecurity Enthusiast','AI & Cloud Explorer','Full Stack Developer','Problem Solver'];
const SKILLS=[{name:'React / Next.js',pct:85},{name:'Node.js / Express',pct:80},{name:'Python / AI-ML',pct:75},{name:'Java',pct:78},{name:'Cloud / DevOps',pct:65},{name:'SQL / MongoDB',pct:72},{name:'Linux / Bash',pct:70},{name:'Cybersecurity',pct:68}];
const EXPERIENCE=[{year:'Jun–Jul 2025',role:'Summer Internship',org:'Medi-Caps University',type:'Internship · Indore, MP',desc:'Focused on Next-Generation Cybersecurity solutions using Palo Alto Networks technologies. Hands-on experience in network security, threat detection, and SOC operations.',tags:['Palo Alto Networks','Network Security','Cybersecurity','SOC']}];
const EDUCATION=[{year:'2022–2026',degree:'B.Tech — Computer Science & Engineering',org:'Medi-Caps University, Indore',detail:'Final Year Student'},{year:'2021',degree:'12th — MP Board',org:'Higher Secondary Education',detail:'Science Stream'},{year:'2018',degree:'10th — MP Board',org:'Secondary Education',detail:'88% — Academic Excellence Award'}];
const CERTIFICATES=[{name:'HCL Full Stack Developer with AI Program',org:'HCL Technologies',date:'Feb–May 2026',duration:'240 hrs',color:'rgba(0,180,255,0.08)'},{name:'Cybersecurity Fundamental Apprentice',org:'Palo Alto Networks',date:'Jun 2025',color:'rgba(255,100,50,0.08)'},{name:'Security Operations Fundamental Apprentice',org:'Palo Alto Networks',date:'Jun 2025',color:'rgba(255,100,50,0.08)'},{name:'Network Security Apprentice',org:'Palo Alto Networks',date:'Jun 2025',color:'rgba(255,100,50,0.08)'},{name:'Cloud Security Fundamental Apprentice',org:'Palo Alto Networks',date:'Jun 2025',color:'rgba(255,100,50,0.08)'},{name:'BASH',org:'IIT Bombay',date:'Nov 2025',detail:'Shell Scripting',color:'rgba(100,200,100,0.08)'},{name:'Git Training',org:'IIT Bombay',date:'May 2025',detail:'Git Commands, Workflow, Branching',color:'rgba(100,200,100,0.08)'},{name:'Linux Training',org:'IIT Bombay',date:'Jan 2025',detail:'Credential: 4026520B1A',color:'rgba(100,200,100,0.08)'},{name:'Data Analytics Job Simulation',org:'Deloitte',date:'Apr 2026',color:'rgba(100,120,255,0.08)'},{name:'Cyber Job Simulation',org:'Deloitte',date:'Jul 2025',color:'rgba(100,120,255,0.08)'}];
const VOLUNTEERING=[{role:'Student Volunteer',org:'National Service Scheme (NSS)',period:'Sep 2023 – Present · 2+ yrs',desc:'Active social service volunteer contributing to community development programs.'},{role:'Patriotic Youth Ambassador',org:'Veterans India',period:'Jun 2024 – Jun 2025 · 1 yr',desc:'Inducted as Ambassador in the Volunteer Patriotic Reserve Force (VPRF) under Veterans India.'}];
const ACHIEVEMENTS=[{icon:'🏆',title:'Academic Excellence Award',org:'Dainik Bhaskar Group',year:'2018',desc:"Awarded for exemplary performance in Class 10th Board — 88% score, top position."},{icon:'🎓',title:'SPURTHI CAMP',org:'MANIT Bhopal (NIT)',year:'Mar 2023',desc:"Completed intensive 3-day technical program at one of India's premier institutes."},{icon:'🌐',title:'Heritage Quiz',org:'MyGov India',year:'Apr 2023',desc:'Participated in national-level heritage awareness quiz by Government of India.'}];
const COUNTERS=[{end:10,suffix:'+',label:'Certificates'},{end:2,suffix:'+',label:'Yrs Volunteer'},{end:240,suffix:'hrs',label:'HCL Training'},{end:5,suffix:'+',label:'Projects'}];
const PROJECT_DETAILS=[
  {num:'01',name:'NotesGenie',longDesc:'NotesGenie is an intelligent academic note management platform designed to help college students store, organize, summarize, and retrieve study material. It features an AI Assistant that answers questions, summarizes notes, and predicts exam questions. Includes subject-wise organization, PYQs, offline access, and DRM protection.',tags:['React','Node.js','MongoDB','AI/NLP','Express','JWT','DRM'],features:['AI-powered study assistant','Subject-wise notes organization','Previous Year Questions (PYQs)','Offline access support','DRM content protection','Semester-wise subscriptions','Contribute and share materials','Smart search and retrieval'],showCarousel:true},
  {num:'02',name:'Coming Soon',longDesc:'Currently working on exciting new projects involving AI, cloud computing, and full-stack development. These projects aim to solve real-world problems using modern technologies.',tags:['In Progress','2025-26','AI','Cloud'],features:['AI Integration','Cloud Computing','Full Stack Development','Problem Solving'],showCarousel:false}
];
function CounterCard({end,suffix,label,visible}:{end:number,suffix:string,label:string,visible:boolean}){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    if(!visible)return;
    let cur=0;const step=end/60;
    const t=setInterval(()=>{cur+=step;if(cur>=end){setVal(end);clearInterval(t);}else{setVal(Math.floor(cur));}},25);
    return()=>clearInterval(t);
  },[visible,end]);
  return(<div className={styles.counterCard}><span className={styles.counterNum}>{val}{suffix}</span><span className={styles.counterLabel}>{label}</span></div>);
}
export default function VideoIntro() {
  const mainVideoRef=useRef<HTMLVideoElement>(null),ambientRef=useRef<HTMLVideoElement>(null);
  const veilRef=useRef<HTMLDivElement>(null),taglineRef=useRef<HTMLDivElement>(null);
  const firstNameRef=useRef<HTMLDivElement>(null),lastNameRef=useRef<HTMLDivElement>(null);
  const roleRef=useRef<HTMLDivElement>(null),controlsRef=useRef<HTMLDivElement>(null);
  const scrollRef=useRef<HTMLDivElement>(null),nextSectionRef=useRef<HTMLDivElement>(null);
  const skillsRef=useRef<(HTMLDivElement|null)[]>([]);
  const tiltRefs=useRef<(HTMLDivElement|null)[]>([]);
  const sectionRefs=useRef<(HTMLDivElement|null)[]>([]);
  const [isPlaying,setIsPlaying]=useState(true),[isMuted,setIsMuted]=useState(true);
  const [showHint,setShowHint]=useState(true),[roleIdx,setRoleIdx]=useState(0);
  const [displayed,setDisplayed]=useState(''),[skillsVisible,setSkillsVisible]=useState(false);
  const [countersVisible,setCountersVisible]=useState(false);
  const [activeModal,setActiveModal]=useState<number|null>(null);
  const [formData,setFormData]=useState({name:'',email:'',message:''});
  const [formStatus,setFormStatus]=useState<'idle'|'sending'|'sent'>('idle');
  useEffect(()=>{let t:ReturnType<typeof setTimeout>;const cur=ROLES[roleIdx];let i=0;setDisplayed('');const type=()=>{if(i<=cur.length){setDisplayed(cur.slice(0,i));i++;t=setTimeout(type,68);}else{t=setTimeout(()=>setRoleIdx(p=>(p+1)%ROLES.length),2200);}};t=setTimeout(type,400);return()=>clearTimeout(t);},[roleIdx]);
  useEffect(()=>{
    const run=async()=>{
      const {gsap}=await import('gsap');
      const {ScrollTrigger}=await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const tl=gsap.timeline({defaults:{ease:'power3.out'}});
      tl.to(veilRef.current,{opacity:0,duration:1.8,ease:'power2.inOut'}).addLabel('c','-=0.7');
      tl.to(taglineRef.current,{opacity:1,y:0,duration:1.0},'c');
      tl.to(firstNameRef.current,{opacity:1,y:0,duration:1.1},'c+=0.15');
      tl.to(lastNameRef.current,{opacity:1,y:0,duration:1.1},'c+=0.3');
      tl.to(roleRef.current,{opacity:1,y:0,duration:0.9},'c+=0.5');
      tl.to(controlsRef.current,{opacity:1,y:0,duration:0.7},'c+=0.6');
      tl.to(scrollRef.current,{opacity:1,duration:0.9},'c+=0.9');
      sectionRefs.current.forEach(sec=>{if(!sec)return;gsap.fromTo(sec.querySelectorAll('[data-reveal]'),{opacity:0,y:55},{opacity:1,y:0,duration:0.95,stagger:0.13,ease:'power3.out',scrollTrigger:{trigger:sec,start:'top 78%'}});});
      ScrollTrigger.create({trigger:'#about',start:'top 60%',onEnter:()=>setSkillsVisible(true)});
      ScrollTrigger.create({trigger:'#counters',start:'top 80%',onEnter:()=>setCountersVisible(true)});
    };
    run();
  },[]);
  useEffect(()=>{if(!skillsVisible)return;skillsRef.current.forEach((el,i)=>{if(!el)return;const bar=el.querySelector('[data-bar]') as HTMLElement;if(bar)setTimeout(()=>{bar.style.width=bar.getAttribute('data-pct')+'%';},i*100);});},[skillsVisible]);
  useEffect(()=>{const cleanup:Array<()=>void>=[];tiltRefs.current.forEach(card=>{if(!card)return;const onMove=(e:MouseEvent)=>{const r=card.getBoundingClientRect();const cx=(e.clientX-r.left)/r.width-0.5,cy=(e.clientY-r.top)/r.height-0.5;card.style.transform=`perspective(900px) rotateY(${cx*12}deg) rotateX(${-cy*8}deg) translateY(-5px)`;card.style.boxShadow=`${-cx*16}px ${cy*16}px 35px rgba(255,165,60,0.1)`;};const onLeave=()=>{card.style.transform='perspective(900px) rotateY(0) rotateX(0) translateY(0)';card.style.boxShadow='none';};card.addEventListener('mousemove',onMove);card.addEventListener('mouseleave',onLeave);cleanup.push(()=>{card.removeEventListener('mousemove',onMove);card.removeEventListener('mouseleave',onLeave);});});return()=>cleanup.forEach(f=>f());},[]);
  useEffect(()=>{const t=setTimeout(()=>setShowHint(false),5000);return()=>clearTimeout(t);},[]);
  const togglePlay=useCallback(()=>{const v=mainVideoRef.current,a=ambientRef.current;if(!v)return;if(v.paused){v.play();a?.play();setIsPlaying(true);}else{v.pause();a?.pause();setIsPlaying(false);};},[]);
  const toggleMute=useCallback(()=>{const v=mainVideoRef.current;if(!v)return;v.muted=!v.muted;setIsMuted(v.muted);setShowHint(false);},[]);
  const handleSubmit=useCallback(async(e:React.FormEvent)=>{e.preventDefault();setFormStatus('sending');await new Promise(r=>setTimeout(r,1500));window.location.href=`mailto:yashsgehlot1412@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;setFormStatus('sent');setTimeout(()=>setFormStatus('idle'),3000);},[formData]);
  return (<>
    <section className={styles.hero}>
      <div ref={veilRef} className={styles.veil}/>
      <video ref={ambientRef} className={styles.ambientBg} src="/hero.mp4" autoPlay loop muted playsInline/>
      <div className={styles.videoWrap}><video ref={mainVideoRef} className={styles.mainVideo} src="/hero.mp4" autoPlay loop muted playsInline/></div>
      <div className={styles.gradientTop}/><div className={styles.gradientBottom}/><div className={styles.gradientSides}/>
      <CinematicLayer/>
      <div ref={controlsRef} className={styles.controls}>
        <button className={styles.glassBtn} onClick={togglePlay}>{isPlaying?<IconPause/>:<IconPlay/>}</button>
        <button className={styles.glassBtn} onClick={toggleMute}>{isMuted?<IconMute/>:<IconUnmute/>}</button>
      </div>
      <div className={styles.content}>
        <div ref={taglineRef} className={styles.tagline}>B.Tech CSE &nbsp;·&nbsp; Medi-Caps University &nbsp;·&nbsp; 2026</div>
        <div className={styles.nameWrap}>
          <div ref={firstNameRef} className={styles.firstName}>Yash</div>
          <div ref={lastNameRef} className={styles.lastName}>Gehlot</div>
        </div>
        <div ref={roleRef} className={styles.roleWrap}>
          <span className={styles.role}><span className={styles.typewriter}>{displayed}</span><span className={styles.cursor}>|</span></span>
          <span className={styles.role} style={{opacity:0.42,fontSize:'0.78em',marginTop:'0.4rem',display:'block'}}>Aspiring Software Engineer · Indore, Madhya Pradesh</span>
        </div>
      </div>
      <div className={`${styles.soundHint} ${!showHint?styles.hidden:''}`}><span className={styles.soundDot}/>Tap for sound</div>
      <div ref={scrollRef} className={styles.scrollIndicator} onClick={()=>nextSectionRef.current?.scrollIntoView({behavior:'smooth'})} role="button">
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollTrack}><div className={styles.scrollLine}/></div>
      </div>
    </section>
    <div id="about" ref={el=>{nextSectionRef.current=el;sectionRefs.current[0]=el;}} className={styles.aboutSection}>
      <div className={styles.aboutInner}>
        <div className={styles.aboutLeft}>
          <span data-reveal className={styles.sectionTag}>About Me</span>
          <h2 data-reveal className={styles.aboutTitle}>Passionate.<br/>Driven.<br/>Builder.</h2>
          <div data-reveal className={styles.aboutDivider}/>
          <p data-reveal className={styles.aboutText}>I am a Computer Science Engineering student at <span className={styles.highlight}>Medi-Caps University, Indore</span>, currently in my Final Year (2022–2026). Strong foundation in programming, problem-solving, and emerging technologies.</p>
          <p data-reveal className={styles.aboutText}>I thrive on learning new technologies — building scalable applications, solving complex problems, and exploring AI and cybersecurity.</p>
          <div data-reveal className={styles.skillsWrap}>
            <span className={styles.skillsLabel}>Technical Skills</span>
            {SKILLS.map((s,i)=>(<div key={s.name} ref={el=>{skillsRef.current[i]=el;}} className={styles.skillRow}><div className={styles.skillMeta}><span className={styles.skillName}>{s.name}</span><span className={styles.skillPct}>{s.pct}%</span></div><div className={styles.skillTrack}><div data-bar data-pct={s.pct} className={styles.skillBar} style={{width:0}}/></div></div>))}
          </div>
        </div>
        <div className={styles.aboutRight}>
          {COUNTERS.map((c,i)=>(<div key={i} data-reveal><CounterCard end={c.end} suffix={c.suffix} label={c.label} visible={countersVisible}/></div>))}
        </div>
      </div>
    </div>
    <div id="counters" style={{height:0}}/>
    <div ref={el=>{sectionRefs.current[1]=el;}} className={styles.timelineSection}>
      <div className={styles.timelineInner}>
        <div className={styles.timelineCol}>
          <span data-reveal className={styles.sectionTag}>Experience</span>
          <h2 data-reveal className={styles.timelineTitle}>Work</h2>
          {EXPERIENCE.map((e,i)=>(<div data-reveal key={i} className={styles.timelineCard}><div className={styles.timelineDot}/><div className={styles.timelineYear}>{e.year}</div><h3 className={styles.timelineRole}>{e.role}</h3><div className={styles.timelineOrg}>{e.org} · {e.type}</div><p className={styles.timelineDesc}>{e.desc}</p><div className={styles.tagRow}>{e.tags.map(t=><span key={t} className={styles.tag}>{t}</span>)}</div></div>))}
          <span data-reveal className={styles.sectionTag} style={{marginTop:'3rem'}}>Volunteering</span>
          {VOLUNTEERING.map((v,i)=>(<div data-reveal key={i} className={styles.timelineCard}><div className={styles.timelineDot}/><div className={styles.timelineYear}>{v.period}</div><h3 className={styles.timelineRole}>{v.role}</h3><div className={styles.timelineOrg}>{v.org}</div><p className={styles.timelineDesc}>{v.desc}</p></div>))}
        </div>
        <div className={styles.timelineCol}>
          <span data-reveal className={styles.sectionTag}>Education</span>
          <h2 data-reveal className={styles.timelineTitle}>Study</h2>
          {EDUCATION.map((e,i)=>(<div data-reveal key={i} className={styles.timelineCard}><div className={styles.timelineDot}/><div className={styles.timelineYear}>{e.year}</div><h3 className={styles.timelineRole}>{e.degree}</h3><div className={styles.timelineOrg}>{e.org}</div><p className={styles.timelineDesc}>{e.detail}</p></div>))}
          <span data-reveal className={styles.sectionTag} style={{marginTop:'3rem'}}>Achievements</span>
          {ACHIEVEMENTS.map((a,i)=>(<div data-reveal key={i} className={styles.achieveCard}><span className={styles.achieveIcon}>{a.icon}</span><div><div className={styles.achieveTitle}>{a.title}</div><div className={styles.achieveOrg}>{a.org} · {a.year}</div><div className={styles.achieveDesc}>{a.desc}</div></div></div>))}
        </div>
      </div>
    </div>
    <CertificatesSection/>
<div ref={el=>{sectionRefs.current[2]=el;}} className={styles.certSection} style={{display:'none'}}>
      <div className={styles.certInner}>
        <span data-reveal className={styles.sectionTag}>Certifications</span>
        <h2 data-reveal className={styles.certTitle}>Credentials</h2>
        <div className={styles.certGrid}>
          {CERTIFICATES.map((c,i)=>(<div data-reveal key={i} ref={el=>{tiltRefs.current[i+2]=el;}} className={styles.certCard} style={{background:c.color}}><div className={styles.certOrg}>{c.org}</div><div className={styles.certName}>{c.name}</div>{c.detail&&<div className={styles.certDetail}>{c.detail}</div>}<div className={styles.certDate}>{c.date}{c.duration?` · ${c.duration}`:''}</div></div>))}
        </div>
      </div>
    </div>
    <div ref={el=>{sectionRefs.current[3]=el;}} className={styles.projectsSection}>
      <div className={styles.projectsInner}>
        <span data-reveal className={styles.sectionTag}>Projects</span>
        <h2 data-reveal className={styles.projectsTitle}>What I Built</h2>
        <div className={styles.projectsGrid}>
          <div data-reveal ref={el=>{tiltRefs.current[0]=el;}} onClick={()=>setActiveModal(0)} className={styles.projectCard} style={{transition:'transform 0.18s ease,box-shadow 0.18s ease,border-color 0.4s',flexDirection:'column',gap:'1.2rem',cursor:'pointer'}}>
            <NgCarousel/>
            <div className={styles.projectContent}>
              <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'0.9rem'}}>
                <span className={styles.projectNum}>01</span>
                <h3 className={styles.projectName} style={{margin:0}}>NotesGenie</h3>
              </div>
              <p className={styles.projectDesc}>Intelligent academic note management platform — AI Assistant, PYQs, subject-wise notes, offline access, and DRM protection.</p>
              <div className={styles.projectTags}>{['AI','React','Node.js','NLP','MongoDB','DRM'].map(t=><span key={t}>{t}</span>)}</div>
            </div>
          </div>
          <div data-reveal ref={el=>{tiltRefs.current[1]=el;}} onClick={()=>setActiveModal(1)} className={styles.projectCard} style={{transition:'transform 0.18s ease,box-shadow 0.18s ease,border-color 0.4s',alignItems:'center',justifyContent:'center',minHeight:'300px',cursor:'pointer'}}>
            <div className={styles.projectContent} style={{textAlign:'center'}}>
              <div className={styles.projectNum} style={{textAlign:'center',marginBottom:'1rem'}}>02</div>
              <h3 className={styles.projectName}>Coming Soon</h3>
              <p className={styles.projectDesc}>Building exciting new projects in AI, cloud computing, and full-stack development.</p>
              <div className={styles.projectTags}>{['In Progress','2025–26'].map(t=><span key={t}>{t}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref={el=>{sectionRefs.current[4]=el;}} className={styles.contactSection}>
      <div className={styles.contactInner}>
        <span data-reveal className={styles.sectionTag}>Contact</span>
        <h2 data-reveal className={styles.contactTitle}>Let&apos;s Connect</h2>
        <p data-reveal className={styles.contactSub}>Open to internships, collaborations &amp; full-time opportunities</p>
        <div data-reveal className={styles.contactLinks}>
          <a href="mailto:yashsgehlot1412@gmail.com" className={styles.contactBtn}>Email Me</a>
          <a href="https://www.linkedin.com/in/yash-singh-gehlot-3a2825339" target="_blank" rel="noreferrer" className={styles.contactBtnOutline}>LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.contactBtnOutline}>GitHub</a>
        </div>
        <form data-reveal onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formRow}>
            <input className={styles.formInput} type="text" placeholder="Your Name" required value={formData.name} onChange={e=>setFormData(p=>({...p,name:e.target.value}))}/>
            <input className={styles.formInput} type="email" placeholder="Your Email" required value={formData.email} onChange={e=>setFormData(p=>({...p,email:e.target.value}))}/>
          </div>
          <textarea className={styles.formTextarea} placeholder="Your Message..." required rows={4} value={formData.message} onChange={e=>setFormData(p=>({...p,message:e.target.value}))}/>
          <button type="submit" className={styles.formBtn} disabled={formStatus==='sending'}>
            {formStatus==='idle'?'Send Message':formStatus==='sending'?'Sending...':'Sent! ✓'}
          </button>
        </form>
        <p data-reveal className={styles.contactFooter}>Crafted with code &amp; cinema · Yash Gehlot © 2026</p>
      </div>
    </div>
    {activeModal!==null && <ProjectModal project={PROJECT_DETAILS[activeModal]} onClose={()=>setActiveModal(null)}/>}
  </>);
}
