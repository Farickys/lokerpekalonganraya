import Link from 'next/link'
import { Briefcase, Instagram, Facebook, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{background:'#111827', color:'#9CA3AF'}}>
      <div className="container-page" style={{paddingTop:48, paddingBottom:48}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr', gap:32}}>
          {/* Brand */}
          <div>
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
              <div style={{width:36, height:36, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--primary)'}}>
                <Briefcase size={18} color="white"/>
              </div>
              <span style={{fontWeight:700, color:'white', fontSize:18}}>LokerPekalonganRaya</span>
            </div>
            <p style={{fontSize:14, color:'#9CA3AF', lineHeight:1.7, marginBottom:16}}>
              Portal lowongan kerja terpercaya untuk masyarakat Pekalongan Raya — Kota Pekalongan, Kabupaten Pekalongan, Batang, dan Pemalang.
            </p>
            <div style={{display:'flex', gap:12}}>
              <a href="#" style={{width:36, height:36, borderRadius:8, background:'#1F2937', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Instagram size={16}/>
              </a>
              <a href="#" style={{width:36, height:36, borderRadius:8, background:'#1F2937', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Facebook size={16}/>
              </a>
              <a href="#" style={{width:36, height:36, borderRadius:8, background:'#1F2937', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <MessageCircle size={16}/>
              </a>
            </div>
          </div>

          {/* Links row */}
          <div className="footer-links-grid">
            <div>
              <h4 style={{fontWeight:600, color:'white', marginBottom:16, fontSize:14}}>Cari Loker</h4>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8, fontSize:14}}>
                <li><Link href="/loker?area=KOTA_PEKALONGAN" style={{color:'#9CA3AF', textDecoration:'none'}}>Kota Pekalongan</Link></li>
                <li><Link href="/loker?area=KAB_PEKALONGAN" style={{color:'#9CA3AF', textDecoration:'none'}}>Kab. Pekalongan</Link></li>
                <li><Link href="/loker?area=BATANG" style={{color:'#9CA3AF', textDecoration:'none'}}>Batang</Link></li>
                <li><Link href="/loker?area=PEMALANG" style={{color:'#9CA3AF', textDecoration:'none'}}>Pemalang</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{fontWeight:600, color:'white', marginBottom:16, fontSize:14}}>Untuk Perusahaan</h4>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8, fontSize:14}}>
                <li><Link href="/daftar" style={{color:'#9CA3AF', textDecoration:'none'}}>Daftar Perusahaan</Link></li>
                <li><Link href="/dashboard/pasang-loker" style={{color:'#9CA3AF', textDecoration:'none'}}>Pasang Lowongan</Link></li>
                <li><Link href="/dashboard" style={{color:'#9CA3AF', textDecoration:'none'}}>Dashboard</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{borderTop:'1px solid #1F2937', marginTop:32, paddingTop:24, fontSize:12, color:'#6B7280', display:'flex', flexDirection:'column', gap:8}}>
          <span>© 2025 LokerPekalonganRaya. Bagian dari Pekalongan Info Media.</span>
          <span>Dibuat dengan ❤️ untuk masyarakat Pekalongan Raya</span>
        </div>
      </div>
    </footer>
  )
}
