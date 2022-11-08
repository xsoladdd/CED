import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class BasicColumns {
  @CreateDateColumn({ select: false })
  created_at?: Date;

  @UpdateDateColumn({ select: false })
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_date?: Date;
}
