import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepository.create({
      driver_license: "142513",
      email: "tawippul@nu.aq",
      name: "Zachary Austin",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("tawippul@nu.aq");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send email i user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("nam@wuvoc.mz")
    ).rejects.toEqual(new AppError("User does not exist!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepository, "create");

    await usersRepository.create({
      driver_license: "014232",
      email: "sorurhe@pok.bg",
      name: "Mae Chandler",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("sorurhe@pok.bg");

    expect(generateTokenMail).toBeCalled();
  });
});
