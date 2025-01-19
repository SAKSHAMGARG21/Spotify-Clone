import bcrypt from 'bcrypt';
const pass= await bcrypt.hash("12345678",10);
console.log(pass);