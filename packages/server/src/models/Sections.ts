import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";

@ObjectType()
@Entity()
export class Sections extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Field()
  @Column()
  name: string;
}
