// import Film from "@/components/Film"

export const metadata = {
  title: "Film's Details Page",
  description: 'Details about a film.',
};

export default function UserFilmPage({
  params,
}: {
  params: {
    title: string;
    id: number;
  };
}) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Film title: {params.title}
      </h1>
      {/* <Film></Film> */}
    </>
  );
}
