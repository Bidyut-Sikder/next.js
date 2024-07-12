
import crypto from 'node:crypto'


export const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex')

    const hash = crypto.scryptSync(password, salt, 64)

    return hash.toString('hex') + ":" + salt;
}



export const verifyPassword = (storedPass, suppliedPass) => {

    


    const [hassPass, salt] = storedPass.split(":")
    const hassPassBuffer = Buffer.from(hassPass, 'hex')
    const suppliedPassBuffer = crypto.scryptSync(suppliedPass, salt, 64)
   // console.log(storedPass);

    return crypto.timingSafeEqual(hassPassBuffer, suppliedPassBuffer);
}





