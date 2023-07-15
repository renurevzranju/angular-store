import { Response, Request } from "express";
import { ProductModel } from "../models/product.model";

const model = new ProductModel();

export default class ProductHandler {
  async create(_request: Request, response: Response) {
    try {
      const { name, price, category, description, imagecode } = _request.body;
      if (name && price && category && description && imagecode) {
        const product = await model.create({
          name,
          price: Number(price),
          category,
          description,
          imagecode,
        });
        response
          .status(200)
          .json(product);
      } else {
        response
          .status(400)
          .json({ error: "name and price are required to create a product" });
      }
    } catch (error) {
      response.status(500).json(`error while creating product: ${error}`);
    }
  }

  async index(_request: Request, response: Response) {
    try {
      const products = await model.index();
      response.status(200).json(products);
    } catch (error) {
      response
        .status(500)
        .json(`error while fetching the product list: ${error}`);
    }
  }

  async getPopularProducts(_request: Request, response: Response) {
    try {
      const products = await model.getPopularProducts();
      response.status(200).json(products);
    } catch (error) {
      response
        .status(500)
        .json(`error while fetching the popular product names: ${error}`);
    }
  }

  async getProductsByCategory(_request: Request, response: Response) {
    const { category } = _request.params;

    try {
      const products = await model.getProductsByCategory(category);
      //If product is empty check
      if (products.length < 1)
        return response.status(401).json({
          error:
            "Provide a valid category or there are no products in this category",
        });

      response.status(200).json(products);
    } catch (error) {
      response
        .status(500)
        .json(
          `error while fetching the product by category [${category}]: ${error}`
        );
    }
  }

  async show(_request: Request, response: Response) {
    try {
      const id = _request.params.id;
      const products = await model.show(Number(id));
      response.status(200).json(products);
    } catch (error) {
      response.status(500).json(`error while fetching the product: ${error}`);
    }
  }
}
