import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { EnrolledRecords } from "./EnrolledRecords";
import { StudentAddress } from "./StudentAddress";
import { StudentParentGuardian } from "./StudentParentGuardian";
import { StudentRequirements } from "./StudentRequirements";
import { StudentSchoolRecord } from "./StudentSchoolRecord";
import { StudentTransferRecord } from "./StudentTransferRecord";

/*
  ID  UUID
  LRN varchar(14)
  first_name varchar(50)
  middle_name varchar(30)
  last_name varchar(50)
  gender varchar(20)
  birthday varchar(30)
  contact_number varchar(15)
  email_address varchar(50)

  student_parent_guardian_id UUID [ref: < student_parent_guardian.ID]
  student_address_id UUID [ref: - student_address.ID]
  student_transfer_record_id UUID [ref: < student_transfer_record.ID]
  student_school_record_id UUID [ref: < student_school_record.ID]
  student_requirements_id UUID [ref: - student_requirements.ID]

*/

@Entity()
export class Student extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  LRN: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  middle_name?: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  birthday?: string;

  @Column({ nullable: true })
  contact_number?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(
    () => EnrolledRecords,
    (enrollment_records) => enrollment_records.student
  )
  enrollment_records?: EnrolledRecords[];

  @OneToOne(() => StudentAddress)
  @JoinColumn()
  address?: StudentAddress;

  @OneToMany(
    () => StudentParentGuardian,
    (parent_guardians) => parent_guardians.student
  )
  parent_guardians?: StudentParentGuardian[];

  @OneToOne(() => StudentRequirements)
  @JoinColumn()
  requirements?: StudentRequirements;

  @OneToOne(() => StudentSchoolRecord)
  @JoinColumn()
  school_records?: StudentSchoolRecord;

  @OneToMany(
    () => StudentTransferRecord,
    (transfer_records) => transfer_records.student
  )
  transfer_records?: StudentTransferRecord[];
}
