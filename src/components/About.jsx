import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────── */
const YELLOW = "#FFD600";

const STATS = [
  { val: 12000, suffix: "+",   label: "Workers Listed",     icon: "👷", color: "#FFD600" },
  { val: 8,     suffix: "+",   label: "Service Categories", icon: "🔧", color: "#38BDF8" },
  { val: 4.7,   suffix: "★",   label: "Avg. Rating",        icon: "⭐", color: "#FBBF24", dec: 1 },
  { val: 8,     suffix: " min",label: "Avg. Booking",       icon: "⚡", color: "#00E676" },
];

const TESTIMONIALS = [
  { name:"Meera S.",  city:"Jaipur",  service:"AC Repair",   quote:"Found a technician in 10 minutes. Fixed everything, paid after. No drama whatsoever.", rating:5, av:"M", color:"#38BDF8" },
  { name:"Amit K.",   city:"Mumbai",  service:"Plumbing",    quote:"The plumber arrived on time, professional, and the price was exactly as shown. Perfect.", rating:5, av:"A", color:"#FFD600" },
  { name:"Sunita R.", city:"Pune",    service:"Maid",        quote:"I've been booking through Shramik for 3 months now. Total peace of mind every single time.", rating:5, av:"S", color:"#00E676" },
  { name:"Ravi M.",   city:"Delhi",   service:"Electrician", quote:"As a worker, I get steady jobs without any middleman taking a cut from my earnings.", rating:5, av:"R", color:"#FB923C" },
];

const HOW = [
  { step:"01", icon:"📍", title:"Enter Location",  desc:"We surface verified workers near you instantly — no calls, no guessing." },
  { step:"02", icon:"🔧", title:"Choose Service",  desc:"Pick from 20+ home services. Every category, one clean platform." },
  { step:"03", icon:"👷", title:"Pick a Worker",   desc:"Browse profiles, read real reviews, choose who you trust." },
  { step:"04", icon:"✅", title:"Pay After Work",  desc:"Job done to your satisfaction? Only then you pay. Zero risk." },
];

/* ── Animated counter ─────────────────────────────────────────── */
function AnimCounter({ to, suffix = "", dec = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const st = ScrollTrigger.create({
      trigger: node, start: "top 88%", once: true,
      onEnter: () => {
        const t0 = performance.now(), dur = 2200;
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 4);
          node.textContent = (dec ? (e * to).toFixed(dec) : Math.floor(e * to)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
    });
    return () => st.kill();
  }, [to, suffix, dec]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ── Mouse-tilt card ──────────────────────────────────────────── */
function TiltCard({ children, style }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useTransform(my, [-80, 80], [5, -5]);
  const ry = useTransform(mx, [-80, 80], [-5, 5]);
  return (
    <motion.div
      style={{ ...style, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ── Grain texture ────────────────────────────────────────────── */
function Grain({ op = 0.028 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      opacity: op, animation: "grainShift .5s steps(1) infinite",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function About() {
  const secRef  = useRef();
  const howRef  = useRef();
  const [activeT, setActiveT] = useState(0);
  const [hovStep, setHovStep] = useState(-1);

  useEffect(() => {
    const id = setInterval(() => setActiveT(p => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* heading letters */
      gsap.from(".ab-ch", {
        scrollTrigger: { trigger: ".ab-h2", start: "top 86%" },
        y: 90, opacity: 0, rotateX: -80,
        stagger: { each: 0.036, ease: "power2.out" },
        duration: 0.82, ease: "power4.out",
      });

      /* sub elements staggered */
      gsap.from(".ab-sub", {
        scrollTrigger: { trigger: ".ab-h2", start: "top 80%" },
        y: 28, opacity: 0, stagger: 0.15, duration: 1.1, ease: "power3.out",
      });

      /* columns slide in */
      gsap.from(".ab-left", {
        scrollTrigger: { trigger: secRef.current, start: "top 74%" },
        x: -75, opacity: 0, duration: 1.5, ease: "power4.out",
      });
      gsap.from(".ab-right", {
        scrollTrigger: { trigger: secRef.current, start: "top 74%" },
        x: 75, opacity: 0, duration: 1.5, ease: "power4.out",
      });

      /* quote bar wipe */
      gsap.from(".ab-qbar", {
        scrollTrigger: { trigger: ".ab-quote", start: "top 87%" },
        scaleY: 0, duration: 0.9, ease: "power3.out", transformOrigin: "top",
      });
      gsap.from(".ab-qtxt", {
        scrollTrigger: { trigger: ".ab-quote", start: "top 87%" },
        x: -18, opacity: 0, duration: 1, ease: "power3.out", delay: 0.15,
      });

      /* two-side box */
      gsap.from(".ab-twobox", {
        scrollTrigger: { trigger: ".ab-twobox", start: "top 87%" },
        y: 38, opacity: 0, scale: 0.96, duration: 0.9, ease: "power4.out",
      });

      /* stats cards */
      gsap.from(".ab-stat", {
        scrollTrigger: { trigger: ".ab-stats", start: "top 82%" },
        y: 55, opacity: 0, scale: 0.84,
        stagger: 0.1, duration: 0.9, ease: "back.out(1.8)",
      });

      /* testimonials section */
      gsap.from(".ab-tsec", {
        scrollTrigger: { trigger: ".ab-tsec", start: "top 84%" },
        y: 55, opacity: 0, duration: 1.2, ease: "power4.out",
      });

      /* how-it-works cards */
      gsap.from(".ab-hwcard", {
        scrollTrigger: { trigger: howRef.current, start: "top 78%" },
        y: 80, opacity: 0, scale: 0.88, rotateX: 8,
        stagger: { each: 0.13, ease: "power2.out" },
        duration: 1, ease: "power4.out",
      });
      gsap.from(".ab-hwline", {
        scrollTrigger: { trigger: howRef.current, start: "top 78%" },
        scaleX: 0, duration: 2.2, ease: "power4.inOut", transformOrigin: "left",
      });

    }, secRef);
    return () => ctx.revert();
  }, []);

  /* ─────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          §1 — STORY + BOOKING CARD
      ══════════════════════════════════════════════════════ */}
      <section ref={secRef} style={S.s1}>
        <Grain />
        <div style={S.s1GlowTL} />
        <div style={S.s1GlowBR} />
        <div style={S.s1Diag}   />
        <div style={S.slashLine} />

        <div style={S.inner}>
          {/* ── LEFT ── */}
          <div className="ab-left" style={S.left}>

            <div className="ab-sub" style={S.labelPill}>
              <span style={S.blip} /> OUR STORY
            </div>

            <h2 className="ab-h2" style={S.h2}>
              {"Built for".split("").map((c, i) => (
                <span key={i} className="ab-ch"
                  style={{ display:"inline-block", whiteSpace: c===" "?"pre":"normal" }}>
                  {c===" " ? "\u00A0" : c}
                </span>
              ))}
              <br />
              {"Real India.".split("").map((c, i) => (
                <span key={"y"+i} className="ab-ch"
                  style={{ display:"inline-block", color: YELLOW }}>
                  {c}
                </span>
              ))}
            </h2>

            <div className="ab-sub" style={S.divider} />

            <p className="ab-sub" style={S.body}>
              Every day, millions of households struggle to find a reliable plumber or
              electrician — while millions of skilled workers struggle to find consistent
              jobs. That gap is exactly why Shramik exists.
            </p>
            <p className="ab-sub" style={S.body}>
              We built a simple, mobile-first platform where anyone can book a trusted
              home service worker nearby — and where workers earn steadily without
              middlemen eating their wages.
            </p>

            {/* two-sided value */}
            <div className="ab-twobox" style={S.twoBox}>
              <div style={S.twoSide}>
                <div style={S.twoRow}>
                  <span style={S.twoEmoji}>🏠</span>
                  <div style={{ ...S.twoBar, background:"#38BDF8" }} />
                </div>
                <div style={S.twoTitle}>For Households</div>
                <div style={S.twoDesc}>Book any service from verified workers. Pay only after the job is done to your satisfaction.</div>
                <div style={{ ...S.twoStat, color:"#38BDF8" }}>20+ services · fixed pricing</div>
              </div>
              <div style={S.twoDivide} />
              <div style={S.twoSide}>
                <div style={S.twoRow}>
                  <span style={S.twoEmoji}>👷</span>
                  <div style={{ ...S.twoBar, background: YELLOW }} />
                </div>
                <div style={S.twoTitle}>For Workers</div>
                <div style={S.twoDesc}>Get consistent job requests nearby. Earn more every day without paying any commission.</div>
                <div style={{ ...S.twoStat, color: YELLOW }}>₹0 broker cuts · ever</div>
              </div>
            </div>

            {/* pull-quote */}
            <div className="ab-quote" style={S.quoteWrap}>
              <div className="ab-qbar" style={S.quoteBar} />
              <div className="ab-qtxt">
                <p style={S.quoteText}>"Skill should speak — not background, not broker."</p>
                <span style={S.quoteAuth}>— Shramik Founding Team</span>
              </div>
            </div>

            <motion.button
              className="ab-sub"
              whileHover={{ scale:1.04, boxShadow:"0 0 55px rgba(255,214,0,0.44)" }}
              whileTap={{ scale:0.97 }}
              style={S.cta}
            >
              Learn More About Us →
            </motion.button>
          </div>

          {/* ── RIGHT — depth-stacked booking card ── */}
          <div className="ab-right" style={S.right}>
            <div style={S.watermark}>HOW</div>
            <div style={S.d3} />
            <div style={S.d2} />
            <div style={S.d1} />

            <TiltCard style={S.tiltWrap}>
              <div style={S.card}>
                <div style={S.cardTopAccent} />

                <div style={S.cardHead}>
                  <div style={S.pulse}><div style={S.pulseCore} /></div>
                  <span style={S.cardHeadTxt}>HOW A BOOKING WORKS</span>
                  <span style={S.etaPill}>~25 min avg</span>
                </div>

                {[
                  { n:"1", icon:"📍", title:"Enter Location",  sub:"Workers near you instantly"  },
                  { n:"2", icon:"🔧", title:"Pick a Service",  sub:"20+ categories available"    },
                  { n:"3", icon:"👷", title:"Choose Worker",   sub:"Verified, rated profiles"    },
                  { n:"4", icon:"✅", title:"Pay After Work",  sub:"No advance · zero risk"      },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      ...S.stepRow,
                      background: hovStep===i ? "rgba(255,214,0,0.06)" : "transparent",
                      borderRadius: "12px", transition: "background .25s",
                    }}
                    onMouseEnter={() => setHovStep(i)}
                    onMouseLeave={() => setHovStep(-1)}
                  >
                    <div style={{
                      ...S.stepBub,
                      boxShadow: hovStep===i ? "0 0 18px rgba(255,214,0,0.42)" : "none",
                      transition: "box-shadow .3s",
                    }}>
                      {item.n}
                    </div>
                    <span style={{ fontSize:"18px", flexShrink:0 }}>{item.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={S.stepTitle}>{item.title}</div>
                      <div style={S.stepSub}>{item.sub}</div>
                    </div>
                    {hovStep===i && <span style={S.stepCheck}>✓</span>}
                    {i < 3 && <div style={S.stepVLine} />}
                  </div>
                ))}

                <div style={S.cardFoot}>
                  <span style={S.footTag}>✅ Pay after work done</span>
                  <span style={S.footTag}>🛡️ ID-verified workers</span>
                </div>
              </div>
            </TiltCard>

            <motion.div
              initial={{ x:28, opacity:0 }}
              animate={{ x:0, opacity:1 }}
              transition={{ delay:0.9, type:"spring", stiffness:120 }}
              style={S.liveBadge}
            >
              <div style={S.liveDot} />
              <span style={S.liveTxt}>12 workers active near you</span>
            </motion.div>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="ab-stats" style={S.statsRow}>
          {STATS.map((s, i) => (
            <div key={i} className="ab-stat" style={{ ...S.statItem, borderColor:`${s.color}18` }}>
              <div style={{ ...S.statIcon, background:`${s.color}10`, border:`1px solid ${s.color}22` }}>
                <span style={{ fontSize:"22px" }}>{s.icon}</span>
              </div>
              <span style={{ ...S.statVal, color: s.color }}>
                <AnimCounter to={s.val} suffix={s.suffix} dec={s.dec||0} />
              </span>
              <span style={S.statLbl}>{s.label}</span>
            </div>
          ))}
        </div>

        <style>{KF}</style>
      </section>

      {/* ══════════════════════════════════════════════════════
          §2 — TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section style={S.tSec}>
        <div style={S.tGrid} />
        <div style={S.tGlow} />

        <div className="ab-tsec" style={S.tHead}>
          <div style={S.tPill}>
            <span style={{ ...S.blip, background:"#FBBF24" }} /> REAL REVIEWS
          </div>
          <h2 style={S.tH2}>
            What People <span style={{ color: YELLOW }}>Say</span>
          </h2>
        </div>

        <div style={S.tLayout}>
          {/* featured big quote */}
          <motion.div
            key={activeT}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:"easeOut" }}
            style={S.tFeat}
          >
            <div style={S.bigQ}>"</div>
            <p style={S.bigQTxt}>{TESTIMONIALS[activeT].quote}</p>
            <div style={S.tMetaRow}>
              <div style={{
                ...S.tAvatar,
                background:`${TESTIMONIALS[activeT].color}18`,
                border:`1px solid ${TESTIMONIALS[activeT].color}40`,
                color: TESTIMONIALS[activeT].color,
              }}>
                {TESTIMONIALS[activeT].av}
              </div>
              <div>
                <div style={S.tName}>{TESTIMONIALS[activeT].name}</div>
                <div style={S.tCity}>{TESTIMONIALS[activeT].city} · {TESTIMONIALS[activeT].service}</div>
              </div>
              <div style={S.tStars}>{"★".repeat(TESTIMONIALS[activeT].rating)}</div>
            </div>
          </motion.div>

          {/* side cards */}
          <div style={S.tCards}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                onClick={() => setActiveT(i)}
                style={{
                  ...S.tCard,
                  borderColor: i===activeT ? `${t.color}44` : "rgba(255,255,255,0.04)",
                  background:  i===activeT ? `${t.color}08`  : "rgba(255,255,255,0.02)",
                  transform:   i===activeT ? "scale(1.02)"    : "scale(1)",
                  transition:  "all .35s ease", cursor:"pointer",
                }}
              >
                <div style={S.tcRow}>
                  <div style={{
                    ...S.tAvatar, width:"30px", height:"30px", fontSize:"13px",
                    background:`${t.color}14`, border:`1px solid ${t.color}35`, color:t.color,
                  }}>
                    {t.av}
                  </div>
                  <div>
                    <div style={{ ...S.tName, fontSize:"13px" }}>{t.name}</div>
                    <div style={{ ...S.tCity, fontSize:"10px" }}>{t.city} · {t.service}</div>
                  </div>
                </div>
                <p style={S.tcQ}>"{t.quote.slice(0,58)}…"</p>
                <div style={{ color:"#FBBF24", fontSize:"11px", letterSpacing:"2px" }}>
                  {"★".repeat(t.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.tDots}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} onClick={() => setActiveT(i)} style={{
              ...S.tDot,
              background: i===activeT ? YELLOW : "rgba(255,255,255,0.18)",
              width: i===activeT ? "22px" : "6px",
            }} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §3 — HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section ref={howRef} style={S.hSec}>
        <div style={S.hGrid} />
        <div style={S.hGlow} />
        <Grain op={0.02} />

        <div style={S.hHead}>
          <div style={S.hPill}>SIMPLE PROCESS</div>
          <h2 style={S.hH2}>
            How It <span style={{ color: YELLOW }}>Works</span>
          </h2>
          <p style={S.hSub}>Get a skilled worker at your door in 4 easy steps.</p>
        </div>

        {/* connecting line */}
        <div style={S.hLineWrap}>
          <div className="ab-hwline" style={S.hLine} />
        </div>

        <div style={S.hGrid2}>
          {HOW.map((h, i) => (
            <motion.div
              key={i}
              className="ab-hwcard"
              whileHover={{
                y: -12,
                borderColor: "rgba(255,214,0,0.38)",
                boxShadow: "0 44px 88px rgba(0,0,0,0.55), 0 0 44px rgba(255,214,0,0.08)",
              }}
              transition={{ duration: 0.35 }}
              style={S.hCard}
            >
              <div style={S.hNum}>{h.step}</div>
              <div style={S.hIconRing}>
                <div style={S.hIconInner}>
                  <span style={{ fontSize:"26px" }}>{h.icon}</span>
                </div>
              </div>
              <h3 style={S.hCardTitle}>{h.title}</h3>
              <p  style={S.hCardDesc}>{h.desc}</p>
              {i < HOW.length-1 && <div style={S.hDot} />}
            </motion.div>
          ))}
        </div>

        <div style={S.hCta}>
          <motion.button
            whileHover={{ scale:1.04, boxShadow:"0 0 55px rgba(255,214,0,0.42)" }}
            whileTap={{ scale:0.97 }}
            style={S.hPrimBtn}
          >
            Book a Service Now →
          </motion.button>
          <motion.button
            whileHover={{ borderColor: YELLOW, color: YELLOW }}
            whileTap={{ scale:0.97 }}
            style={S.hSecBtn}
          >
            Join as a Worker
          </motion.button>
        </div>
      </section>
    </>
  );
}

/* ── CSS keyframes ────────────────────────────────────────────── */
const KF = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700;900&display=swap');
  @keyframes grainShift {
    0%,100%{transform:translate(0,0);}
    25%{transform:translate(-2px,2px);}
    50%{transform:translate(2px,-2px);}
    75%{transform:translate(-1px,-1px);}
  }
  @keyframes blipAnim {
    0%,100%{opacity:1;transform:scale(1);}
    50%{opacity:0.25;transform:scale(0.6);}
  }
  @keyframes pulseOut {
    0%{transform:scale(1);opacity:.9;}
    100%{transform:scale(2.5);opacity:0;}
  }
  .ab-ch,.ab-sub{will-change:transform,opacity;}
  .ab-stat:hover{transform:translateY(-7px)!important;box-shadow:0 22px 55px rgba(0,0,0,.45)!important;}
`;

/* ── Styles ───────────────────────────────────────────────────── */
const S = {
  /* §1 */
  s1:{
    position:"relative",padding:"160px 10% 100px",
    background:"linear-gradient(155deg,#050D1A 0%,#0A1628 55%,#0D1F3C 100%)",
    overflow:"hidden",fontFamily:"'DM Sans',sans-serif",
  },
  s1GlowTL:{position:"absolute",top:"-12%",left:"-8%",width:"55%",height:"65%",background:"radial-gradient(ellipse,rgba(26,58,143,.35) 0%,transparent 70%)",pointerEvents:"none"},
  s1GlowBR:{position:"absolute",bottom:"-5%",right:"5%",width:"45%",height:"55%",background:"radial-gradient(ellipse,rgba(255,214,0,.055) 0%,transparent 70%)",pointerEvents:"none"},
  s1Diag:{position:"absolute",inset:0,pointerEvents:"none",background:"repeating-linear-gradient(135deg,rgba(255,214,0,.013) 0px,rgba(255,214,0,.013) 1px,transparent 1px,transparent 55px)"},
  slashLine:{position:"absolute",top:0,right:"42%",width:"1px",height:"100%",background:"linear-gradient(180deg,transparent,rgba(255,214,0,.07),transparent)",pointerEvents:"none"},

  inner:{display:"flex",gap:"72px",alignItems:"flex-start",marginBottom:"110px"},
  left:{flex:1.1,position:"relative",zIndex:2},

  labelPill:{display:"inline-flex",alignItems:"center",gap:"8px",fontSize:"10px",fontWeight:"900",letterSpacing:"4px",color:YELLOW,background:"rgba(255,214,0,.08)",border:"1px solid rgba(255,214,0,.2)",padding:"8px 20px",borderRadius:"100px",marginBottom:"26px"},
  blip:{width:"6px",height:"6px",borderRadius:"50%",background:"#00E676",display:"inline-block",animation:"blipAnim 1.5s ease-in-out infinite"},

  h2:{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(52px,7.5vw,90px)",fontWeight:"400",color:"#fff",margin:0,lineHeight:1,letterSpacing:"3px",perspective:"600px"},
  divider:{width:"60px",height:"3px",margin:"28px 0",background:`linear-gradient(90deg,${YELLOW},transparent)`,borderRadius:"2px"},
  body:{color:"rgba(255,255,255,.4)",fontSize:"15px",lineHeight:"1.92",fontWeight:"300",margin:"0 0 18px",maxWidth:"490px"},

  twoBox:{display:"flex",margin:"30px 0",background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,214,0,.11)",borderRadius:"20px",overflow:"hidden"},
  twoSide:{flex:1,padding:"24px 22px"},
  twoRow:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"},
  twoEmoji:{fontSize:"22px"},
  twoBar:{height:"2px",flex:1,borderRadius:"1px"},
  twoTitle:{fontWeight:"800",color:"#fff",fontSize:"15px",marginBottom:"8px"},
  twoDesc:{color:"rgba(255,255,255,.34)",fontSize:"13px",lineHeight:"1.68"},
  twoStat:{fontSize:"11px",fontWeight:"800",letterSpacing:"1px",marginTop:"10px"},
  twoDivide:{width:"1px",background:"rgba(255,214,0,.09)"},

  quoteWrap:{display:"flex",gap:"18px",margin:"0 0 32px",alignItems:"flex-start"},
  quoteBar:{width:"3px",minHeight:"62px",background:YELLOW,borderRadius:"2px",flexShrink:0,marginTop:"4px"},
  quoteText:{color:"rgba(255,255,255,.72)",fontSize:"18px",fontStyle:"italic",fontWeight:"300",margin:0,lineHeight:"1.68"},
  quoteAuth:{display:"block",marginTop:"12px",color:"rgba(255,255,255,.26)",fontSize:"11px",letterSpacing:"1.5px"},

  cta:{padding:"17px 42px",borderRadius:"12px",background:YELLOW,color:"#050D1A",border:"none",fontWeight:"900",cursor:"pointer",fontSize:"13px",letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 20px 50px rgba(255,214,0,.22)",transition:"all .3s"},

  /* right */
  right:{flex:1,position:"relative",zIndex:2,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:"8px"},
  watermark:{position:"absolute",top:"-5%",right:"-8%",fontFamily:"'Bebas Neue',sans-serif",fontSize:"200px",color:"rgba(255,214,0,.022)",userSelect:"none",lineHeight:1,letterSpacing:"10px",pointerEvents:"none",zIndex:0},
  d3:{position:"absolute",inset:"20px -20px -20px 20px",borderRadius:"28px",background:"rgba(255,214,0,.02)",border:"1px solid rgba(255,214,0,.04)",transform:"rotate(4deg)",zIndex:0},
  d2:{position:"absolute",inset:"10px -10px -10px 10px",borderRadius:"26px",background:"rgba(255,214,0,.04)",border:"1px solid rgba(255,214,0,.07)",transform:"rotate(2deg)",zIndex:0},
  d1:{position:"absolute",inset:"4px -4px -4px 4px",borderRadius:"25px",background:"rgba(255,214,0,.055)",border:"1px solid rgba(255,214,0,.1)",transform:"rotate(.8deg)",zIndex:0},

  tiltWrap:{position:"relative",zIndex:2,width:"100%",maxWidth:"400px"},
  card:{background:"linear-gradient(145deg,rgba(255,255,255,.05) 0%,rgba(13,31,60,.82) 100%)",border:"1px solid rgba(255,214,0,.15)",borderRadius:"26px",padding:"32px 28px",boxShadow:"0 40px 100px rgba(0,0,0,.52),inset 0 1px 0 rgba(255,255,255,.06)",position:"relative",overflow:"hidden"},
  cardTopAccent:{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${YELLOW},${YELLOW}00)`},
  cardHead:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"24px",paddingBottom:"16px",borderBottom:"1px solid rgba(255,214,0,.08)"},
  pulse:{width:"12px",height:"12px",borderRadius:"50%",background:"rgba(0,230,118,.25)",animation:"pulseOut 1.9s ease-out infinite",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  pulseCore:{width:"6px",height:"6px",borderRadius:"50%",background:"#00E676"},
  cardHeadTxt:{color:"rgba(255,255,255,.33)",fontSize:"9px",fontWeight:"900",letterSpacing:"2px",flex:1},
  etaPill:{color:"#00E676",fontSize:"9px",fontWeight:"700",background:"rgba(0,230,118,.08)",border:"1px solid rgba(0,230,118,.2)",padding:"3px 9px",borderRadius:"100px"},

  stepRow:{position:"relative",display:"flex",alignItems:"center",gap:"11px",padding:"9px 8px",marginBottom:"4px"},
  stepBub:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(255,214,0,.12)",border:"1px solid rgba(255,214,0,.32)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:"14px",color:YELLOW,flexShrink:0},
  stepTitle:{fontSize:"14px",fontWeight:"800",color:"#fff"},
  stepSub:{fontSize:"11px",color:"rgba(255,255,255,.3)",marginTop:"2px"},
  stepCheck:{color:"#00E676",fontWeight:"900",fontSize:"15px",marginLeft:"auto"},
  stepVLine:{position:"absolute",bottom:"-7px",left:"22px",width:"1px",height:"12px",background:"rgba(255,214,0,.14)"},

  cardFoot:{display:"flex",gap:"8px",marginTop:"18px",paddingTop:"16px",borderTop:"1px solid rgba(255,214,0,.07)",flexWrap:"wrap"},
  footTag:{fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,.44)",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",padding:"4px 12px",borderRadius:"100px"},

  liveBadge:{position:"absolute",top:"-14px",right:"10px",display:"flex",alignItems:"center",gap:"7px",background:"rgba(5,13,26,.93)",border:"1px solid rgba(0,230,118,.28)",borderRadius:"100px",padding:"7px 15px",boxShadow:"0 8px 32px rgba(0,0,0,.45)",backdropFilter:"blur(14px)",zIndex:10},
  liveDot:{width:"7px",height:"7px",borderRadius:"50%",background:"#00E676",animation:"blipAnim 1.1s ease-in-out infinite"},
  liveTxt:{color:"#00E676",fontSize:"10px",fontWeight:"800",whiteSpace:"nowrap"},

  /* stats */
  statsRow:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px",borderTop:"1px solid rgba(255,214,0,.07)",paddingTop:"60px",position:"relative",zIndex:2},
  statItem:{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px",background:"linear-gradient(145deg,rgba(255,255,255,.03),rgba(13,31,60,.5))",border:"1px solid rgba(255,255,255,.04)",borderRadius:"22px",textAlign:"center",boxShadow:"0 12px 40px rgba(0,0,0,.3)",transition:"transform .32s ease,box-shadow .32s ease"},
  statIcon:{width:"52px",height:"52px",borderRadius:"14px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"14px"},
  statVal:{fontFamily:"'Bebas Neue',sans-serif",fontSize:"44px",lineHeight:1,letterSpacing:"2px",marginBottom:"6px"},
  statLbl:{fontSize:"10px",color:"rgba(255,255,255,.26)",letterSpacing:"2px",fontWeight:"700",textTransform:"uppercase"},

  /* §2 testimonials */
  tSec:{position:"relative",padding:"130px 10% 120px",background:"linear-gradient(180deg,#0D1F3C 0%,#0A1628 100%)",overflow:"hidden",fontFamily:"'DM Sans',sans-serif"},
  tGrid:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,214,0,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,214,0,.017) 1px,transparent 1px)",backgroundSize:"64px 64px"},
  tGlow:{position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",width:"65%",height:"50%",background:"radial-gradient(ellipse,rgba(255,214,0,.045) 0%,transparent 70%)",pointerEvents:"none"},
  tHead:{textAlign:"center",marginBottom:"56px"},
  tPill:{display:"inline-flex",alignItems:"center",gap:"8px",fontSize:"10px",fontWeight:"900",letterSpacing:"4px",color:YELLOW,background:"rgba(255,214,0,.08)",border:"1px solid rgba(255,214,0,.2)",padding:"8px 20px",borderRadius:"100px",marginBottom:"20px"},
  tH2:{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(52px,7.5vw,86px)",color:"#fff",margin:0,letterSpacing:"3px"},

  tLayout:{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:"36px",marginBottom:"38px"},
  tFeat:{background:"linear-gradient(145deg,rgba(255,255,255,.04),rgba(13,31,60,.65))",border:"1px solid rgba(255,214,0,.13)",borderRadius:"28px",padding:"46px 42px",boxShadow:"0 30px 90px rgba(0,0,0,.42)",position:"relative",overflow:"hidden"},
  bigQ:{fontFamily:"'Bebas Neue',sans-serif",fontSize:"130px",color:"rgba(255,214,0,.1)",lineHeight:.75,marginBottom:"20px",display:"block",userSelect:"none"},
  bigQTxt:{color:"rgba(255,255,255,.78)",fontSize:"20px",fontStyle:"italic",fontWeight:"300",lineHeight:"1.72",margin:"0 0 28px"},
  tMetaRow:{display:"flex",alignItems:"center",gap:"14px"},
  tAvatar:{width:"44px",height:"44px",borderRadius:"13px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",fontWeight:"900",flexShrink:0},
  tName:{color:"#fff",fontWeight:"800",fontSize:"15px"},
  tCity:{color:"rgba(255,255,255,.3)",fontSize:"12px",marginTop:"2px"},
  tStars:{color:"#FBBF24",fontSize:"19px",letterSpacing:"2px",marginLeft:"auto"},

  tCards:{display:"flex",flexDirection:"column",gap:"11px"},
  tCard:{padding:"17px 18px",borderRadius:"18px",border:"1px solid",boxShadow:"0 8px 28px rgba(0,0,0,.28)"},
  tcRow:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"9px"},
  tcQ:{color:"rgba(255,255,255,.36)",fontSize:"12px",lineHeight:"1.6",margin:"0 0 8px",fontStyle:"italic"},

  tDots:{display:"flex",justifyContent:"center",gap:"5px",alignItems:"center"},
  tDot:{height:"5px",borderRadius:"3px",cursor:"pointer",transition:"all .3s ease"},

  /* §3 how */
  hSec:{position:"relative",padding:"140px 10% 150px",background:"linear-gradient(180deg,#0A1628 0%,#050D1A 100%)",overflow:"hidden",fontFamily:"'DM Sans',sans-serif"},
  hGrid:{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,214,0,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,214,0,.018) 1px,transparent 1px)",backgroundSize:"58px 58px"},
  hGlow:{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:"60%",height:"50%",background:"radial-gradient(ellipse,rgba(255,214,0,.04) 0%,transparent 70%)",pointerEvents:"none"},

  hHead:{textAlign:"center",marginBottom:"80px",position:"relative",zIndex:2},
  hPill:{display:"inline-block",fontSize:"10px",fontWeight:"900",letterSpacing:"4px",color:YELLOW,background:"rgba(255,214,0,.08)",border:"1px solid rgba(255,214,0,.2)",padding:"8px 20px",borderRadius:"100px",marginBottom:"20px"},
  hH2:{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(54px,7.5vw,90px)",color:"#fff",margin:0,letterSpacing:"3px"},
  hSub:{color:"rgba(255,255,255,.3)",fontSize:"16px",marginTop:"16px"},

  hLineWrap:{position:"relative",height:"2px",margin:"0 calc(10% + 100px) -44px",zIndex:1},
  hLine:{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,transparent,${YELLOW}44,${YELLOW}44,transparent)`},

  hGrid2:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px",position:"relative",zIndex:2},
  hCard:{padding:"44px 26px 36px",textAlign:"center",background:"linear-gradient(145deg,rgba(255,255,255,.04),rgba(13,31,60,.65))",border:"1px solid rgba(255,214,0,.1)",borderRadius:"26px",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,.35)",cursor:"default"},
  hNum:{position:"absolute",top:"-14px",left:"50%",transform:"translateX(-50%)",background:YELLOW,color:"#050D1A",fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",padding:"5px 18px",borderRadius:"100px",boxShadow:"0 4px 22px rgba(255,214,0,.35)"},
  hIconRing:{width:"76px",height:"76px",borderRadius:"50%",background:"rgba(255,214,0,.06)",border:"1px solid rgba(255,214,0,.14)",display:"flex",alignItems:"center",justifyContent:"center",margin:"18px auto",boxShadow:"0 8px 30px rgba(255,214,0,.08)"},
  hIconInner:{width:"56px",height:"56px",borderRadius:"50%",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,214,0,.12)",display:"flex",alignItems:"center",justifyContent:"center"},
  hCardTitle:{fontSize:"18px",fontWeight:"800",color:"#fff",marginBottom:"12px"},
  hCardDesc:{color:"rgba(255,255,255,.32)",fontSize:"13px",lineHeight:"1.7",fontWeight:"300"},
  hDot:{position:"absolute",top:"50%",right:"-11px",width:"10px",height:"10px",borderRadius:"50%",background:YELLOW,transform:"translateY(-50%)",boxShadow:`0 0 14px ${YELLOW}`,zIndex:3},

  hCta:{display:"flex",justifyContent:"center",gap:"14px",marginTop:"72px",position:"relative",zIndex:2},
  hPrimBtn:{padding:"18px 46px",borderRadius:"12px",background:YELLOW,color:"#050D1A",border:"none",fontWeight:"900",cursor:"pointer",fontSize:"13px",letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 20px 50px rgba(255,214,0,.25)",transition:"all .3s"},
  hSecBtn:{padding:"18px 46px",borderRadius:"12px",background:"transparent",color:"rgba(255,255,255,.52)",border:"1.5px solid rgba(255,255,255,.13)",fontWeight:"700",cursor:"pointer",fontSize:"13px",fontFamily:"'DM Sans',sans-serif",transition:"all .3s"},
};
