import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { Student } from "./Student";

/*
 Table student_parent_guardian {
  ID UUID
  first_name varchar(50)
  middle_name varchar(30)
  last_name varchar(50)
  type varchar [note:"One of F,M,G"]
  contact_number varchar(15)
  email_address varchar(50)

  guardian_relation varchar(50) [default:"null"]
 }
*/

@Entity()
export class StudentParentGuardian extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column()
  middle_name: string;

  @Column()
  last_name: string;

  @Column({})
  contact_number: string;

  @Column({})
  email: string;

  @Column({})
  type: string;

  @ManyToOne(() => Student, (student) => student.parent_guardians)
  student: Student;
}
