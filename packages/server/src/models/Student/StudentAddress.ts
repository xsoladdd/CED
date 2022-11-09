import { Field, ObjectType } from "type-graphql";
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
@ObjectType()
@Entity()
export class StudentAddress extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  no?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subdiv?: string;

  @Field()
  @Column()
  barangay: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  province: string;

  @Field()
  @Column()
  region: string;

  @Field()
  @Column()
  zip: string;
}
