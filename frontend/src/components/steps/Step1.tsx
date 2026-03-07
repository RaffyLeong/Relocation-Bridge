import { useState, useEffect } from 'react';
import { roles } from '../../data/roles';
import { cities } from '../../data/cities';
import { ukCities } from '../../data/ukCities';
import { type UserProfile } from '../../types';

interface Step1Props {
  onComplete: (profile: UserProfile) => void;
  initialData?: UserProfile | null;
}

export function Step1({ onComplete, initialData }: Step1Props) {
  const [currentRole, setCurrentRole] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [targetCity, setTargetCity] = useState('London');

  useEffect(() => {
    if (initialData) {
      setCurrentRole(initialData.currentRole);
      setTargetRole(initialData.targetRole);
      setCurrentCity(initialData.currentCity);
      setTargetCity(initialData.targetCity);
    }
  }, [initialData]);

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole && targetRole && currentCity && targetCity) {
      onComplete({
        currentRole: currentRole as UserProfile['currentRole'],
        targetRole: targetRole as UserProfile['targetRole'],
        currentCity: currentCity as UserProfile['currentCity'],
        targetCity: targetCity as UserProfile['targetCity']
      });
    }
  };

  return (
    <div className="max-w-2xl bg-primary-600 p-10 rounded-2xl mb-10 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-400 mb-2">
          Bridge Your Career to UK
        </h1>
        <p className="text-secondary-400">
          Get personalized insights for your relocation journey
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Role */}
          <div className='space-y-2'>
            <label className="block text-[20px] font-bold text-primary-500 mb-2 uppercase tracking-wide">
              Current Role
            </label>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-400 rounded-xl text-gray-900 focus:outline-none focus:ring-2
               focus:ring-primary-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              required
            >
              <option value="">Select your role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

            {/* Target Role */}
          <div className='space-y-2'>
            <label className="block text-[20px] font-bold text-primary-500 mb-2 uppercase tracking-wide">
              Target Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-400 rounded-xl text-gray-900 focus:outline-none focus:ring-2
               focus:ring-primary-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              required
            >
              <option value="">Select your role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Current City */}
          <div className='space-y-2'>
            <label className="block text-[20px] font-bold text-primary-500 mb-2 uppercase tracking-wide">
              Current City
            </label>
            <p className="text-xs text-gray-500 mt-1">Where are you relocating from?</p>
            <select
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-400 rounded-xl text-gray-900 focus:outline-none focus:ring-2
               focus:ring-primary-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              required
            >
              <option value="">Select your city</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Target city */}
          <div className='space-y-2'>
            <label className="block text-[20px] font-bold text-primary-500 mb-2 uppercase tracking-wide">
              Target City
            </label>
            <p className="text-xs text-gray-500 mt-1">Select your destination city in the UK</p>
            <select
              value={targetCity}
              onChange={(e) => setTargetCity(e.target.value)}
              className="w-full px-4 py-3.5 bg-primary-50 border border-primary-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2
               focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              required
            >
              <option value="">Select your city</option>
              {ukCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Next Page Button */}
          <button type="submit" disabled={ !currentRole || !targetRole || !currentCity || !targetCity } 
          className="p-7 mt-10 w-full group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-primary-500 text-secondary-400 font-medium">
          <span className="absolute h-0 w-full rounded-full bg-primary-600 transition-all duration-400 group-hover:h-56 group-hover:w-full "></span>
          <span className="relative text-[18px] font-bold">Next</span>
        </button>
        </form>
      </div>


    </div>
  );
}