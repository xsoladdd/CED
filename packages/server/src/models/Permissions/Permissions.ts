import { Entity, Generated, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { StoreUser } from "../StoreUser";
import { StoreAccounts } from "./StoreAccounts";

@Entity()
export class Permissions extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id?: string;

  @OneToOne(() => StoreUser, ({ permission }) => permission)
  user: StoreUser;

  @OneToOne(() => StoreAccounts, ({ permission }) => permission, {
    nullable: true,
  })
  storeAccounts?: StoreAccounts;
}
