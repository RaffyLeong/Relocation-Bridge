import { mockComparisonData } from './constants';


// Formats and combines data + adds visa options used by Step2.tsx
export const getMockDataForCity = (city: string, _role: string) => {
  
  return {
    // Salary section
    salary: mockComparisonData.salary[city as keyof typeof mockComparisonData.salary] || {
      average: 0,
      currency: 'GBP',
      afterTax: 0
    },

    // Cost of Living section
    costOfLiving: mockComparisonData.costOfLiving[city as keyof typeof mockComparisonData.costOfLiving] || {
      rent: 0,
      transport: 0,
      food: 0,
      total: 0
    },

    // Visa section
    visaOptions: [
      {
        name: 'UK Settled Status / Pre-Settled Status',
        description: 'For EU citizens with right to work in the UK',
        requirements: ['Proof of settled status', 'Share code for employer', 'Valid ID'],
        timeline: 'Already have status',
        cost: '£0',
        applicationFee: '£0',
        healthcareSurcharge: '£0',
        isSettledStatus: true
      },
      {
        name: 'Skilled Worker Visa',
        description: 'For qualified professionals with a job offer',
        requirements: ['Job offer(Certificate of Sponsorship)', 'English language level B2', 'Salary threshold of £41,700 or going rate'],
        timeline: '3-8 weeks',
        cost: '£3,800 - £6,800 (Total including IHS)',
        applicationFee: '£769 - £1,519',
        healthcareSurcharge: '£1,035 per year',
        isSettledStatus: false
      },
      {
        name: 'Global Talent Visa',
        description: 'For leaders in digital technology, academia, and arts',
        requirements: ['Endorsement from relevant body', 'Exceptional talent or promise'],
        timeline: '5-8 weeks',
        cost: '£3,800 - £6,000 (Total including IHS)',
        applicationFee: '£766 (Split: £561 endorsement + £205 visa)',
        healthcareSurcharge: '£1,035 per year',
        isSettledStatus: false,
      },
      {
        name: 'Health and Care Worker Visa',
        description: 'For medical professionals with a job offer in NHS or adult social care',
        requirements: ['Job offer from NHS/approved provider', 'Valid job in eligible health role'],
        timeline: '3 weeks',
        cost: '£304 - £590',
        applicationFee: '£304 - £590',
        healthcareSurcharge: '£0 (Exempt)',
        isSettledStatus: false
      },
      {
        name: 'Graduate Visa',
        description: 'For international students who completed a degree in UK',
        requirements: ['Completed UK degree', 'Valid student visa at time of application'],
        timeline: '8 weeks',
        cost: '£2,950 (Total for 2-year stay)',
        applicationFee: '£880',
        healthcareSurcharge: '£1,035 per year',
        isSettledStatus: false
      },
      {
        name: 'Innovator Founder Visa',
        description: 'For those starting an innovative business in UK',
        requirements: ['Innovative business idea', 'Endorsement from approved body (£1,000 fee)'],
        timeline: '3 weeks',
        cost: '£4,500 - £6,000 (Including endorsement and IHS)',
        applicationFee: '£1,274',
        healthcareSurcharge: '£1,035 per year',
        isSettledStatus: false
      }
    ]
  };
};
