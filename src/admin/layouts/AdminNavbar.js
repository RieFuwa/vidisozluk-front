import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div>
      <nav class="flex   font-bodyFont font-bold flex-wrap items-center justify-between p-4 bg-white">
        <div class="w-auto lg:order-2 lg:w-1/5 lg:text-center">
          <Link to="/adminpage" class="text-4xl font-bold text-gray-800 font-heading" href="#">
            vıdı<span class="text-lime-600  ">Admin</span>
          </Link>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 text-indigo-500 border border-indigo-500 rounded navbar-burger">
            <svg
              class="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <div class="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5">
          <Link
            to="/alluser"
            class="block mt-4 mr-10 cursor-pointer text-blue-900 lg:inline-block lg:mt-0 hover:text-lime-600"
          >
            Tüm Kullanıcılar
          </Link>
          <Link
            to="/reportoperations"
            class="block mt-4 mr-10 cursor-pointer text-blue-900 lg:inline-block lg:mt-0 hover:text-lime-600"
          >
            Şikayetler
          </Link>
          <Link
            to="/adminpage"
            class="block mt-4 mr-10 cursor-pointer text-blue-900 lg:inline-block lg:mt-0 hover:text-lime-600"
          >
            Grafikler
          </Link>
        </div>
        <div class="hidden w-full navbar-menu lg:order-3 lg:block lg:w-2/5 lg:text-right">
        <Link
            to="/"
            class="block mt-4 mr-10 cursor-pointer text-blue-900 lg:inline-block lg:mt-0 hover:text-lime-600"
          >
            vıdı<span class="text-lime-600  ">Sözlük</span>
          </Link>
          <a class="block mt-4 mr-10 cursor-pointer text-blue-900 lg:inline-block lg:mt-0 hover:text-lime-600">
            FAQ
          </a>
          <a class="block mt-4 cursor-pointer text-blue-900 lg:inline-block lg:mt-0 hover:text-lime-600">
            Contact
          </a>
        </div>
      </nav>
      <div class=" border-lime-600 border-2"></div>
    </div>
  );
}
export default AdminNavbar;
