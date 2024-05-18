export default function Cards({ image, title, desc }) {
  return (
    <div className=" rounded overflow-hidden shadow-lg bg-slate-950">
      <img
        className="w-full h-44 object-cover"
        src={image ? process.env.NEXT_PUBLIC_IMAGE_BASE_URL + image : ""}
        alt=""
      />
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{title}</div>
        <p className="text-gray-500 text-base">{desc}</p>
      </div>
    </div>
  );
}
