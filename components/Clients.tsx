import React from 'react';

interface ClientsProps {
  lang: 'ar' | 'en';
}

export const Clients = ({ lang }: ClientsProps) => {
  const clients = [
    { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
    { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" },
    { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg" },
    { name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg" },
    { name: "Nissan", logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg" },
    { name: "Kia", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg" },
    { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg", isDark: true },
    { name: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg" },
    { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg" },
    { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg", isDark: true },
    { name: "Skoda", logo: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 150'%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='100' font-weight='bold' fill='%234ba82e' text-anchor='middle' dominant-baseline='middle'%3E%C5%A0KODA%3C/text%3E%3C/svg%3E" },
    { name: "Jeep", logo: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 150'%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='120' font-weight='bold' fill='%23000' text-anchor='middle' dominant-baseline='middle'%3EJEEP%3C/text%3E%3C/svg%3E", isDark: true },
  ];

  return (
    <div className="bg-slate-900 py-20 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            {lang === 'ar' ? 'عملائنا وشركاء النجاح' : 'Our Clients & Partners'}
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="bg-slate-950 p-6 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] border border-slate-800 h-32 group"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className={`max-h-16 max-w-[80%] object-contain transition-all duration-500 opacity-60 ${
                  client.isDark 
                    ? 'brightness-0 invert group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' 
                    : 'grayscale group-hover:grayscale-0 group-hover:opacity-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
