import mongoose from 'mongoose';

const ComparisonSchema = new mongoose.Schema({
    user: { type: String, default: 'anonymous' },
    date: { type: String, required: true },
    profile: {
        currentRole: String,
        targetRole: String,
        currentCity: String,
        targetCity: String,
    },
    salaryData: {
        currentAmount: Number,
        currentFrequency: String,
        currentCurrency: String,
        targetAmount: Number,
        targetFrequency: String,
        targetCurrency: String
    },
    costData: {
    currentRent: Number,
    currentTransport: Number,
    currentFood: Number,
    currentTotal: Number,
    currentCurrency: String,
    targetRent: Number,
    targetTransport: Number,
    targetFood: Number,
    targetTotal: Number,
    targetCurrency: String
  },
  visaData: {
    selectedVisaName: String,
    selectedVisaTimeline: String,
    selectedVisaCost: String,
    selectedVisaRequirements: [String],
    isSettledStatus: Boolean
  },
  targetAnnualLeft: Number,
  targetMonthlyLeft: Number,
  createdAt: { type: Date, default: Date.now }
})

const Comparison = mongoose.model('Comparison', ComparisonSchema);
export default Comparison