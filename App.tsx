
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, 
  LogOut, Menu, X, Star, Package, CreditCard, ChevronRight, 
  Zap, ShieldCheck, Heart, Search, Filter, Upload, Download,
  FileText, Key, Truck, MessageSquare, ExternalLink, RefreshCw,
  Plus, Trash2, Edit, Save, CheckCircle2, AlertCircle, Loader2,
  ArrowRight, PlayCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { User, Product, Order, Review, ViewState, ProductType, MerchantConfig } from './types';
import { formatRupiah, generateDynamicQR } from './utils/qrisUtils';
import { QRCodeDisplay } from './components/QRCodeDisplay';

const API_BASE = './api';
const IS_DEMO_MODE = false;

// --- COMPONENTS ---

const StarRating = ({ rating, size = 16 }: { rating: number, size?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star 
        key={star} 
        size={size} 
        className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ))}
  </div>
);

const LandingPage = ({ onLogin, onRegister }: { onLogin: ()=>void, onRegister: ()=>void }) => (
  <div className="min-h-screen bg-white font-sans text-gray-900">
    {/* Navbar */}
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white rotate-3 shadow-lg shadow-orange-500/30">
             <ShoppingBag size={24} strokeWidth={2.5}/>
           </div>
           <div>
             <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">Jajanan<span className="text-orange-600">Online</span></h1>
             <p className="text-[10px] font-bold text-gray-500 tracking-wide uppercase">SaaS - Link-in-Bio & Store</p>
           </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
          <a href="#features" className="hover:text-orange-600 transition-colors">Fitur</a>
          <a href="#products" className="hover:text-orange-600 transition-colors">Katalog</a>
          <a href="#testimoni" className="hover:text-orange-600 transition-colors">Testimoni</a>
        </div>
        <div className="flex gap-3">
          <button onClick={onLogin} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-orange-50 rounded-full transition-all">Masuk</button>
          <button onClick={onRegister} className="px-5 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-full shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2">
            Buka Toko <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-6 border border-orange-200">
             <Zap size={14} className="fill-orange-700"/> Platform Jualan No. #1
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Beli apa saja, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">di mana saja!</span>
          </h1>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
            Platform all-in-one untuk menjual produk fisik, e-book, hingga lisensi software (Serial Key) secara otomatis. Terima pembayaran QRIS dalam hitungan detik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
             <button onClick={onRegister} className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-xl flex items-center justify-center gap-3">
               <ShoppingBag size={20}/> Mulai Jualan Gratis
             </button>
             <button className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all flex items-center justify-center gap-3">
               <PlayCircle size={20}/> Lihat Demo
             </button>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-gray-500 font-medium">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=${i+10}')] bg-cover`}></div>)}
            </div>
            <div>Dipercaya 2,000+ Seller</div>
          </div>
        </div>
        <div className="relative">
           <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[3rem] p-4 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="rounded-[2.5rem] shadow-inner" alt="Dashboard Preview"/>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce duration-[3000ms]">
                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24}/>
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Pembayaran Sukses</p>
                    <p className="text-lg font-bold text-gray-900">Rp 150.000</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="py-24 bg-gray-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-gray-900">Solusi Lengkap Seller Digital</h2>
           <p className="text-gray-500 mt-4">Satu platform untuk semua jenis produk jualanmu.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
               <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6"><FileText size={28}/></div>
               <h3 className="text-xl font-bold mb-3">Produk Digital (Static)</h3>
               <p className="text-gray-500 leading-relaxed">Jual E-book, Video Course, atau Preset. Pembeli menerima file yang sama secara instan setelah bayar.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
               <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6"><Key size={28}/></div>
               <h3 className="text-xl font-bold mb-3">License Key (Unique)</h3>
               <p className="text-gray-500 leading-relaxed">Jual Voucher Game, Serial Number, atau Token PLN. Upload CSV, sistem kirim 1 kode unik per pembeli.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
               <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6"><Truck size={28}/></div>
               <h3 className="text-xl font-bold mb-3">Produk Fisik</h3>
               <p className="text-gray-500 leading-relaxed">Jual barang fisik dengan fitur form alamat lengkap dan cek ongkir otomatis.</p>
            </div>
         </div>
       </div>
    </section>
  </div>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('landing');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Wallet / QRIS Test State
  const [testQrData, setTestQrData] = useState<string>('');
  const [testAmount, setTestAmount] = useState<string>('');
  
  // Forms & Modals
  const [isProdModalOpen, setProdModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<Product | null>(null);
  const [prodForm, setProdForm] = useState<Partial<Product>>({ type: 'physical' });
  const [licenseInput, setLicenseInput] = useState('');
  
  // Auth Form
  const [showAuthModal, setShowAuthModal] = useState<'login'|'register'|null>(null);
  const [authForm, setAuthForm] = useState({ username: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('jo_user');
    if (stored) {
       setUser(JSON.parse(stored));
       setView('dashboard');
    }
  }, []);

  useEffect(() => {
    if (user && view !== 'landing') fetchData();
  }, [user, view]);

  const fetchData = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${API_BASE}/manage_store.php?action=list&user_id=${user.id}`);
      const data = await res.json();
      if (data.success) setProducts(data.products);
      
      const resOrd = await fetch(`${API_BASE}/process_order.php?action=history&user_id=${user.id}&role=${user.role}`);
      const dataOrd = await resOrd.json();
      if (dataOrd.success) setOrders(dataOrd.orders);
    } catch (e) { console.error(e); }
  };

  const handleAuth = async (type: 'login' | 'register') => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${type}.php`, {
        method: 'POST', body: JSON.stringify(authForm)
      });
      const data = await res.json();
      if (data.success) {
        if (type === 'login') {
          setUser(data.user);
          sessionStorage.setItem('jo_user', JSON.stringify(data.user));
          setView('dashboard');
          setShowAuthModal(null);
        } else {
          alert('Registrasi berhasil! Silakan login.');
          setShowAuthModal('login');
        }
      } else {
        alert(data.message);
      }
    } catch (e) { alert('Connection Error'); }
    setLoading(false);
  };

  const handleSaveProduct = async () => {
    setLoading(true);
    try {
       // Parse licenses if type is license
       let licenses: string[] = [];
       if (prodForm.type === 'digital_license' && licenseInput) {
          licenses = licenseInput.split('\n').filter(l => l.trim() !== '');
       }

       const res = await fetch(`${API_BASE}/manage_store.php?action=save`, {
         method: 'POST',
         body: JSON.stringify({
           ...prodForm,
           userId: user?.id,
           id: editingProd?.id,
           licenses: licenses // Send array of new licenses
         })
       });
       const data = await res.json();
       if (data.success) {
         fetchData();
         setProdModalOpen(false);
         setEditingProd(null);
         setProdForm({ type: 'physical' });
         setLicenseInput('');
         alert('Produk berhasil disimpan!');
       } else {
         alert('Gagal: ' + data.message);
       }
    } catch (e) { alert('Error saving product'); }
    setLoading(false);
  };

  const handleReview = async (orderId: string, productId: string, rating: number, comment: string) => {
      setLoading(true);
      try {
          const res = await fetch(`${API_BASE}/manage_reviews.php`, {
              method: 'POST',
              body: JSON.stringify({
                  action: 'add',
                  user_id: user?.id,
                  user_name: user?.username,
                  product_id: productId,
                  order_id: orderId,
                  rating,
                  comment
              })
          });
          const data = await res.json();
          if(data.success) {
              alert('Review terkirim!');
              fetchData(); // Refresh orders to show review done
          } else {
              alert(data.message);
          }
      } catch(e) { alert("Err"); }
      setLoading(false);
  };

  // --- RENDERERS ---

  if (!user && view === 'landing') {
     return (
       <>
         <LandingPage onLogin={() => setShowAuthModal('login')} onRegister={() => setShowAuthModal('register')} />
         {showAuthModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
               <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                  <div className="p-8">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">{showAuthModal === 'login' ? 'Selamat Datang' : 'Buat Akun'}</h2>
                        <button onClick={() => setShowAuthModal(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
                     </div>
                     <div className="space-y-4">
                        <input className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" placeholder="Username" value={authForm.username} onChange={e=>setAuthForm({...authForm, username: e.target.value})} />
                        {showAuthModal === 'register' && <input className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" placeholder="Email" type="email" value={authForm.email} onChange={e=>setAuthForm({...authForm, email: e.target.value})} />}
                        <input className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" placeholder="Password" type="password" value={authForm.password} onChange={e=>setAuthForm({...authForm, password: e.target.value})} />
                        <button onClick={() => handleAuth(showAuthModal)} disabled={loading} className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all flex justify-center">
                           {loading ? <Loader2 className="animate-spin"/> : (showAuthModal === 'login' ? 'Masuk Sekarang' : 'Daftar Gratis')}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
       </>
     );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
       {/* Sidebar */}
       <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
          <div className="p-6 flex items-center gap-3">
             <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white"><ShoppingBag size={18}/></div>
             <span className="font-extrabold text-xl text-gray-800 tracking-tight">Jajanan<span className="text-orange-600">Online</span></span>
          </div>
          <nav className="px-4 space-y-2 mt-4">
             {[
               {id:'dashboard', icon:LayoutDashboard, label:'Ringkasan'},
               {id:'store', icon:Package, label:'Produk Saya', role: ['merchant','superadmin']},
               {id:'orders', icon:ShoppingCart, label:'Pesanan'},
               {id:'wallet', icon:CreditCard, label:'Dompet & QRIS', role: ['merchant','superadmin']},
               {id:'settings', icon:Settings, label:'Pengaturan'},
             ].map(item => (
                (!item.role || item.role.includes(user!.role)) && (
                  <button key={item.id} onClick={() => setView(item.id as ViewState)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${view === item.id ? 'bg-orange-50 text-orange-700' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <item.icon size={20} className={view === item.id ? 'stroke-[2.5px]' : ''}/> {item.label}
                  </button>
                )
             ))}
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-50">
             <button onClick={() => { setUser(null); setView('landing'); sessionStorage.removeItem('jo_user'); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium">
               <LogOut size={20}/> Keluar
             </button>
          </div>
       </aside>

       {/* Main */}
       <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
               <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2"><Menu/></button>
               <h2 className="text-xl font-bold text-gray-800 capitalize">{view}</h2>
             </div>
             <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{user?.username}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg border border-orange-200">
                  {user?.username[0].toUpperCase()}
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
             {view === 'dashboard' && (
                <div className="space-y-6 max-w-6xl mx-auto">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                         <div className="flex justify-between items-start mb-4">
                            <div><p className="text-gray-500 text-sm">Total Penjualan</p><h3 className="text-2xl font-bold text-gray-900 mt-1">{formatRupiah(orders.filter(o=>o.status==='paid').reduce((acc,c)=>acc+Number(c.amount),0))}</h3></div>
                            <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Zap size={20}/></div>
                         </div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                         <div className="flex justify-between items-start mb-4">
                            <div><p className="text-gray-500 text-sm">Pesanan Selesai</p><h3 className="text-2xl font-bold text-gray-900 mt-1">{orders.filter(o=>o.status==='paid').length}</h3></div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><CheckCircle2 size={20}/></div>
                         </div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                         <div className="flex justify-between items-start mb-4">
                            <div><p className="text-gray-500 text-sm">Produk Aktif</p><h3 className="text-2xl font-bold text-gray-900 mt-1">{products.length}</h3></div>
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Package size={20}/></div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Toko Anda Online!</h3>
                        <p className="text-gray-400 mb-6 max-w-md">Link toko Anda siap dibagikan. Pembeli bisa belanja produk fisik maupun digital secara otomatis.</p>
                        <div className="flex gap-2 bg-white/10 p-2 rounded-xl w-fit backdrop-blur-sm border border-white/20">
                           <span className="font-mono text-sm px-2 py-1">jajanan.online/{user?.username}</span>
                           <button className="bg-white text-gray-900 px-3 py-1 rounded-lg text-xs font-bold hover:bg-gray-200">Copy</button>
                        </div>
                      </div>
                      <div className="absolute right-0 bottom-0 opacity-20"><ShoppingBag size={200}/></div>
                   </div>
                </div>
             )}

             {view === 'store' && (
                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">Katalog Produk</h3>
                      <button onClick={() => { setEditingProd(null); setProdForm({type:'physical'}); setProdModalOpen(true); }} className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 shadow-lg shadow-orange-500/30">
                         <Plus size={18}/> Tambah Produk
                      </button>
                   </div>
                   
                   {products.length === 0 ? (
                      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                         <Package size={48} className="mx-auto text-gray-300 mb-4"/>
                         <p className="text-gray-500 font-medium">Belum ada produk. Mulai jualan sekarang!</p>
                      </div>
                   ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                         {products.map(p => (
                            <div key={p.id} className="bg-white p-4 rounded-3xl border border-gray-100 hover:shadow-lg transition-all group">
                               <div className="aspect-square bg-gray-50 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                                  {p.image ? <img src={p.image} className="w-full h-full object-cover"/> : 
                                    (p.type === 'physical' ? <Truck size={32} className="text-gray-300"/> : p.type === 'digital_license' ? <Key size={32} className="text-gray-300"/> : <FileText size={32} className="text-gray-300"/>)
                                  }
                                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button onClick={() => { setEditingProd(p); setProdForm(p); setProdModalOpen(true); }} className="p-2 bg-white rounded-lg text-gray-600 hover:text-orange-600 shadow-sm"><Edit size={14}/></button>
                                     <button className="p-2 bg-white rounded-lg text-gray-600 hover:text-red-600 shadow-sm"><Trash2 size={14}/></button>
                                  </div>
                               </div>
                               <div className="flex items-start justify-between mb-1">
                                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${p.type === 'physical' ? 'bg-blue-50 text-blue-600' : p.type === 'digital_license' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'}`}>
                                     {p.type.replace('_', ' ')}
                                  </span>
                                  <div className="flex items-center gap-1 text-xs font-bold text-gray-500"><Star size={10} className="fill-yellow-400 text-yellow-400"/> {p.rating || '0.0'}</div>
                               </div>
                               <h4 className="font-bold text-gray-900 mb-1 truncate">{p.name}</h4>
                               <p className="text-orange-600 font-bold">{formatRupiah(p.price)}</p>
                            </div>
                         ))}
                      </div>
                   )}
                </div>
             )}

             {view === 'orders' && (
                <div className="space-y-6">
                   <h3 className="text-xl font-bold">Riwayat Pesanan</h3>
                   <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                           <tr>
                              <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase">Produk</th>
                              <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase">Pembeli</th>
                              <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase">Total</th>
                              <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase">Status</th>
                              <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase text-right">Aksi</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {orders.map(o => (
                              <tr key={o.id} className="hover:bg-gray-50/50">
                                 <td className="px-6 py-4">
                                    <p className="font-bold text-gray-900">{o.productName}</p>
                                    <p className="text-xs text-gray-400 font-mono">{o.trx_id}</p>
                                 </td>
                                 <td className="px-6 py-4 text-sm text-gray-600">{o.customerName}<br/><span className="text-xs text-gray-400">{o.customerEmail}</span></td>
                                 <td className="px-6 py-4 font-bold text-gray-900">{formatRupiah(o.amount)}</td>
                                 <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${o.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{o.status}</span>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    {o.status === 'paid' && !o.ratingGiven && user?.role === 'user' && (
                                       <button onClick={() => {
                                          const r = prompt('Rating (1-5):');
                                          const c = prompt('Komentar:');
                                          if(r && c) handleReview(o.id, o.productId, parseInt(r), c);
                                       }} className="text-sm font-bold text-orange-600 hover:underline">Beri Ulasan</button>
                                    )}
                                    {o.deliveredContent && (
                                       <button onClick={()=>alert(o.deliveredContent)} className="text-sm font-bold text-indigo-600 hover:underline ml-4">Lihat Konten</button>
                                    )}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                      </table>
                   </div>
                </div>
             )}

             {view === 'wallet' && (
                <div className="space-y-6">
                   <h3 className="text-xl font-bold">Dompet & Integrasi QRIS</h3>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                         <h4 className="font-bold mb-4 flex items-center gap-2"><Settings size={20}/> Konfigurasi Merchant</h4>
                         <div className="space-y-4">
                            <div>
                               <label className="block text-sm font-bold mb-1">QRIS String (Static)</label>
                               <textarea 
                                 className="w-full p-3 border rounded-xl font-mono text-xs bg-gray-50 text-gray-600" 
                                 rows={6} 
                                 readOnly 
                                 value={user?.merchantConfig?.qrisString || 'Belum dikonfigurasi'} 
                               />
                               <p className="text-xs text-gray-400 mt-2">String ini didapatkan dari dashboard Qiospay/Nobu.</p>
                            </div>
                         </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                         <h4 className="font-bold mb-4 flex items-center gap-2"><Zap size={20}/> Simulator QRIS Dinamis</h4>
                         <div className="space-y-4">
                            <div>
                               <label className="block text-sm font-bold mb-1">Nominal Tes (Rp)</label>
                               <input 
                                 type="number" 
                                 className="w-full p-3 border rounded-xl" 
                                 value={testAmount}
                                 onChange={(e) => setTestAmount(e.target.value)}
                                 placeholder="Contoh: 15000"
                               />
                            </div>
                            <button 
                                onClick={() => {
                                    if(user?.merchantConfig?.qrisString && testAmount) {
                                        const qr = generateDynamicQR(user.merchantConfig.qrisString, parseInt(testAmount));
                                        setTestQrData(qr);
                                    } else {
                                        alert("Pastikan QRIS String tersedia dan Nominal diisi.");
                                    }
                                }}
                                className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg shadow-orange-500/30 transition-all"
                            >
                                Generate QR Test
                            </button>
                            
                            {testQrData && (
                                <div className="mt-6 flex flex-col items-center animate-in fade-in zoom-in p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                                    <QRCodeDisplay data={testQrData} />
                                    <p className="mt-4 text-xl font-extrabold text-gray-900">{formatRupiah(parseInt(testAmount))}</p>
                                    <p className="text-xs text-gray-500 font-medium">Scan menggunakan E-Wallet apa saja</p>
                                </div>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
             )}
          </div>
       </main>

       {/* PRODUCT MODAL */}
       {isProdModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
                   <h3 className="font-bold text-lg">{editingProd ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                   <button onClick={() => setProdModalOpen(false)}><X/></button>
                </div>
                <div className="p-6 space-y-4">
                   <div>
                      <label className="block text-sm font-bold mb-2">Tipe Produk</label>
                      <div className="grid grid-cols-3 gap-2">
                         {[
                           {id:'physical', label:'Fisik', icon:Truck}, 
                           {id:'digital_static', label:'File/Ebook', icon:FileText}, 
                           {id:'digital_license', label:'Serial Key', icon:Key}
                         ].map(t => (
                            <button key={t.id} onClick={() => setProdForm({...prodForm, type: t.id as ProductType})} 
                              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${prodForm.type === t.id ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:border-orange-200'}`}>
                               <t.icon size={20}/> <span className="text-xs font-bold">{t.label}</span>
                            </button>
                         ))}
                      </div>
                   </div>
                   
                   <div><label className="block text-sm font-bold mb-1">Nama Produk</label><input className="w-full p-3 border rounded-xl" value={prodForm.name||''} onChange={e=>setProdForm({...prodForm, name:e.target.value})}/></div>
                   <div><label className="block text-sm font-bold mb-1">Harga (Rp)</label><input type="number" className="w-full p-3 border rounded-xl" value={prodForm.price||''} onChange={e=>setProdForm({...prodForm, price:parseInt(e.target.value)})}/></div>
                   
                   {prodForm.type === 'physical' && (
                      <div><label className="block text-sm font-bold mb-1">Berat (Gram)</label><input type="number" className="w-full p-3 border rounded-xl" value={prodForm.weight||''} onChange={e=>setProdForm({...prodForm, weight:parseInt(e.target.value)})}/></div>
                   )}

                   {prodForm.type === 'digital_static' && (
                      <div>
                        <label className="block text-sm font-bold mb-1">Link Download / Konten</label>
                        <input className="w-full p-3 border rounded-xl" placeholder="https://drive.google.com/..." value={prodForm.digitalContent||''} onChange={e=>setProdForm({...prodForm, digitalContent:e.target.value})}/>
                        <p className="text-xs text-gray-500 mt-1">Link ini akan dikirim otomatis ke semua pembeli.</p>
                      </div>
                   )}

                   {prodForm.type === 'digital_license' && (
                      <div>
                        <label className="block text-sm font-bold mb-1">Upload Serial Keys (CSV/Text)</label>
                        <textarea className="w-full p-3 border rounded-xl font-mono text-xs" rows={5} placeholder="AAAA-BBBB-CCCC&#10;XXXX-YYYY-ZZZZ&#10;1234-5678-9012" value={licenseInput} onChange={e=>setLicenseInput(e.target.value)}/>
                        <p className="text-xs text-gray-500 mt-1">Satu baris = Satu lisensi. Sistem akan mengirim 1 lisensi unik per pembeli dan menandaikannya sebagai 'Sold'.</p>
                      </div>
                   )}

                   <div className="pt-4">
                      <button onClick={handleSaveProduct} disabled={loading} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 flex justify-center">
                         {loading ? <Loader2 className="animate-spin"/> : 'Simpan Produk'}
                      </button>
                   </div>
                </div>
             </div>
          </div>
       )}
    </div>
  );
}