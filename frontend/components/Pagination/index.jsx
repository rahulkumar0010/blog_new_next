"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Pagination = ({ page, totalCount, limit }) => {
  const route = useRouter();

  let totalPage = Math.ceil(totalCount / limit);
  const pages = Array(totalPage)
    .fill(null)
    .map((_, i) => i + 1);

  function Next() {
    route.push(`/?page=${Number(page) + 1}`);
  }
  function back() {
    page > 1 && route.push(`/?page=${Number(page) - 1}`);
  }
  return (
    <div className="flex bg-slate-950 rounded-lg font-[Poppins] mt-5 w-fit">
      <button
        onClick={back}
        className={`h-12 border-2 border-r-0 border-indigo-600
               px-4 rounded-l-lg ${
                 Number(page) > 1 ? "hover:bg-indigo-600 hover:text-white" : ""
               }`}
        disabled={Number(page) === 1}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
      {pages.map((pg, i) => (
        <Link href={`/?page=${pg}`} key={i}>
          <button
            className={`h-12 border-2 border-r-0 border-indigo-600
          w-12 ${Number(page) == pg ? "bg-indigo-600 text-white" : ""}`}
          >
            {pg}
          </button>
        </Link>
      ))}
      <button
        onClick={Next}
        className={`h-12 border-2  border-indigo-600
               px-4 rounded-r-lg ${
                 pages.length > Number(page)
                   ? "hover:bg-indigo-600 hover:text-white"
                   : ""
               }`}
        disabled={pages.length === Number(page)}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
