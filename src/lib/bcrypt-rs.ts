import { hash, compare } from "@node-rs/bcrypt"

const DEFAULT_COST = 10
export async function validateUserPassword(
  password: string | Buffer,
  hash: string,
) {
  return compare(password, hash)
    .then((isValidPassword) => isValidPassword)
    .catch((err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }
    })
}

export async function hashPassword(
  password: string | Buffer,
  cost: number | null | undefined = DEFAULT_COST,
) {
  return hash(password, cost)
    .then((hash) => hash)
    .catch((err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }
    })
}
