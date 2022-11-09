import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";

@ObjectType()
@Entity()
export class GlobalVars extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Field()
  @Column()
  identifier: string;

  @Field()
  @Column()
  value: string;
  @Field()
  @Column()
  title: string;
}
