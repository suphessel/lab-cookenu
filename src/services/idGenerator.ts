import {v4} from "uuid"

/*
const generateId = () => {
    return v4()
} 
>>mesma coisa que o de baixo, só que o de baixo está reduzido.
*/

const generateId = () => v4()

export default generateId