import { Response, Request } from "express";
import { OrderModel } from "../models/order.model";

const model = new OrderModel();

export default class OrderHandler {
  async addProduct(_request: Request, response: Response) {
    try {
      const { order_id, product_id, quantity } = _request.body;
      if (order_id && product_id && quantity) {
        const addProductToOrder = await model.addProduct({
          order_id,
          product_id,
          quantity,
        });
        response.status(200).json(addProductToOrder);
      } else {
        response.status(400).json({
          message:
            "order_id, product_id and quantity are required to add a product to an order",
        });
      }
    } catch (error) {
      response
        .status(500)
        .json(`error while adding product to the order: ${error}`);
    }
  }

  async create(_request: Request, response: Response) {
    try {
      const { user_id } = _request.params;
      const { status, products } = _request.body;
      if (status && products.length > 0 && user_id) {
        const orderPlaced = await model.create({
          user_id: Number(user_id),
          status,
          products,
        });
        response.status(200).json(orderPlaced);
      } else {
        response.status(400).json({
          error: "status and products are required to create an order",
        });
      }
    } catch (error) {
      response.status(500).json(`error while creating order: ${error}`);
    }
  }

  async deleteProduct(_request: Request, response: Response) {
    try {
      const { orderProductID } = _request.params;
      const rowCount = await model.deleteProduct(Number(orderProductID));
      response.status(200).json(rowCount);
    } catch (error) {
      response
        .status(500)
        .json(`error while deleting the product from the order: ${error}`);
    }
  }

  async getOrderByStatus(_request: Request, response: Response) {
    const { status, id } = _request.params;
    try {
      const orders = await model.getOrdersByStatus(status, Number(id));
      response.status(200).json(orders);
    } catch (error) {
      response
        .status(500)
        .json(`error while fetching the order by status [${status}]: ${error}`);
    }
  }

  async getCartItems(_request: Request, response: Response) {
    const { id } = _request.params;
    try {
      const orders = await model.getCartItems(Number(id));
      response.status(200).json(orders);
    } catch (error) {
      response
        .status(500)
        .json(
          `error while fetching the products by order_id [${id}]: ${error}`
        );
    }
  }

  async getExistingProduct(_request: Request, response: Response) {
    const { orderID, productID } = _request.params;
    try {
      const orders = await model.getExistingProduct(
        Number(orderID),
        Number(productID)
      );
      //If product is empty check
      if (orders.length < 1) return response.status(200).json([]);

      response.status(200).json(orders[0]);
    } catch (error) {
      response
        .status(500)
        .json(
          `error while fetching the order by order_id [${orderID}]: ${error}`
        );
    }
  }

  async updateProductQuantity(_request: Request, response: Response) {
    try {
      const { id, quantity } = _request.body;
      if (id && quantity) {
        const updatedOrder = await model.updateQuantity(
          Number(id),
          Number(quantity)
        );
        response.status(200).json(updatedOrder);
      } else {
        response.status(400).json({
          error:
            "quantity and id are required to update an quantity of product in order",
        });
      }
    } catch (error) {
      response.status(500).json(`error while updating order: ${error}`);
    }
  }

  async updateOrderStatus(_request: Request, response: Response) {
    try {
      const { status, id, user_id } = _request.body;
      if (status && id && user_id) {
        const updatedOrder = await model.updateStatus({
          id: id as unknown as number,
          status,
          products: [],
          user_id: user_id as unknown as number,
        });
        response.status(200).json(updatedOrder);
      } else {
        response.status(400).json({
          error: "status, user_id and id are required to update an order",
        });
      }
    } catch (error) {
      response.status(500).json(`error while updating order status: ${error}`);
    }
  }
}
