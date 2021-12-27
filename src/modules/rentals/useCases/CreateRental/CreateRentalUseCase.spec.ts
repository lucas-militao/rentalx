import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;

describe("CreateRental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "121212",
      user_id: "12345",
      expected_return_date: new Date(),
    });

    console.log(rental);

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "121212",
        user_id: "12345",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: "121212",
        user_id: "12345",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "test",
        user_id: "123",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        car_id: "test",
        user_id: "321",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
