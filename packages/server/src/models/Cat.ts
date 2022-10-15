import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";

@Entity()
export class Cat extends BasicColumns {
  @PrimaryGeneratedColumn()
  @Generated("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
