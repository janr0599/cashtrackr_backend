import {
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    Model,
} from "sequelize-typescript";
import Budget from "./Budget";

@Table({ tableName: "expenses" })
class Expense extends Model<Expense> {
    @Column({
        type: DataType.STRING(100),
    })
    declare name: string;

    @Column({
        type: DataType.FLOAT,
    })
    declare amount: number;

    @ForeignKey(() => Budget)
    declare budgetId: number;

    @BelongsTo(() => Budget)
    declare budget: Budget;
}

export default Expense;
