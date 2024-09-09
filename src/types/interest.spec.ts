import { CalculateInterestRateValidationRequest, CalculateInterestRateValidationRequestSchema, InterestPaid } from "./interest";

describe("CalculateInterestRateValidationRequestSchema", () => {
  it("should validate a proper request", () => {
    const req: CalculateInterestRateValidationRequest = {
      depositAmount: 1_000_000,
      interestRate: 1,
      investmentTerm: 12,
      interestPaid: InterestPaid.ANNUALLY
    };

    const { value, error } = CalculateInterestRateValidationRequestSchema.validate(req);
  
    expect(value).toBeDefined();
    expect(error).toBeUndefined();
  });

  it("should invalidate a negative deposit amount", () => {
    const req: CalculateInterestRateValidationRequest = {
      depositAmount: -1_000_000,
      interestRate: 1,
      investmentTerm: 12,
      interestPaid: InterestPaid.ANNUALLY
    };

    const { error } = CalculateInterestRateValidationRequestSchema.validate(req);
  
    expect(error?.details[0].context?.label).toBe("depositAmount");
    expect(error?.details[0].message).toBe("\"depositAmount\" must be a positive number");
  });

  it("should invalidate a string deposit amount", () => {
    const req: CalculateInterestRateValidationRequest = {
      depositAmount: String(1_000_000),
      interestRate: 1,
      investmentTerm: 12,
      interestPaid: InterestPaid.ANNUALLY
    } as unknown as CalculateInterestRateValidationRequest;

    const { error } = CalculateInterestRateValidationRequestSchema.validate(req);
  
    expect(error?.details[0].context?.label).toBe("depositAmount");
    expect(error?.details[0].message).toBe("\"depositAmount\" must be a number");
  });

  it("should invalidate a negative interestRate", () => {
    const req: CalculateInterestRateValidationRequest = {
      depositAmount: 1_000_000,
      interestRate: -1,
      investmentTerm: 12,
      interestPaid: InterestPaid.ANNUALLY
    } as unknown as CalculateInterestRateValidationRequest;

    const { error } = CalculateInterestRateValidationRequestSchema.validate(req);
  
    expect(error?.details[0].context?.label).toBe("interestRate");
    expect(error?.details[0].message).toBe("\"interestRate\" must be a positive number");
  });

  it("should invalidate a random interestPaid value that's not part of the enum", () => {
    const req: CalculateInterestRateValidationRequest = {
      depositAmount: 1_000_000,
      interestRate: 1,
      investmentTerm: 12,
      interestPaid: "DECADE"
    } as unknown as CalculateInterestRateValidationRequest;

    const { error } = CalculateInterestRateValidationRequestSchema.validate(req);
  
    expect(error?.details[0].context?.label).toBe("interestPaid");
    expect(error?.details[0].message).toBe("\"interestPaid\" must be one of [MONTHLY, QUARTERLY, ANNUALLY, MATURITY]");
  });
})