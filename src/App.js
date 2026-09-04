import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import profilePhoto from "./profile.jpg";
const client = createClient({ projectId: "05o003r1", dataset: "production", useCdn: false, apiVersion: "2023-05-03" });
const builder = imageUrlBuilder(client);
const urlFor = (s) => (s ? builder.image(s).width(600).url() : "");

// CHANGE THIS PHOTO LINK TO YOUR PHOTO
const PROFILE_PHOTO = profilePhoto; // put your photo url here or /profile.jpg

const TOP_MENU = ["Trending", "Photo Gallery", "Mann Ki Baat", "NaMo Merchandise"];
const MENU = [
  { name: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { name: "News", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { name: "Info-In-Graphics", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
  { name: "NaMo Exclusive", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { name: "My Network", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { name: "Volunteer", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { name: "Govt in action", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { name: "Peoples Corner", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { name: "Photo Booth", icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z" },
  { name: "Contact Us", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { name: "Pariksha Pe Charcha", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { name: "Kashi Vikas Yatra", icon: "M3.055 11H5a2 2 0 012 2v1a8 8 0 005.07 7.47" },
  { name: "FAQ", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { name: "Trending", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { name: "Photo Gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { name: "Mann Ki Baat", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" },
  { name: "NaMo Merchandise", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
];

function Icon({ path, active }) {
  return <svg width="22" height="22" fill="none" stroke={active ? "#0a1930" : "#6b7280"} strokeWidth={active ? 2.2 : 1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={path} /></svg>;
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("Home");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showLang, setShowLang] = useState(false);
  const [lang, setLang] = useState("English");

  const LANGUAGES = ["English","Gujarati","हिन्दी","Bengali","Kannada","Malayalam","Marathi","Odia","Tamil","Telugu","Manipuri","Assamese","اردو"];

  useEffect(() => { client.fetch('*[_type=="project"]|order(_createdAt desc){_id,title,category,image}').then(setProjects); }, []);

  const handleShare = async (p) => {
    const text = `${p.title} - ${window.location.href}`;
    if (navigator.share) { try { await navigator.share({ title: p.title, text }); } catch {} }
    else { navigator.clipboard.writeText(text); alert("Link copied!"); window.open(`https://wa.me/?text=${encodeURIComponent(text)}`); }
  };

  const searched = query ? projects.filter(p => p.title?.toLowerCase().includes(query.toLowerCase()) || p.category?.toLowerCase().includes(query.toLowerCase())) : projects;
  const final = active === "Home" ? searched : searched.filter(p => p.category?.toLowerCase() === active.toLowerCase());
  const isGrid = active.toLowerCase().includes("photo") || active.toLowerCase() === "trending";

  return (
    <div style={{ fontFamily: "Calibri, Inter, sans-serif", background: "#f0f2f5", minHeight: "100vh", paddingBottom: 80 }}>
      <header style={{ background: "#0a1930", color: "white", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", alignItems:"center" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}><button onClick={() => setShowSidebar(true)} style={{ background: "none", border: "none", color: "white", fontSize: 24 }}>☰</button><div><div style={{ fontWeight: 900 }}>RS SANCHITHA</div><div style={{ fontSize: 10, opacity: 0.7 }}>Know the Designer →</div></div></div>
          
          {/* ORIGINAL ICONS BACK + PHOTO */}
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" style={{cursor:"pointer"}}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <svg onClick={() => setShowSearch(!showSearch)} width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" style={{cursor:"pointer"}}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            
            {/* PHOTO INSTEAD OF R */}
            <img src={PROFILE_PHOTO} alt="profile" style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", objectPosition: "top center", border: "2px solid white" }} />
          </div>
        </div>

        {showSearch && <div style={{ padding: "0 12px 10px", display: "flex", gap: 8 }}><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." style={{ flex: 1, padding: "8px 12px", borderRadius: 20, border: "none", outline:"none" }} /><button onClick={() => { setQuery(""); setShowSearch(false); }} style={{ borderRadius: 20, border: "none", padding: "0 12px" }}>✕</button></div>}
        
        <div style={{ display: "flex", gap: 8, padding: "0 10px 10px", overflowX: "auto", alignItems:"center" }}>
          <div onClick={()=>setShowLang(true)} style={{ background: "white", color: "black", borderRadius: 20, padding: "5px 10px", fontSize: 11, fontWeight: 800, display:"flex", alignItems:"center", gap:5, flexShrink:0, cursor:"pointer" }}>
            A <span style={{ background: "black", color: "white", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize:12 }}>अ</span>
          </div>
          {TOP_MENU.map(t => <div key={t} onClick={() => setActive(t)} style={{ background: active === t ? "#d32f2f" : "#ffffff22", color:"white", padding: "6px 14px", borderRadius: 20, fontSize: 12, whiteSpace: "nowrap", flexShrink:0, cursor:"pointer" }}>{t}</div>)}
        </div>
      </header>

      {/* LANGUAGE SELECTION EXACT LIKE YOUR SCREENSHOT */}
      {showLang && (
        <>
          <div onClick={()=>setShowLang(false)} style={{position:"fixed", inset:0, background:"#0006", zIndex:400}}></div>
          <div style={{position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"92%", maxWidth:360, maxHeight:"80vh", background:"white", borderRadius:16, zIndex:401, overflow:"hidden", boxShadow:"0 10px 30px #0005"}}>
            <div style={{maxHeight:"70vh", overflowY:"auto"}}>
              {LANGUAGES.map(l=>(
                <div key={l} onClick={()=>{setLang(l); setShowLang(false);}} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 18px", borderBottom:"1px solid #f0f0f0", cursor:"pointer", background: lang===l?"#f8f8f8":"white"}}>
                  <span style={{fontSize:15, color:"#222", fontWeight: lang===l?600:400}}>{l}</span>
                  <div style={{width:20, height:20, borderRadius:"50%", border: lang===l?"6px solid #1a73e8":"1.5px solid #888", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    {lang===l && <div style={{width:8, height:8, background:"white", borderRadius:"50%"}}></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {showSidebar && <><div onClick={() => setShowSidebar(false)} style={{ position: "fixed", inset: 0, background: "#0008", zIndex: 199 }} /><div style={{ position: "fixed", left: 0, top: 0, width: 290, height: "100%", background: "#0a1930", color: "white", zIndex: 200, overflowY: "auto" }}><div style={{ padding: 16, display: "flex", justifyContent: "space-between" }}><b>RS SANCHITHA MENU</b><span onClick={() => setShowSidebar(false)} style={{cursor:"pointer"}}>✕</span></div>{MENU.map(m => <div key={m.name} onClick={() => { setActive(m.name); setShowSidebar(false); }} style={{ display: "flex", gap: 14, padding: "13px 18px", background: active === m.name ? "#ffffff14" : "", cursor: "pointer" }}><svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg><span style={{ fontSize: 13 }}>{m.name}</span></div>)}</div></>}

      <div style={{ maxWidth: 620, margin: "0 auto", padding: 12 }}>
        <div style={{ background: "white", padding: 8, borderRadius: 8, textAlign: "center", fontSize: 11, marginBottom: 10 }}>Showing {final.length} • {active} • {lang}</div>
        {isGrid ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {final.map(p => <div key={p._id} onClick={() => setSelected(p)} style={{ background: "white", borderRadius: 10, overflow: "hidden", cursor:"pointer" }}>{p.image && <img src={urlFor(p.image)} style={{ width: "100%", height: 150, objectFit: "cover" }} alt="" />}<div style={{ padding: 8, fontSize: 12, fontWeight: 700 }}>{p.title}</div></div>)}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {final.map(p => <div key={p._id} style={{ background: "white", borderRadius: 12, overflow: "hidden" }}><div onClick={() => setSelected(p)} style={{ padding: 14, textAlign: "center", cursor:"pointer" }}><b>{p.title}</b><div style={{ fontSize: 10, color: "#d32f2f", marginTop: 4 }}>{(p.category || "").toUpperCase()}</div></div>{p.image && <img src={urlFor(p.image)} style={{ width: "100%" }} alt="" />}<div style={{ display: "flex", justifyContent: "space-around", padding: 10, borderTop: "1px solid #eee", fontSize: 13 }}><span>♡ 0</span><span>💬 0</span><span onClick={() => handleShare(p)} style={{ cursor: "pointer" }}>↗ Share</span></div></div>)}
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-around", padding: "8px 0", zIndex: 90 }}>
        {MENU.slice(0, 4).map(m => <div key={m.name} onClick={() => setActive(m.name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}><Icon path={m.icon} active={active === m.name} /><span style={{ fontSize: 9 }}>{m.name}</span></div>)}
      </div>

      {selected && <div style={{ position: "fixed", inset: 0, background: "white", zIndex: 300, padding: 20, overflowY: "auto" }}><button onClick={() => setSelected(null)} style={{ background: "#0a1930", color: "white", border: "none", padding: "6px 14px", borderRadius: 20 }}>← Back</button><h2 style={{ textAlign: "center", marginTop: 20 }}>{selected.title}</h2>{selected.image && <img src={urlFor(selected.image)} style={{ width: "100%", marginTop: 16, borderRadius: 12 }} alt="" />}</div>}
    </div>
  );
}
