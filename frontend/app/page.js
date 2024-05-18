import Cards from "@/components/Cards";
import { getRequest } from "@/services/requestHandler";
import Link from "next/link";
import Head from "next/head";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Blogs",
};

export default async function Home({ searchParams }) {
  const allPosts = await getRequest(`/blog/get-all?page=${searchParams.page}`);

  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <main className="flex min-h-screen flex-col">
        <div className="flex flex-wrap w-screen gap-2 pt-10">
          {allPosts && allPosts.data?.blog?.length > 0 ? (
            allPosts.data?.blog?.map((item) => (
              <Link
                href={`/blog/${item.slug}`}
                key={item._id}
                className="lg:max-w-sm lg:w-1/2"
              >
                <Cards
                  image={item.image}
                  desc={item.short_desc}
                  title={item.title}
                />
              </Link>
            ))
          ) : (
            <p>No blog found</p>
          )}
          {console.log("total page :", Math.ceil(allPosts.data?.pagination?.totalCount/allPosts.data?.pagination?.limit))}
        </div>
          {allPosts && allPosts.data?.blog ? (
            <Pagination
              page={searchParams.page}
              totalCount={allPosts.data?.pagination?.totalCount}
              limit={allPosts.data?.pagination?.limit}
            />
          ) : null}
      </main>
    </>
  );
}
