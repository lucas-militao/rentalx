import { parse } from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
