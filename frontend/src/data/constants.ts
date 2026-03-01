
// For Stores raw data (salary numbers, cost of living) use by mockData.ts
export const mockComparisonData = {
  salary: {
    London: { average: 65000, currency: 'GBP', afterTax: 48000 },
    Manchester: { average: 55000, currency: 'GBP', afterTax: 42000 },
    Birmingham: { average: 52000, currency: 'GBP', afterTax: 40000 },
    Leeds: { average: 50000, currency: 'GBP', afterTax: 38500 },
    Liverpool: { average: 48000, currency: 'GBP', afterTax: 37000 },
    Sheffield: { average: 47000, currency: 'GBP', afterTax: 36000 },
    Bristol: { average: 58000, currency: 'GBP', afterTax: 44000 },
    Macau: { average: 360000, currency: 'MOP', afterTax: 324000 },
    'Hong Kong': { average: 420000, currency: 'HKD', afterTax: 378000 }
  },
  costOfLiving: {
    London: { rent: 1800, transport: 150, meal: 25, total: 2500 },
    Manchester: { rent: 1200, transport: 100, meal: 18, total: 1600 },
    Birmingham: { rent: 1100, transport: 90, meal: 16, total: 1450 },
    Leeds: { rent: 1050, transport: 85, meal: 15, total: 1400 },
    Liverpool: { rent: 1000, transport: 80, meal: 14, total: 1350 },
    Sheffield: { rent: 950, transport: 75, meal: 13, total: 1300 },
    Bristol: { rent: 1400, transport: 120, meal: 20, total: 1800 },
    Macau: { rent: 12000, transport: 300, meal: 80, total: 15000 },
    'Hong Kong': { rent: 20000, transport: 500, meal: 100, total: 25000 }
  }
};