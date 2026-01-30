
import React from 'react';

interface HeroProps {
  onBookClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=2000" 
          alt="Delicious Pasta" 
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="text-amber-400 font-semibold tracking-[0.2em] uppercase mb-4 block animate-fade-in">Experience Authentic Italian</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
          Where Every Strand Tells a <span className="italic">Story</span>
        </h1>
        <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Hand-crafted pasta, locally sourced ingredients, and generations of secret family recipes brought to your table.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onBookClick}
            className="bg-amber-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-amber-700 transition-all transform hover:scale-105 shadow-xl"
          >
            Book a Table
          </button>
          <button 
             onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
             className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all"
          >
            View Menu
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
