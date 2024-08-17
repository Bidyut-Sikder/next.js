import { hash,compare} from "bcryptjs";







export const hashPassword=async(pass)=>{
  //  const salt = await bcrypt.genSalt(10);
    const hashedPassword = await hash(pass, 12);
    return hashedPassword;
} ;



export const veifyPassword=async(pass,hassedPass)=>{
  //  const salt = await bcrypt.genSalt(10);
    const isValid = await compare(pass, hassedPass);
    return isValid;
} ;




