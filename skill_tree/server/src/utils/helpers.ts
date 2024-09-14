import bcrypt from "bcrypt";

const saltRounds = 10;


export const hashPassword= (password:string)=>{ 
  const salt  = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password,salt);
 }
 
export const comparePassword = (password:string,hash:string)=>
  bcrypt.compareSync(password,hash);

export const isPositiveInteger = (value: string): boolean => {
  const parsedValue = Number(value);
  return /^\d+$/.test(value) && parsedValue > 0 && Number.isInteger(parsedValue);
};
