import { EntityRepository } from "@mikro-orm/postgresql";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

export class UsersRepository extends EntityRepository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    await this.em.persistAndFlush(user);
  }
}
