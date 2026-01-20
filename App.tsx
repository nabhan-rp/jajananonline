
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, 
  LogOut, Menu, X, Star, Package, CreditCard, ChevronRight, 
  Zap, ShieldCheck, Heart, Search, Filter, Upload, Download,
  FileText, Key, Truck, MessageSquare, ExternalLink, RefreshCw,
  Plus, Trash2, Edit, Save, CheckCircle2, AlertCircle, Loader2,
  ArrowRight, PlayCircle, Info, Github, Server, Globe, Database, Code
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { User, Product, Order, Review, ViewState, ProductType, MerchantConfig } from './types';
import { formatRupiah, generateDynamicQR } from './utils/qrisUtils';
import { QRCodeDisplay } from './components/QRCodeDisplay';

// --- SAFE ENV ACCESS ---
// Helper to safely access env vars without crashing if import.meta.env is undefined
const getEnv = (key: string, defaultValue: string): string => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env[key] ?? defaultValue;
    }
  } catch {
    // Ignore errors
  }
  return defaultValue;
};

const API_BASE = getEnv('VITE_API_BASE_URL', './api');
// Default to TRUE if env is not explicitly 'false'
const IS_DEMO_MODE = getEnv('VITE_USE_DEMO_DATA', 'true') !== 'false';

// --- MOCK DATA FOR DEMO ---
const MOCK_USERS = [
  { 
    id: '1', 
    username: 'admin', 
    password: 'admin', 
    role: 'superadmin' as const, 
    merchantConfig: { 
      merchantName: 'Jajanan Official', 
      merchantCode: 'QP-DEMO-001', 
      qrisString: '00020101021126670016COM.NOBUBANK.WWW01189360050300000907180214905487390387780303UMI51440014ID.CO.QRIS.WWW0215ID20254619920700303UMI5204581753033605802ID5914Narpra Digital6009INDRAMAYU61054521162070703A016304D424', 
      qiospayApiKey: 'demo-key', 
      appSecretKey: 'secret' 
    } 
  },
  { 
    id: '2', 
    username: 'merchant', 
    password: 'merchant', 
    role: 'merchant' as const, 
    merchantConfig: { 
      merchantName: 'Toko Kopi Senja', 
      merchantCode: 'QP-DEMO-002', 
      qrisString: '00020101021126670016COM.NOBUBANK.WWW01189360050300000907180214905487390387780303UMI51440014ID.CO.QRIS.WWW0215ID20254619920700303UMI5204581753033605802ID5914Narpra Digital6009INDRAMAYU61054521162070703A016304D424', 
      qiospayApiKey: 'demo-key-2', 
      appSecretKey: 'secret-2' 
    } 
  },
  { id: '3', username: 'budi', password: 'budi', role: 'user' as const },
];

const MOCK_PRODUCTS: Product[] = [
  { id: '101', userId: '2', name: 'Kopi Susu Gula Aren (1L)', description: 'Kopi segar ukuran 1 liter.', price: 85000, type: 'physical', weight: 1200, isActive: true, rating: 4.8, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=300' },
  { id: '102', userId: '2', name: 'E-Book: Jago React JS', description: 'Panduan lengkap belajar React dari nol.', price: 150000, type: 'digital_static', isActive: true, rating: 5.0, digitalContent: 'https://link.to/download', image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=300' },
  { id: '103', userId: '2', name: 'Windows 11 Pro Key', description: 'Serial key original aktif selamanya.', price: 25000, type: 'digital_license', isActive: true, rating: 4.5, image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=300' },
];

const MOCK_ORDERS: Order[] = [
  { id: 'ord-1', trx_id: 'TRX-DEMO-001', productId: '101', productName: 'Kopi Susu Gula Aren (1L)', customerName: 'Budi Santoso', customerEmail: 'budi@demo.com', amount: 85123, status: 'paid', createdAt: '2023-10-01 10:00:00' },
  { id: 'ord-2', trx_id: 'TRX-DEMO-002', productId: '103', productName: 'Windows 11 Pro Key', customerName: 'Siti Aminah', customerEmail: 'siti@demo.com', amount: 25456, status: 'pending', createdAt: '2023-10-02 14:30:00' },
];

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
             <p className="text-[10px] font-bold text-gray-500 tracking-wide uppercase">Open Source Marketplace Engine</p>
           </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
          <a href="#features" className="hover:text-orange-600 transition-colors">Fitur</a>
          <a href="#deploy" className="hover:text-orange-600 transition-colors">Deployment</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gray-900 transition-colors"><Github size={16}/> Source Code</a>
        </div>
        <div className="flex gap-3">
          <button onClick={onLogin} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-orange-50 rounded-full transition-all">
             {IS_DEMO_MODE ? 'Login Demo' : 'Masuk'}
          </button>
          <button onClick={onRegister} className="px-5 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-full shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2">
            Mulai Gratis <ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {IS_DEMO_MODE ? (
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-6 border border-blue-200">
                <Info size={14} className="fill-blue-700 text-white"/> Mode Demo (Data Lokal)
             </div>
          ) : (
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-6 border border-green-200">
                <Zap size={14} className="fill-green-700 text-white"/> Live Production Mode
             </div>
          )}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Platform Jualan <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Open Source</span>
          </h1>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
            Aplikasi Marketplace & Link-in-Bio yang bisa Anda host sendiri (Self-Hosted) atau gunakan sebagai SaaS. Ditenagai oleh <b>QiosLink Engine</b> untuk pembayaran QRIS Dinamis otomatis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
             <button onClick={onLogin} className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-xl flex items-center justify-center gap-3">
               <PlayCircle size={20}/> Coba Demo Live
             </button>
             <a href="https://github.com" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all flex items-center justify-center gap-3">
               <Download size={20}/> Download Source
             </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-gray-500 font-medium">
             <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                <Code size={14}/> <span>React + Vite</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                <Database size={14}/> <span>PHP + MySQL</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                <Zap size={14}/> <span>QiosLink QRIS</span>
             </div>
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

    {/* Deployment Options */}
    <section id="deploy" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900">Pilihan Deployment Fleksibel</h2>
                <p className="text-gray-500 mt-4">Pilih cara deploy yang sesuai dengan kebutuhan infrastruktur Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Option 1: Demo/Local */}
                <div className="group relative bg-white p-8 rounded-3xl border-2 border-dashed border-gray-200 hover:border-orange-500 hover:bg-orange-50/30 transition-all">
                    <div className="absolute -top-6 left-8 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">COCOK UNTUK TESTING</div>
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <Code size={32}/>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Demo / Localhost</h3>
                    <p className="text-gray-600 mb-6">
                        Jalankan aplikasi tanpa backend PHP atau database. Data disimpan sementara di browser (Mock Data). Ideal untuk preview UI/UX atau presentasi.
                    </p>
                    <div className="bg-gray-900 text-gray-200 p-4 rounded-xl font-mono text-xs mb-4">
                        <span className="text-green-400"># Gunakan env_demo.txt</span><br/>
                        VITE_USE_DEMO_DATA=true<br/>
                        npm run dev
                    </div>
                    <button onClick={onLogin} className="w-full py-3 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-white transition-all">
                        Coba Mode Demo Sekarang
                    </button>
                </div>

                {/* Option 2: Production */}
                <div className="group relative bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-xl hover:border-orange-500 transition-all">
                    <div className="absolute -top-6 left-8 bg-green-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">REKOMENDASI BISNIS</div>
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                        <Server size={32}/>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Self-Hosted / cPanel</h3>
                    <p className="text-gray-600 mb-6">
                        Deploy ke hosting cPanel Anda. Membutuhkan PHP & MySQL. Data tersimpan aman di database server Anda. Mendukung pembayaran QRIS real-time.
                    </p>
                    <div className="bg-gray-900 text-gray-200 p-4 rounded-xl font-mono text-xs mb-4">
                         <span className="text-green-400"># Gunakan env_live.txt</span><br/>
                         VITE_USE_DEMO_DATA=false<br/>
                         npm run build
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all">
                            Panduan Install
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <ShoppingBag size={24} className="text-orange-600"/>
                <span className="font-bold text-xl">JajananOnline</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
                Proudly Open Source. Built with React, Vite, PHP, and QiosLink Engine.<br/>
                Licensed under MIT.
            </p>
            <div className="flex justify-center gap-6 text-sm font-semibold text-gray-600">
                <a href="#" className="hover:text-orange-600">GitHub</a>
                <a href="#" className="hover:text-orange-600">Documentation</a>
                <a href="#" className="hover:text-orange-600">Qiospay API</a>
            </div>
        </div>
    </footer>
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
    
    // DEMO MODE: Load Mock Data
    if (IS_DEMO_MODE) {
        setProducts(MOCK_PRODUCTS);
        setOrders(MOCK_ORDERS);
        return;
    }

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

    // DEMO MODE: Bypass Server Auth
    if (IS_DEMO_MODE) {
        setTimeout(() => {
            if (type === 'login') {
                const found = MOCK_USERS.find(u => u.username === authForm.username && u.password === authForm.password);
                if (found) {
                    const { password, ...safeUser } = found;
                    setUser(safeUser as User);
                    sessionStorage.setItem('jo_user', JSON.stringify(safeUser));
                    setView('dashboard');
                    setShowAuthModal(null);
                } else {
                    alert('Login Demo Gagal! Gunakan username/password yang tertera di layar.');
                }
            } else {
                alert('Registrasi Demo Sukses! Silakan login dengan akun demo yang tersedia.');
                setShowAuthModal('login');
            }
            setLoading(false);
        }, 1000);
        return;
    }

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
    } catch (e) { alert('Connection Error. Pastikan server PHP aktif.'); }
    setLoading(false);
  };

  const handleSaveProduct = async () => {
    setLoading(true);
    
    if (IS_DEMO_MODE) {
        setTimeout(() => {
            const newProd: Product = {
                id: editingProd ? editingProd.id : `mock-${Date.now()}`,
                userId: user!.id,
                name: prodForm.name || 'New Product',
                price: prodForm.price || 0,
                type: prodForm.type || 'physical',
                description: prodForm.description || '',
                isActive: true,
                rating: 0,
                ...prodForm
            } as Product;
            
            if(editingProd) {
                setProducts(products.map(p => p.id === newProd.id ? newProd : p));
            } else {
                setProducts([newProd, ...products]);
            }
            setProdModalOpen(false);
            setEditingProd(null);
            setProdForm({ type: 'physical' });
            setLicenseInput('');
            alert('Produk berhasil disimpan (Mode Demo)!');
            setLoading(false);
        }, 800);
        return;
    }

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
      if (IS_DEMO_MODE) {
          alert("Review terkirim (Demo Mode)!");
          return;
      }
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
               <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 relative">
                  <div className="p-8">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">{showAuthModal === 'login' ? 'Selamat Datang' : 'Buat Akun'}</h2>
                        <button onClick={() => setShowAuthModal(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
                     </div>
                     
                     {/* Demo Credentials Hint */}
                     {IS_DEMO_MODE && showAuthModal === 'login' && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm">
                           <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Info size={16}/> Akun Demo Tersedia:</h4>
                           <div className="grid grid-cols-2 gap-2 text-xs">
                              <div onClick={() => setAuthForm({username:'admin', password:'admin', email:''})} className="p-2 bg-white rounded border cursor-pointer hover:border-blue-400">
                                 <div className="font-bold">Super Admin</div>
                                 <div className="text-gray-500">User: admin<br/>Pass: admin</div>
                              </div>
                              <div onClick={() => setAuthForm({username:'merchant', password:'merchant', email:''})} className="p-2 bg-white rounded border cursor-pointer hover:border-blue-400">
                                 <div className="font-bold">Merchant</div>
                                 <div className="text-gray-500">User: merchant<br/>Pass: merchant</div>
                              </div>
                           </div>
                           <p className="mt-2 text-[10px] text-blue-600 italic text-center">Klik kotak di atas untuk auto-fill</p>
                        </div>
                     )}

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
             {IS_DEMO_MODE ? (
                 <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-800 flex items-start gap-2">
                    <Info size={14} className="mt-0.5 shrink-0"/>
                    <div>
                        <strong>Mode Demo Aktif:</strong><br/>Data disimpan di browser, tidak terkoneksi ke database server.
                    </div>
                 </div>
             ) : (
                <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-100 text-xs text-green-800 flex items-start gap-2">
                    <Server size={14} className="mt-0.5 shrink-0"/>
                    <div>
                        <strong>Mode Live:</strong><br/>Terhubung ke Server API PHP.
                    </div>
                 </div>
             )}
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
                         {IS_DEMO_MODE ? (
                             <div className="space-y-4">
                                <div className="p-3 bg-blue-50 text-blue-700 rounded-xl text-xs">
                                    <strong>Demo Mode:</strong> QR Code di bawah ini hanya simulasi visual. Tidak bisa discan untuk pembayaran real.
                                </div>
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
                         ) : (
                             <div className="text-center py-10">
                                <Zap size={48} className="mx-auto text-gray-300 mb-4"/>
                                <p className="text-gray-500 font-medium">
                                    Dalam Mode Live, QRIS dibuat otomatis saat Checkout atau via API.<br/>
                                    Gunakan menu 'Pesanan' untuk memantau transaksi masuk.
                                </p>
                             </div>
                         )}
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
