function Footer() {
  return (
    <div class="sticky top-[100vh]">
      <footer class="bg-gray-800 w-full mt-20 dark:bg-gray-800 pt-4 pb-8 rounded-lg  xl:pt-8">
        <div class="max-w-screen-lg  mx-auto text-gray-400 xl:max-w-screen-xl sm:px-6 md:px-8 dark:text-gray-300">
          <ul class="flex flex-wrap justify-center  text-lg font-light">
            <li class="w-1/2 md:w-1/3 lg:w-1/3">
              <div class="text-center">
                <h2 class="text-lime-500 dark:text-gray-200 text-base  mb-4">
                  vıdısözlük
                </h2>
                <ul>
                  <li class="mb-4 transition-colors duration-200 hover:text-lime-600 dark:hover:text-white">
                    <a href="#">Elements</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/3">
              <div class="text-center">
                <h2 class="text-lime-500 dark:text-gray-200 text-base  mb-4">
                  Hakkında
                </h2>
                <ul>
                  <li class="mb-4 transition-colors duration-200 hover:text-lime-600 dark:hover:text-white">
                    <a href="#">Github</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="w-1/2 md:w-1/3 lg:w-1/3">
              <div class="text-center">
                <h2 class="text-lime-500 dark:text-gray-200 text-base mb-4">
                  İletişim
                </h2>
                <ul>
                  <li class="mb-4 transition-colors duration-200 hover:text-lime-600 dark:hover:text-white">
                    <a href="#">Settings</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class=" flex border-t border-lime-500 max-w-xs mx-auto items-center justify-between"></div>

          <div class="text-center pt-4 sm:pt-4 flex font-bold items-center justify-center">
            <p>
              vıdı<span class="text-lime-500">sözlük </span> Created by Bedirhan
            </p>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
