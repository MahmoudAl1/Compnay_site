import React, { useState } from 'react';
import { Product, Language } from '../types';
import { Star, Eye, X, Battery, Zap, ShieldCheck, PenTool as Tool } from 'lucide-react';

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: "بطارية نسر الألمانية 70",
    description: "بطارية جافة عالية الكفاءة تدوم طويلاً، مثالية للسيارات الحديثة ذات التجهيزات الكهربائية المتعددة.",
    price: "0", // Hidden
    capacity: "70 Ah",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80", // Battery charger context (generic reliable)
    type: "car"
  },
  {
    id: 2,
    name: "بطارية كلورايد جولد 55",
    description: "الأكثر مبيعاً في السوق المصري، تحمل درجات الحرارة العالية ومناسبة للأجواء الحارة.",
    price: "0",
    capacity: "55 Ah",
    image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&w=400&q=80",
    type: "car"
  },
  {
    id: 3,
    name: "بطارية فارتا بلو ديناميك",
    description: "تكنولوجيا ألمانية متطورة، عمر افتراضي طويل وأداء ثابت في بدء التشغيل.",
    price: "0",
    capacity: "80 Ah",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80", // Mechanic context (reliable)
    type: "car"
  },
   {
    id: 4,
    name: "بطارية توب لايت موتوسيكل",
    description: "بطارية 12 فولت 7 أمبير مناسبة للموتوسيكلات الصيني والدايون، أداء قوي وعمر طويل.",
    price: "0",
    capacity: "7 Ah",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80", // Motorcycle
    type: "motorcycle"
  },
  {
    id: 5,
    name: "بطارية AC Delco 90",
    description: "بطارية قوية للسيارات الكبيرة وسيارات الدفع الرباعي، طاقة بدء تشغيل عالية.",
    price: "0",
    capacity: "90 Ah",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80", // Car Engine Bay
    type: "car"
  },
  {
    id: 6,
    name: "بطارية ريس (Race) موتوسيكل",
    description: "بطارية عالية الأداء للموتوسيكلات الريس والسرعات العالية، مقاومة للاهتزازات.",
    price: "0",
    capacity: "9 Ah",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=400&q=80", // Sport Bike
    type: "motorcycle"
  }
];

interface ProductsProps {
  lang: Language;
  title: string;
  subtitle: string;
  onInquire?: () => void;
}

export const Products: React.FC<ProductsProps> = ({ lang, title, subtitle, onInquire }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = filter === 'all' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.type === filter);

  const categories = [
    { id: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { id: 'car', label: lang === 'ar' ? 'بطاريات سيارات' : 'Car Batteries' },
    { id: 'motorcycle', label: lang === 'ar' ? 'بطاريات موتوسيكلات' : 'Motorcycle Batteries' },
  ];

  return (
    <div className="py-20 bg-slate-950 min-h-screen relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{title}</h2>
          <p className="text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                  : 'bg-slate-900 text-gray-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden bg-slate-800">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-slate-700 z-10">
                  {product.capacity}
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
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{product.name}</h3>
                  <div className="flex text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                  {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  <div className="h-px bg-current flex-1 opacity-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedProduct(null)}
          ></div>
          
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 transform transition-all animate-[fadeIn_0.3s_ease-out]">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full transition-colors backdrop-blur-md"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-64 md:h-[500px] bg-slate-800">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                   <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                      {selectedProduct.type === 'car' 
                        ? (lang === 'ar' ? 'بطارية سيارة' : 'Car Battery')
                        : (lang === 'ar' ? 'بطارية موتوسيكل' : 'Motorcycle Battery')
                      }
                   </span>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8 md:p-10 flex flex-col justify-center bg-slate-900">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-2 mb-6">
                   <div className="flex text-yellow-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span className="text-gray-500 text-sm">(4.9/5)</span>
                </div>

                <p className="text-gray-300 leading-relaxed mb-8 border-l-2 border-blue-500 pl-4">
                  {selectedProduct.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                      <Zap size={14} className="text-blue-500" />
                      {lang === 'ar' ? 'الجهد الكهربي' : 'Voltage'}
                    </div>
                    <div className="text-white font-bold text-lg">12V</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                      <Battery size={14} className="text-blue-500" />
                      {lang === 'ar' ? 'السعة' : 'Capacity'}
                    </div>
                    <div className="text-white font-bold text-lg">{selectedProduct.capacity}</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                      <ShieldCheck size={14} className="text-blue-500" />
                      {lang === 'ar' ? 'الضمان' : 'Warranty'}
                    </div>
                    <div className="text-white font-bold text-lg">{lang === 'ar' ? '12 شهر' : '12 Months'}</div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                      <Tool size={14} className="text-blue-500" />
                      {lang === 'ar' ? 'الصيانة' : 'Maintenance'}
                    </div>
                    <div className="text-white font-bold text-lg">{lang === 'ar' ? 'مجانية' : 'Free'}</div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    if (onInquire) {
                      onInquire();
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  {lang === 'ar' ? 'استفسر عن السعر والتوفر' : 'Inquire Price & Availability'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};