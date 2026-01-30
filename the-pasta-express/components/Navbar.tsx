
import React, { useState } from 'react';

interface NavbarProps {
  onBookClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <span className="text-2xl font-bold font-serif text-amber-800">The Pasta Express</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollTo('menu')} className="text-slate-600 hover:text-amber-800 font-medium transition-colors">Menu</button>
            <button onClick={() => scrollTo('about')} className="text-slate-600 hover:text-amber-800 font-medium transition-colors">Our Story</button>
            <button 
              onClick={onBookClick}
              className="bg-amber-800 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-amber-900 transition-all shadow-lg hover:shadow-amber-200"
            >
              Book a Table
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <button onClick={() => scrollTo('menu')} className="block px-3 py-2 text-slate-600 font-medium w-full text-center hover:bg-slate-50">Menu</button>
            <button onClick={() => scrollTo('about')} className="block px-3 py-2 text-slate-600 font-medium w-full text-center hover:bg-slate-50">Our Story</button>
            <button onClick={() => { setIsOpen(false); onBookClick(); }} className="block px-3 py-4 text-amber-800 font-bold w-full text-center hover:bg-amber-50">Book a Table</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
