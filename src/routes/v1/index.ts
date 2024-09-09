import { Router } from "express";
import { router as termDepositRouter } from "./term-deposit";

export const router = Router();

router.use('/term-deposit', termDepositRouter);
