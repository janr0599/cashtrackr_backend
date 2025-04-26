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
            res.status(200).json({ message: "Budget API is working" });
        } catch (error) {
            res.status(500).json({ error: "An error has ocurred" });
        }
    };

    static getBudgetById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            res.status(200).json({ message: `Got budget with ID ${id}` });
        } catch (error) {
            res.status(500).json({ error: "An error has ocurred" });
        }
    };

    static updateBudget = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            res.status(200).json({ message: `Budget with ID ${id} updated` });
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
