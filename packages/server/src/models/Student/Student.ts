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

@ObjectType()
@Entity()
export class Student extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  LRN: string;

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
  @Column()
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthday?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contact_number?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field(() => [EnrolledRecords], { nullable: true })
  @OneToMany(
    () => EnrolledRecords,
    (enrollment_records) => enrollment_records.student
  )
  enrollment_records?: EnrolledRecords[];

  @Field(() => StudentAddress, { nullable: true })
  @OneToOne(() => StudentAddress, { nullable: true })
  @JoinColumn()
  address?: StudentAddress;

  @Field(() => [StudentParentGuardian], { nullable: true })
  @OneToMany(
    () => StudentParentGuardian,
    (parent_guardians) => parent_guardians.student
  )
  parent_guardians?: StudentParentGuardian[];

  @Field(() => StudentRequirements, { nullable: true })
  @OneToOne(() => StudentRequirements, { nullable: true })
  @JoinColumn()
  requirements?: StudentRequirements;

  @Field(() => StudentSchoolRecord, { nullable: true })
  @OneToOne(() => StudentSchoolRecord, { nullable: true })
  @JoinColumn()
  school_records?: StudentSchoolRecord;

  @Field(() => [StudentTransferRecord], { nullable: true })
  @OneToMany(
    () => StudentTransferRecord,
    (transfer_records) => transfer_records.student
  )
  transfer_records?: StudentTransferRecord[];
}
