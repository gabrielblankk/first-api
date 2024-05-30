import { compare, genSalt, hash } from 'bcryptjs'


export const hashPassword = async (password: string) => {
  const salt = await genSalt(10)

  return await hash(password, salt)
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword)
}

export const passwordCrypto = {
  hashPassword,
  verifyPassword
}
