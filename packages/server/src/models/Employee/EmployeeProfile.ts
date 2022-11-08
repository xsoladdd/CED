import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";

/*
  Table employee_profile{
  ID UUID
  first_name varchar(50)
  middle_name varchar(30)
  last_name varchar(50)
}
*/

@Entity()
export class Employee extends BasicColumns {
  @PrimaryGeneratedColumn()
  @Generated("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  middle_name?: string;

  @Column()
  last_name: string;
}
