
import React, { useState, useEffect } from 'react';
import { ReservationData } from '../types';

interface ReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    date: '',
    time: '19:00',
    guests: 2,
    remarks: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxIXmt1xDIfAabASeQyYv8K_BhlVJ530jyZeyR9olG-hKMjvJZ7g-GjTXr9VQPSYNwZnA/exec"; 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        body: JSON.stringify(formData)
      });

      setStatus('success');
      setFormData({ name: '', date: '', time: '19:00', guests: 2, remarks: '' });
      
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);
      
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'guests' ? parseInt(value) : value 
    }));
    if (status === 'error') setStatus('idle');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 modal-backdrop animate-fade-in"
        onClick={status !== 'submitting' ? onClose : undefined}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          <div className="hidden lg:flex lg:w-1/3 bg-amber-900 p-8 text-white flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-serif mb-4 leading-tight">Reserve a Table</h2>
              <p className="text-amber-100/70 text-sm leading-relaxed italic">
                "Simple pasta, local ingredients, pure passion."
              </p>
            </div>
            <div className="relative z-10 text-xs text-amber-100/50 space-y-2">
              <p>Mon-Fri: 11:30 - 22:00</p>
              <p>Sat-Sun: 10:00 - 23:30</p>
            </div>
          </div>

          <div className="flex-1 p-8 lg:p-12 relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2">Booking Confirmed</h3>
                <p className="text-slate-500">
                  Grazie! Your table is waiting for you.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-serif text-slate-900 mb-2">Your Details</h2>
                  <p className="text-slate-500 text-sm">We'll save a spot for you and your guests.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        disabled={status === 'submitting'}
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Marco Rossi"
                        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:border-amber-600 focus:bg-white focus:ring-0 rounded-xl transition-all disabled:opacity-50 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guests</label>
                      <select 
                        disabled={status === 'submitting'}
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:border-amber-600 focus:bg-white focus:ring-0 rounded-xl transition-all disabled:opacity-50 text-sm"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</label>
                      <input 
                        required
                        disabled={status === 'submitting'}
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:border-amber-600 focus:bg-white focus:ring-0 rounded-xl transition-all disabled:opacity-50 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</label>
                      <input 
                        required
                        disabled={status === 'submitting'}
                        type="time" 
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:border-amber-600 focus:bg-white focus:ring-0 rounded-xl transition-all disabled:opacity-50 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remarks</label>
                    <textarea 
                      disabled={status === 'submitting'}
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      placeholder="Special request?"
                      rows={2}
                      className="w-full px-4 py-3 bg-slate-50 border-transparent focus:border-amber-600 focus:bg-white focus:ring-0 rounded-xl transition-all disabled:opacity-50 text-sm"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-amber-800 text-white py-4 rounded-xl font-bold hover:bg-amber-900 transition-all shadow-xl disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
                  >
                    {status === 'submitting' ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
