import { Link } from "react-router-dom";



function Error() {
  return (
<div class="bg-white dark:bg-gray-800 mt-40 font-bodyFont">
    <div class="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-5xl">
            <span class="block font-bold  ">
                vıdı<span class="text-lime-600">Error</span> {":("}
            </span>
            <span class="block text-black mt-10 text-3xl">
                cok uzgunum hatalı baglantı
            </span>
        </h2>
        <div class="lg:mt-0 lg:flex-shrink-0">
            <div class="mt-12 inline-flex rounded-md shadow">
                <Link to="/gundem">
                <button type="button" class="py-2 px-4  bg-lime-600 hover:bg-lime-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                   Menuye uc
                </button></Link>
            </div>
        </div>
    </div>
</div>  );
}

export default Error;