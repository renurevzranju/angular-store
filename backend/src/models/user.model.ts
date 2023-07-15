import client from "../config/database";

export type User = {
  id?: number;
  user_name: string;
  email: string;
};

export class UserModel {
  /**
   * Create user in the database
   * @param {User} user User object to create.
   * @param {string} user.user_name User name of the user.
   * @param {string} user.email Email of the user.
   * @return {User} User object that was created.
   */
  async create(user: User): Promise<User> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql =
        "INSERT INTO users (user_name, email) VALUES($1, $2) RETURNING *";

      const result = await connection.query(sql, [user.user_name, user.email]);
      const createdUser = result.rows[0];
      connection.release();

      return createdUser;
    } catch (err) {
      throw new Error(
        `Unable to add new user ${user.user_name}. Error: ${err}`
      );
    }
  }

  /**
   * Get user based on email from the users table in the database
   * @param {string} email email of the user to be fetched.
   * @return {User} User object based on the id passed.
   */
  async getUserByEmail(email: string): Promise<User> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = `SELECT * FROM users WHERE email='${email}'`;

      const result = await connection.query(sql);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get user. Error: ${err}`);
    }
  }

  /**
   * Get all the users from database
   * @return {User[]} list of users.
   */
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "SELECT * FROM users";

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get users. Error: ${err}`);
    }
  }

  /**
   * Get user based on id from the users table in the database
   * @param {number} id Id of the user to be fetched.
   * @return {User} User object based on the id passed.
   */
  async show(id: number): Promise<User> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";

      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get user. Error: ${err}`);
    }
  }
}
