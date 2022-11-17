import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { Student } from "./Student";

/*
  Table student_school_record {
  ID UUID
  sy_graduated varchar(50)
  school_name varchar(150)
  type varchar(30) [note:"pre-elem, elem, hs"]
}
*/
@Entity()
export class StudentSchoolRecord extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sy_graduated: string;

  @Column()
  school_name: string;

  @Column()
  type: string;

  @ManyToOne(() => Student, (student) => student.school_records)
  student: Student;
}
