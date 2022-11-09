import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicColumns } from "../../utils/BasicColumns";

/*
 Table student_requirements {
  ID UUID [pk]
  has_form_137 boolean [default:false]
  has_psa boolean [default:false]
  has_parent_marriage_contract boolean [default:false]
  has_report_card boolean [default:false]
  has_report_of_rating boolean [default:false]
  has_good_moral boolean [default:false]
  has_school_government_recognition boolean [default:false]
  has_baptismal boolean [default:false]
}
*/
@ObjectType()
@Entity()
export class StudentRequirements extends BasicColumns {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  has_form_137: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  has_psa: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  has_parent_marriage_contract: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  has_report_card: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  has_report_of_rating: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  has_good_moral: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  has_school_government_recognition: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  has_baptismal: boolean;
}
