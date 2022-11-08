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

@Entity()
export class StudentRequirements extends BasicColumns {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  has_form_137: boolean;

  @Column({ default: false })
  has_psa: boolean;

  @Column({ default: false })
  has_parent_marriage_contract: boolean;

  @Column({ default: false })
  has_report_card: boolean;

  @Column({ default: false })
  has_report_of_rating: boolean;

  @Column({ default: false })
  has_good_moral: boolean;

  @Column({ default: false })
  has_school_government_recognition: boolean;

  @Column({ default: false })
  has_baptismal: boolean;
}
