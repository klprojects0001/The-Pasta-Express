
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import ReservationForm from './components/ReservationForm';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const toggleBooking = () => setIsBookingOpen(!isBookingOpen);

  return (
    <div className="min-h-screen">
      <Navbar onBookClick={toggleBooking} />
      <Hero onBookClick={toggleBooking} />
      
      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800" 
                alt="Chef Cooking" 
                className="rounded-[3rem] shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-amber-800 text-white p-8 rounded-3xl shadow-xl hidden sm:block">
                <p className="text-4xl font-serif font-bold">15+</p>
                <p className="text-amber-200 text-sm font-semibold tracking-wider">YEARS OF PASSION</p>
              </div>
            </div>
            <div>
              <span className="text-amber-800 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 leading-tight">Tradition meets the modern plate.</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Founded in 2008 by Chef Marco Rossi, The Pasta Express began with a simple mission: to bring the authentic, sun-drenched flavors of Southern Italy to the local neighborhood.
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                We believe that the best pasta is simple pasta. That's why we use only four ingredients for our dough: double-zero flour, pasture-raised eggs, sea salt, and passion.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(n => (
                    <img key={n} src={`https://picsum.photos/seed/face${n}/100`} className="w-12 h-12 rounded-full border-2 border-white object-cover" alt="User" />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-slate-900">4.9 / 5.0 Rating</p>
                  <p className="text-sm text-slate-500">From 2,000+ happy diners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Menu />

      <footer className="bg-slate-900 py-16 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-serif text-white mb-6">The Pasta Express</h3>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">TripAdvisor</a>
          </div>
          <p className="text-sm border-t border-slate-800 pt-8">
            © {new Date().getFullYear()} The Pasta Express. Crafted with love in Italy.
          </p>
        </div>
      </footer>

      {/* Pop-out Reservation Modal */}
      <ReservationForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Gemini AI Concierge */}
      <AiAssistant />
    </div>
  );
};

export default App;
