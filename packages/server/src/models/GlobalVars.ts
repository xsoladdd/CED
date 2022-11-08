import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";

@Entity()
export class GlobalVars extends BasicColumns {
  @PrimaryGeneratedColumn()
  @Generated("increment")
  id: string;

  @Column()
  identifier: string;

  @Column()
  value: string;

  @Column()
  title: string;
}
