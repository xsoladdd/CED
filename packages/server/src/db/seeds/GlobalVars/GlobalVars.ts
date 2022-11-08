import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { GlobalVars } from "../../../models/GlobalVars";
export default class GlobalVarsSeeders implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(GlobalVars);
    await repository.insert([
      {
        identifier: "year-level",
        title: "Kinder",
        value: "K",
      },
      {
        identifier: "year-level",
        title: "Preparatory",
        value: "P",
      },
      {
        identifier: "year-level",
        title: "Grade 1",
        value: "1",
      },
      {
        identifier: "year-level",
        title: "Grade 2",
        value: "2",
      },
      {
        identifier: "year-level",
        title: "Grade 3",
        value: "3",
      },
      {
        identifier: "year-level",
        title: "Grade 4",
        value: "4",
      },
      {
        identifier: "year-level",
        title: "Grade 5",
        value: "5",
      },
      {
        identifier: "year-level",
        title: "Grade 6",
        value: "6",
      },
      {
        identifier: "year-level",
        title: "Grade 7",
        value: "7",
      },
      {
        identifier: "year-level",
        title: "Grade 8",
        value: "8",
      },
      {
        identifier: "year-level",
        title: "Grade 9",
        value: "9",
      },
      {
        identifier: "year-level",
        title: "Grade 10",
        value: "10",
      },
      {
        identifier: "year-level",
        title: "Grade 11",
        value: "11",
      },
      {
        identifier: "year-level",
        title: "Grade 12",
        value: "12",
      },
    ]);
  }
}
