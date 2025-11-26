
import React, { useState } from 'react';
import { Product, Language } from '../types';
import { Star, Eye, X, Battery, Zap, ShieldCheck, PenTool as Tool } from 'lucide-react';

const PRODUCTS_DATA: Product[] = [
  // --- Local Batteries (بطاريات محلية) ---
  {
    id: 1,
    name: "بطارية فولستارك (Fullstark)",
    description: "بطارية محلية بمواصفات عالمية. تتميز باللون الأزرق وقوة تحمل عالية لدرجات الحرارة المرتفعة وتكنولوجيا شبك متطورة.",
    price: "0",
    capacity: "جميع السعات (35Ah - 200Ah)",
    warranty: "متاح",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    type: "local"
  },
  {
    id: 2,
    name: "بطارية جرمن (German)",
    description: "البطارية الاقتصادية الأولى. تجمع بين السعر المناسب والأداء الموثوق. متوفرة لجميع أنواع السيارات الملاكي والنقل.",
    price: "0",
    capacity: "جميع السعات (55Ah - 100Ah)",
    warranty: "متاح",
    image: "/images/german.png",
    type: "local"
  },
  {
    id: 3,
    name: "بطارية سي دي ماكس (ACD Max)",
    description: "مصممة للخدمة الشاقة. خيار مثالي لسيارات العمل وسيارات الأجرة بفضل قدرتها العالية على إعادة الشحن السريع.",
    price: "0",
    capacity: "جميع السعات (70Ah - 150Ah)",
    warranty: "متاح",
    image: "https://www.germanbatteries.com/Products/Brands/02.png",
    type: "local"
  },
  {
    id: 4,
    name: "بطارية فولدا (Fulda)",
    description: "أداء مستقر وعمر افتراضي طويل. تكنولوجيا ألمانية مجمعة محلياً لضمان أفضل جودة مقابل السعر.",
    price: "0",
    capacity: "جميع السعات (35Ah - 200Ah)",
    warranty: "متاح",
    image: "/images/fulda.png",
    type: "local"
  },
  {
    id: 5,
    name: "بطارية أوتولايت (Autolite)",
    description: "بطارية اعتمادية بتكنولوجيا أمريكية. توفر طاقة بدء تشغيل قوية (CCA) حتى في أبرد أيام الشتاء.",
    price: "0",
    capacity: "جميع السعات متوفرة",
    warranty: "متاح",
    image: "https://www.germanbatteries.com/Products/Brands/03.png",
    type: "local"
  },
  {
    id: 6,
    name: "بطارية تايجر (Tiger)",
    description: "وحش الطاقة المصري. مصممة خصيصاً لتتحمل ظروف الطرق والطقس في مصر. قوية التحمل والاهتزازات.",
    price: "0",
    capacity: "جميع السعات (40Ah - 220Ah)",
    warranty: "متاح",
    image: "https://germanbatteries.com/Products/Images/D31.jpg",
    type: "local"
  },

  // --- Imported Batteries (بطاريات مستوردة) ---
  {
    id: 7,
    name: "بطارية توب لايت (TopLite)",
    description: "بطارية اتحاد أوروبي فائقة الجودة. تكنولوجيا يواسا (Yuasa) العالمية. متوفرة لجميع التطبيقات من الموتوسيكلات وحتى السيارات الفارهة.",
    price: "0",
    capacity: "جميع السعات (سيارات وموتوسيكلات)",
    warranty: "متاح",
    image: "/images/toplite.png",
    type: "imported"
  },
  {
    id: 8,
    name: "بطارية فارتا (Varta)",
    description: "عملاق الطاقة الألماني (Clarios). الخيار الأول لأغلب مصنعي السيارات الأوروبية. تكنولوجيا PowerFrame لأداء استثنائي وعمر طويل.",
    price: "0",
    capacity: "جميع السعات (40Ah - 220Ah)",
    warranty: "متاح",
    image: "https://ghataty.com/web/image/1407/ProMotive%20Super%20Heavy%20Duty.jpg",
    type: "imported"
  },
  {
    id: 9,
    name: "بطارية بوش (Bosch)",
    description: "الألمانية رقم 1 في العالم. توفر أعلى معدلات الأمان والأداء. تكنولوجيا PowerFrame لتدفق تيار مثالي.",
    price: "0",
    capacity: "جميع السعات متوفرة",
    warranty: "متاح",
    image: "https://fitandfix-production.s3.eu-central-1.amazonaws.com/media/catalog/product/b/o/bosch_car_battery_regular_ns_3.jpg?store=ar_EG&image-type=image",
    type: "imported"
  },
  {
    id: 10,
    name: "بطارية فولترونك (Voltronic)",
    description: "هندسة ألمانية دقيقة. مثالية للسيارات الحديثة المزودة بأنظمة Start-Stop والأنظمة الإلكترونية المعقدة.",
    price: "0",
    capacity: "جميع السعات (DIN & JIS)",
    warranty: "متاح",
    image: "https://5.imimg.com/data5/EK/YX/EV/SELLER-2825475/amaze-2048stj-150ah-tubular-battery.jpg",
    type: "imported"
  },
  {
    id: 11,
    name: "بطارية توبلا (Topla)",
    description: "صناعة سلوفينية (أوروبي). تتميز بعمر افتراضي أطول بنسبة 30% من البطاريات التقليدية بفضل تكنولوجيا الكالسيوم.",
    price: "0",
    capacity: "جميع السعات متوفرة",
    warranty: "متاح",
    image: "https://www.tab.si/wp-content/uploads/2019/08/118072_TT75.png",
    type: "imported"
  },
  {
    id: 12,
    name: "بطارية ستارتر (Starter)",
    description: "القوة الكورية. توفر طاقة بدء تشغيل موثوقة في جميع الظروف المناخية. هيكل مقوى ضد الاهتزازات.",
    price: "0",
    capacity: "جميع السعات (40Ah - 100Ah)",
    warranty: "متاح",
    image: "https://cdn.salla.sa/EAgZ/3a274724-e523-4823-b7f6-fc994bbcff5a-1000x840.44233807267-TOhg0YyDF1JdvQVrRBCLUw1uRjLuNm5Z7iXKgiZZ.jpg",
    type: "imported"
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
    { id: 'local', label: lang === 'ar' ? 'بطاريات محلية' : 'Local Batteries' },
    { id: 'imported', label: lang === 'ar' ? 'بطاريات مستوردة' : 'Imported Batteries' },
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                   <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                      {selectedProduct.type === 'local' 
                        ? (lang === 'ar' ? 'بطارية محلية' : 'Local Battery')
                        : (lang === 'ar' ? 'بطارية مستوردة' : 'Imported Battery')
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
                    <div className="text-white font-bold text-lg">{lang === 'ar' ? 'متاح' : 'Available'}</div>
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
