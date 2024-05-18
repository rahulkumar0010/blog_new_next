import { getRequest } from "@/services/requestHandler";
import moment from "moment";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const blog = await getRequest(`/blog/get/${params.slug}`);
  const { image, title, description } = blog.data;
  return {
    title: title,
    description,
    openGraph: {
      images: [process.env.NEXT_PUBLIC_IMAGE_BASE_URL + image || ""],
    },
  };
}

export default async function Page({ params }) {
  const blog = await getRequest(`/blog/get/${params.slug}`);
  const { image, title, description, createdAt } = blog.data;

  return (
    <>
      <div className="pt-2 mt-20 lg:mt-2">
        <Link href={"/"} className="font-bold text-lg">
          {`< Go Back`}
        </Link>
      </div>
      <div className="flex gap-2 pt-10 w-full">
        <div className="w-full rounded overflow-hidden shadow-lg bg-slate-950">
          <img
            className="w-full h-96 object-cover"
            src={image ? process.env.NEXT_PUBLIC_IMAGE_BASE_URL + image : ""}
            alt=""
          />
          <div className="px-6 py-4">
            <div className="flex flex-wrap gap-2 justify-between">
              <div className="font-bold text-lg mb-2">{title}</div>
              <p className="text-gray-500 text-base">
                {moment(createdAt).format("DD-MM-YYYY HH:mm")}
              </p>
            </div>
            <p className="text-gray-500 text-base">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
