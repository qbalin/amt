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

const federalLongTermCapitalGainsTaxBrackets: Record<number, Record<FilingStatus, Bracket[]>> = {
    2025: {
        [FilingStatus.Single]: [
            {
                rate: 0,
                floor: 0,
                ceiling: 47_025
            },
            {
                rate: 15,
                floor: 47_025,
                ceiling: 518_900
            },
            {
                rate: 20,
                floor: 518_900,
                ceiling: Infinity
            }
        ],
        [FilingStatus.MarriedFilingJointly]: [
            {
                rate: 0,
                floor: 0,
                ceiling: 94_050
            },
            {
                rate: 15,
                floor: 94_050,
                ceiling: 583_750
            },
            {
                rate: 20,
                floor: 583_750,
                ceiling: Infinity
            }
        ],
        [FilingStatus.MarriedFilingSeparately]: [
            {
                rate: 0,
                floor: 0,
                ceiling: 47_025
            },
            {
                rate: 15,
                floor: 47_025,
                ceiling: 291_850
            },
            {
                rate: 20,
                floor: 291_850,
                ceiling: Infinity
            }
        ],
        [FilingStatus.HeadOfHousehold]: [
            {
                rate: 0,
                floor: 0,
                ceiling: 63_000
            },
            {
                rate: 15,
                floor: 63_000,
                ceiling: 551_350
            },
            {
                rate: 20,
                floor: 551_350,
                ceiling: Infinity
            }
        ]
    }
}

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

function calculateFederalIncomeTaxAssumingStandardDeduction(year: number, regularIncomeNotLongTermCapitalGains: number, longTermCapitalGains: number, filingStatus: FilingStatus, retirement401kContributions: number): number {
    // We do not include long term capital gains in the calculation of the regular portion of the income tax
    const taxableIncomeForFederalIncomeTax = regularIncomeNotLongTermCapitalGains - retirement401kContributions - federalStandardDeductions[year][filingStatus]!;
    const federalIncomeTax = calculateIncomeTax(year, taxableIncomeForFederalIncomeTax, filingStatus, federalIncomeTaxBrackets);

    // ... but we do include the regular income to figure out which bracket we fall into for the long term capital gains
    const longTermCapitalGainsTax = calculateIncomeTax(year, longTermCapitalGains + taxableIncomeForFederalIncomeTax, filingStatus, federalLongTermCapitalGainsTaxBrackets) - calculateIncomeTax(year, taxableIncomeForFederalIncomeTax, filingStatus, federalLongTermCapitalGainsTaxBrackets);

    return federalIncomeTax + longTermCapitalGainsTax;
}

function calculateTentativeAMT(year: number, regularIncomeNotLongTermCapitalGains: number, longTermCapitalGains: number, filingStatus: FilingStatus, retirement401kContributions: number, bargainElementFromISOExercise: number): number {
    // https://equitysimplified.com/articles/how-to-calculate-alternative-minimum-tax/
    const taxableIncomeWithoutDeductionApplied =  regularIncomeNotLongTermCapitalGains - retirement401kContributions + bargainElementFromISOExercise;

    const exemptionAmount = federalAMTPhaseoutAndExemptionAmounts[year][filingStatus]!.exemptionAmount;
    const phaseoutStart = federalAMTPhaseoutAndExemptionAmounts[year][filingStatus]!.phaseoutStart;
    // When computing exemption, we need to factor in the longTermCapitalGains as income
    const taxableIncomeForPurposeOfExemptionCalculation = taxableIncomeWithoutDeductionApplied + longTermCapitalGains;
    const realExemptionAmount = taxableIncomeForPurposeOfExemptionCalculation <= phaseoutStart ? exemptionAmount : Math.max(0, exemptionAmount - (taxableIncomeForPurposeOfExemptionCalculation - phaseoutStart) * 0.25);

    // When computing the AMT (rate of 26% to 28%, we don't include long term capital gains which have their own 0%, 15%, 20% brackets)
    const taxableIncomeForAMT = taxableIncomeWithoutDeductionApplied - realExemptionAmount;
    const tentativeAMT = calculateIncomeTax(year, taxableIncomeForAMT, filingStatus, federalAMTBrackets);

    const longTermCapitalGainsTax = calculateIncomeTax(year, longTermCapitalGains + taxableIncomeForAMT, filingStatus, federalLongTermCapitalGainsTaxBrackets) - calculateIncomeTax(year, taxableIncomeForAMT, filingStatus, federalLongTermCapitalGainsTaxBrackets);
    return tentativeAMT + longTermCapitalGainsTax;
}

const regularIncomeNotLongTermCapitalGains = 200_000 * 2;
const longTermCapitalGains = 0;
const retirement401kContributions = 23_500 * 2;
const filingStatus = FilingStatus.MarriedFilingJointly;
const fairMarketValueOr409aValue = 25.5;
const bargainElementFromISOExercise = 1000  * (fairMarketValueOr409aValue - 1.55);
const year = 2025;

const federalIncomeTax = calculateFederalIncomeTaxAssumingStandardDeduction(year, regularIncomeNotLongTermCapitalGains, longTermCapitalGains, filingStatus, retirement401kContributions);
const tentativeAMT = calculateTentativeAMT(year, regularIncomeNotLongTermCapitalGains, longTermCapitalGains, filingStatus, retirement401kContributions, bargainElementFromISOExercise);

console.log('You must pay the highest of the two:');
console.log({federalIncomeTax});
console.log({tentativeAMT});

if (federalIncomeTax > tentativeAMT) {
    console.log('\n The regular federal income applies.');
} else {
    console.log(`\n The AMT applies and makes you pay an extra $${tentativeAMT - federalIncomeTax} when compared to the regular income tax`);
}

