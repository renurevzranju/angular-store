import client from "../config/database";

export type Order = {
  id?: number;
  user_id: number;
  products: OrderProduct[];
  status: string;
};

export type OrderProduct = {
  product_id: number;
  order_id?: number;
  quantity: number;
  name?: string;
};

export class OrderModel {
  /**
   * Add Products to the order in the database
   * @param {OrderProduct} product Products object to create.
   * @param {number} product.order_id order id.
   * @param {number} product.product_id product id.
   * @param {number} product.quantity quantity of the product.
   * @return {OrderProduct} returns added product in the order.
   */
  async addProduct(product: OrderProduct): Promise<OrderProduct> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES(${Number(
        product.order_id
      )}, ${Number(product.product_id)}, ${Number(
        product.quantity
      )}) RETURNING *`;
      const result = await connection.query(sql);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to add new order. ${err}`);
    }
  }

  /**
   * Create order in the database
   * @param {Order} order Order object to create.
   * @param {number} order.user_id User id of the user who places the order.
   * @param {string} order.status status of the order.
   * @param {OrderProduct} order.products Products that the user orders.
   * @return {Order} returns Order object.
   */
  async create(order: Order): Promise<Order> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";

      const result = await connection.query(sql, [
        "active",
        Number(order.user_id),
      ]);
      const createdOrder = result.rows[0];

      order.products.forEach(async (p) => {
        const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES(${
          createdOrder.id
        }, ${Number(p.product_id)}, ${Number(p.quantity)})`;
        await connection.query(sql);
      });

      connection.release();

      return createdOrder;
    } catch (err) {
      throw new Error(`Unable to add new order. ${err}`);
    }
  }

  /**
   * Delete product in order in the database
   * @param {number} orderProductID Id of the product in the order_product table.
   * @return {number} No of rows deleted.
   */
  async deleteProduct(orderProductID: number): Promise<number> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "DELETE FROM order_products WHERE id = ($1)";

      await connection.query(sql, [orderProductID]);

      const deleteOrderQuery = "DELETE FROM orders WHERE id = ($1)";
      const order = await connection.query(deleteOrderQuery, [orderProductID]);
      const count = order.rowCount;
      connection.release();

      return count;
    } catch (err) {
      throw new Error(
        `Unable to delete product from order ${orderProductID}. ${err}`
      );
    }
  }

  /**
   * Delete order in the database - For testing purpose
   */
  async deleteAll(): Promise<void> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "DELETE FROM order_products";

      await connection.query(sql);

      const deleteOrderQuery = "DELETE FROM orders";
      await connection.query(deleteOrderQuery);

      connection.release();
    } catch (err) {
      throw new Error(`Unable to deleteAll order. ${err}`);
    }
  }

  /**
   * Get order based on status from the orders table in the database
   * @param {string} status status of the order to be fetched.
   * @param {number} user_id order to be fetched based on userId.
   * @return {Order[]} List of order object based on the status passed.
   */
  async getOrdersByStatus(status: string, user_id: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = `SELECT o.id, p.name as product_name, op.quantity FROM orders o INNER JOIN order_products op ON o.id = op.order_id
                INNER JOIN products p ON p.id = op.product_id  WHERE LOWER(status) = LOWER('${status}') AND user_id = ${user_id}`;

      const result = await connection.query(sql);
      connection.release();

      if (status === "active") {
        return result.rows[0];
      }

      return result.rows;
    } catch (err) {
      throw new Error(
        `Unable to get orders based on status[${status}]. Error: ${err}`
      );
    }
  }

  /**
   * Get order based on order_id and product_id from the order_products table in the database
   * @param {number} order_id status of the order to be fetched.
   * @param {number} product_id order to be fetched based on userId.
   * @return {Order[]} List of order object based on the status passed.
   */
  async getExistingProduct(
    order_id: number,
    product_id: number
  ): Promise<Order[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = `SELECT * FROM order_products WHERE order_id = ${order_id} AND product_id = ${product_id}`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Unable to get orders based on order_id[${order_id}] and product_id[${product_id}]. Error: ${err}`
      );
    }
  }

  /**
   * Get products based on order_id and product_id from the order_products table in the database
   * @param {number} order_id status of the order to be fetched.
   * @return {OrderProduct[]} List of order object based on the status passed.
   */
  async getCartItems(order_id: number): Promise<OrderProduct[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = `SELECT op.id, p.name, op.order_id, op.product_id, op.quantity, p.price, p.imagecode FROM order_products op INNER JOIN products p ON op.product_id = p.id WHERE op.order_id = ${order_id}`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Unable to get products based on order_id[${order_id}] . Error: ${err}`
      );
    }
  }

  /**
   * update order_product quantity in the database
   * @param {number} id id of the order_product.
   * @param {number} quantity quantity of the order_product.
   * @return {OrderProduct} returns Order object.
   */
  async updateQuantity(id: number, quantity: number): Promise<Order> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql =
        "UPDATE order_products SET quantity = ($1) WHERE id=($2) RETURNING *";

      const result = await connection.query(sql, [quantity, id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to update the order. Error: ${err}`);
    }
  }

  /**
   * update order status in the database
   * @param {Order} order Order to update
   * @param {number} order.id id of the order.
   * @param {string} order.user_id user id of the order.
   * @param {string} order.status status of the order.
   * @return {Order} returns Order object.
   */
  async updateStatus(order: Order): Promise<Order> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "UPDATE orders SET status = ($1) WHERE id=($2) RETURNING *";

      const result = await connection.query(sql, [order.status, order.id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to update the order status. Error: ${err}`);
    }
  }
}
