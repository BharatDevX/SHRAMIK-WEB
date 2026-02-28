import React, { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Zap, CreditCard, Star, Wrench, Clock } from "lucide-react";
import { Environment, ContactShadows } from "@react-three/drei";
import CarpenterModel from "./CarpenterModel";
import Sparks from "./SparkEffect";

gsap.registerPlugin(ScrollTrigger);

/* ── Live job ticker ──────────────────────────────────────────── */
const LIVE_JOBS = [
  "🔧 Ramesh · Plumber · Jaipur · ₹299",
  "⚡ Sunil · Electrician · Mumbai · ₹450",
  "❄️ Anil · AC Repair · Pune · ₹599",
  "🏠 Priya · Maid · Delhi · ₹200/day",
  "🎨 Karan · Painter · Lucknow · ₹800",
  "🚿 Vijay · Plumbing · Indore · ₹350",
  "🍳 Sunita · Cook · Bhopal · ₹300/day",
  "🚪 Raju · Carpenter · Jaipur · ₹550",
];

/* ── Feature data ─────────────────────────────────────────────── */
const features = [
  {
    title: "Book in Minutes",
    icon: <Clock size={24} color="#FFD600" />,
    desc: "Browse available workers near you, check profiles and ratings, confirm your booking — all in under 5 minutes.",
    tag: "FAST BOOKING",
    accent: "#FFD600",
    stat: "< 5 min",
    statLabel: "avg booking",
  },
  {
    title: "Verified Workers",
    icon: <ShieldCheck size={24} color="#00E676" />,
    desc: "Every worker on Shramik is ID-verified and reviewed by past customers. You always know who's coming to your home.",
    tag: "SAFE & TRUSTED",
    accent: "#00E676",
    stat: "100%",
    statLabel: "ID verified",
  },
  {
    title: "Fixed Transparent Pricing",
    icon: <CreditCard size={24} color="#38BDF8" />,
    desc: "No hidden charges, no surprises. See the exact price before you book. Pay only after the job is done.",
    tag: "ZERO SURPRISES",
    accent: "#38BDF8",
    stat: "₹0",
    statLabel: "hidden fees",
  },
  {
    title: "Rated & Reviewed",
    icon: <Star size={24} color="#FBBF24" />,
    desc: "Real reviews from real customers after every job. Choose workers with confidence based on verified ratings.",
    tag: "4.7★ AVERAGE",
    accent: "#FBBF24",
    stat: "4.7★",
    statLabel: "avg rating",
  },
  {
    title: "All Services, One App",
    icon: <Wrench size={24} color="#A78BFA" />,
    desc: "Plumber, electrician, maid, AC repair, painter, carpenter, babysitter — every home service right here.",
    tag: "20+ SERVICES",
    accent: "#A78BFA",
    stat: "20+",
    statLabel: "services",
  },
  {
    title: "Workers Earn More",
    icon: <Zap size={24} color="#FB923C" />,
    desc: "Workers set their own availability and rates. Consistent job flow, digital payments, zero broker cuts. More in pocket, always.",
    tag: "FOR WORKERS",
    accent: "#FB923C",
    stat: "₹0",
    statLabel: "commission",
    is3D: true,
  },
];

const CATEGORIES = [
  { e: "🔧", l: "Plumber"     },
  { e: "⚡", l: "Electrician" },
  { e: "❄️", l: "AC Repair"   },
  { e: "🏠", l: "Maid"        },
  { e: "🎨", l: "Painter"     },
  { e: "🍳", l: "Cook"        },
  { e: "🚪", l: "Carpenter"   },
  { e: "🚿", l: "Plumbing"    },
  { e: "👶", l: "Babysitter"  },
  { e: "🧹", l: "Deep Clean"  },
];

export default function Features() {
  const sectionRef = useRef();
  const headRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading letter reveal with 3D flip
      gsap.from(".feat-char", {
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
        y: 80, opacity: 0, rotateX: -70,
        stagger: { each: 0.035, ease: "power2.out" },
        duration: 0.85, ease: "power4.out",
      });

      gsap.from(".feat-subline", {
        scrollTrigger: { trigger: headRef.current, start: "top 78%" },
        y: 30, opacity: 0, duration: 1.1, ease: "power3.out",
      });

      // Wipe decorative line
      gsap.from(".f-line", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        scaleX: 0, duration: 2.2, ease: "power4.inOut", transformOrigin: "center",
      });

      // Category icons pop in
      gsap.from(".cat-icon", {
        scrollTrigger: { trigger: ".cat-row", start: "top 88%" },
        scale: 0, opacity: 0, duration: 0.5,
        stagger: { each: 0.055, ease: "power2.out" },
        ease: "back.out(2.2)",
      });

      // Live ticker fade
      gsap.from(".live-ticker", {
        scrollTrigger: { trigger: ".live-ticker", start: "top 92%" },
        opacity: 0, y: 20, duration: 0.9, ease: "power3.out",
      });

      // Cards cinematic cascade
      gsap.from(".f-card", {
        scrollTrigger: { trigger: ".f-card", start: "top 78%" },
        y: 90, opacity: 0, scale: 0.9, rotateX: 6,
        stagger: { each: 0.1, ease: "power2.out" },
        duration: 1.1, ease: "power4.out",
      });

      // Trust bar items
      gsap.from(".trust-item", {
        scrollTrigger: { trigger: ".trust-bar", start: "top 88%" },
        opacity: 0, scale: 0.9,
        stagger: 0.07, duration: 0.6, ease: "back.out(1.5)",
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={S.section}>
      <div style={S.bgGrid} />
      <div style={S.bgGlowTop} />
      <div style={S.bgGlowBR} />
      <div style={S.bgNoise} />

      {/* ── HEAD ─────────────────────────────────────────── */}
      <div ref={headRef} style={S.head}>
        <div style={S.headPill}>
          <span style={S.pillDot} />
          PLATFORM FEATURES
        </div>

        <h2 style={S.heading}>
          {"Why Choose ".split("").map((c, i) => (
            <span
              key={i}
              className="feat-char"
              style={{ display: "inline-block", whiteSpace: c === " " ? "pre" : "normal" }}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
          {"Shramik?".split("").map((c, i) => (
            <span
              key={"y" + i}
              className="feat-char"
              style={{ display: "inline-block", color: "#FFD600" }}
            >
              {c}
            </span>
          ))}
        </h2>

        <p className="feat-subline" style={S.headSub}>
          A two-sided marketplace built for India — making home services easy to book
          and dignified for workers to deliver.
        </p>

        <div className="f-line" style={S.headLine} />
      </div>

      {/* ── LIVE JOB TICKER ──────────────────────────────── */}
      <div className="live-ticker" style={S.tickerOuter}>
        <div style={S.tickerLabel}>
          <span style={S.liveBlip} />
          LIVE BOOKINGS
        </div>
        <div style={S.tickerMask}>
          <div style={S.tickerTrack}>
            {[...LIVE_JOBS, ...LIVE_JOBS].map((j, i) => (
              <span key={i} style={S.tickerJob}>
                {j}
                <span style={S.tickerSep}> ◆ </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICE CATEGORIES ───────────────────────────── */}
      <div className="cat-row" style={S.catRow}>
        {CATEGORIES.map((c) => (
          <CategoryChip key={c.l} emoji={c.e} label={c.l} />
        ))}
      </div>

      {/* ── FEATURE CARDS ────────────────────────────────── */}
      <div style={S.grid}>
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <div className="trust-bar" style={S.trustBar}>
        {[
          { icon: "✅", txt: "Pay only after work done" },
          { icon: "🛡️", txt: "All workers ID-verified" },
          { icon: "📍", txt: "Workers near you" },
          { icon: "⭐", txt: "4.7★ average rating" },
          { icon: "💸", txt: "Zero hidden charges" },
          { icon: "🔄", txt: "Cancel anytime" },
        ].map((t, i) => (
          <div key={i} className="trust-item" style={S.trustItem}>
            <span style={S.trustIcon}>{t.icon}</span>
            <span style={S.trustTxt}>{t.txt}</span>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700;900&display=swap');

        @keyframes tickerMove {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes liveBlipAnim {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:0.25; transform:scale(0.6); }
        }
        @keyframes shimmerSlide {
          0%   { background-position: -300% 0; }
          100% { background-position: 300% 0; }
        }

        .feat-char, .feat-subline { will-change: transform, opacity; }

        .f-inner {
          transition:
            transform 0.45s cubic-bezier(.15,0,.2,1),
            border-color 0.4s ease,
            box-shadow 0.45s ease !important;
        }
        .f-card:hover .f-inner {
          transform: translateY(-10px) scale(1.01) !important;
          box-shadow: 0 50px 100px rgba(0,0,0,0.6), 0 0 50px rgba(255,214,0,0.06) !important;
        }
        .f-card:hover .c-shimmer {
          animation: shimmerSlide 1.4s linear !important;
        }
        .f-card:hover .c-arrow {
          transform: translateX(5px);
          opacity: 1 !important;
        }
        .c-arrow { transition: transform 0.3s ease, opacity 0.3s ease; }

        .cat-chip {
          transition: all 0.3s cubic-bezier(.2,0,.2,1);
          cursor: pointer;
        }
        .cat-chip:hover {
          transform: translateY(-6px) scale(1.08) !important;
        }
        .cat-chip:hover .c-emoji { transform: scale(1.25) rotate(5deg); }
        .c-emoji { transition: transform 0.25s cubic-bezier(.2,0,.2,1); display: block; }

        .trust-item {
          transition: all 0.3s ease;
          cursor: default;
        }
        .trust-item:hover {
          border-color: rgba(255,214,0,0.25) !important;
          background: rgba(255,214,0,0.05) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

/* ── Category chip ────────────────────────────────────────────── */
function CategoryChip({ emoji, label }) {
  return (
    <div className="cat-icon cat-chip" style={S.catItem}>
      <div style={S.catEmojiBox}>
        <span className="c-emoji" style={{ fontSize: "20px" }}>{emoji}</span>
      </div>
      <span style={S.catLabel}>{label}</span>
    </div>
  );
}

/* ── Feature card ─────────────────────────────────────────────── */
function FeatureCard({ feature, index }) {
  const cardRef = useRef();
  const [trigger3D, setTrigger3D] = useState(false);

  useEffect(() => {
    if (!cardRef.current || !feature.is3D) return;
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 82%",
      onEnter: () => {
        setTrigger3D(true);
        gsap.fromTo(cardRef.current,
          { x: 0 },
          { x: 7, duration: 0.07, repeat: 7, yoyo: true, ease: "power2.inOut" }
        );
        gsap.to(cardRef.current, {
          boxShadow: "0 0 80px rgba(251,146,60,0.5)",
          duration: 0.25, yoyo: true, repeat: 3,
        });
        gsap.to(cardRef.current, {
          borderColor: "#00E676",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,230,118,0.35)",
          delay: 1.3, duration: 0.8,
        });
      },
    });
  }, [feature.is3D]);

  return (
    <div
      ref={cardRef}
      className="f-card"
      style={{ ...S.cardWrap, gridColumn: feature.is3D ? "1 / -1" : "auto" }}
    >
      <div
        className="f-inner"
        style={{
          ...S.card,
          borderColor: `${feature.accent}20`,
          ...(feature.is3D ? S.cardWide : {}),
        }}
      >
        {/* Hover shimmer */}
        <div
          className="c-shimmer"
          style={{
            position: "absolute", inset: 0, borderRadius: "22px",
            zIndex: 0, pointerEvents: "none",
            background: `linear-gradient(105deg, transparent 25%, ${feature.accent}0A 50%, transparent 75%)`,
            backgroundSize: "400% 100%",
          }}
        />

        {/* Top gradient bar */}
        <div style={{ ...S.topBar, background: `linear-gradient(90deg, ${feature.accent}, ${feature.accent}00)` }} />

        {/* Corner glow */}
        <div style={{ ...S.cornerGlow, background: `radial-gradient(circle, ${feature.accent}10 0%, transparent 65%)` }} />

        {/* 3D Canvas — last card only */}
        {feature.is3D && (
          <div style={S.worker3D}>
            <Canvas style={{ background: "transparent", width: "100%", height: "100%" }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[3, 3, 3]} intensity={1.2} color="#FB923C" />
              <pointLight position={[-3, 2, 2]} intensity={0.6} color="#FFD600" />
              <Suspense fallback={null}>
                <CarpenterModel position={[0.8, -1.4, 2]} scale={1.1} />
                <Sparks active={trigger3D} />
                <Environment preset="sunset" />
                <ContactShadows opacity={0.4} blur={2} color="#FB923C" />
              </Suspense>
            </Canvas>
          </div>
        )}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, ...(feature.is3D ? { maxWidth: "56%" } : {}) }}>

          {/* Icon + tag */}
          <div style={S.cardTop}>
            <div style={{ ...S.iconBox, borderColor: `${feature.accent}33`, boxShadow: `0 0 24px ${feature.accent}22` }}>
              {feature.icon}
            </div>
            <span style={{ ...S.tag, color: feature.accent, borderColor: `${feature.accent}44`, background: `${feature.accent}12` }}>
              {feature.tag}
            </span>
          </div>

          {/* Stat highlight */}
          <div style={{ ...S.statBox, background: `${feature.accent}0D`, borderColor: `${feature.accent}28` }}>
            <span style={{ ...S.statNum, color: feature.accent }}>{feature.stat}</span>
            <span style={S.statLbl}>{feature.statLabel}</span>
          </div>

          <h3 style={S.cardTitle}>{feature.title}</h3>
          <p style={S.cardDesc}>{feature.desc}</p>

          {/* Wide card bullet points */}
          {feature.is3D && (
            <div style={S.wideExtras}>
              {["Set your own hours & rates", "Get paid digitally — instantly", "Zero broker, zero commission", "Build your reputation with reviews"].map((pt) => (
                <div key={pt} style={S.widePt}>
                  <span style={{ ...S.widePtDot, color: feature.accent }}>◆</span>
                  <span style={S.widePtTxt}>{pt}</span>
                </div>
              ))}
              <div style={{ marginTop: "12px" }}>
                <span style={{ ...S.joinBtn, background: feature.accent }}>
                  Join as a Worker →
                </span>
              </div>
            </div>
          )}

          {!feature.is3D && (
            <div
              className="c-arrow"
              style={{ ...S.cardArrow, color: `${feature.accent}70`, opacity: 0.7 }}
            >
              → Learn more
            </div>
          )}
        </div>

        {/* Watermark number */}
        <div style={S.cornerNum}>0{index + 1}</div>
      </div>
    </div>
  );
}

/* ── Styles ───────────────────────────────────────────────────── */
const YELLOW = "#FFD600";

const S = {
  section: {
    position: "relative",
    padding: "160px 10% 140px",
    background: "linear-gradient(180deg, #050D1A 0%, #0A1628 60%, #0D1F3C 100%)",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },
  bgGrid: {
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: `
      linear-gradient(rgba(255,214,0,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,214,0,0.022) 1px, transparent 1px)
    `,
    backgroundSize: "80px 80px",
  },
  bgGlowTop: {
    position: "absolute", top: "0%", left: "50%", transform: "translateX(-50%)",
    width: "70%", height: "60%",
    background: "radial-gradient(ellipse, rgba(255,214,0,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  bgGlowBR: {
    position: "absolute", bottom: "-5%", right: "-5%",
    width: "45%", height: "55%",
    background: "radial-gradient(ellipse, rgba(251,146,60,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  bgNoise: {
    position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
    opacity: 0.025,
  },

  head: { textAlign: "center", marginBottom: "56px", position: "relative", zIndex: 2 },
  headPill: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    fontSize: "10px", fontWeight: "900", letterSpacing: "4px", color: YELLOW,
    background: "rgba(255,214,0,0.08)", border: "1px solid rgba(255,214,0,0.2)",
    padding: "8px 20px", borderRadius: "100px", marginBottom: "24px",
  },
  pillDot: {
    width: "6px", height: "6px", borderRadius: "50%", background: "#00E676",
    display: "inline-block",
    animation: "liveBlipAnim 1.4s ease-in-out infinite",
  },
  heading: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(55px, 8vw, 96px)", fontWeight: "400",
    color: "#fff", margin: 0, letterSpacing: "3px", lineHeight: 1,
    perspective: "600px",
  },
  headSub: {
    color: "rgba(255,255,255,0.3)", fontSize: "17px", fontWeight: "300",
    marginTop: "18px", maxWidth: "560px", margin: "18px auto 0", lineHeight: "1.75",
  },
  headLine: {
    width: "120px", height: "2px",
    background: `linear-gradient(90deg, transparent, ${YELLOW}, transparent)`,
    margin: "32px auto 0", borderRadius: "1px",
  },

  // Live ticker
  tickerOuter: {
    display: "flex", alignItems: "center", gap: "16px",
    margin: "0 0 55px", position: "relative", zIndex: 2,
  },
  tickerLabel: {
    display: "flex", alignItems: "center", gap: "8px", flexShrink: 0,
    color: "#00E676", fontSize: "9px", fontWeight: "900", letterSpacing: "2px",
    background: "rgba(0,230,118,0.06)", border: "1px solid rgba(0,230,118,0.2)",
    padding: "7px 16px", borderRadius: "100px", whiteSpace: "nowrap",
  },
  liveBlip: {
    width: "6px", height: "6px", borderRadius: "50%", background: "#00E676",
    display: "inline-block", animation: "liveBlipAnim 1s ease-in-out infinite",
  },
  tickerMask: {
    flex: 1, overflow: "hidden",
    maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
    WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
  },
  tickerTrack: {
    display: "flex", whiteSpace: "nowrap",
    animation: "tickerMove 28s linear infinite",
  },
  tickerJob: {
    fontSize: "12px", fontWeight: "500", color: "rgba(255,255,255,0.42)",
  },
  tickerSep: { color: "rgba(255,214,0,0.25)", margin: "0 10px" },

  // Categories
  catRow: {
    display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap",
    marginBottom: "68px", position: "relative", zIndex: 2,
  },
  catItem: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
  },
  catEmojiBox: {
    width: "56px", height: "56px", borderRadius: "18px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,214,0,0.1)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
    overflow: "hidden",
  },
  catLabel: {
    fontSize: "10px", color: "rgba(255,255,255,0.32)",
    fontWeight: "700", letterSpacing: "0.5px",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    position: "relative", zIndex: 2,
  },

  // Cards
  cardWrap: { position: "relative" },
  card: {
    position: "relative", overflow: "hidden",
    padding: "40px 30px 34px", borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.05)",
    background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(13,31,60,0.65) 100%)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
    cursor: "default", minHeight: "280px",
  },
  cardWide: {
    display: "flex", alignItems: "center",
    padding: "50px 44px", minHeight: "280px", overflow: "visible",
  },
  topBar: {
    position: "absolute", top: 0, left: 0, right: 0,
    height: "2px",
  },
  cornerGlow: {
    position: "absolute", top: "-60px", right: "-60px",
    width: "200px", height: "200px", borderRadius: "50%",
    pointerEvents: "none",
  },
  cardTop: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: "18px",
  },
  iconBox: {
    width: "52px", height: "52px", borderRadius: "15px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  tag: {
    fontSize: "9px", fontWeight: "900", letterSpacing: "2px",
    padding: "5px 10px", borderRadius: "8px", border: "1px solid",
  },
  statBox: {
    display: "inline-flex", alignItems: "baseline", gap: "8px",
    padding: "7px 14px", borderRadius: "10px", border: "1px solid",
    marginBottom: "14px",
  },
  statNum: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px",
    lineHeight: 1, letterSpacing: "1px",
  },
  statLbl: {
    color: "rgba(255,255,255,0.32)", fontSize: "10px",
    fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: "21px", fontWeight: "800", color: "#fff",
    margin: "0 0 10px", letterSpacing: "0.3px",
  },
  cardDesc: {
    color: "rgba(255,255,255,0.3)", fontSize: "14px",
    lineHeight: "1.78", margin: 0, fontWeight: "300",
  },
  cardArrow: {
    marginTop: "22px", fontSize: "11px", fontWeight: "800",
    letterSpacing: "1.5px", cursor: "pointer", display: "inline-block",
    textTransform: "uppercase",
  },
  cornerNum: {
    position: "absolute", bottom: "16px", right: "20px",
    fontFamily: "'Bebas Neue', sans-serif", fontSize: "78px",
    color: "rgba(255,255,255,0.022)", lineHeight: 1,
    userSelect: "none", letterSpacing: "2px", zIndex: 0,
  },

  // Wide card extras
  wideExtras: {
    display: "flex", flexDirection: "column", gap: "10px", margin: "18px 0 0",
  },
  widePt: { display: "flex", alignItems: "center", gap: "10px" },
  widePtDot: { fontSize: "8px", flexShrink: 0 },
  widePtTxt: { color: "rgba(255,255,255,0.48)", fontSize: "13px", fontWeight: "400" },
  joinBtn: {
    display: "inline-block", marginTop: "4px",
    padding: "12px 28px", borderRadius: "10px",
    color: "#050D1A", fontWeight: "900",
    fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase",
    cursor: "pointer",
  },

  // 3D worker
  worker3D: {
    position: "absolute",
    bottom: "-80px",
    right: "-60px",
    width: "340px",
    height: "600px",
    zIndex: 10,
    pointerEvents: "none",
  },

  // Trust bar
  trustBar: {
    display: "flex", flexWrap: "wrap", justifyContent: "center",
    gap: "10px", marginTop: "80px",
    paddingTop: "50px",
    borderTop: "1px solid rgba(255,214,0,0.07)",
    position: "relative", zIndex: 2,
  },
  trustItem: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "10px 18px", borderRadius: "100px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  trustIcon: { fontSize: "14px" },
  trustTxt: {
    color: "rgba(255,255,255,0.33)", fontSize: "12px",
    fontWeight: "600", letterSpacing: "0.3px",
  },
};
