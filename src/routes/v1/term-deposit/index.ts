import { Router } from "express";
import { CalculateInterestRateValidationRequestSchema } from "../../../types/interest";
import { calculateTermDeposit } from "../../../utlities/interest";

export const router = Router();

router.post("/calculate", async (req, res, next) => {
  const { value, error } = CalculateInterestRateValidationRequestSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }

  try {
    const result = calculateTermDeposit(value);
  
    if (result === -1) {
      return res.status(400).json({ error: "Annual Interest Paid was chosen, but the investment term is less than a month"})
    }
  
    return res.status(200).json({ finalBalance: result });
  } catch (err) {
    return res.status(500).send("An Internal Server Error Has Occurred!");
  }
});