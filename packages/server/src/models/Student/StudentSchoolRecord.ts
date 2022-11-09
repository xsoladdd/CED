import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";

/*
  Table student_school_record {
  ID UUID
  sy_graduated varchar(50)
  school_name varchar(150)
  type varchar(30) [note:"pre-elem, elem, hs"]
}
*/
@ObjectType()
@Entity()
export class StudentSchoolRecord extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  sy_graduated: string;

  @Field()
  @Column()
  school_name?: string;

  @Field()
  @Column()
  type: string;
}
