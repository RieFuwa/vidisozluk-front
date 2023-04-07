import { Button } from "bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  var navigate = useNavigate();
  var roleList = JSON.stringify(localStorage.getItem("role"));

  const onLogoutClicked = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("signedUserId");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
      <div class="flex  items-center justify-between">
        <div class="md:flex md:items-center md:gap-12 ">
          <Link to="/">
            <button class="block text-gray-900  font-bold text-2xl">
              vıdı
              <span class="text-lime-600 ">sözlük</span>
            </button>
          </Link>
        </div>

        <div class="hidden md:block">
          <nav aria-label="Site Nav ">
            <ul class="flex items-center  gap-10 text-sm m-4 ">
              <li>
                <Link to="/gundem">
                  <button
                    class="relative  focus:ring-lime-600 focus:ring-offset-lime-600 font-medium hover:text-lime-600 text-black before:absolute before:-bottom-1 before:h-1 before:w-full before:scale-x-0 before:bg-lime-600 before:transition hover:before:scale-x-100"
                    href="/"
                  >
                    #gündem
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/spor">
                  <button
                    class="relative  focus:ring-lime-600 focus:ring-offset-lime-600 font-medium hover:text-lime-600 text-black before:absolute before:-bottom-1 before:h-1 before:w-full before:scale-x-0 before:bg-lime-600 before:transition hover:before:scale-x-100"
                    href="/"
                  >
                    #spor
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/siyaset">
                  <button
                    class="relative  focus:ring-lime-600 focus:ring-offset-lime-600 font-medium hover:text-lime-600 text-black before:absolute before:-bottom-1 before:h-1 before:w-full before:scale-x-0 before:bg-lime-600 before:transition hover:before:scale-x-100"
                    href="/"
                  >
                    #siyaset
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/tarih">
                  <button
                    class="relative  focus:ring-lime-600 focus:ring-offset-lime-600 font-medium hover:text-lime-600 text-black before:absolute before:-bottom-1 before:h-1 before:w-full before:scale-x-0 before:bg-lime-600 before:transition hover:before:scale-x-100"
                    href="/"
                  >
                    #tarih
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/ekonomi">
                  <button
                    class="relative  focus:ring-lime-600 focus:ring-offset-lime-600 font-medium hover:text-lime-600 text-black before:absolute before:-bottom-1 before:h-1 before:w-full before:scale-x-0 before:bg-lime-600 before:transition hover:before:scale-x-100"
                    href="/"
                  >
                    #ekonomi
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/muzik">
                  <button
                    class="relative  focus:ring-lime-600 focus:ring-offset-lime-600 font-medium hover:text-lime-600 text-black before:absolute before:-bottom-1 before:h-1 before:w-full before:scale-x-0 before:bg-lime-600 before:transition hover:before:scale-x-100"
                    href="/"
                  >
                    #müzik
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/teknoloji">
                  <button
                    class="relative  focus:ring-lime-600 focus:ring-offset-lime-600 font-medium hover:text-lime-600 text-black before:absolute before:-bottom-1 before:h-1 before:w-full before:scale-x-0 before:bg-lime-600 before:transition hover:before:scale-x-100"
                    href="/"
                  >
                    #teknoloji
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex items-center gap-2">
          <div class="sm:flex sm:gap-2">
            {roleList.includes("ROLE_ADMIN") == true ? (
              <Link to="/adminpage">
               
                <button
                  class="px-4 py-2 bg-lime-600 sm:mt-1 npm install react-icons --save
        hover:bg-lime-700  duration-200 transition text-white rounded-lg  text-sm font-medium   text-center"
                  href="/"
                >
                  Admin Paneli
                </button>
              </Link>
            ) : null}
            {localStorage.getItem("signedUserId") == null ? (
              <Link to="/login">
                <button
                  class="px-4 py-2 bg-lime-600 sm:mt-1 npm install react-icons --save
              hover:bg-lime-700  duration-200 transition text-white rounded-lg  text-sm font-medium   text-center"
                  href="/"
                >
                  Giriş
                </button>
              </Link>
            ) : (
              <div>
                <Link
                  to={{
                    pathname: "/user/" + localStorage.getItem("signedUserId"),
                  }}
                >
                  <button
                    class="px-4 py-2 bg-lime-600 sm:mt-1 npm install react-icons --save
              hover:bg-lime-700  duration-200 transition text-white rounded-lg  text-sm font-medium   text-center"
                  >
                    Profile
                  </button>
                </Link>
                <button
                  onClick={onLogoutClicked}
                  class="px-4 py-2 ml-2 bg-lime-600 sm:mt-1 npm install react-icons --save
           hover:bg-lime-700  duration-200 transition text-white rounded-lg  text-sm font-medium   text-center"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
