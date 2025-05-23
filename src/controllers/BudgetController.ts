import { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {
    static createBudget = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body);

            await budget.save();
            res.status(201).json({ message: "Budget created sucessfully" });
        } catch (error) {
            res.status(500).json({ error: "An error has ocurred" });
        }
    };

    static getBudgets = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [["createdAt", "DESC"]],
                // TODO: Filter by authenticated user
                // where: { userId: req.user.id },
            });
            res.status(200).json({ budgets });
        } catch (error) {
            res.status(500).json({ error: "An error has ocurred" });
        }
    };

    static getBudgetById = async (req: Request, res: Response) => {
        res.status(200).json(req.budget);
    };

    static updateBudget = async (req: Request, res: Response) => {
        await req.budget.update(req.body);

        res.status(200).json({ message: "Budget updated successfully" });
    };

    static deleteBudget = async (req: Request, res: Response) => {
        await req.budget.destroy();

        res.status(200).json({ message: "Budget deleted successfully" });
    };
}
