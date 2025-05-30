import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import {
    validateBudgetBody,
    validateBudgetExists,
    validateBudgetId,
} from "../middleware/budget";
import { handleInputErrors } from "../middleware/validation";
import { ExpenseController } from "../controllers/ExpenseController";

const router = Router();

router.param("budgetId", validateBudgetId);
router.param("budgetId", handleInputErrors);
router.param("budgetId", validateBudgetExists);

router.post(
    "/",
    validateBudgetBody,
    handleInputErrors,
    BudgetController.createBudget
);

router.get("/", BudgetController.getBudgets);

router.get("/:budgetId", BudgetController.getBudgetById);

router.put(
    "/:budgetId",
    validateBudgetBody,
    handleInputErrors,
    BudgetController.updateBudget
);

router.delete("/:budgetId", BudgetController.deleteBudget);

/** Routes for Expenses */

router.post("/:budgetId/expenses", ExpenseController.createExpense);
router.get("/:budgetId/expenses", ExpenseController.getExpenses);
router.get("/:budgetId/expenses/:expenseId", ExpenseController.getExpenseById);
router.put("/:budgetId/expenses/:expenseId", ExpenseController.updateExpense);
router.delete(
    "/:budgetId/expenses/:expenseId",
    ExpenseController.deleteExpense
);

export default router;
