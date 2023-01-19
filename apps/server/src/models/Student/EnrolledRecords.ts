import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { Student } from "./Student";

/*
  ID UUID
  SY varchar(50)
  grade_level_id varchar(50)
  section_id varchar(50)
  student_id UUID [ref: ->student.ID]

*/

@Entity()
export class EnrolledRecords extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    generated: "rowid",
    nullable: true,
  })
  increment_id?: string;

  @Column()
  SY: string;

  @Column()
  grade_level_id: string;

  @Column()
  section_id: string;

  // FP, PP, NP, D
  @Column({ default: "NP" })
  status?: string;

  @ManyToOne(() => Student, (student) => student.enrollment_records)
  student?: Student;
}
