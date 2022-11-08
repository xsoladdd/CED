import { Field, ObjectType } from "type-graphql";
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";

@ObjectType()
@Entity()
export class Cat extends BasicColumns {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  @Generated("uuid")
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  age: number;
}
