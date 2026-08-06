#!/bin/bash
sed -i '/{\/\* Slider Section \*\/}/,/{\/\* Slide Indicators \*\/}/c\
      {/* Slider Section */}\
      <div className="relative w-full bg-slate-950 overflow-hidden flex items-center justify-center">\
        {/* Placeholder image to natively set the container height to perfectly match the image aspect ratio, preventing cropping or shrinking */}\
        {heroImages.length > 0 && (\
          <img src={heroImages[0]} alt="placeholder" className="w-full h-auto invisible opacity-0 pointer-events-none" />\
        )}\
        {heroImages.map((img, index) => (\
          <div \
            key={index}\
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${\
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"\
            }`}\
          >\
            <img \
              src={img} \
              alt={`Slide ${index}`} \
              className="relative w-full h-full object-cover object-center z-10 drop-shadow-2xl"\
            />\
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>\
          </div>\
        ))}\
        {/* Slide Indicators */}
' components/Hero.tsx
