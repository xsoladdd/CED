import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class BasicColumns {
  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_date?: Date;
}
