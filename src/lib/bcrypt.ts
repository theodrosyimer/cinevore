import bcrypt from 'bcryptjs'

const DEFAULT_SALT = 10
export async function validateUserPassword(password: string, hash: string) {
  return bcrypt
    .compare(password, hash)
    .then((isValidPassword) => isValidPassword)
    .catch((err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }
    })
}

export async function hashPassword(password: string, saltRounds: string | number = DEFAULT_SALT,
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
