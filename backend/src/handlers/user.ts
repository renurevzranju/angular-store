import { Response, Request } from "express";
import { UserModel } from "../models/user.model";

const model = new UserModel();

export default class UserHandler {
  async create(_request: Request, response: Response) {
    try {
      const { user_name, email } = _request.body;
      if (user_name && email) {
        const users = await model.create({
          user_name,
          email,
        });

        response
          .status(200)
          .json({ message: "User created successfully", data: users });
      } else {
        response.status(400).json({
          errorMessage: "user_name and email are required",
        });
      }
    } catch (error) {
      response.status(500).json(`error while creating user: ${error}`);
    }
  }

  async index(_request: Request, response: Response) {
    try {
      const users = await model.index();
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json(`error while fetching user list: ${error}`);
    }
  }

  async show(_request: Request, response: Response) {
    try {
      const id = _request.params.id;
      const users = await model.show(Number(id));
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json(`error while fetch user: ${error}`);
    }
  }

  async getUserByEmail(_request: Request, response: Response) {
    try {
      const email = _request.params.email;
      const users = await model.getUserByEmail(email);
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json(`error while fetch user: ${error}`);
    }
  }
}
