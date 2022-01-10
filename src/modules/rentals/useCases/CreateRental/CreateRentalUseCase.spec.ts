import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("CreateRental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayJsDateProvider,
      carsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "12345",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = await rentalsRepository.create({
      car_id: "1111",
      user_id: "12345",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "12345",
        user_id: car.user_id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There is a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await rentalsRepository.create({
      car_id: "1111",
      user_id: "12345",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.car_id,
        user_id: "321",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "test",
        user_id: "123",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
