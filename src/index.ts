import express from 'express';
import knex from 'knex';
import cors from 'cors';
import dotenv from 'dotenv';
import signup from './endpoints/users/signup';
import { AddressInfo } from "net";
import connection from "./connection";
import login from './endpoints/users/login';
import getProfile from './endpoints/users/getProfile';
import getUserById from './endpoints/users/getUserById';
import createRecipe from './endpoints/recipes/createRecipe';
import getRecipeById from './endpoints/recipes/getRecipeById';

dotenv.config()

connection()

const app = express()
app.use(express.json())
app.use(cors())

app.post("/users/signup", signup);
app.post("/users/login", login);
app.get("/users/profile", getProfile);
app.get("/users/:id/profile", getUserById);

app.post("/recipe", createRecipe);
app.get("/recipe/:id", getRecipeById);


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});




// import { generateToken, getTokenData } from "./services/authenticator";
// import { compareHash, generateHash } from "./services/hashManager"
// import generateId from "./services/idGenerator";

/* connection.raw("SHOW TABLES").then(console.log) (pra ver se o 
connection  está rodando)
/*

// console.log(generateId()) (pra verificar se está sendo gerado o Id)

/*const cypherText = generateHash("HELLOOOO")

console.log(
    compareHash("HELLOOOO", cypherText)
    )
>>pra ver se o cypherText foi gerado a partir da string HELLOOO, 
se o resultado for true, deu certo, foi gerado */

/* const token = generateToken({id: "adsfdgafgfhas"})
const tokenData = getTokenData(token)
console.log({
    token,
    tokenData
})
*/
