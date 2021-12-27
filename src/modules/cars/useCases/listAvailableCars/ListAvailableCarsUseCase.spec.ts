import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("ListCars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      description: "Car description",
      license_plate: "ABC-1234",
      brand: "Car Brand",
      fine_amount: 400,
      daily_rate: 110.0,
      category_id: "10d45fe2-945e-456a-8dbe-7c98941fb4ba",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      description: "Car description",
      license_plate: "ABC-1234",
      brand: "Car_Brand_Test",
      fine_amount: 400,
      daily_rate: 110.0,
      category_id: "10d45fe2-945e-456a-8dbe-7c98941fb4ba",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_Brand_Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car Test",
      description: "Car description",
      license_plate: "ABC-1234",
      brand: "Car_Brand_Test",
      fine_amount: 400,
      daily_rate: 110.0,
      category_id: "10d45fe2-945e-456a-8dbe-7c98941fb4ba",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car Test",
      description: "Car description",
      license_plate: "ABC-1234",
      brand: "Car_Brand_Test",
      fine_amount: 400,
      daily_rate: 110.0,
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
