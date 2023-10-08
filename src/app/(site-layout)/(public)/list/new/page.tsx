import FilmCardList from '@/components/film-card-list';
import { Icons } from '@/components/icons';
import { NewListForm } from '@/components/list-create';
import { buttonVariants } from '@/components/ui/button';
import { UserRegisterForm } from '@/components/user-register-form';
import { getCurrentUser } from '@/lib/session';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const metadata = {
  title: 'Create List Page',
  description: 'Create a new list of films.',
};

export default async function NewListPage() {
  const { user } = await getCurrentUser();

  return (
    <div className="grid w-full space-y-6 p-20">
      <div className="grid place-items-start space-y-2">
        {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
        <h1 className="text-2xl font-semibold tracking-tight">New List</h1>
        <p className="text-sm text-muted-foreground">Add a new list</p>
      </div>
      <NewListForm />
    </div>
  );
}
