import { Field, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class StudentParentGuardian extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  first_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  middle_name?: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({})
  contact_number: string;

  @Field()
  @Column({})
  email: string;

  @Field()
  @Column({})
  type: string;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.parent_guardians)
  student: Student;
}
