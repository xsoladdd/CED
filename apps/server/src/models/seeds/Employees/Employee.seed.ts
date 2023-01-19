import { hash } from "argon2";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Employee } from "../../Employee/Employee";

export default class EmployeeSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Employee);

    const password = await hash("password");
    await repository.insert({
      employee_id: "backdoor001",
      role: "BA",
      password,
    });
  }
}
