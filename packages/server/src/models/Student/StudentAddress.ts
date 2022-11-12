import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";

/*
 Table student_address{
  ID UUID
  no varchar(50)
  street varchar(50)
  subdivision varchar(50)
  barangay varchar(100)
  city varchar(50)
  province varchar(50)
  region varchar(50)
  zip varchar(10)
}
*/
@Entity()
export class StudentAddress extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  no?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  subdiv?: string;

  @Column()
  barangay: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  region: string;

  @Column()
  zip: string;
}
