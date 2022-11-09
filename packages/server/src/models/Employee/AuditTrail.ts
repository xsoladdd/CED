import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { Employee } from "./Employee";

/*
  ID UUID
  timestamp varchar(100)
  description varchar(255)
  action_type_id varchar(50)

  employee_id UUID [ref: - employee.ID]
*/
@ObjectType()
@Entity()
export class AuditTrail extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  timestamp: string;

  @Field()
  @Column("text")
  description: string;

  @Field()
  @Column()
  action_type_id: string;

  @Field(() => Employee)
  @ManyToOne(() => Employee, (employee) => employee.audit)
  employee: Employee;
}
