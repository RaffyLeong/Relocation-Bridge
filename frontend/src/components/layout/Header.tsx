import { Menu, Clock, ChevronDown, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onHowItWorkClick: () => void;
  onHomeClick?: () => void;
  savedComparisons?: Array<{
    id: string;
    date: string;
    from: string;
    to: string;
    role: string;
  }>;
  onSelectHistory?: (id: string) => void;
  onClearHistory?: () => void
}

export function Header({ onHowItWorkClick, savedComparisons = [], onSelectHistory, onClearHistory, onHomeClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
      setShowHistory(false); // Close dropdown after clearing
    }
  };

  return (
    <header className="bg-primary-600 border-b border-secondary-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={onHomeClick} className="flex items-center space-x-2">
            <span className="font-bold text-secondary-400 text-xl">Relocation<span className="text-white">Bridge</span></span>
          </button>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {/* History menu */}
            <div className="relative">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 bg-primary-500 text-secondary-400 px-3 py-1.5 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-bold">History</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                {savedComparisons.length > 0 && (
                  <span className="bg-secondary-400 text-primary-600 text-xs rounded-full px-2 py-0.5">
                    {savedComparisons.length}
                  </span>
                )}
              </button>

              {/* Inside the History Menu */}
              {showHistory && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  {/* Header with Clear button */}
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-primary-500">Recent Comparisons</h3>
                    {savedComparisons.length > 0 && (
                      <button
                        onClick={handleClearHistory}
                        className="flex items-center space-x-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {savedComparisons.length > 0 ? (
                      savedComparisons.map((item) => (
                        <div 
                          key={item.id} 
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors"
                          onClick={() => {
                            if (onSelectHistory) {
                              onSelectHistory(item.id);
                              setShowHistory(false);
                            }
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-800">{item.role}</p>
                              <p className="text-xs text-gray-500">{item.from} → {item.to}</p>
                            </div>
                            <span className="text-xs text-gray-400">{item.date}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No saved comparisons yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <button 
              onClick={onHowItWorkClick}
              className="hidden font-bold md:block text-secondary-400 hover:text-white transition-colors">
              How it works
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-secondary-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-400/20">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={onHowItWorkClick}
                className="text-secondary-400 hover:text-white transition-colors text-left"
              >
                How it works
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}