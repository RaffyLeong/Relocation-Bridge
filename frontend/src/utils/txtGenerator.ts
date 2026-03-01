import { type UserProfile, type SalaryData, type CostData, type VisaData } from '../types';

interface TXTData {
  profile: UserProfile;
  salaryData: SalaryData;
  costData: CostData;
  visaData: VisaData | null;
  calculations: {
    targetAnnualSalary: number;
    targetAnnualLiving: number;
    targetAnnualLeft: number;
    targetMonthlyLeft: number;
    currentAnnualLeft: number;
    currentMonthlyLeft: number;
    visaCost: number;
  };
}

export const generateRelocationTXT = (data: TXTData): void => {
  const { profile, salaryData, costData, visaData, calculations } = data;
  
  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const formatMonthly = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}/mo`;
  };

  // Create txt content
  const content = `
========================================
        RELOCATION SUMMARY
========================================

${profile.currentRole} → ${profile.targetRole}
${profile.currentCity} → ${profile.targetCity}

========================================
FINAL COST (Year 1 in ${profile.targetCity})
========================================
Annual Salary:         ${formatCurrency(calculations.targetAnnualSalary, salaryData.targetCurrency)}
Annual Living Cost:    -${formatCurrency(calculations.targetAnnualLiving, salaryData.targetCurrency)}
${visaData && !visaData.isSettledStatus ? `Visa Cost (Year 1):     -${formatCurrency(calculations.visaCost, salaryData.targetCurrency)}` : ''}
----------------------------------------
ANNUAL LEFT:           ${formatCurrency(calculations.targetAnnualLeft, salaryData.targetCurrency)}
MONTHLY LEFT:          ${formatMonthly(calculations.targetMonthlyLeft, salaryData.targetCurrency)}

========================================
WHAT YOU'LL EARN IN ${profile.targetCity}
========================================
Annual Salary:         ${formatCurrency(calculations.targetAnnualSalary, salaryData.targetCurrency)}
Monthly Salary:        ${formatMonthly(calculations.targetAnnualSalary / 12, salaryData.targetCurrency)}

========================================
WHAT YOU'LL SPEND IN ${profile.targetCity}
========================================
Monthly Living Cost:   ${formatMonthly(costData.targetTotal, salaryData.targetCurrency)}
  • Rent:              ${formatMonthly(costData.targetRent, salaryData.targetCurrency)}
  • Transport:         ${formatMonthly(costData.targetTransport, salaryData.targetCurrency)}
  • Food:              ${formatMonthly(costData.targetFood, salaryData.targetCurrency)}

${visaData && !visaData.isSettledStatus ? `
========================================
VISA INFORMATION
========================================
Visa Type:             ${visaData.selectedVisaName}
Total Cost:            ${visaData.selectedVisaCost}
Valid for:             3 years (can extend to 5)
` : ''}

========================================
COMPARISON WITH YOUR CURRENT
========================================
${profile.currentCity} (Current):
  What You Keep:       ${formatCurrency(calculations.currentAnnualLeft, salaryData.currentCurrency)}/year
  Monthly:             ${formatMonthly(calculations.currentMonthlyLeft, salaryData.currentCurrency)}

${profile.targetCity} (Target):
  What You Keep:       ${formatCurrency(calculations.targetAnnualLeft, salaryData.targetCurrency)}/year
  Monthly:             ${formatMonthly(calculations.targetMonthlyLeft, salaryData.targetCurrency)}

${calculations.targetMonthlyLeft > calculations.currentMonthlyLeft ? 
  '✅ You will have MORE disposable income in the UK!' : 
  '⚠️ You will have LESS disposable income in the UK.'}

========================================
Generated on: ${new Date().toLocaleDateString()}
========================================
  `;

  // Create blob and download
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relocation-${profile.currentCity}-to-${profile.targetCity}-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};