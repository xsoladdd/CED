import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";
import { Permissions } from "./Permissions";

@Entity()
export class StoreAccounts extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({ default: false })
  create: boolean;

  @Column({ default: false })
  delete: boolean;

  @Column({ default: false })
  update: boolean;

  @Column({ default: false })
  view: boolean;

  @OneToOne(() => Permissions, ({ storeAccounts }) => storeAccounts, {
    nullable: true,
  })
  @JoinColumn()
  permission?: Permissions;
}
