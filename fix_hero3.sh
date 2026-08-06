#!/bin/bash
sed -i '/{\/\* Slider Section \*\/}/,/{\/\* Slide Indicators \*\/}/c\
      {/* Slider Section */}\
      <div className="relative w-full bg-slate-950 overflow-hidden">\
        {heroImages.map((img, index) => (\
          <div \
            key={index}\
            className={`transition-opacity duration-1000 ease-in-out w-full ${\
              index === currentSlide ? "opacity-100 relative z-10" : "opacity-0 absolute top-0 left-0 z-0"\
            }`}\
          >\
            <img \
              src={img} \
              alt={`Slide ${index}`} \
              className="w-full h-auto block"\
            />\
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>\
          </div>\
        ))}\
        {/* Slide Indicators */}
' components/Hero.tsx
