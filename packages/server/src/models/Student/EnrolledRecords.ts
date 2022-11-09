import { Field, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class EnrolledRecords extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  SY: string;

  @Field()
  @Column()
  grade_level_id: string;

  @Field()
  @Column()
  section_id: string;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.enrollment_records)
  student: Student;
}
