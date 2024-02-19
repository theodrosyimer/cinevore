// import bcrypt from 'bcrypt'

import { hash, compare } from "@node-rs/bcrypt";

const SALT_ROUNDS = 10

// export async function validateUserPassword(
//   password: string | Buffer,
//   hash: string,
// ) {
//   return bcrypt
//     .compare(password, hash)
//     .then((isValidPassword) => isValidPassword)
//     .catch((err) => {
//       if (err instanceof Error) {
//         console.error(err.message)
//       }
//     })
// }

// export async function hashPassword(
//   password: string | Buffer,
//   saltRounds: string | number = SALT_ROUNDS,
// ) {
//   return bcrypt
//     .hash(password, saltRounds)
//     .then((hash) => hash)
//     .catch((err) => {
//       if (err instanceof Error) {
//         console.error(err.message)
//       }
//     })
// }

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
  cost: string | number,
) {
  cost ??= SALT_ROUNDS

  return hash(password, cost)
    .then((hash) => hash)
    .catch((err) => {
      if (err instanceof Error) {
        console.error(err.message)
      }
    })
}
