import { ArrowRight, Globe, Shield, Zap, Users, Award } from 'lucide-react';

interface HomeProps {
    onGetStarted: () => void
}

const Home = ({ onGetStarted }: HomeProps) => {
  return (
    <div className="min-h-screen from-primary-600 to-primary-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-secondary-400/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Award className="w-5 h-5 text-secondary-400 mr-2" />
              <span className="text-secondary-400 font-medium">Trusted by professionals worldwide</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Relocation
              <span className="text-secondary-400"> Bridge</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-secondary-400/90 max-w-3xl mx-auto mb-10">
              Your personal guide for moving from Asia to the UK. 
              Compare salaries, costs, and visas with real data.
            </p>

            {/* CTA Button */}
            <button
              onClick={onGetStarted}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-600 bg-secondary-400 rounded-full hover:bg-secondary-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Stats */}
            <div className="flex justify-center space-x-8 mt-16">
              <div className="text-center">
                <div className="flex items-center justify-center text-secondary-400 mb-2">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-secondary-400/80">Cities</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-secondary-400 mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-secondary-400/80">Job Roles</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-secondary-400 mb-2">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-secondary-400/80">Visa Options</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Globe/Map Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-2xl overflow-hidden bg-primary-800/30 backdrop-blur-sm border border-secondary-400/20 p-8">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <path 
                d="M0,200 Q250,100 500,200 T1000,200" 
                stroke="#E6B17E" 
                strokeWidth="2" 
                fill="none" 
                className="animate-draw-line"
              />
              <circle cx="200" cy="150" r="4" fill="#E6B17E" className="animate-pulse">
                <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="800" cy="250" r="4" fill="#E6B17E" className="animate-pulse">
                <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Asia */}
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="w-24 h-24 mx-auto mb-4 bg-secondary-400/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🌏</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Asia</h3>
              <p className="text-secondary-400/80">Macau • Hong Kong • Guangzhou</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <ArrowRight className="w-12 h-12 text-secondary-400 animate-pulse" />
            </div>

            {/* UK */}
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="w-24 h-24 mx-auto mb-4 bg-secondary-400/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🇬🇧</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">United Kingdom</h3>
              <p className="text-secondary-400/80">London • Manchester • Birmingham</p>
            </div>
          </div>

          {/* Bridge text */}
          <div className="text-center mt-12">
            <p className="text-secondary-400 text-lg italic">
              "Building bridges between your current life and your UK future"
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-primary-800/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-400/20 hover:border-secondary-400/40 transition-all">
            <Shield className="w-12 h-12 text-secondary-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Real Data</h3>
            <p className="text-secondary-400/80">Up-to-date salary and cost information from reliable sources</p>
          </div>
          
          <div className="bg-primary-800/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-400/20 hover:border-secondary-400/40 transition-all">
            <Globe className="w-12 h-12 text-secondary-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Visa Guidance</h3>
            <p className="text-secondary-400/80">Clear visa paths including Skilled Worker and Settled Status</p>
          </div>
          
          <div className="bg-primary-800/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-400/20 hover:border-secondary-400/40 transition-all">
            <Users className="w-12 h-12 text-secondary-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Personal Story</h3>
            <p className="text-secondary-400/80">Built by someone who actually made the move from Macau</p>
          </div>
        </div>
      </div>

      {/* Add this CSS to your global styles or in a style tag */}
      <style>{`
        @keyframes draw-line {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-line {
          animation: draw-line 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home