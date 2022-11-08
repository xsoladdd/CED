import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";

/*
  Table employee_profile{
  ID UUID
  first_name varchar(50)
  middle_name varchar(30)
  last_name varchar(50)
}
*/

@ObjectType()
@Entity()
export class EmployeeProfile extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Field()
  @Column()
  first_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  middle_name?: string;

  @Field()
  @Column()
  last_name: string;
}
