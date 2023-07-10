import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export async function validateUser(password: string | Buffer, hash: string) {
  return bcrypt
    .compare(password, hash)
    .then(res => res)
    .catch(err => console.error(err.message))
}

export async function hashPassword(password: string | Buffer, saltRounds: string | number = SALT_ROUNDS) {
  return bcrypt
    .hash(password, saltRounds)
    .then(hash => hash)
    .catch(err => console.error(err.message))
}
