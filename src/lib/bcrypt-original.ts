import bcrypt from 'bcrypt'

const DEFAULT_COST = 10

export async function validateUserPassword(
  password: string | Buffer,
  hash: string,
) {
  return bcrypt
    .compare(password, hash)
    .then((isValidPassword) => isValidPassword)
    .catch((err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }
    })
}

export async function hashPassword(
  password: string | Buffer,
  saltRounds: string | number = DEFAULT_COST,
) {
  return bcrypt
    .hash(password, saltRounds)
    .then((hash) => hash)
    .catch((err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }
    })
}


