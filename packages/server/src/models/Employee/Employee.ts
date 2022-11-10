import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { AuditTrail } from "./AuditTrail";
import { EmployeeProfile } from "./EmployeeProfile";

/*
  ID UUID
  role varchar(50) [note:"SA, BA, RT"]
  status integer [default:1, note:"1=active, 0=deactivated"]
  employee_id varchar(50) [unique]
  password varchar(150) [note:"must be hashed via argon2"]
  partial_password varchar [note:"nullable"]
  employee_profile_id UUID [ref: - employee_profile.ID]
*/

@ObjectType()
@Entity()
export class Employee extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  role: string;

  @Field({ nullable: true })
  @Column({ default: 1 })
  status?: number;

  @Field()
  @Column()
  employee_id: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  partial_password?: string;

  @Field(() => EmployeeProfile, { nullable: true })
  @OneToOne(() => EmployeeProfile, { nullable: true })
  @JoinColumn()
  profile?: EmployeeProfile;

  @Field(() => [AuditTrail], { nullable: true })
  @OneToMany(() => AuditTrail, (auditTrail) => auditTrail.employee)
  audit?: AuditTrail[];
}
