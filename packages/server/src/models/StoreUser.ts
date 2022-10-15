import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicColumns } from "../utils/BasicColumns";
import { Permissions } from "./Permissions/Permissions";
import { StoreData } from "./StoreData";
import { StoreUserProfile } from "./StoreUserProfile";

@Entity()
export class StoreUser extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id?: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ select: true })
  password: string;

  @Column({
    default: true,
  })
  is_active?: boolean;

  @Column({
    default: true,
  })
  is_first_time_loggedin?: boolean;

  @OneToOne(() => StoreUserProfile, ({ storeUser }) => storeUser, {
    nullable: true,
  })
  @JoinColumn({ name: "profile_id" })
  profile?: StoreUserProfile;

  @OneToOne(() => Permissions, ({ user }) => user)
  @JoinColumn()
  permission?: Permissions;

  @ManyToOne(() => StoreData, ({ users }) => users)
  store?: StoreData;
}
