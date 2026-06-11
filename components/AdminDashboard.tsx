import React, { useState, useEffect } from 'react';
import { ViewState, Language, Product, BlogPost } from '../types';
import { db, auth } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '../firebaseHelper';
import { Settings, Image, FileText, Battery, Plus, Trash2, LogOut, Loader2, Save } from 'lucide-react';
import { IMAGES } from './Hero';

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, cb: (dataUrl: string) => void) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        cb(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const ProductRow = ({ product, lang, onSave, onDelete }: { product: Product, lang: Language, onSave: (id: string, updated: any) => void, onDelete: (id: string) => void }) => {
  const [data, setData] = useState({ ...product });
  const [isModified, setIsModified] = useState(false);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    setData({ ...product });
    setIsModified(false);
    setShowConfirmSave(false);
    setShowConfirmDelete(false);
  }, [product]);

  const handleChange = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
    setIsModified(true);
  };

  const handleSave = () => {
    if (showConfirmSave) {
      onSave(String(product.id), data);
      setIsModified(false);
      setShowConfirmSave(false);
    } else {
      setShowConfirmSave(true);
      setShowConfirmDelete(false);
    }
  };

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete(String(product.id));
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
      setShowConfirmSave(false);
    }
  };

  return (
    <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col md:flex-row gap-4 relative group">
      <div className="w-full md:w-32 flex flex-col gap-2">
        <img src={data.image} alt={data.name} className="w-full h-32 object-cover rounded-lg border border-slate-700" />
        <label className="bg-slate-800 hover:bg-slate-700 text-xs text-center text-white p-1 rounded cursor-pointer transition">
          {lang === 'ar' ? 'تغيير الصورة' : 'Change Image'}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (url) => handleChange('image', url))} />
        </label>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="text-xs text-gray-500">{lang === 'ar' ? 'الاسم' : 'Name'}</label><input type="text" value={data.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" /></div>
        <div><label className="text-xs text-gray-500">{lang === 'ar' ? 'السعة' : 'Capacity'}</label><input type="text" value={data.capacity} onChange={(e) => handleChange('capacity', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" /></div>
        <div><label className="text-xs text-gray-500">{lang === 'ar' ? 'النوع' : 'Type'}</label><select value={data.type} onChange={(e) => handleChange('type', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"><option value="local">{lang === 'ar' ? 'محلي' : 'Local'}</option><option value="imported">{lang === 'ar' ? 'مستورد' : 'Imported'}</option></select></div>
        <div><label className="text-xs text-gray-500">{lang === 'ar' ? 'رابط الصورة' : 'Image URL'}</label><input type="text" value={data.image} onChange={(e) => handleChange('image', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" /></div>
        <div className="col-span-1 md:col-span-2"><label className="text-xs text-gray-500">{lang === 'ar' ? 'الوصف' : 'Description'}</label><textarea value={data.description} onChange={(e) => handleChange('description', e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"></textarea></div>
      </div>
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {showConfirmSave && (
          <div className="bg-slate-900 p-2 rounded-lg flex items-center gap-2 border border-green-500 shadow-xl">
             <span className="text-xs text-green-400 font-bold">{lang === 'ar' ? 'تأكيد الحفظ؟' : 'Confirm Save?'}</span>
             <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'نعم' : 'Yes'}</button>
             <button onClick={() => setShowConfirmSave(false)} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
          </div>
        )}
        
        {showConfirmDelete && (
          <div className="bg-slate-900 p-2 rounded-lg flex items-center gap-2 border border-red-500 shadow-xl">
             <span className="text-xs text-red-400 font-bold">{lang === 'ar' ? 'تأكيد الحذف؟' : 'Confirm Delete?'}</span>
             <button onClick={handleDelete} className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'نعم' : 'Yes'}</button>
             <button onClick={() => setShowConfirmDelete(false)} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
          </div>
        )}

        {!showConfirmSave && !showConfirmDelete && isModified && (
          <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition" title={lang === 'ar' ? 'حفظ' : 'Save'}><Save size={16} /></button>
        )}
        {!showConfirmSave && !showConfirmDelete && (
          <button onClick={handleDelete} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition" title={lang === 'ar' ? 'حذف' : 'Delete'}><Trash2 size={16} /></button>
        )}
      </div>
    </div>
  );
};

const PostRow = ({ post, lang, onSave, onDelete }: { post: BlogPost, lang: Language, onSave: (id: string, updated: any) => void, onDelete: (id: string) => void }) => {
  const [data, setData] = useState({ ...post });
  const [isModified, setIsModified] = useState(false);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    setData({ ...post });
    setIsModified(false);
    setShowConfirmSave(false);
    setShowConfirmDelete(false);
  }, [post]);

  const handleChange = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
    setIsModified(true);
  };

  const handleSave = () => {
    if (showConfirmSave) {
      onSave(String(post.id), data);
      setIsModified(false);
      setShowConfirmSave(false);
    } else {
      setShowConfirmSave(true);
      setShowConfirmDelete(false);
    }
  };

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete(String(post.id));
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
      setShowConfirmSave(false);
    }
  };

  return (
    <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col md:flex-row gap-4 relative group">
      <div className="w-full md:w-32 flex flex-col gap-2">
        <img src={data.image} alt={data.title} className="w-full h-32 object-cover rounded-lg border border-slate-700" />
        <label className="bg-slate-800 hover:bg-slate-700 text-xs text-center text-white p-1 rounded cursor-pointer transition">
          {lang === 'ar' ? 'تغيير الصورة' : 'Change Image'}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (url) => handleChange('image', url))} />
        </label>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2"><label className="text-xs text-gray-500">{lang === 'ar' ? 'العنوان' : 'Title'}</label><input type="text" value={data.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" /></div>
        <div><label className="text-xs text-gray-500">{lang === 'ar' ? 'التصنيف' : 'Category'}</label><input type="text" value={data.category} onChange={(e) => handleChange('category', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" /></div>
        <div><label className="text-xs text-gray-500">{lang === 'ar' ? 'التاريخ' : 'Date'}</label><input type="date" value={data.date} onChange={(e) => handleChange('date', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" /></div>
        <div><label className="text-xs text-gray-500">{lang === 'ar' ? 'رابط الصورة' : 'Image URL'}</label><input type="text" value={data.image} onChange={(e) => handleChange('image', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white" /></div>
        <div className="col-span-1 md:col-span-2"><label className="text-xs text-gray-500">{lang === 'ar' ? 'مقتطف' : 'Excerpt'}</label><textarea value={data.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"></textarea></div>
        <div className="col-span-1 md:col-span-2"><label className="text-xs text-gray-500">{lang === 'ar' ? 'المحتوى' : 'Content'}</label><textarea value={data.content} onChange={(e) => handleChange('content', e.target.value)} rows={5} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"></textarea></div>
      </div>
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {showConfirmSave && (
          <div className="bg-slate-900 p-2 rounded-lg flex items-center gap-2 border border-green-500 shadow-xl">
            <span className="text-xs text-green-400 font-bold">{lang === 'ar' ? 'تأكيد الحفظ؟' : 'Confirm Save?'}</span>
            <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'نعم' : 'Yes'}</button>
            <button onClick={() => setShowConfirmSave(false)} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
          </div>
        )}
        {showConfirmDelete && (
          <div className="bg-slate-900 p-2 rounded-lg flex items-center gap-2 border border-red-500 shadow-xl">
            <span className="text-xs text-red-400 font-bold">{lang === 'ar' ? 'تأكيد الحذف؟' : 'Confirm Delete?'}</span>
            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'نعم' : 'Yes'}</button>
            <button onClick={() => setShowConfirmDelete(false)} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
          </div>
        )}
        {!showConfirmSave && !showConfirmDelete && isModified && (
          <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition" title={lang === 'ar' ? 'حفظ' : 'Save'}><Save size={16} /></button>
        )}
        {!showConfirmSave && !showConfirmDelete && (
          <button onClick={handleDelete} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition" title={lang === 'ar' ? 'حذف' : 'Delete'}><Trash2 size={16} /></button>
        )}
      </div>
    </div>
  );
};

interface AdminDashboardProps {
  lang: Language;
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onBack }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'products' | 'posts' | 'settings'>('products');
  const [settingsModified, setSettingsModified] = useState(false);
  const settingsModifiedRef = React.useRef(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [showConfirmSaveSettings, setShowConfirmSaveSettings] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [showConfirmDeleteImage, setShowConfirmDeleteImage] = useState<number | null>(null);

  const updateSettingsModified = (val: boolean) => {
    setSettingsModified(val);
    settingsModifiedRef.current = val;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, [lang]);

  useEffect(() => {
    if (!user) return;
    
    const unsubProducts = onSnapshot(collection(db, 'products'), snapshot => {
      const data: Product[] = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() } as unknown as Product));
      setProducts(data);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'products'));

    const unsubPosts = onSnapshot(collection(db, 'posts'), snapshot => {
      const data: BlogPost[] = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() } as unknown as BlogPost));
      setPosts(data);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'posts'));

    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), snapshot => {
      if (!settingsModifiedRef.current) {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setHeroImages(data?.heroImages !== undefined ? data.heroImages : IMAGES);
        } else {
          setHeroImages(IMAGES);
        }
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'settings/global'));

    return () => { unsubProducts(); unsubPosts(); unsubSettings(); };
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setLoginError('');
    
    const normalizedEmail = email.toLowerCase().trim();
    if (
      (normalizedEmail !== 'hossamhossam@gmail.com' && normalizedEmail !== 'mahmo6866u@gmail.com') ||
      password !== 'Lmno_1234E$'
    ) {
      setLoginError(lang === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
      setIsLoggingIn(false);
      return;
    }

    try {
      const loggedUser = { email: normalizedEmail };
      setUser(loggedUser);
      localStorage.setItem('adminUser', JSON.stringify(loggedUser));
    } catch (e: any) {
      setLoginError(e.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCreateProduct = async () => {
    const defaultProduct = {
      name: 'نوع بطارية جديد',
      description: 'وصف البطارية هنا...',
      capacity: '60 Ah',
      image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=500&q=60',
      type: 'local'
    };
    try {
      const newId = Date.now().toString();
      await setDoc(doc(db, 'products', newId), defaultProduct);
    } catch (error: any) {
      console.error("Error adding product:", error.message);
      handleFirestoreError(error, OperationType.CREATE, 'products');
    }
  };

  const handleUpdateProduct = async (id: string, updatedData: any) => {
    try {
      const p = products.find(prod => String(prod.id) === id);
      if (!p) return;
      const updated = { ...updatedData };
      delete (updated as any).id;
      await setDoc(doc(db, 'products', id), updated);
    } catch (error: any) {
      console.error("Error updating product:", error.message);
      handleFirestoreError(error, OperationType.UPDATE, `products/${id}`);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error: any) {
      console.error("Error deleting product:", error.message);
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };

  const handleCreatePost = async () => {
    const defaultPost = {
      title: 'عنوان المقال الجديد',
      excerpt: 'مقتطف قصير عن المقال',
      content: 'المحتوى الكامل للمقال هنا...',
      date: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=500&q=60',
      category: 'نصائح'
    };
    try {
      const newId = Date.now().toString();
      await setDoc(doc(db, 'posts', newId), defaultPost);
    } catch (error: any) {
      console.error("Error adding post:", error.message);
      handleFirestoreError(error, OperationType.CREATE, 'posts');
    }
  };

  const handleUpdatePost = async (id: string, updatedData: any) => {
    try {
      const p = posts.find(post => String(post.id) === id);
      if (!p) return;
      const updated = { ...updatedData };
      delete (updated as any).id;
      await setDoc(doc(db, 'posts', id), updated);
    } catch (error: any) {
      console.error("Error updating post:", error.message);
      handleFirestoreError(error, OperationType.UPDATE, `posts/${id}`);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (error: any) {
      console.error("Error deleting post:", error.message);
      handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    }
  };

  const handleRemoveHeroImage = (index: number) => {
    const copy = [...heroImages];
    copy.splice(index, 1);
    setHeroImages(copy);
    setShowConfirmDeleteImage(null);
    updateSettingsModified(true);
  };

  const handleSaveSettings = async () => {
    setSaveError('');
    try {
      const payloadSize = JSON.stringify(heroImages).length;
      if (payloadSize > 850000) {
         throw new Error(lang === 'ar' ? 'حجم الصور كبير جداً. يرجى تقليل عدد الصور أو حجمها.' : 'Images size is too large. Please reduce the number or size of images.');
      }
      await setDoc(doc(db, 'settings', 'global'), { heroImages }, { merge: true });
      updateSettingsModified(false);
      setShowConfirmSaveSettings(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      console.error("Error saving settings:", error.message);
      setSaveError(error.message || 'Error occurred while saving');
      handleFirestoreError(error, OperationType.UPDATE, `settings/global`);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white"><Loader2 className="animate-spin text-blue-500 w-12 h-12" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-800 text-center">
          <Settings className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">{lang === 'ar' ? 'تسجيل الدخول للإدارة' : 'Admin Login'}</h2>
          <p className="text-gray-400 mb-6">{lang === 'ar' ? 'قم بتسجيل الدخول كمسؤول' : 'Please sign in with your administrator account'}</p>
          <form onSubmit={handleLogin} className="space-y-4 text-start">
            {loginError && (
              <div className="space-y-3">
                <div className="p-3 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-sm">{loginError}</div>
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-400 mb-1">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500" 
              />
            </div>

            <button 
              type="submit"
              disabled={isLoggingIn}
              className={`w-full mt-4 ${isLoggingIn ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white font-bold py-3 px-4 rounded-xl transition flex justify-center items-center gap-2`}
            >
              {isLoggingIn && <Loader2 className="w-5 h-5 animate-spin" />}
              {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </form>

          <button onClick={onBack} className="mt-6 text-gray-500 hover:text-white transition block mx-auto text-sm">{lang === 'ar' ? 'العودة للموقع' : 'Back to Site'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Settings className="text-blue-500" />
            <h1 className="text-xl font-bold text-white">{lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 max-w-[150px] truncate md:max-w-none">{user.email}</span>
            <button onClick={() => {
              localStorage.removeItem('adminUser');
              setUser(null);
            }} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-sm transition text-white">
              <LogOut size={16} /> {lang === 'ar' ? 'خروج' : 'Sign out'}
            </button>
            <button onClick={onBack} className="text-sm text-blue-400 hover:underline">{lang === 'ar' ? 'العودة' : 'Back to Site'}</button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex flex-col gap-2">
          <button onClick={() => setActiveTab('products')} className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'products' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-900 text-slate-400'}`}>
            <Battery size={20} /> {lang === 'ar' ? 'المنتجات' : 'Products'}
          </button>
          <button onClick={() => setActiveTab('posts')} className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'posts' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-900 text-slate-400'}`}>
            <FileText size={20} /> {lang === 'ar' ? 'المقالات' : 'Blog Posts'}
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 p-3 rounded-xl transition ${activeTab === 'settings' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-900 text-slate-400'}`}>
            <Image size={20} /> {lang === 'ar' ? 'صور الرئيسية' : 'Hero Images'}
          </button>
        </aside>

        <main className="flex-1 bg-slate-900 rounded-2xl p-6 border border-slate-800 min-h-[600px]">
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{lang === 'ar' ? 'إدارة المنتجات' : 'Manage Products'}</h2>
                <button onClick={handleCreateProduct} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition">
                  <Plus size={16} /> {lang === 'ar' ? 'إضافة منتج' : 'Add Product'}
                </button>
              </div>
              <div className="space-y-4">
                {products.length === 0 && <p className="text-gray-500 italic p-4 bg-slate-950 rounded-lg border border-slate-800">{lang === 'ar' ? 'لا توجد منتجات حالياً. أضف منتج جديد من الزر أعلاه.' : 'No products found. Add one!'}</p>}
                {products.map(product => (
                  <ProductRow key={product.id} product={product} lang={lang} onSave={handleUpdateProduct} onDelete={handleDeleteProduct} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{lang === 'ar' ? 'إدارة المقالات' : 'Manage Blog Posts'}</h2>
                <button onClick={handleCreatePost} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition">
                  <Plus size={16} /> {lang === 'ar' ? 'إضافة مقال' : 'Add Post'}
                </button>
              </div>
              <div className="space-y-4">
                {posts.length === 0 && <p className="text-gray-500 italic p-4 bg-slate-950 rounded-lg border border-slate-800">{lang === 'ar' ? 'لا توجد مقالات حالياً. أضف مقال جديد من الزر أعلاه.' : 'No posts found. Add one!'}</p>}
                {posts.map(post => (
                  <PostRow key={post.id} post={post} lang={lang} onSave={handleUpdatePost} onDelete={handleDeletePost} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white max-w-[200px] sm:max-w-none leading-tight">{lang === 'ar' ? 'إدارة صور عرض الرئيسية' : 'Manage Hero Slider Images'}</h2>
                <div className="flex items-center gap-3 flex-wrap justify-end">
                  {saveSuccess && (
                    <span className="text-green-500 text-sm font-bold animate-pulse">
                      {lang === 'ar' ? 'تم الحفظ بنجاح!' : 'Saved successfully!'}
                    </span>
                  )}
                  {settingsModified && !showConfirmSaveSettings && (
                    <button onClick={() => setShowConfirmSaveSettings(true)} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition shadow-lg">
                      <Save size={16} /> {lang === 'ar' ? 'حفظ' : 'Save'}
                    </button>
                  )}
                  {showConfirmSaveSettings && (
                    <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700 shadow-xl">
                      <span className="text-sm text-gray-300 mr-2">{lang === 'ar' ? 'هل أنت متأكد من حفظ التغييرات؟ ستبقى الصور ثابتة.' : 'Are you sure you want to save? Images will be permanent.'}</span>
                      <button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-xs text-white transition">{lang === 'ar' ? 'نعم، احفظ' : 'Yes, save'}</button>
                      <button onClick={() => setShowConfirmSaveSettings(false)} className="bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded text-xs text-white transition">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
                    </div>
                  )}
                  <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition cursor-pointer">
                    <Plus size={16} /> {lang === 'ar' ? 'إضافة صورة' : 'Add Image'}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (dataUrl) => {
                      setHeroImages([...heroImages, dataUrl]);
                      updateSettingsModified(true);
                    })} />
                  </label>
                </div>
              </div>
              {saveError && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-sm">{saveError}</div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroImages.length === 0 && <p className="text-gray-500 italic col-span-3 p-4 bg-slate-950 rounded-lg border border-slate-800">{lang === 'ar' ? 'لا توجد صور. سيتم استخدام الصور الافتراضية.' : 'No hero images. Main slider might be empty.'}</p>}
                {heroImages.map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 flex flex-col">
                    <img src={url} alt={`Hero ${idx}`} className="w-full h-48 object-cover transition duration-500 group-hover:opacity-80" />
                    <div className="absolute inset-0 bg-black/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                      {showConfirmDeleteImage === idx ? (
                        <div className="bg-slate-900 p-3 rounded-lg flex flex-col items-center gap-2 border border-red-500 shadow-xl m-2">
                           <span className="text-xs text-red-400 font-bold text-center">{lang === 'ar' ? 'تأكيد الحذف؟' : 'Confirm Delete?'}</span>
                           <div className="flex gap-2 mt-1">
                             <button onClick={() => handleRemoveHeroImage(idx)} className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'نعم' : 'Yes'}</button>
                             <button onClick={() => setShowConfirmDeleteImage(null)} className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs text-white">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
                           </div>
                        </div>
                      ) : (
                        <label className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer shadow-lg text-sm transition">
                          {lang === 'ar' ? 'تغيير الصورة' : 'Change Image'}
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (dataUrl) => {
                            const copy = [...heroImages];
                            copy[idx] = dataUrl;
                            setHeroImages(copy);
                            updateSettingsModified(true);
                          })} />
                        </label>
                      )}
                    </div>
                    {showConfirmDeleteImage !== idx && (
                      <button onClick={() => setShowConfirmDeleteImage(idx)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition shadow-lg z-10"><Trash2 size={16} /></button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

