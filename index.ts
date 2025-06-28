enum FilingStatus {
    Single,
    MarriedFilingJointly,
    MarriedFilingSeparately,
    HeadOfHousehold
}

interface Bracket {
    floor: number,
    ceiling: number,
    rate: number
}

const federalStandardDeductions: Record<number, Record<FilingStatus, number>> = {
    2025: {
        [FilingStatus.Single]: 15_000,
        [FilingStatus.MarriedFilingJointly]: 30_000,
        [FilingStatus.MarriedFilingSeparately]: 15_000,
        [FilingStatus.HeadOfHousehold]: 22_500
    }
}

const federalIncomeTaxBrackets: Record<number, Record<FilingStatus, Bracket[]>> = {
    2025: {
        [FilingStatus.Single]: [
            {
                rate: 10,
                floor: 0,
                ceiling: 11_600
            },
            {
                rate: 12,
                floor: 11_600,
                ceiling: 47_150
            },
            {
                rate: 22,
                floor: 47_150,
                ceiling: 100_525
            },
            {
                rate: 24,
                floor: 100_525,
                ceiling: 191_950
            },
            {
                rate: 32,
                floor: 191_951,
                ceiling: 243_725
            },
            {
                rate: 35,
                floor: 243_725,
                ceiling: 609_350
            },
            {
                rate: 37,
                floor: 609_350,
                ceiling: Infinity,
            }
        ],
        [FilingStatus.MarriedFilingJointly]: [
            {
                rate: 10,
                floor: 0,
                ceiling: 23_200
            },
            {
                rate: 12,
                floor: 23_200,
                ceiling: 94_300
            },
            {
                rate: 22,
                floor: 94_300,
                ceiling: 201_050
            },
            {
                rate: 24,
                floor: 201_050,
                ceiling: 383_900
            },
            {
                rate: 32,
                floor: 383_900,
                ceiling: 487_450
            },
            {
                rate: 35,
                floor: 487_450,
                ceiling: 731_200
            },
            {
                rate: 37,
                floor: 731_200,
                ceiling: Infinity
            }
        ],
        [FilingStatus.MarriedFilingSeparately]: [
            {
                rate: 10,
                floor: 0,
                ceiling: 11_600
            },
            {
                rate: 12,
                floor: 11_600,
                ceiling: 47_150
            },
            {
                rate: 22,
                floor: 47_150,
                ceiling: 100_525
            },
            {
                rate: 24,
                floor: 100_525,
                ceiling: 191_950
            },
            {
                rate: 32,
                floor: 191_950,
                ceiling: 243_725
            },
            {
                rate: 35,
                floor: 243_725,
                ceiling: 365_600
            },
            {
                rate: 37,
                floor: 365_600,
                ceiling: Infinity
            }
        ],
        [FilingStatus.HeadOfHousehold]: [
            {
                rate: 10,
                floor: 0,
                ceiling: 16_550
            },
            {
                rate: 12,
                floor: 16_550,
                ceiling: 63_100
            },
            {
                rate: 22,
                floor: 63_100,
                ceiling: 100_500
            },
            {
                rate: 24,
                floor: 100_500,
                ceiling: 191_950
            },
            {
                rate: 32,
                floor: 191_950,
                ceiling: 243_700
            },
            {
                rate: 35,
                floor: 243_700,
                ceiling: 609_350
            },
            {
                rate: 37,
                floor: 609_350,
                ceiling: Infinity
            }
        ]
    }
};

// https://moorecolson.com/news-insights/year-end-tax-planning-2025-inflation-adjustment-numbers/
const federalAMTBrackets: Record<number, Record<FilingStatus, Bracket[]>> = {
    2025: {
        [FilingStatus.Single]: [
            {
                rate: 26,
                floor: 0,
                ceiling: 239_100
            },
            {
                rate: 28,
                floor: 239_100,
                ceiling: Infinity
            }
        ],
        [FilingStatus.HeadOfHousehold]: [
            {
                rate: 26,
                floor: 0,
                ceiling: 239_100
            },
            {
                rate: 28,
                floor: 239_100,
                ceiling: Infinity
            }
        ],
        [FilingStatus.MarriedFilingJointly]: [
            {
                rate: 26,
                floor: 0,
                ceiling: 239_100
            },
            {
                rate: 28,
                floor: 239_100,
                ceiling: Infinity
            }
        ],
        [FilingStatus.MarriedFilingSeparately]: [
            {
                rate: 26,
                floor: 0,
                ceiling: 119_550
            },
            {
                rate: 28,
                floor: 119_550,
                ceiling: Infinity
            }
        ]
    }
};


// https://moorecolson.com/news-insights/year-end-tax-planning-2025-inflation-adjustment-numbers/
const federalAMTPhaseoutAndExemptionAmounts: Record<number, Record<FilingStatus, { exemptionAmount: number, phaseoutStart: number }>> = {
    2025: {
        [FilingStatus.Single]: {
            exemptionAmount: 88_100,
            phaseoutStart: 626_350
        },
        [FilingStatus.HeadOfHousehold]: {
            exemptionAmount: 88_100,
            phaseoutStart: 626_350
        },
        [FilingStatus.MarriedFilingJointly]: {
            exemptionAmount: 137_000,
            phaseoutStart: 1_252_700
        },
        [FilingStatus.MarriedFilingSeparately]: {
            exemptionAmount: 68_500, // Half of joint filers
            phaseoutStart: 626_350 // Half of joint filers
        }
    }
};

function calculateIncomeTax(
    year: number,
    taxableIncome: number,
    filingStatus: FilingStatus,
    bracketsData: Record<number, Record<FilingStatus, Bracket[]>>
): number {
    // Get brackets for the specified year and filing status
    const yearBrackets = bracketsData[year];
    if (!yearBrackets) {
        throw new Error(`No tax brackets found for year ${year}`);
    }

    const statusBrackets = yearBrackets[filingStatus];
    if (!statusBrackets) {
        throw new Error(`No tax brackets found for filing status ${FilingStatus[filingStatus]} in year ${year}`);
    }

    let totalTax = 0;

    // Calculate tax for each bracket
    for (const bracket of statusBrackets) {
        if (taxableIncome <= bracket.floor) {
            break; // Income is below this bracket, no more tax to calculate
        }

        // Calculate the amount of income that falls in this bracket
        const bracketIncome = Math.min(taxableIncome - bracket.floor, bracket.ceiling - bracket.floor);

        // Add tax for this bracket
        totalTax += bracketIncome * (bracket.rate / 100);
    }

    return Math.round(totalTax * 100) / 100; // Round to 2 decimal places
}

function calculateFederalIncomeTaxAssumingStandardDeduction(year: number, income: number, filingStatus: FilingStatus, retirement401kContributions: number): number {
    const taxableIncome = income - retirement401kContributions - federalStandardDeductions[year][filingStatus]!;
    const federalIncomeTax = calculateIncomeTax(year, taxableIncome, filingStatus, federalIncomeTaxBrackets);
    return federalIncomeTax;
}

function calculateTentativeAMT(year: number, income: number, filingStatus: FilingStatus, retirement401kContributions: number, bargainElementFromISOExercise: number): number {
    // https://equitysimplified.com/articles/how-to-calculate-alternative-minimum-tax/
    const taxableIncomeWithoutDeductionApplied = income - retirement401kContributions + bargainElementFromISOExercise;

    const exemptionAmount = federalAMTPhaseoutAndExemptionAmounts[year][filingStatus]!.exemptionAmount;
    const phaseoutStart = federalAMTPhaseoutAndExemptionAmounts[year][filingStatus]!.phaseoutStart;
    const realExemptionAmount = taxableIncomeWithoutDeductionApplied <= phaseoutStart ? exemptionAmount : Math.max(0, exemptionAmount - (taxableIncomeWithoutDeductionApplied - phaseoutStart) * 0.25);

    const taxableIncome = taxableIncomeWithoutDeductionApplied - realExemptionAmount;

    const tentativeAMT = calculateIncomeTax(year, taxableIncome, filingStatus, federalAMTBrackets);
    return tentativeAMT;
}

const income = 200_000 * 2;
const retirement401kContributions = 23_500 * 2;
const filingStatus = FilingStatus.MarriedFilingJointly;
const fairMarketValueOr409aValue = 25.5;
const bargainElementFromISOExercise = 1_000 * (fairMarketValueOr409aValue - 1.55);
const year = 2025;

const federalIncomeTax = calculateFederalIncomeTaxAssumingStandardDeduction(year, income, filingStatus, retirement401kContributions);
const tentativeAMT = calculateTentativeAMT(year, income, filingStatus, retirement401kContributions, bargainElementFromISOExercise);

console.log('You must pay the highest of the two:');
console.log({federalIncomeTax});
console.log({tentativeAMT});


