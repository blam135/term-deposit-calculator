import { CalculateInterestRateValidationRequest, InterestPaid } from "../types/interest";

const compoundedRateYearly = (interestPaid: InterestPaid): number => {
  switch (interestPaid) {
    case(InterestPaid.MONTHLY):
      return 12;
    case(InterestPaid.QUARTERLY):
      return 4;
    case(InterestPaid.ANNUALLY):
      return 1;
    default:
      throw new Error("Invalid Input");
  }
}

const convertInterestRateToDecimal = (interestRateRaw: number) => interestRateRaw / 100;

const calculateFinalInterestRateForMaturity = ({ depositAmount, interestRate, investmentTerm }: CalculateInterestRateValidationRequest) => depositAmount * (1 + convertInterestRateToDecimal(interestRate) * (investmentTerm / 12));

export const calculateFinalInterestRate = (req: CalculateInterestRateValidationRequest) => {
  // https://cleartax.in/s/compound-interest-calculator
  // A = P (1 + R/N) ^ nt

  if (req.interestPaid === InterestPaid.MATURITY) {
    return calculateFinalInterestRateForMaturity(req);
  }

  if (req.interestPaid === InterestPaid.ANNUALLY && req.investmentTerm < 12) {
    return -1;
  }

  const { depositAmount, interestRate, investmentTerm, interestPaid } = req;
  
  const compoundedRate = compoundedRateYearly(interestPaid);
  const convertedInterestRate = convertInterestRateToDecimal(interestRate);

  const years = investmentTerm / 12;
  
  const base = (1 + (convertedInterestRate / compoundedRate))
  const exponent = compoundedRate * years;

  return depositAmount * Math.pow(base, exponent);
}