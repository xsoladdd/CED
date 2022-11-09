import { Field, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class StudentTransferRecord extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  sy_entered: string;

  @Field()
  @Column()
  sy_exit: string;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.transfer_records)
  student: Student;
}
