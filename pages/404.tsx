import { LinkTag } from "../components/LinkTag";
import { Seo } from "../components/Seo";

const NotFound = () => {
  return (
    <>
      <Seo
        title="Page Not Found - Uygar Uğurlu"
        description="Uygar Uğurlu - Full-Stack Web Developer"
      />
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="text-4xl font-bold tracking-tight mb-2 dark:text-white">
          4 o 4
        </h1>
        <LinkTag href="/">&larr; Ah shit, here we go again.</LinkTag>
      </div>
    </>
  );
};

export default NotFound;
