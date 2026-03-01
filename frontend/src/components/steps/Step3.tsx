import { type UserProfile, type SalaryData, type CostData, type VisaData } from '../../types';
import { ArrowLeft, Download } from 'lucide-react';
import { generateRelocationTXT } from '../../utils/txtGenerator';

interface Step3Props {
  profile: UserProfile;
  salaryData: SalaryData;
  costData: CostData;
  visaData: VisaData | null;
  onNext: () => void;
  onBack: () => void;
}

export function Step3({ profile, salaryData, costData, visaData, onNext, onBack }: Step3Props) {

  // Parse visa cost
  let visaCost = 0
  if(visaData && !visaData.isSettledStatus) {
    const visaCostStr = visaData.selectedVisaCost.replace(/[£,]/g, '').split(' ')[0];
    visaCost = parseInt(visaCostStr) || 3800
  }

  // calculate figures for target city
  const targetAnnualSalary = salaryData.targetAmount
  const targetAnnualLiving = costData.targetTotal * 12
  const targetTotalAnnualSpend = targetAnnualLiving + visaCost
  const targetAnnualLeft = targetAnnualSalary - targetTotalAnnualSpend
  const targetMonthlyLeft = targetAnnualLeft / 12

  // calculate figures for current city
  const currentAnnualSalary = salaryData.currentAmount
  const currentAnnualLiving = costData.currentTotal * 12
  const currentAnnualLeft = currentAnnualSalary - currentAnnualLiving
  const currentMonthlyLeft = currentAnnualLeft / 12

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const formatMonthly = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const handleDownloadTXT = () => {
    generateRelocationTXT({
      profile,
      salaryData,
      costData,
      visaData,
      calculations: {
        targetAnnualSalary, targetAnnualLiving, targetAnnualLeft,
        targetMonthlyLeft, currentAnnualLeft, currentMonthlyLeft, visaCost
      }
    });
  };


  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Your Personal Relocation Summary</h2>
        {/* Header */}
        <div className="mb-6 p-2">
        <h1 className="text-[18px] text-white">
          Base on <span className='font-bold text-secondary-400'>{profile.currentRole}</span> to <span className='font-bold text-secondary-400'>{profile.targetRole}</span>
        </h1>
        <p className="text-white mt-1">
          Move from <span className='font-bold text-secondary-400'>{profile.currentCity}</span> to <span className='font-bold text-secondary-400'>{profile.targetCity}</span>
        </p>
      </div>
      </div>

        {/* Section 1 - Final Cost */}
      <div className="bg-white rounded-xl shadow-lg border border-secondary-400 overflow-hidden mb-4">
        <div className="px-6 py-4 bg-primary-500">
          <h2 className="text-xl font-bold text-secondary-400">FINAL COST</h2>
        </div>
        <div className="px-6 py-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-gray-600 font-medium"></th>
                <th className="text-right py-3 text-gray-500 font-medium">Annual</th>
                <th className="text-right py-3 text-gray-500 font-medium">Monthly</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 text-gray-500 font-medium">Annual Salary</td>
                <td className="py-4 text-right font-bold text-primary-500">{formatCurrency(targetAnnualSalary, salaryData.targetCurrency)}</td>
                <td className="py-4 text-right font-bold text-primary-500">{formatMonthly(targetAnnualSalary / 12, salaryData.targetCurrency)}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4 text-gray-500 font-medium">Annual Living Cost</td>
                <td className="py-4 text-right text-red-600 font-medium">- {formatCurrency(targetAnnualLiving, salaryData.targetCurrency)}</td>
                <td className="py-4 text-right text-red-600">- {formatMonthly(costData.targetTotal, salaryData.targetCurrency)}</td>
              </tr>
              {visaData && !visaData.isSettledStatus && (
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-500 font-medium">Visa Cost (Year 1)</td>
                  <td className="py-4 text-right text-orange-600 font-medium">- {formatCurrency(visaCost, salaryData.targetCurrency)}</td>
                  <td className="py-4 text-right text-orange-600">- {formatMonthly(visaCost / 12, salaryData.targetCurrency)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={3} className="py-2">
                  <div className="border-b border-gray-300 w-full"></div>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-4 text-dark font-bold">Annual Left</td>
                <td className="py-4 text-right font-bold text-primary-500 text-xl">{formatCurrency(targetAnnualLeft, salaryData.targetCurrency)}</td>
                <td className="py-4 text-right font-bold text-primary-500 text-xl">{formatMonthly(targetMonthlyLeft, salaryData.targetCurrency)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2 - RELOCATION TO LONDON */}
      <div className='bg-white rounded-xl shadow-lg border border-secondary-400 overflow-hidden mb-4'>
        <div className='bg-primary-500 px-6 py-4'>
          <h2 className='text-xl font-bold text-secondary-400'>RELOCATION TO {profile.targetRole}</h2>
        </div>

        <div className='p-6 space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* WHAT YOU'LL EARN */}
          <div className="bg-primary-50 p-5 rounded-lg border border-primary-200">
            <h3 className="font-bold text-gray-700 mb-4 text-center text-lg">WHAT YOU'LL EARN</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Annual Salary:</span>
                <span className="font-bold text-primary-500">{formatCurrency(targetAnnualSalary, salaryData.targetCurrency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly Salary:</span>
                <span className="text-primary-500 font-bold">{formatMonthly(targetAnnualSalary / 12, salaryData.targetCurrency)}</span>
              </div>
            </div>
          </div>

        {/* WHAT YOU'LL SPEND */}
          <div className="bg-primary-50 p-5 rounded-lg border border-primary-200">
            <h3 className="font-bold text-gray-700 mb-4 text-center text-lg">WHAT YOU'LL SPEND</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Annual Living Cost:</span>
                <span className="font-bold text-primary-500">{formatCurrency(targetAnnualLiving, costData.targetCurrency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly Living Cost:</span>
                <span className="font-bold text-primary-500 text-end">{formatMonthly(costData.targetTotal, costData.targetCurrency)}</span>
              </div>
              <div className='pl-4 space-y-2 text-sm border-t border-gray-200'>
                <div className="flex justify-between">
                  <span className="text-gray-500">• Rent:</span>
                  <span className="font-bold text-primary-500">{formatMonthly(costData.targetRent, salaryData.targetCurrency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">• Transport:</span>
                  <span className="font-bold text-primary-500">{formatMonthly(costData.targetRent, salaryData.targetCurrency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">• Food:</span>
                  <span className="font-bold text-primary-500">{formatMonthly(costData.targetRent, salaryData.targetCurrency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Section 3 - Visa Cost */}
      {visaData && !visaData.isSettledStatus && (
        <div className='bg-white rounded-xl shadow-lg border border-secondary-400 overflow-hidden mb-4'>
          <div className='bg-primary-500 px-6 py-4'>
            <h2 className='text-xl font-bold text-secondary-400'>VISA COST</h2>
          </div>

          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <p className='text-sm text-gray-500 mb-1'>You Selected</p>
                <p className='font-bold text-primary-500'>{visaData.selectedVisaName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Cost (Paid Once)</p>
                <p className="font-bold text-orange-600">{visaData.selectedVisaCost}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Valid for</p>
                <p className="font-bold text-primary-500">3 years <span className="text-sm font-normal text-gray-500">(can extend to 5)</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 4 - Comparison with current and target city  */}
      <div className="bg-white rounded-xl shadow-lg border border-secondary-400 overflow-hidden mb-8">
        <div className="bg-primary-500 px-6 py-4">
          <h2 className="text-xl font-bold text-secondary-400">COMPARISON WITH YOUR CURRENT</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current city */}
            <div className="bg-gray-50 p-5 rounded-lg border">
              <h3 className="font-bold text-gray-700 mb-4 text-center text-lg">{profile.currentCity}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">What You Keep</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-primary-500">{formatCurrency(currentAnnualLeft, salaryData.currentCurrency)}/year</span>
                  <span className="font-bold text-primary-500">{formatMonthly(currentMonthlyLeft, salaryData.currentCurrency)}/mo</span>
                </div>
              </div>
            </div>

            {/* Target city */}
            <div className="bg-primary-50 p-5 rounded-lg border">
              <h3 className="font-bold text-gray-700 mb-4 text-center text-lg">{profile.targetCity}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">What You Keep</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-primary-500">{formatCurrency(targetAnnualLeft, salaryData.targetCurrency)}/year</span>
                  <span className="font-bold text-primary-500">{formatMonthly(targetMonthlyLeft, salaryData.targetCurrency)}/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section 5 - Download summary */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 rounded-xl shadow-lg border border-secondary-400">
        <button onClick={handleDownloadTXT}
         className="flex-1 bg-gray-100 text-dark px-6 py-3 rounded-xl font-medium 
         hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Download Summary (TXT)</span>
        </button>
      </div>

      {/* Next and Back Button */}
      <div className="flex justify-between mt-8 ">
        <button onClick={onBack} className="text-[18px] font-bold flex items-center space-x-2 text-secondary-500 hover:text-secondary-600">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button onClick={onNext} className="p-2 px-5 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-secondary-400 text-dark font-medium">
          <span className="absolute h-0 w-0 rounded-full bg-secondary-500 transition-all duration-400 group-hover:h-56 group-hover:w-48"></span>
          <span className="relative font-bold hover:text-white ">Next</span>
        </button>
      </div>
    </div>
  );
}