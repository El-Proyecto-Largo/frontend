// TODO

export default function PostHeader({ title, author, date }: { title: string, author: string, date: Date }) {
  return (
    <div className="flex flex-no-wrap z-10 bg-background sticky top-0 w-full h-16 p-5 gap-3 items-center shadow-sm mx-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
    </div>
  );
}