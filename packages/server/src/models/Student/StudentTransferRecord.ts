import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { Student } from "./Student";

/*
Table student_transfer_record {
  ID UUID
  sy_entered varchar(50)
  sy_exit varchar(50)
}
*/

@Entity()
export class StudentTransferRecord extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sy_entered: string;

  @Column()
  sy_exit: string;

  @ManyToOne(() => Student, (student) => student.transfer_records)
  student: Student;
}
