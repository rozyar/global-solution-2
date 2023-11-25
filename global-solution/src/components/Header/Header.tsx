import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="fixed top-0 left-0 flex w-full h-20 bg-dark-gray md:h-24 lg:h-28">
        {/* logo */}
        <div className="flex items-center justify-between w-full ml-8 md:ml-20 lg:ml-36">
          <div className="flex flex-col justify-center items-center -mt-3 ">
            <Image
              className="mt-2 md:mt-0 md:w-16 lg:w-[5.6rem]"
              src={"/logo.svg"}
              width={50}
              height={0}
              alt="logo"
            ></Image>
            <h1 className="select-none text-white text-base -mt-3  md:-mt-4 lg:-mt-5 font-vina font-light md:text-xl lg:text-3xl">
              CoreCraft
            </h1>
          </div>
          {/* botões */}
          <div className="flex flex-row justify-center items-center h-full">
            <Link href={"/Categorias"}>
              <button className="relative mr-5 inline-flex items-center justify-center p-0.5 md:p-1 lg:p-1  overflow-hidden text-sm md:text-lg lg:text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="relative px-2 py-2.5 md:px-3 md:py-2.5 lg:px-4 lg:py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Categorias
                </span>
              </button>
            </Link>
            <Link href={"/Workout"}>
              <button className="relative inline-flex items-center justify-center p-0.5 md:p-1 lg:p-1 mr-2 overflow-hidden text-sm md:text-lg lg:text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 md:mr-20 lg:mr-36">
                <span className="relative px-2 py-2.5 md:px-3 md:py-2.5 lg:px-4 lg:py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Workout
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
