export const TAX_RULES = {
  HRA: {
    condition: (data) => data.rentPaid > 0 && !data.hraClaimed,
    suggestion: () => "Claim HRA exemption using rent receipts",
    limit: "Actual HRA received, rent paid minus 10% of salary, or 50%/40%/30% of salary (metro/non-metro)"
  },
  "80C": {
    condition: (data) => data.investment80c < 150000,
    suggestion: (data) => `Invest ₹${150000 - data.investment80c} more in LIC/PPF/ELSS for full 80C benefit`,
    limit: "₹1.5 lakh"
  },
  "80D": {
    condition: (data) => data.healthInsurance === 0,
    suggestion: () => "Buy health insurance to claim up to ₹25,000 deduction",
    limit: "₹25,000 (₹50,000 for seniors)"
  },
  "87A": {
    condition: (data) => data.taxableIncome <= 1200000,
    suggestion: () => "You qualify for Section 87A rebate - ₹12,500 tax relief!",
    limit: "Taxable income ≤ ₹12L"
  }
};

export const TAX_GLOSSARY = {
  "80C": {
    description: "Invest in savings plans & pay less tax!",
    example: "Invest ₹1.5L in LIC, PPF, or ELSS to reduce taxable income",
    limit: "₹1.5 lakh deduction"
  },
  HRA: {
    description: "Tax benefit for paying rent!",
    example: "Claim deduction by submitting rent receipts to your employer",
    limit: "Minimum of: Actual HRA, Rent paid - 10% salary, or 50%/40% salary (metro/non-metro)"
  },
  TDS: {
    description: "Tax Deducted at Source - prepaid tax by employer",
    example: "₹5K deducted from ₹60K salary as advance tax payment",
    limit: "As per income tax slabs"
  },
  "Section 87A": {
    description: "Rebate for income under ₹12L",
    example: "If taxable income is ₹10L, pay ₹0 tax!",
    limit: "Available for incomes ≤ ₹12L"
  }
};