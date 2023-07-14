import client from "../config/database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  imagecode: string;
};

export class ProductModel {
  /**
   * Create product in the database
   * @param {Product} product Product object to create.
   * @param {string} product.name name of the product.
   * @param {number} product.price price of the product.
   * @param {string} product.category category of the product.
   * @param {string} product.description description of the product.
   * @param {string} product.imagecode image code of the product.
   * @return {Product} Product object that was created.
   */
  async create(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql =
        "INSERT INTO products (name, price, category, description, imagecode) VALUES($1, $2, $3, $4, $5) RETURNING *";

      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
        product.description,
        product.imagecode
      ]);
      const createdProduct = result.rows[0];
      connection.release();

      return createdProduct;
    } catch (err) {
      throw new Error(
        `Unable to add new product ${product.name}. Error: ${err}`
      );
    }
  }

  /**
   * Get product based on category from the products table in the database
   * @param {string} category category of the product to be fetched.
   * @return {Product[]} List of Product object based on the category passed.
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = `SELECT * FROM products WHERE LOWER(category) like LOWER('%${category}%')`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products. Error: ${err}`);
    }
  }

  /**
   * Get all the products from database
   * @return {Product[]} list of products.
   */
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "SELECT * FROM products";

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products. Error: ${err}`);
    }
  }

  /**
   * Get Top 5 popular products
   * @return {Product[]} Products names.
   */
  async getPopularProducts(): Promise<Product[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql =
        "SELECT name, SUM(quantity) AS TotalQuantity FROM order_products, products WHERE order_products.product_id = products.id GROUP BY name ORDER BY SUM(quantity) DESC LIMIT 5";

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get product. Error: ${err}`);
    }
  }

  /**
   * Get product based on id from the products table in the database
   * @param {number} id Id of the products to be fetched.
   * @return {Product} Products object based on the id passed.
   */
  async show(id: number): Promise<Product> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";

      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get product. Error: ${err}`);
    }
  }
}
