import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";
import { StoreUser } from "./StoreUser";

@Entity()
export class StoreData extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToMany(() => StoreUser, ({ store }) => store)
  users: StoreUser[];
}
