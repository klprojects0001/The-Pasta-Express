
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';

const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Starters' | 'Mains' | 'Desserts'>('Mains');

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto italic">
            "Everything you see here is made from scratch every single morning."
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12 overflow-x-auto pb-2">
          {['Starters', 'Mains', 'Desserts'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat as any)}
              className={`px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                activeTab === cat 
                ? 'bg-amber-800 text-white shadow-lg shadow-amber-200' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 group">
              <div className="w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-2xl shadow-md">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-slate-900">{item.name}</h3>
                  <span className="text-xl font-bold text-amber-800">{item.price}</span>
                </div>
                <p className="text-slate-500 leading-relaxed mb-4">
                  {item.description}
                </p>
                {item.tags && (
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
