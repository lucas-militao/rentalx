import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    avatar_url,
    driver_license,
    email,
    name,
    id,
    avatar,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      avatar_url,
      driver_license,
      email,
      name,
      id,
      avatar,
    });

    return user;
  }
}

export { UserMap };
