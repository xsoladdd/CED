import {
  Column,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";
import { StoreUser } from "./StoreUser";

@Entity()
export class StoreUserProfile extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id?: string;

  @Column({})
  firstName?: string;

  @Column({
    nullable: true,
  })
  middleName?: string;

  @Column({})
  lastName?: string;

  @Column({})
  mobileNumber?: string;

  @Column({
    nullable: true,
  })
  landlineNumber?: string;

  @Column({ type: "text" })
  address?: string;

  @OneToOne(() => StoreUser, ({ profile }) => profile)
  storeUser?: StoreUser;
}
