export const ContactSection = () => {
  return (
    <div className="relative rounded-md border border-gray-300 p-4 md:p-8 xl:p-12">
      <span className="absolute left-2 top-2 text-5xl font-light text-black/25 md:text-6xl">
        ?
      </span>

      <div className="space-y-2 px-4">
        <p className="text-xl font-semibold md:text-2xl">Have questions?</p>
        <p className="font-light text-gray-500 md:text-lg">Ask our team!</p>
      </div>

      <div className="mt-4 space-y-2">
        <button className="w-full rounded-full border px-3.5 py-2.5">
          button
        </button>
        <button className="w-full rounded-full border px-3.5 py-2.5">
          button
        </button>
      </div>
    </div>
  );
};
