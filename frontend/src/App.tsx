import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Container } from './components/layout/Container';
import { Step1 } from './components/steps/Step1';
import { Step2 } from './components/steps/Step2';
import { Step3 } from './components/steps/Step3';
import { Step4 } from './components/steps/Step4';
import { ProgressBar } from './components/ui/ProgressBar';
import { type UserProfile, type SalaryData, type CostData, type VisaData, type SavedComparison } from './types';
import { HowItWorks } from './components/layout/HowItWork';
import Home from './components/layout/Home';
import { api } from './services/api';



function App() {
  const [ showHome, setShowHome ] = useState(false)
  const [currentStep, setCurrentStep] = useState(3);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [costData, setCostData] = useState<CostData | null>(null);
  const [visaData, setVisaData] = useState<VisaData | null>(null);

  // handle save the history data
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([])
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await api.getComparisons();
        setSavedComparisons(data);
        console.log('✅ Loaded history from backend', data);
      } catch (error) {
        console.error('❌ Failed to load history', error);
      }
    };
    loadHistory();
  }, []);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const steps = [
    { number: 1, title: 'Your Profile' },
    { number: 2, title: 'Compare Cities' },
    { number: 3, title: 'Your Summary' },
    { number: 4, title: 'Resources' },
  ];

  // for Home page page to step1
  const handleGetStarted = () => {
    setShowHome(false);
    setCurrentStep(1);
  };

  // for step1 to step2 button
  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentStep(prev => prev + 1);
  };

  // for step2 to step3 button
  const handleComparisonComplete = (data: {
    salary: SalaryData;
    cost: CostData;
    visa: VisaData | null;
  }) => {
    setSalaryData(data.salary)
    setCostData(data.cost)
    setVisaData(data.visa)
    setCurrentStep(prev => prev + 1)
  }

  // for step4 home button
  const handleHome = () => {
    setShowHome(true);
  };

  // for step4 Save And Start Over Button
    const handleSaveAndStartOver = async () => {
    // Save current comparison to history
    if (userProfile && salaryData && costData) {
      // Calculate annual left for summary
      const visaCost = visaData && !visaData.isSettledStatus ? 3800 : 0;
      const targetAnnualLeft = salaryData.targetAmount - (costData.targetTotal * 12) - visaCost;
      
      // Create new saved comparison
      const newComparison: SavedComparison = {
        id: Date.now().toString(), // Add this line if id is required
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        profile: { ...userProfile },
        salaryData: { ...salaryData },
        costData: { ...costData },
        visaData: visaData ? { ...visaData } : null,
        targetAnnualLeft: targetAnnualLeft,
        targetMonthlyLeft: targetAnnualLeft / 12
      };
      try {
      const saved = await api.saveComparison(newComparison)
      setSavedComparisons(prev => [saved, ...prev].slice(0, 10))
      console.log('✅ Comparison saved to history!', saved);
    } catch (error) {
      console.error('❌ Failed to save to backend', error);
    }
    }
    
    
    // Reset to step 1
    setCurrentStep(1);
    // Reset all data for new comparison
    setUserProfile(null);
    setSalaryData(null);
    setCostData(null);
    setVisaData(null);
  };

  // when history item it selected
  const handleSelectHistory = (id: string) => {
    console.log('Looking for comparison with id:', id); // Add debug log
    console.log('Available comparisons:', savedComparisons); // Add debug log
    const comparison = savedComparisons.find(c => c._id === id || c.id === id);
    console.log('Found comparison:', comparison);
    if (comparison) {
      setUserProfile(comparison.profile);
      setSalaryData(comparison.salaryData);
      setCostData(comparison.costData);
      setVisaData(comparison.visaData);
      setShowHome(false);
      setCurrentStep(3); 
    } else {
    console.warn('No comparison found with id:', id);
  }
  }; 

  const handleClearHistory = async () => {
      try {
        await api.clearHistory()
        setSavedComparisons([]);
      } catch (error) {
        console.error('Failed to clear history', error)
      }
};

  if (showHome) {
    return (
      <div className="min-h-screen bg-primary-600">
        <Header onHowItWorkClick={() => setShowHowItWorks(true)} 
        onHomeClick={() => setShowHome(true)}
        savedComparisons={savedComparisons.map(c => ({
          id: c._id || c.id || Date.now().toString(),
          date: c.date,
          from: c.profile.currentCity,
          to: c.profile.targetCity,
          role: c.profile.currentRole
        }))}
         onSelectHistory={handleSelectHistory}
         onClearHistory={handleClearHistory}
          />
        <Home onGetStarted={handleGetStarted} />
        <Footer />
        
        {/* How It Works Page */}
        {showHowItWorks && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <button 
                  onClick={() => setShowHowItWorks(false)}
                  className="float-right text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                <HowItWorks />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  {/* Displaying the step1 - 4 */}
  return (
    <div className="min-h-screen bg-primary-600">
      {/* Pass the function to Header */}
      <Header onHowItWorkClick={() => setShowHowItWorks(true)}
      onHomeClick={() => setShowHome(true)}
      savedComparisons={savedComparisons.map(c => ({
        id: c._id || c.id || Date.now().toString(),
        date: c.date,
        from: c.profile.currentCity,
        to: c.profile.targetCity,
        role: c.profile.currentRole
      }))}
      onSelectHistory={handleSelectHistory}
      onClearHistory={handleClearHistory}
      />
      
      <Container>
        {showHowItWorks ? (
          <>
            <button 
              onClick={() => setShowHowItWorks(false)}
              className="mb-4 text-secondary-400 hover:underline"
            >
              ← Back to tool
            </button>
            <HowItWorks />
          </>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <ProgressBar steps={steps} currentStep={currentStep} />
            </div>

            {/* Step Content */}
            <div className="mt-20 animate-fade-in">
              {currentStep === 1 && (
                <Step1 onComplete={handleProfileComplete} />
              )}
              
              {currentStep === 2 && userProfile && (
                <Step2 
                  profile={userProfile} 
                  onNext={handleComparisonComplete}
                  onBack={() => setCurrentStep(1)}
                />
              )}
              
              {currentStep === 3 && userProfile && salaryData && costData && (
                <Step3 
                  profile={userProfile}
                  salaryData={salaryData}
                  costData={costData}
                  visaData={visaData}
                  onNext={() => setCurrentStep(4)}
                  onBack={() => setCurrentStep(2)}
                />
              )}
              
              {currentStep === 4 && (
                <Step4  
                  onBack={() => setCurrentStep(3)}
                  onHome={handleHome}
                  onSaveAndStartOver={handleSaveAndStartOver}
                />
              )}
            </div>
          </>
        )}
      </Container>
      <Footer /> 
    </div>
  );
}

export default App;