import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { GlobalVars } from "../../../models/GlobalVars";
import { globalVarsType } from "../../../utils/globalVarsType";
export default class GlobalVarsSeeders implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(GlobalVars);
    // Insert year level
    await repository.insert([
      {
        identifier: globalVarsType.year_level,
        title: "Kinder",
        value: "K",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Preparatory",
        value: "P",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 1",
        value: "1",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 2",
        value: "2",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 3",
        value: "3",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 4",
        value: "4",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 5",
        value: "5",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 6",
        value: "6",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 7",
        value: "7",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 8",
        value: "8",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 9",
        value: "9",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 10",
        value: "10",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 11",
        value: "11",
      },
      {
        identifier: globalVarsType.year_level,
        title: "Grade 12",
        value: "12",
      },
    ]);
    // Insert school year
    await repository.insert([
      {
        identifier: globalVarsType.school_year,
        title: "2022-2023",
        value: "2022-2023",
      },
    ]);
  }
}
