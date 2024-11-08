import Link from "next/link";
import UnmountStudio from "./unmount";

const Footer = () => {
  return (
    <UnmountStudio>
      <footer className="border-t bottom-0 border-zinc-800 mt-10">
        <div className=" max-w-7xl mx-auto flex lg:flex-row flex-col items-center justify-center gap-y-4 md:px-16 px-6 py-16">
          <div className="flex flex-col lg:items-end items-center lg:text-start text-center">
            <small>
              Designed and Developed <Link href="https://github.com/MartinM25" className="hover:underline">Martin Manjoro</Link>
            </small>
          </div>   
        </div>
      </footer>
    </UnmountStudio>
  )
}

export default Footer