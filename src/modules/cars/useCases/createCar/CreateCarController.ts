import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      license_plate,
      brand,
      fine_amount,
      daily_rate,
      category_id,
    } = request.body;

    console.log(`NAME: ${description}, ${license_plate}, ${brand}`);

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
