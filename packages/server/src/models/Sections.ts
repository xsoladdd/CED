import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";

@Entity()
export class Sections extends BasicColumns {
  @PrimaryGeneratedColumn()
  @Generated("increment")
  id: string;

  @Column()
  name: string;
}
