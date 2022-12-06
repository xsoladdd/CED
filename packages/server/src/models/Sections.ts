import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";

@Entity()
export class Sections extends BasicColumns {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @Column()
  year_level: string;

  @Column({ default: true })
  status: boolean;
}
