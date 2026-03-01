interface ProgressBarProps {
  steps: Array<{ number: number; title: string }>;
  currentStep: number;
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full mt-10 py-6">
      <div className="flex items-center justify-between relative">
        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.number} className="flex-1 relative flex flex-col items-center">
            {/* Circle */}
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 z-10
                ${currentStep >= step.number 
                  ? 'bg-secondary-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }`}
            >
              {step.number}
            </div>
            
            {/* Title */}
            <span 
              className={`mt-2 text-xs font-bold
                ${currentStep >= step.number 
                  ? 'text-secondary-500' 
                  : 'text-gray-200'
                }`}
            >
              {step.title}
            </span>

            {index < steps.length - 1 && (
              <div className="absolute left-[60%] top-5 w-[80%] h-1 bg-gray-200">
                {/* Active portion of the line */}
                <div 
                  className="h-full bg-secondary-500 transition-all duration-500"
                  style={{ 
                    width: currentStep > step.number ? '100%' : 
                           currentStep === step.number + 0.5 ? '50%' : '0%' 
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}