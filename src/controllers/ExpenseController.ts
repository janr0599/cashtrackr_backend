import { Request, Response } from "express";
import Expense from "../models/Expense";

export class ExpenseController {
    static createExpense = async (req: Request, res: Response) => {
        try {
            const expense = new Expense(req.body);
            // Ensure the expense is associated with the budget
            expense.budgetId = req.budget.id;

            await expense.save();
            res.status(201).json({ message: "expense created sucessfully" });
        } catch (error) {
            res.status(500).json({ error: "An error has ocurred" });
        }
    };

    static getExpenseById = async (req: Request, res: Response) => {};

    static updateExpense = async (req: Request, res: Response) => {};

    static deleteExpense = async (req: Request, res: Response) => {};
}
