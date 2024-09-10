/**
 * All tests are based off https://www.bendigobank.com.au/calculators/deposit-and-savings/
 */

import { CalculateInterestRateValidationRequest, InterestPaid } from "../types/interest";
import { calculateTermDeposit } from "./interest";

const DEFAULT_DEPOSIT_AMOUNT = 1_500_000;
const DEFAULT_INTEREST_RATE = 1;
const DEFAULT_INVESTMENT_TERM = 12;

describe("calculateFinalInterestRate", () => {
  describe("MONTHLY", () => {
    const DEFAULT_INTEREST_PAID = InterestPaid.MONTHLY;

    it("should return the correct value for 3 month", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 3
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_503_753);
    });

    it("should return the correct value for 1 year", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 12
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_515_069);
    });

    it("should return the correct value for > 1 year", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 15
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_518_860);
    });

    it("should return the correct value for an interest rate of < 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 0.5,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_507_517);
    });

    it("should return the correct value for an interest rate of 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 1,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_515_069);
    });

    it("should return the correct value for an interest rate of > 1% ", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 1.5,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_522_655);
    });
  });

  describe("QUARTERLY", () => {
    const DEFAULT_INTEREST_PAID = InterestPaid.QUARTERLY;
    
    it("should return the correct value for 3 months", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 3
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_503_750);
    });

    it("should return the correct value for 1 year", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 12
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_515_056);
    });

    it("should return the correct value for > 1 year", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 15
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_518_844);
    });

    it("should return the correct value for an interest rate of < 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 0.5,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_507_514);
    });

    it("should return the correct value for an interest rate of 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 1,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_515_056);
    });

    it("should return the correct value for an interest rate of > 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 1.5,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_522_627);
    });
  });

  describe("ANNUALLY", () => {
    const DEFAULT_INTEREST_PAID = InterestPaid.ANNUALLY;

    it("should return the correct value for 3 months", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 3
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(-1);
    });

    it("should return the correct value for 1 year", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 12
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_515_000);
    });

    it("should return the correct value for > 1 year", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 15
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_518_773);
    });

    it("should return the correct value for an interest rate of < 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 0.5,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_507_500);
    });

    it("should return the correct value for an interest rate of 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 1,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_515_000);
    });

    it("should return the correct value for an interest rate of > 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 1.5,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_522_500);
    });
  })

  describe("MATURITY", () => {
    const DEFAULT_INTEREST_PAID = InterestPaid.MATURITY;

    it("should return the correct value for 3 months", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 3
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_503_750);
    });

    it("should return the correct value for 1 year", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 12
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_515_000);
    });

    it("should return the correct value for > 1 year", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: DEFAULT_INTEREST_RATE,
        investmentTerm: 15
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_518_750);
    });

    it("should return the correct value for an interest rate of < 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 0.5,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_507_500);
    });

    it("should return the correct value for an interest rate of 1%", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 1,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_515_000);
    });

    it("should return the correct value for an interest rate of > 1% ", () => {
      const req: CalculateInterestRateValidationRequest = {
        depositAmount: DEFAULT_DEPOSIT_AMOUNT,
        interestPaid: DEFAULT_INTEREST_PAID,
        interestRate: 1.5,
        investmentTerm: DEFAULT_INVESTMENT_TERM
      }

      const res = calculateTermDeposit(req);

      expect(Math.round(res)).toBe(1_522_500);
    });
  });
})