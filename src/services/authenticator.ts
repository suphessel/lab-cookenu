import {sign, verify} from "jsonwebtoken"
import { config } from "dotenv"
import { authenticationData } from "../types"


config()

const { JWT_KEY } = process.env

export const generateToken = (
    payload: authenticationData

): string => sign(
    payload,
    JWT_KEY!, //(com exclamação pra dizer pro código que não está undefined, que está no dotenv)
    { expiresIn: "1h" }  
)

//agora a função que permita validar o token:

export const getTokenData = (
    token: string
): authenticationData | null => {

    try{
        const { id } = verify(token, JWT_KEY!) as authenticationData
        return { id }

    } catch (error) {
        return null
    }

}