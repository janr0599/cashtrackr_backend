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
        const { id } = req.params;

        try {
            const budget = await Budget.findByPk(id);
            if (!budget) {
                res.status(404).json({ error: "Budget not found" });
                return;
            }
            res.status(200).json({ budget });
        } catch (error) {
            res.status(500).json({ error: "An error has ocurred" });
        }
    };

    static updateBudget = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const budget = await Budget.findByPk(id);
            if (!budget) {
                res.status(404).json({ error: "Budget not found" });
                return;
            }

            await budget.update(req.body);

            res.status(200).json({ message: "Budget updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "An error has ocurred" });
        }
    };

    static deleteBudget = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            res.status(200).json({ message: `Budget with ID ${id} deleted` });
        } catch (error) {
            res.status(500).json({ error: "An error has ocurred" });
        }
    };
}
