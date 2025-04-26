import {
    Table,
    Column,
    DataType,
    HasMany,
    BelongsTo,
    ForeignKey,
    Model,
} from "sequelize-typescript";

@Table({ tableName: "budgets" })
export class Budget extends Model<Budget> {
    @Column({
        type: DataType.STRING(100),
    })
    declare name: string;

    @Column({
        type: DataType.FLOAT,
    })
    declare amount: number;
}

export default Budget;
