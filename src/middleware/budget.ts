import { Request, Response, NextFunction } from "express";
import { param, body } from "express-validator";
import Budget from "../models/Budget";

declare global {
    namespace Express {
        interface Request {
            budget?: Budget;
        }
    }
}

export const validateBudgetId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await param("budgetId")
        .isInt()
        .withMessage("Invalid budget ID")
        .custom((value) => value > 0)
        .withMessage("Invalid budget ID")
        .run(req);

    next();
};

export const validateBudgetExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { budgetId } = req.params;

    try {
        const budget = await Budget.findByPk(budgetId);
        if (!budget) {
            res.status(404).json({ error: "Budget not found" });
            return;
        }

        req.budget = budget;
        next();
    } catch (error) {
        res.status(500).json({ error: "An error has ocurred" });
    }
};
export const validateBudgetBody = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await body("name")
        .notEmpty()
        .withMessage("Budget name cannot be empty")
        .run(req);

    await body("amount")
        .notEmpty()
        .withMessage("Budget amount cannot be empty")
        .isNumeric()
        .withMessage("Budget amount must be a number")
        .custom((value) => value > 0)
        .withMessage("Budget amount must be greater than 0")
        .run(req);

    next();
};
