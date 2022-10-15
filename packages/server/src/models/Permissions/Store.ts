import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";

@Entity()
export class Store extends BasicColumns {
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
}
