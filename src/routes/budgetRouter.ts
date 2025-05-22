import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

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
    param("id")
        .isInt()
        .withMessage("Invalid budget ID")
        .custom((value) => value > 0)
        .withMessage("Invalid budget ID"),
    handleInputErrors,
    BudgetController.getBudgetById
);

router.put(
    "/:id",
    param("id")
        .isInt()
        .withMessage("Invalid budget ID")
        .custom((value) => value > 0)
        .withMessage("Invalid budget ID"),
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
    param("id")
        .isInt()
        .withMessage("Invalid budget ID")
        .custom((value) => value > 0)
        .withMessage("Invalid budget ID"),
    handleInputErrors,
    BudgetController.deleteBudget
);

export default router;
