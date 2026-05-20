import { useState, useEffect, useRef } from "react";

// ── Supabase REST helpers ─────────────────────────────────────────────────────
const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const sbH = {
  "apikey": SB_KEY,
  "Authorization": `Bearer ${SB_KEY}`,
  "Content-Type": "application/json",
};

async function sbInsert(data) {
  const res = await fetch(`${SB_URL}/rest/v1/whitelist`, {
    method: "POST",
    headers: { ...sbH, "Prefer": "return=minimal" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, ...err };
  }
}

async function sbFetch() {
  const res = await fetch(`${SB_URL}/rest/v1/whitelist?select=*&order=submitted_at.desc`, {
    headers: sbH,
  });
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

// ── Fonts via @import in style tag ──────────────────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');

  :root {
    --gold:      #C9A84C;
    --gold-lt:   #E8C97A;
    --gold-dk:   #8B6914;
    --navy:      #06080F;
    --navy-mid:  #0B0F1E;
    --graphite:  #1A1C26;
    --graphite2: #252830;
    --border:    rgba(201,168,76,0.18);
    --border-lt: rgba(201,168,76,0.35);
    --text-dim:  rgba(255,255,255,0.45);
    --text-mid:  rgba(255,255,255,0.70);
    --text-full: rgba(255,255,255,0.92);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body, #root {
    background: var(--navy);
    color: var(--text-full);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
  }

  h1,h2,h3,h4,h5 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  /* scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: var(--gold-dk); border-radius: 2px; }

  /* loading screen */
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(18px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes pulseGold {
    0%,100% { opacity:.4; }
    50%      { opacity:1; }
  }
  @keyframes floatPass {
    0%,100% { transform: translateY(0px) rotateX(0deg); }
    50%      { transform: translateY(-18px) rotateX(4deg); }
  }
  @keyframes shimmerBar {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes rotateRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes countUp { from { opacity:0; transform:scale(.9); } to { opacity:1; transform:scale(1); } }

  .fade-up   { animation: fadeUp .9s ease both; }
  .pulse-g   { animation: pulseGold 3s ease-in-out infinite; }
  .float-p   { animation: floatPass 7s ease-in-out infinite; }
  .shimmer-bar {
    background: linear-gradient(90deg, transparent, rgba(201,168,76,.25), transparent);
    background-size: 600px 100%;
    animation: shimmerBar 2.4s infinite;
  }

  /* glass card */
  .glass {
    background: rgba(255,255,255,0.024);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
  }

  /* gold text */
  .gt {
    background: linear-gradient(135deg, var(--gold-lt) 0%, var(--gold) 50%, var(--gold-dk) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* nav links */
  .nav-link {
    color: var(--text-dim);
    text-decoration: none;
    font-size: .82rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    transition: color .2s;
  }
  .nav-link:hover { color: var(--gold); }

  /* primary button */
  .btn-gold {
    background: linear-gradient(135deg, var(--gold-lt), var(--gold), var(--gold-dk));
    color: #08060A;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: .8rem;
    letter-spacing: .14em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: box-shadow .3s, transform .2s, opacity .2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: .55rem;
  }
  .btn-gold:hover {
    box-shadow: 0 0 32px rgba(201,168,76,.45);
    transform: translateY(-1px);
  }

  /* outline button */
  .btn-outline {
    background: transparent;
    color: var(--gold);
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: .8rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    border: 1px solid var(--border-lt);
    cursor: pointer;
    transition: background .25s, border-color .25s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: .5rem;
  }
  .btn-outline:hover { background: rgba(201,168,76,.06); border-color: var(--gold); }

  /* section divider */
  .divider {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 0 auto 3rem;
  }

  /* pass card */
  .pass-card {
    position: relative;
    background: linear-gradient(160deg, var(--graphite) 0%, var(--navy-mid) 100%);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s;
    cursor: default;
  }
  .pass-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 30px rgba(201,168,76,.12);
    border-color: var(--border-lt);
  }
  .pass-card::before {
    content:'';
    position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(201,168,76,.06) 0%, transparent 60%);
    pointer-events: none;
  }

  /* rarity badge colours */
  .r-common      { background: rgba(120,120,140,.25); color:#a0a0b8; }
  .r-uncommon    { background: rgba(60,180,100,.18);  color:#5dbe82; }
  .r-advanced    { background: rgba(60,130,220,.18);  color:#6aadff; }
  .r-rare        { background: rgba(120,60,220,.18);  color:#b07aff; }
  .r-elite       { background: rgba(220,160,20,.18);  color:#e8c055; }
  .r-executive   { background: rgba(220,100,20,.18);  color:#f0953a; }
  .r-mythic      { background: rgba(210,30,100,.18);  color:#f0619a; }
  .r-historic    { background: rgba(30,180,210,.18);  color:#5ad5f0; }
  .r-apex        { background: rgba(220,60,60,.18);   color:#f07070; }
  .r-singular    { background: linear-gradient(90deg,rgba(201,168,76,.3),rgba(232,201,122,.3)); color:var(--gold-lt); }

  /* roadmap */
  .phase-dot {
    width:12px; height:12px; border-radius:50%;
    border: 2px solid var(--gold);
    background: var(--navy);
    position: relative; z-index: 2;
    flex-shrink: 0;
  }
  .phase-dot.done { background: var(--gold); }

  /* form inputs */
  .field input {
    width:100%;
    background: rgba(255,255,255,.04);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: .75rem 1rem;
    color: var(--text-full);
    font-family: 'DM Mono', monospace;
    font-size: .83rem;
    outline: none;
    transition: border-color .2s;
  }
  .field input:focus { border-color: var(--gold); }
  .field input::placeholder { color: var(--text-dim); }
  .field-error { font-size:.72rem; color:#f07070; margin-top:.3rem; display:block; }
  .field label {
    display:block;
    font-size:.72rem;
    letter-spacing:.1em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: .45rem;
  }

  /* ticker bar */
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ticker-inner {
    display: flex;
    animation: ticker 28s linear infinite;
    width: max-content;
  }

  /* noise overlay */
  .noise {
    position:fixed; inset:0; pointer-events:none; z-index:0;
    opacity:.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px;
  }

  /* ── Responsive ──────────────────────────────────────────────────────────── */
  .desktop-nav { display: flex; }

  .mobile-menu-btn {
    display: none;
    background: none; border: none;
    color: var(--gold); font-size: 1.6rem;
    cursor: pointer; padding: .25rem; line-height: 1; align-items: center;
  }
  .mobile-drawer {
    display: none;
    position: fixed; inset: 0; z-index: 200;
    background: rgba(6,8,15,.97);
    backdrop-filter: blur(24px);
    flex-direction: column; align-items: center; justify-content: center;
    gap: 2.2rem; padding: 2rem;
  }
  .mobile-drawer.open { display: flex; }
  .mobile-drawer .nav-link { font-size: 1.1rem; letter-spacing: .16em; }

  @media (max-width: 900px) {
    .desktop-nav    { display: none !important; }
    .mobile-menu-btn { display: flex !important; }

    /* grids → single column */
    .genesis-grid  { grid-template-columns: 1fr !important; }
    .footer-grid   { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .mint-3grid    { grid-template-columns: 1fr 1fr !important; }
    .admin-3grid   { grid-template-columns: 1fr 1fr !important; }
    .access-radios { flex-direction: column !important; }

    /* nav padding */
    nav { padding: .9rem 1.2rem !important; }

    /* hero */
    .hero-section { padding-top: 7rem !important; padding-bottom: 3rem !important; }
    .hero-btns    { flex-direction: column !important; align-items: center !important; }
    .hero-btns > * { width: 100%; max-width: 300px; justify-content: center !important; text-align: center; }

    /* roadmap */
    .roadmap-card { flex-direction: column !important; align-items: flex-start !important; gap: .6rem !important; }
  }

  @media (max-width: 480px) {
    .mint-3grid  { grid-template-columns: 1fr !important; }
    .admin-3grid { grid-template-columns: 1fr !important; }
    .pass-grid   { grid-template-columns: repeat(2,1fr) !important; }
    .cd-wrap     { gap: .4rem !important; }
    .cd-wrap .cd-num { font-size: 2rem !important; }
  }
`;

// ── Data ─────────────────────────────────────────────────────────────────────

const PASSES = [
  { name: "Observer",    supply: 180, rarity: "Common",    tier: "r-common",    symbol: "◎" },
  { name: "Builder",     supply: 120, rarity: "Uncommon",  tier: "r-uncommon",  symbol: "⬡" },
  { name: "Strategist",  supply: 85,  rarity: "Advanced",  tier: "r-advanced",  symbol: "◈" },
  { name: "Protocol",    supply: 60,  rarity: "Rare",      tier: "r-rare",      symbol: "⬟" },
  { name: "Vault",       supply: 40,  rarity: "Elite",     tier: "r-elite",     symbol: "⬠" },
  { name: "Architect",   supply: 30,  rarity: "Executive", tier: "r-executive", symbol: "◆" },
  { name: "Chronos",     supply: 20,  rarity: "Mythic",    tier: "r-mythic",    symbol: "⌬" },
  { name: "Founders",    supply: 12,  rarity: "Historic",  tier: "r-historic",  symbol: "✦" },
  { name: "Prime",       supply: 7,   rarity: "Apex",      tier: "r-apex",      symbol: "✸" },
  { name: "Genesis One", supply: 1,   rarity: "Singular",  tier: "r-singular",  symbol: "❋" },
];

const BENEFITS = [
  { icon: "∞", title: "Lifetime Access", desc: "Permanent platform access across all future Elyze products and investment tiers." },
  { icon: "◈", title: "30% Reward Share", desc: "Automatic distribution from ecosystem profits — on-chain, transparent, recurring." },
  { icon: "◇", title: "Early Airdrops", desc: "Priority distribution of $ELZ tokens and ecosystem utilities before public access." },
  { icon: "⬡", title: "Exclusive Tiers", desc: "Structured investment access from $5/week to $100/month — locked for holders." },
  { icon: "⊛", title: "DAO Governance", desc: "Voting rights over protocol decisions, allocation strategies, and expansion phases." },
  { icon: "◆", title: "Priority Access", desc: "First access to all future Elyze launches, pools, and ecosystem expansions." },
];

const PHASES = [
  { n: "01", title: "Rebrand",           sub: "Elyze AI → Elyze Finance",       date: "Completed",  done: true },
  { n: "02", title: "Genesis Mint",       sub: "WL + Public Mint Open",          date: "June 2026",  done: false },
  { n: "03", title: "Investment Pools",   sub: "Launch of Structured Pools",     date: "Q3 2026",    done: false },
  { n: "04", title: "Auto-Investment",    sub: "Smart Automated System",         date: "Q3 2026",    done: false },
  { n: "05", title: "DAO & $ELZ",         sub: "Governance & Token Expansion",   date: "Q4 2026",    done: false },
];

const TICKER_ITEMS = [
  "GENESIS PASS — 555 SUPPLY",
  "ETHEREUM MAINNET",
  "ERC-721",
  "AI-POWERED INVESTING",
  "MINT: 3 JUNE 2026",
  "WL: 0.012 ETH",
  "PUBLIC: 0.015 ETH",
  "$ELZ TOKEN",
  "DAO GOVERNANCE",
  "30% REWARD SHARE",
];

// ── Countdown hook ────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - Date.now();
      if (diff <= 0) { setT({ d:0,h:0,m:0,s:0 }); return; }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LoadingScreen({ onDone }) {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 2200);
    const t2 = setTimeout(onDone, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:9999,
      background:"#06080F",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      gap:"2rem",
      opacity, transition:"opacity .7s ease",
      pointerEvents: opacity === 0 ? "none" : "all",
    }}>
      {/* ring */}
      <div style={{ position:"relative", width:90, height:90 }}>
        <div style={{
          position:"absolute",inset:0,border:"1px solid rgba(201,168,76,.2)",borderRadius:"50%",
          borderTopColor:"var(--gold)",
          animation:"rotateRing 2s linear infinite",
        }} />
        <div style={{
          position:"absolute",inset:14,border:"1px solid rgba(201,168,76,.1)",borderRadius:"50%",
          borderBottomColor:"rgba(201,168,76,.5)",
          animation:"rotateRing 3s linear infinite reverse",
        }} />
        <div style={{
          position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"1.8rem", color:"var(--gold)",
        }}>❋</div>
      </div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.7rem", color:"var(--gold-lt)", letterSpacing:".12em" }}>
          ELYZE FINANCE
        </div>
        <div style={{ fontSize:".72rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--text-dim)", marginTop:".6rem" }}>
          Structured Participation Initializing
        </div>
      </div>
      {/* loading bar */}
      <div style={{ width:160, height:1, background:"rgba(201,168,76,.12)", borderRadius:1, overflow:"hidden" }}>
        <div className="shimmer-bar" style={{ height:"100%", width:"100%" }} />
      </div>
    </div>
  );
}

function Nav({ onWaitlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["About","Genesis","Ecosystem","Roadmap","Whitelist"];
  const close = () => setOpen(false);

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        padding:"1.1rem 2.5rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(6,8,15,.88)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition:"all .4s ease",
      }}>
        {/* logo */}
        <div style={{ display:"flex", alignItems:"center", gap:".65rem" }}>
          <span style={{ fontSize:"1.3rem", color:"var(--gold)" }}>❋</span>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", letterSpacing:".18em", color:"var(--gold-lt)" }}>ELYZE</div>
            <div style={{ fontSize:".6rem", letterSpacing:".25em", color:"var(--text-dim)", textTransform:"uppercase", marginTop:"-2px" }}>Finance</div>
          </div>
        </div>

        {/* desktop links */}
        <div className="desktop-nav" style={{ gap:"2.5rem", alignItems:"center" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
          <button className="btn-gold" onClick={onWaitlist} style={{ padding:".55rem 1.3rem", borderRadius:6 }}>
            Apply Now
          </button>
        </div>

        {/* hamburger */}
        <button className="mobile-menu-btn" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* mobile drawer */}
      <div className={`mobile-drawer${open ? " open" : ""}`}>
        <button onClick={close} style={{
          position:"absolute", top:"1.4rem", right:"1.4rem",
          background:"none", border:"none", color:"var(--gold)",
          fontSize:"1.5rem", cursor:"pointer", lineHeight:1,
        }}>✕</button>
        {/* logo in drawer */}
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", letterSpacing:".2em", color:"var(--gold-lt)", marginBottom:"1rem" }}>ELYZE FINANCE</div>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={close}
            style={{ fontSize:"1.1rem", letterSpacing:".16em" }}>{l}</a>
        ))}
        <button className="btn-gold" onClick={() => { close(); onWaitlist(); }}
          style={{ padding:".85rem 2.5rem", borderRadius:8, marginTop:"1rem" }}>
          Apply Now
        </button>
      </div>
    </>
  );
}

function CountdownBlock({ label, value }) {
  return (
    <div style={{
      textAlign:"center",
      padding:"1.2rem 1.4rem",
      background:"rgba(255,255,255,.028)",
      border:"1px solid var(--border)",
      borderRadius:10,
      minWidth:72,
    }}>
      <div className="gt" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.6rem", lineHeight:1, fontWeight:300 }}>
        {String(value).padStart(2,"0")}
      </div>
      <div style={{ fontSize:".62rem", letterSpacing:".18em", textTransform:"uppercase", color:"var(--text-dim)", marginTop:".4rem" }}>
        {label}
      </div>
    </div>
  );
}

function Hero({ onWaitlist }) {
  const cd = useCountdown("2026-06-03T14:00:00Z");
  const rotatingLines = [
    "Structured Participation Starts Here.",
    "Long-Term Access Begins on Ethereum.",
    "Investing Infrastructure for the Next Era.",
    "Built for Consistent Growth.",
  ];
  const [lineIdx, setLineIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLineIdx(i => (i+1) % rotatingLines.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="hero-section" style={{
      minHeight:"100vh",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"5rem 2rem 4rem",
      position:"relative",
    }}>
      {/* ambient orbs */}
      <div style={{
        position:"absolute",top:"18%",left:"12%",
        width:500,height:500,
        background:"radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 70%)",
        borderRadius:"50%", filter:"blur(40px)", pointerEvents:"none",
      }} className="pulse-g" />
      <div style={{
        position:"absolute",bottom:"15%",right:"8%",
        width:400,height:400,
        background:"radial-gradient(circle,rgba(40,80,180,.08) 0%,transparent 70%)",
        borderRadius:"50%", filter:"blur(40px)", pointerEvents:"none",
        animationDelay:"1.8s",
      }} className="pulse-g" />

      {/* top badge */}
      <div style={{
        fontSize:".7rem", letterSpacing:".2em", textTransform:"uppercase",
        color:"var(--gold)", border:"1px solid var(--border-lt)",
        borderRadius:99, padding:".4rem 1.1rem", marginBottom:"2.5rem",
        display:"flex", alignItems:"center", gap:".5rem",
      }}>
        <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--gold)",display:"inline-block" }} className="pulse-g"/>
        Ethereum Mainnet · ERC-721
      </div>

      {/* headline */}
      <h1 style={{
        fontSize:"clamp(2.4rem,6vw,5.2rem)",
        textAlign:"center",
        lineHeight:1.1,
        maxWidth:780,
        marginBottom:"1.4rem",
        fontWeight:400,
        color:"var(--text-full)",
        minHeight:"6.5rem",
        transition:"opacity .4s",
      }}>
        {rotatingLines[lineIdx]}
      </h1>

      <p style={{
        textAlign:"center",
        color:"var(--text-mid)",
        fontSize:"1.05rem",
        maxWidth:560,
        lineHeight:1.75,
        marginBottom:"3.5rem",
        fontWeight:300,
      }}>
        An AI-powered investment ecosystem designed for structured participation, long-term growth, and transparent Ethereum-based investing.
      </p>

      {/* floating pass mockup */}
      <div className="float-p" style={{
        marginBottom:"3.5rem",
        position:"relative", width:240, height:280,
      }}>
        <div style={{
          position:"absolute",inset:0,
          background:"radial-gradient(ellipse at 50% 50%, rgba(201,168,76,.22) 0%, transparent 70%)",
          filter:"blur(20px)",
        }} />
        <div style={{
          position:"relative",
          width:"100%",height:"100%",
          background:"linear-gradient(160deg,#1a1c26 0%,#0b0f1e 100%)",
          border:"1px solid var(--border-lt)",
          borderRadius:20,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          gap:"1rem",
          overflow:"hidden",
        }}>
          {/* shimmer overlay */}
          <div className="shimmer-bar" style={{ position:"absolute",inset:0 }} />
          {/* question mark (unrevealed) */}
          <div style={{ fontSize:"4rem", color:"var(--gold)", opacity:.7, fontFamily:"'Cormorant Garamond',serif" }}>?</div>
          <div style={{ fontSize:".68rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--text-dim)" }}>
            Genesis Mystery
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", letterSpacing:".1em" }} className="gt">
            UNREVEALED
          </div>
          {/* bottom strip */}
          <div style={{
            position:"absolute",bottom:0,left:0,right:0,
            height:3,
            background:"linear-gradient(90deg,transparent,var(--gold),transparent)",
          }} />
        </div>
      </div>

      {/* CTA */}
      <div className="hero-btns" style={{ display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center", marginBottom:"2.5rem" }}>
        <button className="btn-gold" onClick={onWaitlist} style={{ padding:".85rem 2.2rem", borderRadius:8, fontSize:".82rem" }}>
          ❋ Apply for Access
        </button>
        <a href="#genesis" className="btn-outline" style={{ padding:".85rem 2.2rem", borderRadius:8, fontSize:".82rem" }}>
          Explore Genesis
        </a>
      </div>

      {/* countdown */}
      <div style={{ marginBottom:"1rem", fontSize:".7rem", letterSpacing:".18em", textTransform:"uppercase", color:"var(--text-dim)" }}>
        Mint Opens · 3 June 2026 · 2PM UTC
      </div>
      <div className="cd-wrap" style={{ display:"flex", gap:".75rem" }}>
        <CountdownBlock label="Days"    value={cd.d} />
        <CountdownBlock label="Hours"   value={cd.h} />
        <CountdownBlock label="Minutes" value={cd.m} />
        <CountdownBlock label="Seconds" value={cd.s} />
      </div>
    </section>
  );
}

function TickerBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      borderTop:"1px solid var(--border)",
      borderBottom:"1px solid var(--border)",
      padding:".75rem 0",
      overflow:"hidden",
      background:"rgba(201,168,76,.028)",
    }}>
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span key={i} style={{
            display:"inline-flex", alignItems:"center", gap:"1.5rem",
            padding:"0 2rem",
            fontSize:".7rem", letterSpacing:".2em", textTransform:"uppercase",
            color:"var(--gold)", opacity:.7,
          }}>
            {item}
            <span style={{ width:3,height:3,borderRadius:"50%",background:"var(--gold)",opacity:.5 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function PreReveal() {
  return (
    <section style={{ padding:"6rem 2rem", textAlign:"center", background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 50%,var(--navy) 100%)" }}>
      <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.5rem", opacity:.8 }}>
        Status
      </div>
      <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)", marginBottom:"1rem" }}>
        Genesis Reveal <span className="gt">Pending</span>
      </h2>
      <p style={{ color:"var(--text-dim)", fontSize:".95rem", letterSpacing:".06em", marginBottom:"3rem" }}>
        Analyze the passes. Prepare for the reveal.
      </p>
      {/* mystery pass grid */}
      <div style={{ display:"flex", gap:"1.5rem", justifyContent:"center", flexWrap:"wrap" }}>
        {[1,2,3].map(i => (
          <div key={i} style={{
            width:140, height:190,
            background:"linear-gradient(160deg,#1a1c26,#0b0f1e)",
            border:"1px solid var(--border)",
            borderRadius:14,
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            gap:".8rem",
            overflow:"hidden", position:"relative",
            opacity: i === 2 ? 1 : .55,
          }}>
            <div className="shimmer-bar" style={{ position:"absolute",inset:0 }} />
            <div style={{ fontSize:"2rem", color:"var(--gold)" }}>?</div>
            <div style={{ fontSize:".6rem", letterSpacing:".18em", color:"var(--text-dim)" }}>CLASSIFIED</div>
            <div style={{ position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--gold),transparent)" }} />
          </div>
        ))}
      </div>
      <p style={{ marginTop:"2rem", fontSize:".72rem", letterSpacing:".14em", color:"var(--text-dim)" }}>
        Reveal occurs 1 week after mint sell-out · Metadata hidden until then
      </p>
    </section>
  );
}

function About() {
  const cards = [
    { icon:"◈", title:"AI Optimization",       desc:"Intelligent strategies adapt continuously to DeFi market conditions for maximum consistency." },
    { icon:"⬡", title:"Structured Investing",   desc:"Systematic participation from $5/week. No guesswork. No speculation." },
    { icon:"⊛", title:"Community Governance",   desc:"Pass holders vote on protocol decisions, pool allocations, and ecosystem direction." },
  ];
  return (
    <section id="about" style={{ padding:"7rem 2rem" }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
            The Platform
          </div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3.4rem)", marginBottom:"1.4rem" }}>
            AI-Powered Investing <span className="gt">Infrastructure</span>
          </h2>
          <div className="divider" />
          <p style={{ color:"var(--text-mid)", fontSize:"1rem", maxWidth:580, margin:"0 auto", lineHeight:1.85, fontWeight:300 }}>
            Elyze Finance combines automated DeFi strategies, AI-driven optimization, and structured ecosystem participation — making long-term crypto investing accessible, consistent, and transparent. Begin with as little as $5/week.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.5rem" }}>
          {cards.map((c,i) => (
            <div key={i} className="glass pass-card" style={{ padding:"2.5rem 2rem" }}>
              <div style={{ fontSize:"1.8rem", color:"var(--gold)", marginBottom:"1.2rem" }}>{c.icon}</div>
              <h3 style={{ fontSize:"1.35rem", marginBottom:".7rem", color:"var(--text-full)" }}>{c.title}</h3>
              <p style={{ color:"var(--text-dim)", fontSize:".88rem", lineHeight:1.75 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GenesisPass() {
  const cd = useCountdown("2026-06-03T14:00:00Z");
  const details = [
    ["Collection",   "Elyze Finance: Genesis Pass"],
    ["Standard",     "ERC-721"],
    ["Network",      "Ethereum Mainnet"],
    ["Total Supply", "555"],
    ["Mint Type",    "Random Mint · Delayed Reveal"],
    ["WL Price",     "0.012 ETH"],
    ["Public Price", "0.015 ETH"],
    ["Mint Date",    "3 June 2026 · 2PM UTC"],
  ];
  return (
    <section id="genesis" style={{ padding:"7rem 2rem", background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 50%,var(--navy) 100%)" }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
            The Collection
          </div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3.4rem)", marginBottom:".8rem" }}>
            <span className="gt">Genesis Pass</span> Collection
          </h2>
          <div className="divider" />
          <p style={{ color:"var(--text-dim)", fontSize:".9rem" }}>555 passes. One ecosystem. Permanent access.</p>
        </div>

        <div className="genesis-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", alignItems:"start" }}>
          {/* details */}
          <div className="glass" style={{ borderRadius:16, overflow:"hidden" }}>
            {details.map(([k,v],i) => (
              <div key={i} style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"1rem 1.6rem",
                borderBottom: i < details.length-1 ? "1px solid var(--border)" : "none",
              }}>
                <span style={{ fontSize:".72rem", letterSpacing:".14em", textTransform:"uppercase", color:"var(--text-dim)" }}>{k}</span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", letterSpacing:".04em", color:"var(--text-full)" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* countdown + pricing */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
            <div className="glass" style={{ borderRadius:16, padding:"2rem", textAlign:"center" }}>
              <div style={{ fontSize:".7rem", letterSpacing:".2em", textTransform:"uppercase", color:"var(--text-dim)", marginBottom:"1.2rem" }}>
                Mint Opens In
              </div>
              <div style={{ display:"flex", gap:".6rem", justifyContent:"center" }}>
                {[["D",cd.d],["H",cd.h],["M",cd.m],["S",cd.s]].map(([l,v],i) => (
                  <div key={i} style={{ textAlign:"center" }}>
                    <div className="gt" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.4rem", fontWeight:300, lineHeight:1 }}>
                      {String(v).padStart(2,"0")}
                    </div>
                    <div style={{ fontSize:".6rem", letterSpacing:".16em", color:"var(--text-dim)", marginTop:.3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* supply bar */}
            <div className="glass" style={{ borderRadius:16, padding:"1.6rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:".6rem" }}>
                <span style={{ fontSize:".75rem", letterSpacing:".1em", textTransform:"uppercase", color:"var(--text-dim)" }}>Supply</span>
                <span className="gt" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem" }}>555</span>
              </div>
              <div style={{ height:3, background:"rgba(255,255,255,.08)", borderRadius:2, overflow:"hidden" }}>
                <div style={{ width:"0%", height:"100%", background:"linear-gradient(90deg,var(--gold-dk),var(--gold-lt))", borderRadius:2 }} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:".5rem" }}>
                <span style={{ fontSize:".7rem", color:"var(--text-dim)" }}>0 minted</span>
                <span style={{ fontSize:".7rem", color:"var(--text-dim)" }}>555 total</span>
              </div>
            </div>

            {/* pricing */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              {[
                { tier:"Priority WL", price:"0.012 ETH", tag:"r-elite" },
                { tier:"Public",      price:"0.015 ETH", tag:"r-advanced" },
              ].map((p,i) => (
                <div key={i} className="glass" style={{ borderRadius:12, padding:"1.4rem", textAlign:"center" }}>
                  <div className={p.tag} style={{ fontSize:".62rem", letterSpacing:".14em", textTransform:"uppercase", padding:".2rem .7rem", borderRadius:99, display:"inline-block", marginBottom:".7rem" }}>
                    {p.tier}
                  </div>
                  <div className="gt" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.7rem" }}>{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PassCard({ pass }) {
  return (
    <div className="pass-card" style={{ padding:"1.8rem 1.4rem" }}>
      {/* symbol */}
      <div style={{
        fontSize:"2rem", color:"var(--gold)", marginBottom:"1.1rem",
        height:52, display:"flex", alignItems:"center",
      }}>{pass.symbol}</div>
      {/* reveal pending overlay hint */}
      <div style={{
        position:"absolute", top:12, right:12,
        fontSize:".58rem", letterSpacing:".12em", textTransform:"uppercase",
        background:"rgba(0,0,0,.55)", border:"1px solid var(--border)", borderRadius:99,
        padding:".18rem .6rem", color:"var(--text-dim)",
      }}>Pending</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", marginBottom:".4rem" }}>{pass.name}</div>
      <div className={pass.tier} style={{ fontSize:".62rem", letterSpacing:".14em", textTransform:"uppercase", padding:".2rem .75rem", borderRadius:99, display:"inline-block", marginBottom:".8rem" }}>
        {pass.rarity}
      </div>
      <div style={{ marginTop:"auto", fontSize:".75rem", fontFamily:"'DM Mono',monospace", color:"var(--text-dim)" }}>
        Supply: {pass.supply}
      </div>
      {/* bottom shimmer */}
      <div className="shimmer-bar" style={{ position:"absolute", bottom:0, left:0, right:0, height:2 }} />
    </div>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" style={{ padding:"7rem 2rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
            Pass Ecosystem
          </div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3.4rem)", marginBottom:".8rem" }}>
            Ten Tiers. <span className="gt">One Ecosystem.</span>
          </h2>
          <div className="divider" />
          <p style={{ color:"var(--text-dim)", fontSize:".9rem" }}>Rarity determined at reveal. Utilities unlock post-reveal.</p>
        </div>
        <div className="pass-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:"1.1rem" }}>
          {PASSES.map((p,i) => <PassCard key={i} pass={p} />)}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section style={{ padding:"7rem 2rem", background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 50%,var(--navy) 100%)" }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
            Holder Advantages
          </div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3.4rem)", marginBottom:".8rem" }}>
            Genesis Holder <span className="gt">Benefits</span>
          </h2>
          <div className="divider" />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.2rem" }}>
          {BENEFITS.map((b,i) => (
            <div key={i} className="glass pass-card" style={{ padding:"2rem 1.6rem", display:"flex", gap:"1.2rem", alignItems:"flex-start" }}>
              <div style={{
                width:42, height:42, borderRadius:10, border:"1px solid var(--border-lt)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"1.1rem", color:"var(--gold)", flexShrink:0,
                background:"rgba(201,168,76,.06)",
              }}>{b.icon}</div>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", marginBottom:".4rem" }}>{b.title}</div>
                <div style={{ fontSize:".83rem", color:"var(--text-dim)", lineHeight:1.7 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section id="roadmap" style={{ padding:"7rem 2rem" }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"4.5rem" }}>
          <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
            Milestones
          </div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3.4rem)", marginBottom:".8rem" }}>
            The <span className="gt">Roadmap</span>
          </h2>
          <div className="divider" />
        </div>
        <div style={{ position:"relative", paddingLeft:"2.5rem" }}>
          {/* vertical line */}
          <div style={{
            position:"absolute", left:5, top:6, bottom:6,
            width:1, background:"linear-gradient(180deg,var(--gold) 0%,rgba(201,168,76,.1) 100%)",
          }} />
          {PHASES.map((p,i) => (
            <div key={i} style={{ display:"flex", gap:"1.6rem", marginBottom: i < PHASES.length-1 ? "2.8rem":"0", alignItems:"flex-start" }}>
              <div className={`phase-dot ${p.done?"done":""}`} style={{ marginTop:4 }} />
              <div className="glass roadmap-card" style={{ flex:1, borderRadius:12, padding:"1.4rem 1.6rem", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem" }}>
                <div>
                  <div style={{ fontSize:".68rem", letterSpacing:".18em", textTransform:"uppercase", color:"var(--gold)", marginBottom:".3rem" }}>
                    Phase {p.n}
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", marginBottom:".2rem" }}>{p.title}</div>
                  <div style={{ fontSize:".8rem", color:"var(--text-dim)" }}>{p.sub}</div>
                </div>
                <div style={{
                  fontSize:".72rem", letterSpacing:".1em", textTransform:"uppercase",
                  padding:".3rem .9rem", borderRadius:99,
                  background: p.done ? "rgba(100,200,120,.12)" : "rgba(201,168,76,.08)",
                  color: p.done ? "#6ddc8a" : "var(--gold)",
                  border: `1px solid ${p.done ? "rgba(100,200,120,.25)" : "var(--border)"}`,
                  whiteSpace:"nowrap", flexShrink:0,
                }}>
                  {p.done ? "✓ Done" : p.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TokenSection() {
  return (
    <section style={{ padding:"7rem 2rem", background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 50%,var(--navy) 100%)" }}>
      <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
          Ecosystem Token
        </div>
        <h2 style={{ fontSize:"clamp(2rem,4vw,3.4rem)", marginBottom:"1rem" }}>
          <span className="gt">$ELZ</span>
        </h2>
        <div className="divider" />
        <p style={{ color:"var(--text-mid)", fontSize:".95rem", lineHeight:1.85, maxWidth:520, margin:"0 auto 3rem", fontWeight:300 }}>
          The native utility token powering governance, staking, and ecosystem expansion. Pass staking is not live at launch — $ELZ staking is planned post token launch.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1.2rem" }}>
          {[
            { icon:"⊛", label:"Governance Voting",    note:"Shape protocol decisions" },
            { icon:"◇", label:"Ecosystem Utility",    note:"Access & fee utilities" },
            { icon:"◈", label:"Future Staking",        note:"Planned post-launch" },
            { icon:"❋", label:"Expansion Incentives",  note:"Community rewards" },
          ].map((item,i) => (
            <div key={i} className="glass" style={{ borderRadius:12, padding:"1.6rem", textAlign:"center" }}>
              <div style={{ fontSize:"1.4rem", color:"var(--gold)", marginBottom:".6rem" }}>{item.icon}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", marginBottom:".3rem" }}>{item.label}</div>
              <div style={{ fontSize:".78rem", color:"var(--text-dim)" }}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MintPhase() {
  return (
    <section style={{ padding:"5rem 2rem" }}>
      <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
          Mint Access
        </div>
        <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", marginBottom:".8rem" }}>
          Structured Access. <span className="gt">Prioritized Participation.</span>
        </h2>
        <div className="divider" />
        <p style={{ color:"var(--text-dim)", fontSize:".88rem", marginBottom:"2.5rem", lineHeight:1.75 }}>
          Early aligned participants receive structured access before public expansion.
        </p>
        <div className="mint-3grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem" }}>
          {[
            { n:"1", label:"Priority Whitelist", tag:"Guaranteed", color:"var(--gold)" },
            { n:"2", label:"General Access",     tag:"FCFS",       color:"#6aadff" },
            { n:"3", label:"Public Access",      tag:"Open",       color:"var(--text-mid)" },
          ].map((m,i) => (
            <div key={i} className="glass" style={{ borderRadius:12, padding:"1.6rem 1rem", textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.2rem", color:m.color, marginBottom:".5rem" }}>{m.n}</div>
              <div style={{ fontSize:".85rem", marginBottom:".3rem" }}>{m.label}</div>
              <div style={{ fontSize:".7rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--text-dim)" }}>{m.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" style={{ padding:"6rem 2rem", background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 50%,var(--navy) 100%)" }}>
      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
          Community
        </div>
        <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)", marginBottom:"1rem" }}>
          Join the <span className="gt">Ecosystem</span>
        </h2>
        <div className="divider" />
        <p style={{ color:"var(--text-mid)", fontSize:".95rem", lineHeight:1.85, marginBottom:"2.5rem", fontWeight:300 }}>
          A global community of long-term participants — not traders, not speculators. Builders of infrastructure.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <a href="https://x.com/Elyzeoneth" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding:".8rem 1.8rem", borderRadius:8 }}>
            ✕ Follow on X
          </a>
          <a href="https://t.me/elyzefinance" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding:".8rem 1.8rem", borderRadius:8 }}>
            ✈ Join Telegram
          </a>
          <a href="https://opensea.io/collection/elyze-finance-genesis-pass" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding:".8rem 1.8rem", borderRadius:8 }}>
            ◈ OpenSea
          </a>
        </div>
      </div>
    </section>
  );
}

// Generates a randomised arithmetic challenge the bot can't trivially read
// because the operator and operands are chosen at runtime and the label is
// built as a string — not individual variables in the DOM.
function makeCaptcha() {
  const ops = ["+", "-", "×"];
  const op  = ops[Math.floor(Math.random() * ops.length)];
  const a   = Math.floor(Math.random() * 20) + 5;   // 5–24
  const b   = op === "-"
    ? Math.floor(Math.random() * a) + 1              // b < a so answer ≥ 1
    : Math.floor(Math.random() * 10) + 2;            // 2–11
  const answer = op === "+" ? a + b : op === "-" ? a - b : a * b;
  return { label:`${a} ${op} ${b}`, answer };
}

function WhitelistForm() {
  const [cap]      = useState(makeCaptcha);
  const [mountTs]  = useState(() => Date.now());
  const [touched,   setTouched]   = useState(false);
  const [form,      setForm]      = useState({ wallet:"", xHandle:"", _hp:"", email:"" });
  const [capInput,  setCapInput]  = useState("");
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting,setSubmitting]= useState(false);

  const tasks = [
    { label:"Follow Elyze Finance on X",                href:"https://twitter.com/intent/follow?screen_name=Elyzeoneth&reference=zursion",     optional:false },
    { label:"Like + Retweet + Comment on pinned post",  href:"https://x.com/Elyzeoneth",     optional:false },
    { label:"Join Telegram",                            href:"https://t.me/elyzefinance",     optional:true  },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Bot signals — silent drop ──────────────────────────────────────────
    if (form._hp || form.email) return;
    if (!touched) return;
    if (Date.now() - mountTs < 4000) return;

    // ── Rate limit: 1 attempt per hour per browser ─────────────────────────
    const lastSubmit = parseInt(localStorage.getItem("elyze_wl_last") || "0", 10);
    if (Date.now() - lastSubmit < 3600_000) {
      setErrors({ captcha:"Too many attempts. Please try again later." });
      return;
    }

    // ── Client-side validation ─────────────────────────────────────────────
    const errs = {};
    if (!/^0x[a-fA-F0-9]{40}$/.test(form.wallet.trim()))
      errs.wallet = "Enter a valid ERC-20 Ethereum address (0x…)";
    if (!/^@[a-zA-Z0-9_]{1,15}$/.test(form.xHandle.trim()))
      errs.xHandle = "Enter your X handle (e.g. @username)";
    if (parseInt(capInput, 10) !== cap.answer)
      errs.captcha = "Incorrect answer";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // ── Submit to Supabase ─────────────────────────────────────────────────
    setSubmitting(true);
    try {
      await sbInsert({
        wallet:   form.wallet.trim(),
        x_handle: form.xHandle.trim(),
      });
      localStorage.setItem("elyze_wl_last", String(Date.now()));
      setSubmitted(true);
    } catch (err) {
      if (err.status === 409 || err.code === "23505") {
        const msg = (err.message || err.details || "").toLowerCase();
        if (msg.includes("wallet"))
          setErrors({ wallet: "This wallet is already registered." });
        else if (msg.includes("x_handle"))
          setErrors({ xHandle: "This X handle is already registered." });
        else
          setErrors({ captcha: "This entry already exists in our system." });
      } else {
        setErrors({ captcha: "Submission failed. Please check your connection and try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return (
    <section id="whitelist" style={{ padding:"7rem 2rem", background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 50%,var(--navy) 100%)" }}>
      <div style={{ maxWidth:540, margin:"0 auto", textAlign:"center" }}>
        <div className="glass" style={{ borderRadius:20, padding:"3.5rem 2.5rem", border:"1px solid var(--border-lt)" }}>
          <div style={{ fontSize:"2.4rem", color:"var(--gold)", marginBottom:"1.2rem" }}>❋</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", marginBottom:".8rem" }}>Application Received.</div>
          <div style={{ color:"var(--text-dim)", fontSize:".9rem", lineHeight:1.8 }}>
            Genesis access decisions will be announced closer to mint.
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section id="whitelist" style={{ padding:"7rem 2rem", background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 50%,var(--navy) 100%)" }}>
      <div style={{ maxWidth:580, margin:"0 auto" }}>
        {/* header */}
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>
            Genesis Access
          </div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", marginBottom:".8rem" }}>
            Apply for <span className="gt">Genesis Access</span>
          </h2>
          <div className="divider" />
          <p style={{ color:"var(--text-mid)", fontSize:".9rem", lineHeight:1.8 }}>
            Structured participation begins before public access.
          </p>
        </div>

        {/* task checklist */}
        <div className="glass" style={{ borderRadius:14, padding:"1.6rem 2rem", marginBottom:"2rem" }}>
          <div style={{ fontSize:".65rem", letterSpacing:".18em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1rem", opacity:.8 }}>
            Required Tasks
          </div>
          {tasks.map((t,i) => (
            <a key={i} href={t.href} target="_blank" rel="noopener noreferrer"
              style={{
                display:"flex", alignItems:"center", gap:".85rem",
                padding:".7rem 0",
                borderBottom: i < tasks.length - 1 ? "1px solid var(--border)" : "none",
                textDecoration:"none", color:"var(--text-mid)", fontSize:".85rem",
                transition:"color .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold-lt)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-mid)"}
            >
              <div style={{
                width:20, height:20, borderRadius:5, flexShrink:0,
                border:"1px solid var(--border-lt)", background:"rgba(201,168,76,.06)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:".7rem", color:"var(--gold)",
              }}>↗</div>
              <span style={{ flex:1 }}>{t.label}</span>
              {t.optional && (
                <span style={{ fontSize:".65rem", letterSpacing:".1em", textTransform:"uppercase", color:"var(--text-dim)", opacity:.7 }}>
                  optional
                </span>
              )}
            </a>
          ))}
        </div>

        {/* form */}
        <div className="glass" style={{ borderRadius:16, padding:"2.5rem", border:"1px solid var(--border-lt)" }}>
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.4rem" }}>
            {/* honeypot 1 — positionally hidden */}
            <input
              type="text" name="_hp" tabIndex={-1} aria-hidden="true"
              value={form._hp} onChange={e => setForm(v => ({...v, _hp:e.target.value}))}
              style={{ position:"absolute", left:-9999, width:1, height:1, opacity:0 }}
              autoComplete="off"
            />
            {/* honeypot 2 — realistic field name that bots love to fill */}
            <input
              type="email" name="email" tabIndex={-1} aria-hidden="true"
              value={form.email} onChange={e => setForm(v => ({...v, email:e.target.value}))}
              style={{ position:"absolute", left:-9999, width:1, height:1, opacity:0 }}
              autoComplete="off"
            />

            {/* wallet */}
            <div className="field">
              <label>ERC-20 / Ethereum Wallet Address</label>
              <input
                type="text" placeholder="0x..."
                value={form.wallet}
                onChange={e => { setTouched(true); setForm(v=>({...v,wallet:e.target.value})); setErrors(v=>({...v,wallet:""})); }}
                style={errors.wallet ? { borderColor:"#f07070" } : {}}
              />
              {errors.wallet && <span className="field-error">{errors.wallet}</span>}
            </div>

            {/* X handle */}
            <div className="field">
              <label>X Handle</label>
              <input
                type="text" placeholder="@username"
                value={form.xHandle}
                onChange={e => { setTouched(true); setForm(v=>({...v,xHandle:e.target.value})); setErrors(v=>({...v,xHandle:""})); }}
                style={errors.xHandle ? { borderColor:"#f07070" } : {}}
              />
              {errors.xHandle && <span className="field-error">{errors.xHandle}</span>}
            </div>

            {/* captcha */}
            <div className="field">
              <label>Verification — {cap.label} = ?</label>
              <input
                type="number" placeholder="Answer"
                value={capInput}
                onChange={e => { setTouched(true); setCapInput(e.target.value); setErrors(v=>({...v,captcha:""})); }}
                style={errors.captcha ? { borderColor:"#f07070" } : {}}
              />
              {errors.captcha && <span className="field-error">{errors.captcha}</span>}
            </div>

            <button type="submit" className="btn-gold" disabled={submitting}
              style={{ padding:".9rem", borderRadius:8, justifyContent:"center", fontSize:".82rem", marginTop:".2rem", opacity:submitting?.65:1 }}>
              {submitting ? "Submitting…" : "❋ Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function AdminPanel() {
  const [entries, setEntries] = useState([]);
  const [pw, setPw] = useState("");
  const [auth, setAuth] = useState(false);
  const [wrongPw,  setWrongPw]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [fetchErr, setFetchErr] = useState("");
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "elyze2026admin";

  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    setFetchErr("");
    sbFetch()
      .then(data => setEntries(data))
      .catch(() => setFetchErr("Could not load data from Supabase. Check your connection."))
      .finally(() => setLoading(false));
  }, [auth]);

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuth(true); setWrongPw(false); }
    else { setWrongPw(true); setPw(""); }
  };

  const exportCSV = () => {
    const header = "wallet,x_handle,submitted_at\n";
    const rows = entries.map(e =>
      `${e.wallet},${e.x_handle},${e.submitted_at}`
    ).join("\n");
    const blob = new Blob([header + rows], { type:"text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "elyze_whitelist.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  if (!auth) return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"4rem 2rem", background:"var(--navy)" }}>
      <div style={{ maxWidth:360, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <div style={{ fontSize:"1.8rem", color:"var(--gold)", marginBottom:".6rem" }}>❋</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.9rem" }}>Admin Access</h2>
        </div>
        <div className="glass" style={{ borderRadius:14, padding:"2rem", border:"1px solid var(--border-lt)" }}>
          <div className="field" style={{ marginBottom:"1rem" }}>
            <label>Password</label>
            <input
              type="password" placeholder="Enter admin password"
              value={pw} onChange={e=>setPw(e.target.value)}
              onKeyDown={e => e.key==="Enter" && login()}
              style={wrongPw ? { borderColor:"#f07070" } : {}}
            />
            {wrongPw && <span className="field-error">Incorrect password</span>}
          </div>
          <button className="btn-gold" onClick={login} style={{ width:"100%", padding:".85rem", borderRadius:8, justifyContent:"center" }}>
            Access Dashboard
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <section style={{ minHeight:"100vh", padding:"4rem 2rem", background:"var(--navy)" }}>
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        {/* header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem" }}>
            Whitelist Dashboard
          </h2>
          <div style={{ display:"flex", gap:".75rem" }}>
            <button className="btn-outline" onClick={exportCSV} disabled={loading || entries.length === 0}
              style={{ padding:".6rem 1.4rem", borderRadius:7, opacity:(loading || entries.length===0)?.5:1 }}>
              Export CSV
            </button>
            <button className="btn-outline" onClick={() => { setLoading(true); sbFetch().then(setEntries).finally(() => setLoading(false)); }}
              style={{ padding:".6rem 1.4rem", borderRadius:7 }}>
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* stats */}
        <div className="glass" style={{ borderRadius:12, padding:"1.4rem 2rem", marginBottom:"2rem", display:"inline-flex", alignItems:"center", gap:"1.5rem" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.4rem", color:"var(--gold)" }}>
            {loading ? "—" : entries.length}
          </div>
          <div style={{ fontSize:".72rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--text-dim)" }}>Total Applications</div>
        </div>

        {fetchErr && (
          <div style={{ padding:"1rem 1.4rem", borderRadius:10, background:"rgba(240,112,112,.1)", border:"1px solid rgba(240,112,112,.25)", color:"#f07070", fontSize:".83rem", marginBottom:"1.5rem" }}>
            {fetchErr}
          </div>
        )}

        {/* table */}
        <div className="glass" style={{ borderRadius:14, overflow:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:".82rem" }}>
            <thead>
              <tr style={{ borderBottom:"1px solid var(--border)" }}>
                {["#","Wallet","X Handle","Submitted"].map(h => (
                  <th key={h} style={{ padding:".9rem 1.2rem", textAlign:"left", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:"var(--text-dim)", fontWeight:400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ padding:"2.5rem", textAlign:"center", color:"var(--text-dim)" }}>Loading…</td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan={4} style={{ padding:"2.5rem", textAlign:"center", color:"var(--text-dim)" }}>No applications yet.</td></tr>
              ) : entries.map((e,i) => (
                <tr key={e.id || i} style={{ borderBottom: i < entries.length-1 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding:".8rem 1.2rem", color:"var(--text-dim)" }}>{i+1}</td>
                  <td style={{ padding:".8rem 1.2rem", fontFamily:"'DM Mono',monospace", fontSize:".74rem" }}>{e.wallet}</td>
                  <td style={{ padding:".8rem 1.2rem" }}>{e.x_handle}</td>
                  <td style={{ padding:".8rem 1.2rem", color:"var(--text-dim)", fontSize:".74rem" }}>
                    {new Date(e.submitted_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FinalStatement() {
  return (
    <section style={{ padding:"6rem 2rem", background:"linear-gradient(180deg,var(--navy) 0%,var(--navy-mid) 50%,var(--navy) 100%)" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <div style={{ width:1, height:80, background:"linear-gradient(180deg,transparent,var(--gold))", margin:"0 auto 3rem" }} />
        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
          fontSize:"clamp(1.6rem,3.5vw,2.8rem)", fontWeight:300,
          color:"var(--text-full)", lineHeight:1.55,
        }}>
          "Elyze Finance is built for those who believe in consistent growth —<br />
          not hype. Not speculation. Just real investing power."
        </h2>
        <div style={{ width:1, height:80, background:"linear-gradient(180deg,var(--gold),transparent)", margin:"3rem auto 0" }} />
      </div>
    </section>
  );
}

function Footer({ onWaitlist }) {
  return (
    <footer style={{
      padding:"3.5rem 2.5rem 2rem",
      borderTop:"1px solid var(--border)",
      background:"var(--navy)",
    }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:"3rem", marginBottom:"3rem" }}>
          {/* brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:"1rem" }}>
              <span style={{ color:"var(--gold)", fontSize:"1.1rem" }}>❋</span>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", letterSpacing:".18em", color:"var(--gold-lt)" }}>ELYZE</div>
                <div style={{ fontSize:".6rem", letterSpacing:".22em", color:"var(--text-dim)" }}>FINANCE</div>
              </div>
            </div>
            <p style={{ fontSize:".8rem", color:"var(--text-dim)", lineHeight:1.75, maxWidth:260 }}>
              Built with transparency. Powered by Ethereum. Designed for long-term participation.
            </p>
            <div style={{ marginTop:"1.2rem", fontSize:".7rem", color:"var(--text-dim)", letterSpacing:".1em" }}>
              Ethereum Mainnet · ERC-721<br />MetaMask · WalletConnect · Coinbase Wallet
            </div>
          </div>

          {/* links */}
          <div>
            <div style={{ fontSize:".7rem", letterSpacing:".18em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>Community</div>
            {[
              { label:"X / Twitter", href:"https://x.com/Elyzeoneth" },
              { label:"Telegram",    href:"https://t.me/elyzefinance" },
              { label:"OpenSea",     href:"https://opensea.io/collection/elyze-finance-genesis-pass" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                 style={{ display:"block", fontSize:".83rem", color:"var(--text-dim)", textDecoration:"none", marginBottom:".6rem", transition:"color .2s" }}
                 onMouseEnter={e=>e.target.style.color="var(--gold)"}
                 onMouseLeave={e=>e.target.style.color="var(--text-dim)"}
              >{l.label}</a>
            ))}
          </div>

          {/* nav */}
          
          <div>
            <div style={{ fontSize:".7rem", letterSpacing:".18em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem", opacity:.8 }}>Navigation</div>
            {["About","Genesis","Ecosystem","Roadmap","Whitelist"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                 style={{ display:"block", fontSize:".83rem", color:"var(--text-dim)", textDecoration:"none", marginBottom:".6rem", transition:"color .2s" }}
                 onMouseEnter={e=>e.target.style.color="var(--gold)"}
                 onMouseLeave={e=>e.target.style.color="var(--text-dim)"}
              >{l}</a>
            ))}
          </div>
        </div>

        <div style={{ borderTop:"1px solid var(--border)", paddingTop:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <div style={{ fontSize:".72rem", color:"var(--text-dim)", letterSpacing:".08em" }}>
            Elyze Finance © 2026 · Anonymous Team · Contract Under Development
          </div>
          <button className="btn-gold" onClick={onWaitlist} style={{ padding:".55rem 1.4rem", borderRadius:6, fontSize:".75rem" }}>
            Apply Now
          </button>
        </div>
      </div>
    </footer>
  );
}

// ── Main app ─────────────────────────────────────────────────────────────────
export default function ElyzeFinance() {
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === "#admin");

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === "#admin");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const scrollToWhitelist = () => {
    document.getElementById("whitelist")?.scrollIntoView({ behavior:"smooth" });
  };

  if (isAdmin) return (
    <>
      <style>{GLOBAL_STYLE}</style>
      <div className="noise" />
      <AdminPanel />
    </>
  );

  return (
    <>
      <style>{GLOBAL_STYLE}</style>
      <div className="noise" />
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition:"opacity .6s ease" }}>
        <Nav onWaitlist={scrollToWhitelist} />
        <Hero onWaitlist={scrollToWhitelist} />
        <TickerBar />
        <PreReveal />
        <About />
        <GenesisPass />
        <Ecosystem />
        <Benefits />
        <Roadmap />
        <TokenSection />
        <MintPhase />
        <Community />
        <WhitelistForm />
        <FinalStatement />
        <Footer onWaitlist={scrollToWhitelist} />
      </div>
    </>
  );
}
