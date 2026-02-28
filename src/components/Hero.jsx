    import React, { useEffect, useRef, useState, Suspense } from "react";
    import { motion, useMotionValue, useTransform, animate } from "framer-motion";
    import { Canvas } from "@react-three/fiber";
    import {
    OrbitControls,
    ContactShadows,
    Environment,
    Html,
    } from "@react-three/drei";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import WorkerModel from "./WorkerModel";
    import ParticlesBg from "./ParticlesBg";
    import appUiImg from "../assets/assets/images/icon.png";
    import img1 from "../assets/assets/images/img1.jpg";
    import img2 from "../assets/assets/images/2.png";
    import img3 from "../assets/assets/images/3.jpg";
    import img4 from "../assets/assets/images/4.jpg";
    import img5 from "../assets/assets/images/5.jpg";
    import img6 from "../assets/assets/images/6.jpg";
    import img8 from "../assets/assets/images/icon.png";
    gsap.registerPlugin(ScrollTrigger);

    /* ── Animated counter ─────────────────────────────────────────── */
    function Counter({ to, suffix = "" }) {
    const nodeRef = useRef(null);
    useEffect(() => {
        const node = nodeRef.current;
        const controls = animate(0, to, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate(v) {
            node.textContent = Math.floor(v).toLocaleString() + suffix;
        },
        });
        return controls.stop;
    }, [to, suffix]);
    return <span ref={nodeRef} />;
    }

    /* ── Marquee ticker ───────────────────────────────────────────── */
    const TICKER = [
    "LOCAL JOB MATCHING",
    "VERIFIED WORKERS",
    "INSTANT HIRING",
    "SAFE PAYMENTS",
    "NEARBY SERVICES",
    "MADE FOR BHARAT",
    ];

    /* ── 8 dummy app screens ──────────────────────────────────────── */
    

    const SCREENS = [img1, img2, img3, img4, img5, img6, img8];
    const SCREEN_BG = [
    "linear-gradient(160deg,#0A1628 0%,#1a3a8f 100%)",
    "linear-gradient(160deg,#050D1A 0%,#0D1F3C 100%)",
    "linear-gradient(160deg,#0A1628 0%,#050D1A 100%)",
    "linear-gradient(160deg,#0D1F3C 0%,#0A1628 100%)",
    "linear-gradient(160deg,#050D1A 0%,#0A1628 100%)",
    "linear-gradient(160deg,#0A1628 0%,#1a3a8f 100%)",
    "linear-gradient(160deg,#050D1A 0%,#0A1628 100%)",
    "linear-gradient(160deg,#0D1F3C 0%,#050D1A 100%)",
    ];

    /* ── Swipeable Phone Carousel ─────────────────────────────────── */
    function PhoneCarousel({ logo }) {
    const [current, setCurrent] = useState(0);
    const dragStart = useRef(null);

    
const dragEnd = useRef(null);

const goNext = () => setCurrent(p => (p + 1) % SCREENS.length);
const goPrev = () => setCurrent(p => (p - 1 + SCREENS.length) % SCREENS.length);

/* TOUCH */
const onTouchStart = (e) => {
  dragStart.current = e.touches[0].clientX;
};

const onTouchMove = (e) => {
  dragEnd.current = e.touches[0].clientX;
};

const onTouchEnd = () => {
  if (!dragStart.current || !dragEnd.current) return;
  const diff = dragStart.current - dragEnd.current;

  if (Math.abs(diff) > 50) {
    diff > 0 ? goNext() : goPrev();
  }

  dragStart.current = null;
  dragEnd.current = null;
};

/* MOUSE */
const onMouseDown = (e) => {
  dragStart.current = e.clientX;
};

const onMouseMove = (e) => {
  if (dragStart.current !== null) {
    dragEnd.current = e.clientX;
  }
};

const onMouseUp = () => {
  if (!dragStart.current || !dragEnd.current) return;

  const diff = dragStart.current - dragEnd.current;

  if (Math.abs(diff) > 50) {
    diff > 0 ? goNext() : goPrev();
  }

  dragStart.current = null;
  dragEnd.current = null;
};

    const image = SCREENS[current];

   return (
  <div
  style={{
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    cursor: "grab",
    userSelect: "none",
  }}
  onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
  onTouchEnd={onTouchEnd}
  onMouseDown={onMouseDown}
  onMouseMove={onMouseMove}
  onMouseUp={onMouseUp}
  onMouseLeave={onMouseUp} // IMPORTANT
>
    <motion.img
      key={current}
      src={SCREENS[current]}
      alt="App screen"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
      drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, info) => {
    if (info.offset.x < -50) goNext();
    if (info.offset.x > 50) goPrev();
  }}
    />

    {/* dots */}
    <div
      style={{
        position: "absolute",
        bottom: "46px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "4px",
        zIndex: 15,
      }}
    >
      {SCREENS.map((_, i) => (
        <div
          key={i}
          onClick={() => setCurrent(i)}
          style={{
            height: "4px",
            borderRadius: "3px",
            cursor: "pointer",
            background:
              i === current ? "#FFD600" : "rgba(255,255,255,0.2)",
            width: i === current ? "14px" : "4px",
          }}
        />
      ))}
    </div>
  </div>
);
    }

    /* ── Phone screen shared styles ───────────────────────────────── */
    const ss = {
    splash: { display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:"8px",padding:"16px" },
    splashLogo: { width:"58px",height:"58px",objectFit:"contain",borderRadius:"14px" },
    splashName: { fontFamily:"'Bebas Neue',sans-serif",fontSize:"28px",color:"#FFD600",letterSpacing:"4px" },
    splashSub: { color:"rgba(255,255,255,0.4)",fontSize:"10px",letterSpacing:"2px" },
    screen: { padding:"14px 12px",height:"100%",display:"flex",flexDirection:"column",gap:"8px",overflow:"hidden" },
    header: { display:"flex",alignItems:"center",gap:"6px",marginBottom:"2px" },
    dot: { width:"6px",height:"6px",borderRadius:"50%",background:"#FFD600",flexShrink:0 },
    htxt: { color:"rgba(255,255,255,0.7)",fontSize:"11px",fontWeight:"700",letterSpacing:"1px" },
    searchBar: { display:"flex",alignItems:"center",gap:"6px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"7px 10px",fontSize:"10px" },
    sph: { color:"rgba(255,255,255,0.3)",fontSize:"10px" },
    catGrid: { display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px" },
    catChip: { background:"rgba(255,214,0,0.08)",border:"1px solid rgba(255,214,0,0.15)",borderRadius:"7px",padding:"5px 6px",fontSize:"9px",color:"rgba(255,255,255,0.6)",fontWeight:"700",textAlign:"center" },
    secTitle: { color:"rgba(255,255,255,0.4)",fontSize:"9px",fontWeight:"900",letterSpacing:"2px",textTransform:"uppercase" },
    wCard: { display:"flex",alignItems:"center",gap:"8px",background:"rgba(255,255,255,0.04)",borderRadius:"10px",padding:"8px 10px",border:"1px solid rgba(255,255,255,0.06)" },
    wAvatar: { width:"28px",height:"28px",borderRadius:"8px",background:"rgba(255,214,0,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"900",color:"#FFD600",flexShrink:0 },
    wName: { color:"#fff",fontSize:"10px",fontWeight:"800" },
    wJob: { color:"rgba(255,255,255,0.35)",fontSize:"9px",marginTop:"1px" },
    wEta: { color:"#00E676",fontSize:"9px",fontWeight:"700" },
    profCard: { background:"rgba(255,255,255,0.03)",borderRadius:"12px",padding:"12px",border:"1px solid rgba(255,214,0,0.1)",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",flex:1 },
    profAv: { width:"44px",height:"44px",borderRadius:"12px",background:"rgba(255,214,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:"900",color:"#FFD600" },
    profName: { color:"#fff",fontSize:"13px",fontWeight:"800" },
    profJob: { color:"rgba(255,255,255,0.4)",fontSize:"10px" },
    profStars: { color:"#FFD600",fontSize:"12px",letterSpacing:"2px" },
    profRow: { display:"flex",gap:"12px",marginTop:"6px" },
    pStat: { textAlign:"center",fontSize:"9px" },
    bookBtn: { background:"#FFD600",color:"#050D1A",borderRadius:"10px",padding:"10px",textAlign:"center",fontWeight:"900",fontSize:"11px",letterSpacing:"0.5px",marginTop:"auto",width:"100%" },
    confirmBox: { display:"flex",flexDirection:"column",alignItems:"center",background:"rgba(0,230,118,0.05)",border:"1px solid rgba(0,230,118,0.15)",borderRadius:"12px",padding:"12px",gap:"4px" },
    confirmTitle: { fontFamily:"'Bebas Neue',sans-serif",fontSize:"26px",color:"#00E676",letterSpacing:"2px",lineHeight:1 },
    confirmDetails: { display:"flex",flexDirection:"column",gap:"5px" },
    cRow: { display:"flex",justifyContent:"space-between",fontSize:"10px",color:"rgba(255,255,255,0.4)",padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,0.05)" },
    jobRow: { display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,0.03)",borderRadius:"9px",padding:"9px 10px",border:"1px solid rgba(255,255,255,0.05)" },
    jobTitle: { color:"#fff",fontSize:"11px",fontWeight:"800" },
    jobDate: { color:"rgba(255,255,255,0.3)",fontSize:"9px",marginTop:"2px" },
    dashCard: { background:"linear-gradient(135deg,rgba(255,214,0,0.12),rgba(26,58,143,0.3))",borderRadius:"12px",padding:"12px",border:"1px solid rgba(255,214,0,0.15)" },
    dashRow: { display:"flex",justifyContent:"space-between",background:"rgba(255,255,255,0.03)",borderRadius:"8px",padding:"7px 10px",border:"1px solid rgba(255,255,255,0.05)" },
    availToggle: { display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(0,230,118,0.06)",borderRadius:"8px",padding:"8px 10px",border:"1px solid rgba(0,230,118,0.15)",marginTop:"auto" },
    };

    export default function Hero() {
    const heroRef = useRef();
    const canvasContainerRef = useRef();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [disableTilt, setDisableTilt] = useState(false);
    const rotX = useTransform(mouseY, [-300, 300], [6, -6]);
    const rotY = useTransform(mouseX, [-300, 300], [-6, 6]);

    useEffect(() => {
        const handleMove = (e) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
        /* — staggered hero reveal — */
        const tl = gsap.timeline();
        tl.from(".reveal", {
            y: 80,
            opacity: 0,
            duration: 1.4,
            stagger: { each: 0.12, ease: "power2.out" },
            ease: "power4.out",
        });

        /* — canvas float — */
        gsap.to(canvasContainerRef.current, {
            y: 18,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        /* — diagonal scan line — */
        gsap.to(".scan-line", {
            backgroundPosition: "200% 0",
            duration: 3,
            repeat: -1,
            ease: "none",
        });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} style={styles.hero}>
        {/* noise grain overlay */}
        <div style={styles.grain} />

        <ParticlesBg />

        {/* glow blobs */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />
        <div style={styles.blob3} />

        {/* scan line shimmer */}
        <div className="scan-line" style={styles.scanLine} />

        {/* ── TICKER ─────────────────────────────────────── */}
        <div style={styles.tickerWrap}>
            <div style={styles.tickerTrack}>
            {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} style={styles.tickerItem}>
                {t} <span style={styles.tickerDot}>◆</span>
                </span>
            ))}
            </div>
        </div>

        {/* ── LEFT ────────────────────────────────────────── */}
        <div style={styles.left}>
            <div className="reveal" style={styles.taglineBox}>
            <div style={styles.taglinePill}>
                <div style={styles.pulseDotGreen} />
                <span style={styles.taglineText}> LIVE · CONNECTING WORKERS & JOBS</span>
            </div>
            </div>

            <h1 className="reveal" style={styles.title}>
            SHRAMIK
            <span style={styles.titleAccent}>.</span>
            </h1>

            {/* diagonal divider */}
            <div className="reveal" style={styles.divider} />

            <h2 className="reveal" style={styles.subtitle}>
            Connecting{" "}
            <span style={styles.subtitleHighlight}>Workers</span>
            <br />
            With Real Jobs.
            </h2>

            <p className="reveal" style={styles.desc}>
            Shramik helps people find trusted workers like plumbers, electricians,
    maids, and more — or get hired for jobs near them. Simple, fast, and
    built for everyday needs.
            </p>

            {/* stats row */}
            <div className="reveal" style={styles.statsRow}>
            {[
                { val: 1200, suffix: "+", label: "Active Workers" },
        { val: 250, suffix: "+", label: "Daily Jobs Posted" },
        { val: 15, suffix: "min", label: "Avg. Match Time" },
            ].map((s, i) => (
                <div key={i} style={styles.statItem}>
                <span style={styles.statNum}>
                    <Counter to={s.val} suffix={s.suffix} />
                </span>
                <span style={styles.statLabel}>{s.label}</span>
                </div>
            ))}
            </div>

            <div className="reveal" style={styles.btnGroup}>
            <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(255,214,0,0.5)" }}
                whileTap={{ scale: 0.97 }}
                style={styles.primaryBtn}
            >
                <span>Deploy Workers</span>
                <span style={styles.btnArrow}>→</span>
            </motion.button>
            <motion.button
                whileHover={{ borderColor: "#FFD600", color: "#FFD600" }}
                whileTap={{ scale: 0.97 }}
                style={styles.secondaryBtn}
            >
                Find a Job
            </motion.button>
            </div>

            {/* trust logos row */}
            <div className="reveal" style={styles.trustRow}>
            <span style={styles.trustLabel}>Now In</span>
            {["JAIPUR", "Lucknow", "MUMBAI", "PUNE", "INDORE", "...and Many More"].map((b) => (
                <span key={b} style={styles.trustBadge}>
                {b}
                </span>
            ))}
            </div>
        </div>

        {/* ── RIGHT ───────────────────────────────────────── */}
        <motion.div
    ref={canvasContainerRef}
    onMouseEnter={() => setDisableTilt(true)}
    onMouseLeave={() => setDisableTilt(false)}
    style={{
        ...styles.right,
        rotateX: disableTilt ? 0 : rotX,
        rotateY: disableTilt ? 0 : rotY,
    }}
    >
            {/* outer ring */}
            <div style={styles.outerRing} />
            <div style={styles.outerRing2} />

            <div style={styles.glassContainer}>
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 25 }}>
                <Suspense
                fallback={
                    <Html center>
                    <span style={{ color: "#FFD600", fontWeight: 900 }}>
                        Loading…
                    </span>
                    </Html>
                }
                >
                <ambientLight intensity={0.6} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#FFD600" />
                <pointLight position={[-5, -3, 2]} intensity={0.8} color="#1a3a8f" />
                <Environment preset="city" />
                <WorkerModel scale={0.03} />
                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.5}
                    scale={10}
                    blur={3}
                    color="#FFD600"
                />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
            </Canvas>
            </div>

            {/* floating app preview — STRAIGHT (rotate: 0) + swipeable */}
            <motion.div
            initial={{ x: 60, opacity: 0, rotate: 0 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 1.8, duration: 1.2, type: "spring" }}
            style={styles.appPreview}
            >
            <div style={styles.appBezel} />
            <PhoneCarousel logo={appUiImg} />
            <div style={styles.statusBadge}>
                <div style={styles.pulseRing} />
                <div style={styles.pulseDotGreen2} />
                <span style={styles.statusText}>Live Network</span>
            </div>
            </motion.div>

            {/* floating metric card */}
            <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2, duration: 1, type: "spring" }}
            style={styles.metricCard}
            >
            <div style={styles.metricIcon}>⚡</div>
            <div>
                <div style={styles.metricVal}>Plumber Booked!</div>
                <div style={styles.metricLbl}>Arrives ~25 min · ₹299 fixed</div>
            </div>
            </motion.div>
        </motion.div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;700&display=swap');

            * { box-sizing: border-box; }

            @keyframes tickerScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
            }

            @keyframes pulseRingAnim {
            0%   { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(2.2); opacity: 0; }
            }

            @keyframes blobAnim {
            0%, 100% { transform: scale(1) translate(0,0); }
            50%       { transform: scale(1.15) translate(20px, -20px); }
            }

            @keyframes rotateRing {
            from { transform: translate(-50%,-50%) rotate(0deg); }
            to   { transform: translate(-50%,-50%) rotate(360deg); }
            }

            @keyframes grainMove {
            0%, 100% { transform: translate(0, 0); }
            25%       { transform: translate(-2px, 2px); }
            50%       { transform: translate(2px, -2px); }
            75%       { transform: translate(-1px, -1px); }
            }

            .reveal { will-change: transform, opacity; }
        `}</style>
        </section>
    );
    }

    const NAV = "#0A1628";
    const NAVY = "#0D1F3C";
    const YELLOW = "#FFD600";
    const YELLOW_DARK = "#F5A623";

    const styles = {
    hero: {
        display: "flex",
        minHeight: "100vh",
        padding: "0 8% 0 10%",
        alignItems: "center",
        background: `linear-gradient(135deg, #050D1A 0%, #0A1628 50%, #0D1F3C 100%)`,
        overflow: "hidden",
        position: "relative",
        gap: "60px",
        fontFamily: "'DM Sans', sans-serif",
        perspective: "1200px",
    },

    grain: {
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.04,
        animation: "grainMove 0.5s steps(1) infinite",
    },

    blob1: {
        position: "absolute", width: "55vw", height: "55vh",
        background: "radial-gradient(circle, rgba(13,31,60,0.9) 0%, rgba(255,214,0,0.08) 60%, transparent 80%)",
        top: "10%", right: "5%", pointerEvents: "none", zIndex: 0,
        animation: "blobAnim 8s ease-in-out infinite",
        filter: "blur(40px)",
    },
    blob2: {
        position: "absolute", width: "35vw", height: "35vh",
        background: "radial-gradient(circle, rgba(255,214,0,0.06) 0%, transparent 70%)",
        bottom: "5%", left: "5%", pointerEvents: "none", zIndex: 0,
        animation: "blobAnim 10s ease-in-out infinite reverse",
        filter: "blur(60px)",
    },
    blob3: {
        position: "absolute", width: "20vw", height: "20vh",
        background: "radial-gradient(circle, rgba(26,58,143,0.5) 0%, transparent 70%)",
        top: "30%", left: "30%", pointerEvents: "none", zIndex: 0,
        filter: "blur(80px)",
    },

    scanLine: {
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent 0%, rgba(255,214,0,0.4) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        zIndex: 1, pointerEvents: "none",
    },

    tickerWrap: {
        position: "absolute", top: 0, left: 0, right: 0, height: "36px",
        background: YELLOW, overflow: "hidden", zIndex: 20,
        display: "flex", alignItems: "center",
    },
    tickerTrack: {
        display: "flex", whiteSpace: "nowrap",
        animation: "tickerScroll 18s linear infinite",
    },
    tickerItem: {
        fontSize: "10px", fontWeight: "900", color: "#050D1A",
        letterSpacing: "3px", padding: "0 30px", textTransform: "uppercase",
    },
    tickerDot: { color: "#0D1F3C", margin: "0 5px" },

    left: { flex: 1.3, zIndex: 10, paddingTop: "36px" },

    taglineBox: { marginBottom: "24px" },
    taglinePill: {
        display: "inline-flex", alignItems: "center", gap: "10px",
        background: "rgba(255,214,0,0.08)", border: "1px solid rgba(255,214,0,0.25)",
        padding: "8px 18px", borderRadius: "100px",
    },
    pulseDotGreen: {
        width: "7px", height: "7px", borderRadius: "50%", background: "#00E676",
        boxShadow: "0 0 0 0 rgba(0,230,118,0.6)",
        animation: "pulseRingAnim 1.4s ease-out infinite",
    },
    taglineText: {
        color: YELLOW, fontSize: "10px", fontWeight: "900", letterSpacing: "3px",
    },

    title: {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(72px, 12vw, 140px)",
        fontWeight: "400",
        color: "#FFFFFF",
        letterSpacing: "4px",
        lineHeight: "0.9",
        margin: 0,
        textShadow: "0 0 80px rgba(255,214,0,0.15)",
    },
    titleAccent: { color: YELLOW, textShadow: `0 0 40px ${YELLOW}` },

    divider: {
        width: "80px", height: "3px", margin: "24px 0",
        background: `linear-gradient(90deg, ${YELLOW}, transparent)`,
        borderRadius: "2px",
    },

    subtitle: {
        fontSize: "clamp(22px, 3vw, 34px)", fontWeight: "300",
        color: "rgba(255,255,255,0.65)", lineHeight: "1.35", margin: 0,
    },
    subtitleHighlight: { color: YELLOW, fontWeight: "700" },

    desc: {
        color: "rgba(255,255,255,0.4)", fontSize: "16px",
        lineHeight: "1.85", margin: "28px 0", maxWidth: "480px", fontWeight: "300",
    },

    statsRow: { display: "flex", gap: "40px", margin: "28px 0" },
    statItem: { display: "flex", flexDirection: "column" },
    statNum: {
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "44px",
        color: YELLOW, lineHeight: 1, letterSpacing: "1px",
    },
    statLabel: { fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "2px", fontWeight: "700", textTransform: "uppercase", marginTop: "4px" },

    btnGroup: { display: "flex", gap: "16px", alignItems: "center", margin: "8px 0 28px" },
    primaryBtn: {
        display: "flex", alignItems: "center", gap: "12px",
        padding: "18px 40px", borderRadius: "12px",
        background: YELLOW, color: "#050D1A",
        border: "none", fontWeight: "900", cursor: "pointer",
        fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase",
        boxShadow: "0 20px 50px rgba(255,214,0,0.25)",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.3s",
    },
    btnArrow: { fontSize: "18px", transition: "transform 0.3s" },
    secondaryBtn: {
        padding: "18px 40px", borderRadius: "12px",
        background: "transparent", color: "rgba(255,255,255,0.6)",
        border: "1.5px solid rgba(255,255,255,0.15)",
        fontWeight: "700", cursor: "pointer",
        fontSize: "13px", letterSpacing: "1px",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.3s",
    },

    trustRow: { display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" },
    trustLabel: { color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" },
    trustBadge: {
        color: "rgba(255,255,255,0.3)", fontSize: "10px", fontWeight: "900",
        letterSpacing: "2px", padding: "5px 12px",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px",
    },

    right: {
        flex: 1, height: "100vh", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        paddingTop: "36px", transformStyle: "preserve-3d",
    },

    outerRing: {
        position: "absolute", top: "50%", left: "50%",
        width: "520px", height: "520px", borderRadius: "50%",
        border: `1px solid rgba(255,    214,0,0.08)`,
        transform: "translate(-50%,-50%)",
        animation: "rotateRing 25s linear infinite",
        pointerEvents: "none",
    },
    outerRing2: {
        position: "absolute", top: "50%", left: "50%",
        width: "420px", height: "420px", borderRadius: "50%",
        border: `1px dashed rgba(255,214,0,0.06)`,
        transform: "translate(-50%,-50%)",
        animation: "rotateRing 18s linear infinite reverse",
        pointerEvents: "none",
    },

    glassContainer: {
        width: "380px", height: "520px",
        borderRadius: "40px",
        background: "linear-gradient(145deg, rgba(255,214,0,0.04) 0%, rgba(13,31,60,0.6) 100%)",
        border: "1px solid rgba(255,214,0,0.12)",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        boxShadow: "0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,214,0,0.1)",
    },

    appPreview: {
        position: "absolute", bottom: "10%", right: "-6%",
        width: "160px", height: "320px",
        borderRadius: "28px",
        border: "6px solid #0A1628",
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,214,0,0.15)",
        zIndex: 20, background: "#060E1C",
        backdropFilter: "blur(10px)",
    },
    appBezel: {
        position: "absolute", top: "10px", left: "50%",
        transform: "translateX(-50%)",
        width: "40px", height: "4px",
        borderRadius: "2px", background: "rgba(255,255,255,0.15)",
        zIndex: 5,
    },
    appImage: { width: "100%", height: "100%", objectFit: "contain", padding: "16px" },

    statusBadge: {
        position: "absolute", bottom: "12px", left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.7)", padding: "5px 12px",
        borderRadius: "20px", display: "flex", alignItems: "center",
        gap: "6px", whiteSpace: "nowrap",
        border: "1px solid rgba(0,230,118,0.2)",
        zIndex: 30,
    },
    pulseRing: {
        position: "absolute", width: "12px", height: "12px",
        borderRadius: "50%", background: "rgba(0,230,118,0.3)",
        animation: "pulseRingAnim 1.4s ease-out infinite",
    },
    pulseDotGreen2: { width: "7px", height: "7px", borderRadius: "50%", background: "#00E676", zIndex: 1 },
    statusText: { color: "#fff", fontSize: "8px", fontWeight: "800", letterSpacing: "1px" },

    metricCard: {
        position: "absolute", top: "15%", left: "-12%",
        background: "rgba(10,22,40,0.9)",
        border: "1px solid rgba(255,214,0,0.2)",
        borderRadius: "20px", padding: "18px 22px",
        display: "flex", alignItems: "center", gap: "14px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
        zIndex: 20,
    },
    metricIcon: { fontSize: "28px" },
    metricVal: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px", color: YELLOW, letterSpacing: "1px", lineHeight: 1 },
    metricLbl: { fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginTop: "3px" },
    };
