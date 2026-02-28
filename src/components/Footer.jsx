import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const YELLOW = "#FFD600";

const LINKS = {
  Services: ["Plumber", "Electrician", "AC Repair", "Maid / Cook", "Painter", "Carpenter", "Babysitter", "Deep Clean"],
  Platform: ["Book a Service", "Join as Worker", "Worker Dashboard", "Admin Panel", "Track Booking", "Pricing"],
  Company:  ["About Us", "Our Story", "Careers", "Blog", "Press Kit", "Contact Us"],
  Support:  ["Help Center", "Safety Policy", "Refund Policy", "Grievances", "Report an Issue"],
};

const CITIES = ["JAIPUR", "MUMBAI", "PUNE", "DELHI", "LUCKNOW", "INDORE", "BHOPAL", "AHMEDABAD", "SURAT", "NAGPUR", "HYDERABAD", "BENGALURU"];

const TRUST = [
  { icon:"✅", txt:"Pay only after work done" },
  { icon:"🛡️", txt:"All workers ID-verified" },
  { icon:"⭐", txt:"4.7★ rated by real customers" },
  { icon:"📍", txt:"Workers near your area" },
  { icon:"💸", txt:"Zero hidden charges" },
  { icon:"🔄", txt:"Cancel anytime, no fee" },
];

const SOCIALS = [
  { label:"IN", name:"Instagram" },
  { label:"TW", name:"Twitter/X" },
  { label:"LI", name:"LinkedIn"  },
  { label:"YT", name:"YouTube"   },
];

function Grain({ op = 0.03 }) {
  return (
    <div style={{
      position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      opacity:op, animation:"ftGrain .5s steps(1) infinite",
    }} />
  );
}

export default function Footer() {
  const footRef = useRef();
  const ctaRef  = useRef();
  const [email,   setEmail]   = useState("");
  const [sent,    setSent]    = useState(false);
  const [hovLink, setHovLink] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".ft-ghost", {
        scrollTrigger: { trigger: footRef.current, start: "top 85%" },
        opacity: 0, scale: 0.9, duration: 2.6, ease: "power3.out",
      });

      gsap.from(".ft-cta-inner", {
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
        y: 65, opacity: 0, duration: 1.3, ease: "power4.out",
      });

      gsap.from(".ft-col", {
        scrollTrigger: { trigger: footRef.current, start: "top 74%" },
        y: 50, opacity: 0,
        stagger: { each: 0.09, ease: "power2.out" },
        duration: 1, ease: "power4.out",
      });

      gsap.from(".ft-trust-item", {
        scrollTrigger: { trigger: ".ft-trust-row", start: "top 88%" },
        opacity: 0, scale: 0.88,
        stagger: 0.07, duration: 0.6, ease: "back.out(1.6)",
      });

      gsap.from(".ft-bottom", {
        scrollTrigger: { trigger: ".ft-bottom", start: "top 96%" },
        y: 20, opacity: 0, duration: 0.9, ease: "power3.out",
      });

    }, footRef);
    return () => ctx.revert();
  }, []);

  const handleSub = () => {
    if (!email.includes("@")) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3200);
  };

  return (
    <>
      {/* ── PRE-FOOTER CTA BAND ── */}
      <div ref={ctaRef} style={S.ctaBand}>
        <div style={S.ctaBandGlow} />
        <div style={S.ctaBandGrid} />
        <Grain op={0.025} />

        <div className="ft-cta-inner" style={S.ctaInner}>
          <div style={S.ctaLeft}>
            <div style={S.ctaEyebrow}>
              <span style={S.eyeDot} /> READY TO GET STARTED?
            </div>
            <h2 style={S.ctaH2}>
              Find a Worker<br />
              <span style={{ color: YELLOW }}>In Minutes.</span>
            </h2>
            <p style={S.ctaSub}>
              Plumber, electrician, maid, AC repair and more —
              trusted workers verified and near you, right now.
            </p>
          </div>

          <div style={S.ctaCards}>
            <motion.div
              whileHover={{ y:-6, boxShadow:"0 34px 72px rgba(255,214,0,0.28)" }}
              transition={{ duration:0.35 }}
              style={S.ctaCard1}
            >
              <div style={S.ctaCardEmoji}>🏠</div>
              <div style={S.ctaCardTitle}>For Households</div>
              <div style={S.ctaCardSub}>Book verified workers near you</div>
              <motion.button
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                style={S.cardBtn1}
              >Book a Service →</motion.button>
            </motion.div>

            <motion.div
              whileHover={{ y:-6, boxShadow:"0 34px 72px rgba(255,255,255,0.06)", borderColor:"rgba(255,255,255,0.14)" }}
              transition={{ duration:0.35 }}
              style={S.ctaCard2}
            >
              <div style={S.ctaCardEmoji}>👷</div>
              <div style={S.ctaCardTitle}>For Workers</div>
              <div style={S.ctaCardSub}>Get jobs, earn more, zero cuts</div>
              <motion.button
                whileHover={{ scale:1.03, borderColor: YELLOW, color: YELLOW }}
                whileTap={{ scale:0.97 }}
                style={S.cardBtn2}
              >Join as Worker →</motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CITY TICKER ── */}
      <div style={S.ticker}>
        <div style={S.tickerLabel}>
          <span style={S.tickerDot} /> AVAILABLE IN
        </div>
        <div style={S.tickerMask}>
          <div style={S.tickerTrack}>
            {[...CITIES, ...CITIES].map((c, i) => (
              <span key={i} style={S.tickerCity}>
                {c} <span style={S.tickerSep}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <footer ref={footRef} style={S.footer}>
        <Grain />
        <div style={S.ftGlowTop} />
        <div style={S.ftGlowBL}  />
        <div style={S.ftTopLine} />

        {/* Ghost wordmark */}
        <div className="ft-ghost" style={S.ghost}>SHRAMIK</div>

        {/* Grid */}
        <div style={S.grid}>

          {/* Brand */}
          <div className="ft-col" style={S.brandCol}>
            <div style={S.logo}>
              SHRAMIK<span style={{ color: YELLOW }}>.</span>
            </div>
            <p style={S.tagline}>
              Book verified home service workers<br />
              near you — in minutes. Built for India.
            </p>

            <div style={S.appRow}>
              {[
                { e:"📱", l:"App Store",  s:"iOS"     },
                { e:"🤖", l:"Play Store", s:"Android" },
              ].map((a) => (
                <motion.button
                  key={a.l}
                  whileHover={{ borderColor:`${YELLOW}55`, background:"rgba(255,214,0,0.05)" }}
                  whileTap={{ scale:0.97 }}
                  style={S.appBtn}
                >
                  <span style={{ fontSize:"18px" }}>{a.e}</span>
                  <div>
                    <div style={S.appBtnLbl}>{a.l}</div>
                    <div style={S.appBtnSub}>{a.s}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div style={S.socialRow}>
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label} href="#" title={s.name}
                  whileHover={{ y:-3, background:"rgba(255,214,0,0.12)", borderColor:`${YELLOW}55`, color: YELLOW }}
                  style={S.socialBtn}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([col, links]) => (
            <div key={col} className="ft-col" style={S.linkCol}>
              <h4 style={S.colHead}>{col}</h4>
              {links.map((l, i) => {
                const key = `${col}-${i}`;
                const hov = hovLink === key;
                return (
                  <motion.a
                    key={l} href="#"
                    style={{ ...S.link, color: hov ? YELLOW : "rgba(255,255,255,0.32)" }}
                    onMouseEnter={() => setHovLink(key)}
                    onMouseLeave={() => setHovLink(null)}
                    whileHover={{ x:5 }}
                    transition={{ duration:0.18 }}
                  >
                    <span style={{ ...S.linkDot, opacity: hov ? 1 : 0 }} />
                    {l}
                  </motion.a>
                );
              })}
            </div>
          ))}

          {/* Newsletter */}
          <div className="ft-col" style={S.newsCol}>
            <h4 style={S.colHead}>Stay in the Loop</h4>
            <p style={S.newsSub}>New services, worker spotlights, and city launches — straight to your inbox.</p>

            <div style={S.inputWrap}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSub()}
                placeholder="your@email.com"
                style={S.input}
              />
              <motion.button
                whileHover={{ scale:1.06 }} whileTap={{ scale:0.95 }}
                onClick={handleSub}
                style={{ ...S.inputBtn, background: sent ? "#00E676" : YELLOW }}
              >
                {sent ? "✓" : "→"}
              </motion.button>
            </div>

            {sent && (
              <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} style={S.sentMsg}>
                🎉 You're in! We'll keep you posted.
              </motion.div>
            )}

            {/* Mini stats */}
            <div style={S.miniStats}>
              {[
                { v:"12K+", l:"Workers"  },
                { v:"20+",  l:"Services" },
                { v:"4.7★", l:"Rating"   },
              ].map((st, i) => (
                <div key={st.l} style={{ ...S.miniStat, borderRight: i < 2 ? "1px solid rgba(255,214,0,0.08)" : "none" }}>
                  <span style={S.miniV}>{st.v}</span>
                  <span style={S.miniL}>{st.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust row */}
        <div className="ft-trust-row" style={S.trustRow}>
          {TRUST.map((t, i) => (
            <motion.div
              key={i} className="ft-trust-item"
              whileHover={{ borderColor:"rgba(255,214,0,0.28)", background:"rgba(255,214,0,0.04)", y:-3 }}
              style={S.trustItem}
            >
              <span style={{ fontSize:"13px" }}>{t.icon}</span>
              <span style={S.trustTxt}>{t.txt}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom" style={S.bottomBar}>
          <div style={S.bottomLeft}>
            <span style={S.copy}>© 2026 Shramik Technology Pvt. Ltd.</span>
            <span style={S.bsep}>·</span>
            <span style={S.bmeta}>Made with ❤️ in 🇮🇳 Bharat</span>
            <span style={S.bsep}>·</span>
            <span style={S.bmeta}>All Rights Reserved</span>
          </div>

          <div style={S.bottomCenter}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l, i) => (
              <React.Fragment key={l}>
                <motion.a href="#" whileHover={{ color: YELLOW }} style={S.bottomLink}>{l}</motion.a>
                {i < 2 && <div style={S.blineDivide} />}
              </React.Fragment>
            ))}
          </div>

          <div style={S.bottomRight}>
            <div style={S.livePill}>
              <div style={S.liveDot} />
              <span style={S.liveTxt}>Platform Live</span>
            </div>
            <div style={S.bstats}>
              {["12,000+ Workers", "20+ Services", "4.7★ Rated"].map((s, i) => (
                <React.Fragment key={s}>
                  {i > 0 && <div style={S.bstatDot} />}
                  <span style={S.bstatTxt}>{s}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{KF}</style>
    </>
  );
}

const KF = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600;700;900&display=swap');

  @keyframes ftGrain {
    0%,100%{transform:translate(0,0);}
    25%{transform:translate(-2px,2px);}
    50%{transform:translate(2px,-2px);}
    75%{transform:translate(-1px,-1px);}
  }
  @keyframes tickerScroll {
    0%  { transform: translateX(0); }
    100%{ transform: translateX(-50%); }
  }
  @keyframes livePulse {
    0%,100%{opacity:1;transform:scale(1);}
    50%{opacity:.28;transform:scale(.6);}
  }
  @keyframes ghostBreath {
    0%,100%{opacity:1;}
    50%{opacity:.6;}
  }

  a { text-decoration: none !important; }

  .ft-trust-item { transition: all 0.28s ease !important; }
`;

const S = {
  /* CTA band */
  ctaBand:{
    position:"relative", padding:"100px 10%",
    background:"linear-gradient(135deg,#0A1628 0%,#0D1F3C 50%,#0A1628 100%)",
    overflow:"hidden", fontFamily:"'DM Sans',sans-serif",
  },
  ctaBandGlow:{
    position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
    width:"70%", height:"80%",
    background:"radial-gradient(ellipse,rgba(255,214,0,0.07) 0%,transparent 70%)",
    pointerEvents:"none",
  },
  ctaBandGrid:{
    position:"absolute", inset:0, pointerEvents:"none",
    backgroundImage:"linear-gradient(rgba(255,214,0,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,214,0,0.022) 1px,transparent 1px)",
    backgroundSize:"60px 60px",
  },
  ctaInner:{
    display:"flex", alignItems:"center",
    gap:"70px", position:"relative", zIndex:2,
  },
  ctaLeft:{ flex:1.2 },
  ctaEyebrow:{
    display:"inline-flex", alignItems:"center", gap:"8px",
    fontSize:"10px", fontWeight:"900", letterSpacing:"4px", color: YELLOW,
    background:"rgba(255,214,0,0.08)", border:"1px solid rgba(255,214,0,0.2)",
    padding:"7px 18px", borderRadius:"100px", marginBottom:"20px",
  },
  eyeDot:{
    width:"6px", height:"6px", borderRadius:"50%", background:"#00E676",
    display:"inline-block", animation:"livePulse 1.5s ease-in-out infinite",
  },
  ctaH2:{
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:"clamp(52px,7vw,90px)",
    color:"#fff", margin:"0 0 16px", lineHeight:1, letterSpacing:"3px",
  },
  ctaSub:{
    color:"rgba(255,255,255,0.38)", fontSize:"16px",
    lineHeight:"1.8", fontWeight:"300", maxWidth:"440px",
  },
  ctaCards:{ display:"flex", gap:"18px", flex:1 },
  ctaCard1:{
    flex:1, padding:"36px 28px",
    background:"linear-gradient(145deg,rgba(255,214,0,0.12) 0%,rgba(255,214,0,0.04) 100%)",
    border:"1px solid rgba(255,214,0,0.25)", borderRadius:"24px",
    boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
    transition:"all 0.38s cubic-bezier(.2,0,.2,1)", cursor:"default",
  },
  ctaCard2:{
    flex:1, padding:"36px 28px",
    background:"linear-gradient(145deg,rgba(255,255,255,0.04) 0%,rgba(13,31,60,0.65) 100%)",
    border:"1px solid rgba(255,255,255,0.08)", borderRadius:"24px",
    boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
    transition:"all 0.38s cubic-bezier(.2,0,.2,1)", cursor:"default",
  },
  ctaCardEmoji:{ fontSize:"32px", marginBottom:"14px" },
  ctaCardTitle:{ fontSize:"20px", fontWeight:"900", color:"#fff", marginBottom:"8px" },
  ctaCardSub:{ color:"rgba(255,255,255,0.38)", fontSize:"13px", lineHeight:"1.6", marginBottom:"20px" },
  cardBtn1:{
    width:"100%", padding:"13px 20px", borderRadius:"10px",
    background: YELLOW, color:"#050D1A", border:"none",
    fontWeight:"900", cursor:"pointer",
    fontSize:"12px", letterSpacing:"1px", textTransform:"uppercase",
    fontFamily:"'DM Sans',sans-serif", transition:"all .25s",
  },
  cardBtn2:{
    width:"100%", padding:"13px 20px", borderRadius:"10px",
    background:"transparent", color:"rgba(255,255,255,0.6)",
    border:"1.5px solid rgba(255,255,255,0.15)",
    fontWeight:"700", cursor:"pointer", fontSize:"12px",
    fontFamily:"'DM Sans',sans-serif", transition:"all .25s",
  },

  /* Ticker */
  ticker:{
    display:"flex", alignItems:"center", gap:"20px",
    background:"rgba(5,13,26,0.97)",
    borderTop:"1px solid rgba(255,214,0,0.1)",
    borderBottom:"1px solid rgba(255,214,0,0.1)",
    padding:"14px 10%", overflow:"hidden",
    fontFamily:"'DM Sans',sans-serif",
  },
  tickerLabel:{
    display:"flex", alignItems:"center", gap:"7px",
    color: YELLOW, fontSize:"9px", fontWeight:"900", letterSpacing:"3px",
    flexShrink:0, whiteSpace:"nowrap",
    background:"rgba(255,214,0,0.08)", border:"1px solid rgba(255,214,0,0.2)",
    padding:"5px 14px", borderRadius:"100px",
  },
  tickerDot:{
    width:"5px", height:"5px", borderRadius:"50%", background:"#00E676",
    display:"inline-block", animation:"livePulse 1.2s ease-in-out infinite",
  },
  tickerMask:{
    flex:1, overflow:"hidden",
    maskImage:"linear-gradient(90deg,transparent,black 5%,black 95%,transparent)",
    WebkitMaskImage:"linear-gradient(90deg,transparent,black 5%,black 95%,transparent)",
  },
  tickerTrack:{
    display:"flex", whiteSpace:"nowrap",
    animation:"tickerScroll 24s linear infinite",
  },
  tickerCity:{
    fontSize:"11px", fontWeight:"800", color:"rgba(255,255,255,0.44)",
    letterSpacing:"2.5px", padding:"0 6px",
  },
  tickerSep:{ color:"rgba(255,214,0,0.28)", margin:"0 10px" },

  /* Footer body */
  footer:{
    position:"relative",
    background:"linear-gradient(180deg,#0A1628 0%,#060E1C 60%,#050D1A 100%)",
    padding:"80px 10% 0",
    fontFamily:"'DM Sans',sans-serif",
    overflow:"hidden",
  },
  ftGlowTop:{
    position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
    width:"60%", height:"35%",
    background:"radial-gradient(ellipse,rgba(255,214,0,0.04) 0%,transparent 70%)",
    pointerEvents:"none",
  },
  ftGlowBL:{
    position:"absolute", bottom:"15%", left:"-5%",
    width:"35%", height:"50%",
    background:"radial-gradient(ellipse,rgba(26,58,143,0.2) 0%,transparent 70%)",
    pointerEvents:"none",
  },
  ftTopLine:{
    position:"absolute", top:0, left:"10%", right:"10%", height:"1px",
    background:`linear-gradient(90deg,transparent,${YELLOW}55,transparent)`,
  },
  ghost:{
    position:"absolute", top:"0%", left:"50%", transform:"translateX(-50%)",
    fontFamily:"'Bebas Neue',sans-serif",
    fontSize:"clamp(100px,16vw,240px)",
    color:"transparent",
    WebkitTextStroke:"1px rgba(255,214,0,0.055)",
    userSelect:"none", pointerEvents:"none",
    letterSpacing:"16px", lineHeight:1, zIndex:0,
    animation:"ghostBreath 5s ease-in-out infinite",
    whiteSpace:"nowrap",
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 2fr",
    gap:"44px",
    paddingBottom:"60px",
    borderBottom:"1px solid rgba(255,255,255,0.04)",
    position:"relative", zIndex:2,
  },

  brandCol:{ display:"flex", flexDirection:"column" },
  logo:{
    fontFamily:"'Bebas Neue',sans-serif", fontSize:"46px",
    color:"#fff", letterSpacing:"4px", lineHeight:1, marginBottom:"14px",
  },
  tagline:{
    color:"rgba(255,255,255,0.3)", fontSize:"13px",
    lineHeight:"1.78", fontWeight:"300", margin:"0 0 24px",
  },
  appRow:{ display:"flex", gap:"10px", marginBottom:"20px" },
  appBtn:{
    display:"flex", alignItems:"center", gap:"10px",
    padding:"10px 14px", borderRadius:"11px",
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.09)",
    color:"rgba(255,255,255,0.5)", cursor:"pointer",
    fontFamily:"'DM Sans',sans-serif", transition:"all .25s",
  },
  appBtnLbl:{ fontSize:"11px", fontWeight:"700", color:"rgba(255,255,255,0.6)", textAlign:"left" },
  appBtnSub:{ fontSize:"9px", color:"rgba(255,255,255,0.26)", letterSpacing:"1px", marginTop:"1px" },
  socialRow:{ display:"flex", gap:"8px" },
  socialBtn:{
    width:"38px", height:"38px", borderRadius:"10px",
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:"9px", fontWeight:"900", letterSpacing:"0.5px",
    color:"rgba(255,255,255,0.38)", cursor:"pointer", transition:"all .25s",
  },

  linkCol:{ display:"flex", flexDirection:"column", gap:"0" },
  colHead:{
    color: YELLOW, fontSize:"9px", fontWeight:"900",
    letterSpacing:"3px", textTransform:"uppercase",
    margin:"0 0 18px",
  },
  link:{
    display:"flex", alignItems:"center", gap:"6px",
    fontSize:"13px", fontWeight:"300",
    padding:"5px 0", lineHeight:"1.4",
    transition:"all .2s",
  },
  linkDot:{
    width:"4px", height:"4px", borderRadius:"50%",
    background: YELLOW, flexShrink:0, transition:"opacity .2s",
  },

  newsCol:{ display:"flex", flexDirection:"column" },
  newsSub:{
    color:"rgba(255,255,255,0.27)", fontSize:"12px",
    margin:"0 0 18px", lineHeight:"1.72",
  },
  inputWrap:{ display:"flex", gap:"6px", marginBottom:"12px" },
  input:{
    flex:1, padding:"11px 14px",
    background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(255,255,255,0.09)",
    borderRadius:"10px", color:"#fff",
    fontSize:"12px", fontFamily:"'DM Sans',sans-serif", outline:"none",
    transition:"border-color .25s",
  },
  inputBtn:{
    padding:"11px 16px", borderRadius:"10px",
    color:"#050D1A", border:"none",
    fontWeight:"900", cursor:"pointer", fontSize:"16px",
    transition:"all .25s", minWidth:"44px",
    fontFamily:"'DM Sans',sans-serif",
  },
  sentMsg:{
    color:"#00E676", fontSize:"11px", fontWeight:"700",
    letterSpacing:"0.5px", marginBottom:"12px",
  },
  miniStats:{
    display:"flex", marginTop:"20px",
    background:"rgba(255,255,255,0.02)",
    border:"1px solid rgba(255,214,0,0.1)",
    borderRadius:"14px", overflow:"hidden",
  },
  miniStat:{
    flex:1, padding:"14px 10px", textAlign:"center",
  },
  miniV:{
    display:"block",
    fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px",
    color: YELLOW, letterSpacing:"1px", lineHeight:1,
  },
  miniL:{
    display:"block",
    fontSize:"9px", color:"rgba(255,255,255,0.24)",
    letterSpacing:"1.5px", fontWeight:"700", marginTop:"4px",
    textTransform:"uppercase",
  },

  trustRow:{
    display:"flex", flexWrap:"wrap", gap:"10px",
    padding:"36px 0",
    borderBottom:"1px solid rgba(255,255,255,0.04)",
    position:"relative", zIndex:2,
  },
  trustItem:{
    display:"flex", alignItems:"center", gap:"8px",
    padding:"9px 16px", borderRadius:"100px",
    background:"rgba(255,255,255,0.02)",
    border:"1px solid rgba(255,255,255,0.05)",
    cursor:"default",
  },
  trustTxt:{
    color:"rgba(255,255,255,0.32)", fontSize:"11px",
    fontWeight:"600", letterSpacing:"0.3px",
  },

  bottomBar:{
    display:"flex", justifyContent:"space-between", alignItems:"center",
    padding:"22px 0 28px",
    position:"relative", zIndex:2,
    flexWrap:"wrap", gap:"16px",
  },
  bottomLeft:{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap" },
  copy:{ color:"rgba(255,255,255,0.17)", fontSize:"11px" },
  bsep:{ color:"rgba(255,255,255,0.08)", fontSize:"11px" },
  bmeta:{ color:"rgba(255,255,255,0.14)", fontSize:"11px" },
  bottomCenter:{ display:"flex", alignItems:"center", gap:"10px" },
  bottomLink:{
    color:"rgba(255,255,255,0.2)", fontSize:"11px",
    transition:"color .2s", cursor:"pointer",
  },
  blineDivide:{ width:"1px", height:"10px", background:"rgba(255,255,255,0.07)" },
  bottomRight:{ display:"flex", alignItems:"center", gap:"16px" },
  livePill:{
    display:"flex", alignItems:"center", gap:"6px",
    background:"rgba(0,230,118,0.06)",
    border:"1px solid rgba(0,230,118,0.18)",
    padding:"5px 12px", borderRadius:"100px",
  },
  liveDot:{
    width:"6px", height:"6px", borderRadius:"50%", background:"#00E676",
    animation:"livePulse 1.4s ease-in-out infinite",
  },
  liveTxt:{ color:"#00E676", fontSize:"9px", fontWeight:"800", letterSpacing:"1.5px" },
  bstats:{ display:"flex", alignItems:"center", gap:"10px" },
  bstatDot:{ width:"3px", height:"3px", borderRadius:"50%", background:"rgba(255,214,0,0.22)" },
  bstatTxt:{ color:"rgba(255,255,255,0.17)", fontSize:"10px", letterSpacing:"1px" },
};
