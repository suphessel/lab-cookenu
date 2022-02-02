import { Request, Response } from "express";
import connection from "../../connection";
import { userTableName } from "../../types";
import { compareHash } from "../../services/hashManager";
import { generateToken } from "../../services/authenticator";

export default async function login(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.statusCode = 422;
      throw new Error(" 'email' and 'password' required");
    }

    const [user] = await connection(userTableName).where({ email });

    const passwordIsCorrect: boolean = compareHash(password, user.password);

    if (!user || !passwordIsCorrect) {
      res.statusCode = 401;
      throw new Error("Invalid credentials");
    }

    const token = generateToken({ id: user.id });

    res.send({ token });
    
    } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500).send("Internal server error");
    } else {
      res.send(error);
    }
  }
}

//  req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     console.log("ENTREI NO SIGNUP ");
//     const { name, email, password } = req.body;

//     const id: string = generateId();

//     const cypherPassword: string = generateHash(password);

//     const token: string = generateToken({ id });

//     await connection(userTableName).insert({
//       id,
//       name,
//       email,
//       password: cypherPassword,
//     });
//     res.send({ token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal server error ");
//   }
// }
