
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Product, Language } from '../types';
import { generateSlug } from '../slugify';
import { Star, Eye, X, Battery, Zap, ShieldCheck, PenTool as Tool, ArrowRight, ArrowLeft } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firebaseHelper';

const PRODUCTS_DATA: Product[] = [];

interface ProductsProps {
  lang: Language;
  title: string;
  subtitle: string;
  onInquire?: () => void;
  activeProduct?: Product | null;
  onBack?: () => void;
  onProductSelect?: (p: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ lang, title, subtitle, onInquire, activeProduct, onBack, onProductSelect }) => {
  const [filter, setFilter] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), snapshot => {
      const dbProducts: Product[] = [];
      snapshot.forEach(doc => dbProducts.push({ id: doc.id, ...doc.data() } as unknown as Product));
      // Combine or replace. Since admin manages from DB, fallback to hardcoded if empty or mix them. Let's just use DB if not empty, otherwise PRODUCTS_DATA. Or better, just show DB + Hardcoded (with dupes avoided if we want, but simple override is better). We will use DB products if any exist, otherwise hardcoded.
      if (dbProducts.length > 0) {
        setProducts(dbProducts);
      } else {
        setProducts([]);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'products'));
    return () => unsub();
  }, []);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.type === filter);

  const categories = [
    { id: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { id: 'local', label: lang === 'ar' ? 'بطاريات محلية' : 'Local Batteries' },
    { id: 'imported', label: lang === 'ar' ? 'بطاريات مستوردة' : 'Imported Batteries' },
  ];

  const fullActiveProduct = activeProduct ? (products.find(p => String(p.id) === String(activeProduct.id) || generateSlug(p.name) === activeProduct.id || generateSlug(p.name_en || '') === activeProduct.id) || activeProduct) : null;

  if (fullActiveProduct && fullActiveProduct.name) {
    return (
      <>
      <Helmet>
        <title>{lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name)} | El Sergany Company</title>
        <meta name="description" content={lang === 'ar' ? fullActiveProduct.description : (fullActiveProduct.description_en || fullActiveProduct.description)} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name),
            "image": fullActiveProduct.image.startsWith('http') ? fullActiveProduct.image : `https://elserganycompany.com${fullActiveProduct.image}`,
            "description": lang === 'ar' ? fullActiveProduct.description : (fullActiveProduct.description_en || fullActiveProduct.description),
            "brand": {
              "@type": "Brand",
              "name": "Elsergany"
            }
          })}
        </script>
      </Helmet>
      <div className="py-24 min-h-screen bg-slate-950 text-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-8 transition-colors"
          >
            {lang === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
            {lang === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
          </button>
          
          <div className="rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-black/50 border border-slate-800 relative bg-slate-800 flex items-center justify-center">
            <img 
              src={fullActiveProduct.image} 
              alt={fullActiveProduct.name} 
              className="w-full h-auto object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          <div className="mb-8 border-b border-slate-800 pb-6 animate-fade-in-up">
            <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-blue-500/20">
              {fullActiveProduct.type === 'local' 
                ? (lang === 'ar' ? 'بطارية محلية' : 'Local Battery')
                : (lang === 'ar' ? 'بطارية مستوردة' : 'Imported Battery')
              }
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {lang === 'ar' ? fullActiveProduct.name : (fullActiveProduct.name_en || fullActiveProduct.name)}
            </h1>
            <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="text-gray-500 text-sm">(4.9/5)</span>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-loose animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <p className="font-bold text-xl text-white mb-6 leading-relaxed opacity-90 whitespace-pre-line">{lang === 'ar' ? fullActiveProduct.description : (fullActiveProduct.description_en || fullActiveProduct.description)}</p>
            <div className="w-20 h-1 bg-blue-500/50 rounded-full mb-10"></div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase mb-2">
                  <Zap size={16} className="text-blue-500" />
                  {lang === 'ar' ? 'الجهد الكهربي' : 'Voltage'}
                </div>
                <div className="text-white font-black text-2xl">12V</div>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase mb-2">
                  <Battery size={16} className="text-blue-500" />
                  {lang === 'ar' ? 'السعة' : 'Capacity'}
                </div>
                <div className="text-white font-black text-2xl">{fullActiveProduct.capacity}</div>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 sm:col-span-2 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase mb-2">
                  <Tool size={16} className="text-blue-500" />
                  {lang === 'ar' ? 'الصيانة' : 'Maintenance'}
                </div>
                <div className="text-white font-black text-2xl">Maintenance Free</div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onInquire}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl text-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1 mt-4"
            >
              {lang === 'ar' ? 'استفسر عن المنتج' : 'Inquire about product'}
            </button>
          </div>
        </div>
      </div>
    </>
    );
  }

  return (
    <div className="py-20 bg-slate-950 min-h-screen relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{title}</h2>
          {subtitle && (
            <p className="text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${generateSlug(lang === 'ar' ? product.name : (product.name_en || product.name))}`}
              className="group cursor-pointer bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-2 block"
            >
              <div className="relative h-64 overflow-hidden bg-slate-800">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    // Fallback if image not found
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-slate-700 z-10">
                  {lang === 'ar' ? 'جميع السعات' : 'All Capacities'}
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="bg-blue-600 text-white p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                      <Eye size={24} />
                   </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{lang === 'ar' ? product.name : (product.name_en || product.name)}</h3>
                  <div className="flex text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {lang === 'ar' ? product.description : (product.description_en || product.description)}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                  {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  <div className="h-px bg-current flex-1 opacity-20"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
