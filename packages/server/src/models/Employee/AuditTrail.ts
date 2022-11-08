import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";

/*
  ID UUID
  timestamp varchar(100)
  description varchar(255)
  action_type_id varchar(50)

  employee_id UUID [ref: - employee.ID]
*/

@Entity()
export class AuditTrail extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  timestamp: string;

  @Column("text")
  description: string;

  @Column()
  action_type_id: string;
}
