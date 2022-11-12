import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";

@Entity()
export class GlobalVars extends BasicColumns {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  identifier: string;

  @Column()
  value: string;

  @Column()
  title: string;
}
