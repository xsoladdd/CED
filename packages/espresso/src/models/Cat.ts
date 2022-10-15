import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { BasicColumns } from "../utils/BasicColumns";
import { EncryptedID } from "../graphql/scalars/EncryptedID";

@Entity()
@ObjectType()
export class Cat extends BasicColumns {
  @Field(() => EncryptedID)
  @PrimaryGeneratedColumn("rowid")
  @Generated("rowid")
  id: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => Number)
  @Column()
  age: number;
}
