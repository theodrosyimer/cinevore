import { hashPassword } from "@/lib/bcrypt"
import { NewMovie, NewMovieList, NewMovieReview, NewUser } from "@/types/db"

const adminPassword = await hashPassword('!#tHeodros1') as string
const superAdminPassword = await hashPassword('!#tHeodros1') as string
const yetuP = await hashPassword('yetuyetu') as string
const mathiasP = await hashPassword('mathiasmathias') as string
const edenP = await hashPassword('edeneden') as string
const antoineP = await hashPassword('antoineantoine') as string

export const defaultUsers = [{
  lastname: 'Yimer',
  firstname: 'Theodros',
  name: 'theo',
  email: 'theo@example.com',
  emailVerified: null,
  password: adminPassword,
  role: 'admin',
}, {
  lastname: 'Yimer',
  firstname: 'Theodros',
  name: 'theosuper',
  email: 'theosuper@example.com',
  emailVerified: null,
  password: superAdminPassword,
  role: 'superadmin',
},
{
  lastname: 'Yimer',
  firstname: 'Yetenayet',
  name: 'yetu',
  email: 'yetu@example.com',
  emailVerified: null,
  password: yetuP,
  role: 'user',
},
{
  lastname: 'Zélé',
  firstname: 'Antoine',
  name: 'antoine',
  email: 'antoine@example.com',
  emailVerified: null,
  password: antoineP,
  role: 'user',
},
{
  lastname: 'Geremew',
  firstname: 'Eden',
  name: 'eden',
  email: 'eden@example.com',
  emailVerified: null,
  password: edenP,
  role: 'user',
},
{
  lastname: 'Geremew',
  firstname: 'Mathias',
  name: 'mathias',
  email: 'mathias@example.com',
  emailVerified: null,
  password: mathiasP,
  role: 'user',
}
] satisfies NewUser[]

// export const defaultMovieList = [
//   {},
//   {},
//   {},
//   {},
//   {},
//   {}
// ] satisfies NewMovieList[]

// export const defaultMovie = [
//   {},
//   {},
//   {},
//   {},
//   {},
//   {}
// ] satisfies NewMovie[]

// export const defaultMovieReview = [
//   {},
//   {},
//   {},
//   {},
//   {},
//   {}
// ] satisfies NewMovieReview[]
