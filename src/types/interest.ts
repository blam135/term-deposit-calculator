import Joi from "joi"

export enum InterestPaid {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUALLY = "ANNUALLY",
  MATURITY = "MATURITY",
}

export const CalculateInterestRateValidationRequestSchema = Joi.object<CalculateInterestRateValidationRequest>({
  depositAmount: Joi.number().positive().integer().options({ convert: false }).required(),
  interestRate: Joi.number().positive().required(),
  investmentTerm: Joi.number().positive().required(),
  interestPaid: Joi.string().valid(...Object.values(InterestPaid)).required(),
});

export type CalculateInterestRateValidationRequest = {
  /**
   * Represented in Cents
   */
  depositAmount: number;
    /**
   * Represented as the full amount in percentage i.e. 1.1 = 1.1% 
   */
  interestRate: number;
  /**
   * Represented in months
   */
  investmentTerm: number;
  /**
   * Represented as these values: 
   * MONTHLY
   * QUARTERLY
   * ANNUALLY
   * MATURITY
   */
  interestPaid: InterestPaid;
}