import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExists, validateBudgetId } from "../middleware/budget";

const router = Router();

router.post(
    "/",
    body("name").notEmpty().withMessage("Budget name cannot be empty"),
    body("amount")
        .notEmpty()
        .withMessage("Budget amount cannot be empty")
        .isNumeric()
        .withMessage("Budget amount must be a number")
        .custom((value) => value > 0)
        .withMessage("Budget amount must be greater than 0"),
    handleInputErrors,
    BudgetController.createBudget
);

router.get("/", BudgetController.getBudgets);

router.get(
    "/:id",
    validateBudgetId,
    validateBudgetExists,
    BudgetController.getBudgetById
);

router.put(
    "/:id",
    validateBudgetId,
    validateBudgetExists,
    body("name").notEmpty().withMessage("Budget name cannot be empty"),
    body("amount")
        .notEmpty()
        .withMessage("Budget amount cannot be empty")
        .isNumeric()
        .withMessage("Budget amount must be a number")
        .custom((value) => value > 0)
        .withMessage("Budget amount must be greater than 0"),
    handleInputErrors,
    BudgetController.updateBudget
);

router.delete(
    "/:id",
    validateBudgetId,
    validateBudgetExists,
    BudgetController.deleteBudget
);

export default router;
