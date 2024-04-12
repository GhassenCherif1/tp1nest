import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class TimeStampEntities{
    @CreateDateColumn({
        update: false
    })
    createdat: Date;
    @DeleteDateColumn()
    deletedat: Date;
    @UpdateDateColumn()
    updatedat: Date;
}