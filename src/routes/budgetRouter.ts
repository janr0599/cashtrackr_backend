import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import {
    validateBudgetBody,
    validateBudgetExists,
    validateBudgetId,
} from "../middleware/budget";
import { handleInputErrors } from "../middleware/validation";

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

export default router;
