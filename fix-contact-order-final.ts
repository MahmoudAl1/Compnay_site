import fs from 'fs';
let contact = fs.readFileSync('components/Contact.tsx', 'utf-8');

const phoneBlock = `              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'اتصل بنا' : 'Phone'}</h4>
                  <p className="text-gray-400 mb-1 font-mono text-sm" dir="ltr">+20 120 400 2646</p>
                </div>
              </div>`;

contact = contact.replace(phoneBlock, '');

const emailBlock = `              <div className="flex items-start gap-6 group">
                <div className="bg-slate-800 p-4 rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-black/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h4>
                  <p className="text-gray-400">elserganycompany@gmail.com</p>
                </div>
              </div>`;

contact = contact.replace(emailBlock, phoneBlock + '\n' + emailBlock);

fs.writeFileSync('components/Contact.tsx', contact, 'utf-8');
console.log('Fixed contact order again');
