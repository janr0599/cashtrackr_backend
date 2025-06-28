import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export const validateExpenseBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await body("name")
        .notEmpty()
        .withMessage("Expense name cannot be empty")
        .run(req);

    await body("amount")
        .notEmpty()
        .withMessage("Expense amount cannot be empty")
        .isNumeric()
        .withMessage("Expense amount must be a number")
        .custom((value) => value > 0)
        .withMessage("Expense amount must be greater than 0")
        .run(req);

    next();
};
