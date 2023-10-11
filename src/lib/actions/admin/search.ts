import { user } from '@/db/planetscale';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

const preparedSearchByName = db
  .select()
  .from(user)
  .where(sql`${user.name} like ${sql.placeholder('name')}`)
  .prepare();

export async function searchByName(name: string) {
  const [user] = await preparedSearchByName.execute({
    name: `%${name.toLowerCase()}%`,
  });
  return user;
}
