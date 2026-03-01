export type Role = 
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full-Stack Developer'
  | 'Product Manager'
  | 'Machine Learning Engineer'
  | 'Mobile Developer'
  | 'AI Specialist'
  | 'Cybersecurity Specialist';

export type City = 'Macau' | 'Hong Kong' | "Guangzhou" | 'London' | 'Manchester' | 'Birmingham' | 'Leeds' | 'Liverpool' | 'Sheffield' | 'Bristol'

// for the history data
export interface SavedComparison {
  id?: string;
  _id?: string;  
  date: string;
  profile: UserProfile;
  salaryData: SalaryData;
  costData: CostData;
  visaData: VisaData | null;
  targetAnnualLeft: number;
  targetMonthlyLeft: number;
}

export interface HistoryData {
  comparisons: SavedComparison[];
}
// Step1 Role
export interface UserProfile {
  currentRole: Role;
  targetRole: Role;
  currentCity: City;
  targetCity: City;
}

// Step2 Salary
export interface SalaryData {
  currentAmount: number;
  currentFrequency: string;
  currentCurrency: string;
  targetAmount: number;
  targetFrequency: string;
  targetCurrency: string;
}

// Step2 Cost of living
export interface CostData {
  currentRent: number;
  currentTransport: number;
  currentFood: number;
  currentTotal: number;
  currentCurrency: string;
  targetRent: number;
  targetTransport: number;
  targetFood: number;
  targetTotal: number;
  targetCurrency: string;
}

// Step2 Visa
export interface VisaData {
  selectedVisaName: string;
  selectedVisaTimeline: string;
  selectedVisaCost: string;
  selectedVisaRequirements: string[];
  isSettledStatus?: boolean;
}

// Step2 Comparison Data with current and target city
export interface ComparisonData {
  profile: UserProfile;
  salary: SalaryData;
  cost: CostData;
  visa: VisaData | null;
}

// handle the difference visa option
export interface VisaOption {
  name: string;
  description: string;
  requirements: string[];
  timeline: string;
  cost?: string;
  applicationFee?: string;
  healthcareSurcharge?: string;
}