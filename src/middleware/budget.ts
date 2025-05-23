import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
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
    await param("id")
        .isInt()
        .withMessage("Invalid budget ID")
        .custom((value) => value > 0)
        .withMessage("Invalid budget ID")
        .run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

export const validateBudgetExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    try {
        const budget = await Budget.findByPk(id);
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
