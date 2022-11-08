import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";

/*
  ID UUID
  role varchar(50) [note:"SA, BA, RT"]
  status integer [default:1, note:"1=active, 0=deactivated"]
  employee_id varchar(50) [unique]
  password varchar(150) [note:"must be hashed via argon2"]
  partial_password varchar [note:"nullable"]
  employee_profile_id UUID [ref: - employee_profile.ID]
*/

@Entity()
export class Employee extends BasicColumns {
  @PrimaryGeneratedColumn()
  @Generated("uuid")
  id: string;

  @Column()
  role: string;

  @Column({ default: 1 })
  status: number;

  @Column()
  employee_id: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  partial_password?: string;
}
