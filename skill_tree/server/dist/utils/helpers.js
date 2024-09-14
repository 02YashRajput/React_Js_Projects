import bcrypt from "bcrypt";
const saltRounds = 10;
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
export const isPositiveInteger = (value) => {
    const parsedValue = Number(value);
    return /^\d+$/.test(value) && parsedValue > 0 && Number.isInteger(parsedValue);
};
