import AdminNavbar from "../layouts/AdminNavbar";
import Pagination from "../aComponents/pagination/Pagination";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllUser() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [qss, setQss] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(5);
  const paginate=pageNumber=>setCurrentPage(pageNumber);

  const getAllUser = () => {
    axios
      .get("/user/getAll")
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAllUser(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUser = allUser.slice(indexOfFirstUser, indexOfLastUser);
  const deleteUser = async (id) => {
    axios.delete(`/user/${id}`).catch(function (error) {
      console.log(error);
    });
    getAllUser();
  };

  useEffect(() => {
    getAllUser();
  }, []);

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setQss(lowerCase);
    console.log(lowerCase);
  };
  if (error) {
    return <div>error</div>;
  } else if (!isLoaded) {
    return <div class=" text-5xl font-bodyFont font-bold "> Loading... </div>;
  } else {
    return (
      <div>
        <AdminNavbar></AdminNavbar>

        <div class="container mt-5 lowercase font-bodyFont max-w-9xl px-4 mx-auto sm:px-8">
          <div class="py-8">
            <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
              <h2 class="text-4xl font-bold text-gray-800 font-heading">
                vıdı<span class="text-lime-600  ">Kullanıcı</span>
              </h2>
              <div class="text-end">
                <form class="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                  <div class=" relative ">
                    <input
                      type="text"
                      value={qss}
                      id='"form-subscribe-Filter'
                      class=" rounded-lg border-1 flex-1 appearance-none border border-lime-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                      placeholder="kullanıcı adına göre ara"
                      onChange={inputHandler}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div class="px-4 py-4 -mx-4  overflow-x-auto font-bodyFont sm:-mx-8 sm:px-8">
              <div class="inline-block min-w-full overflow-hidden border rounded-lg shadow">
                <table class="min-w-full text-base leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-5 py-3   text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        id - kullanıcı
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3   text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        Rol
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3  text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        email
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3   text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        status
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3   text-left text-gray-800  bg-white border-b border-gray-200"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser
                      .filter((key) => {
                        if (qss === "") {
                          return currentUser;
                        }
                        if (
                          (key.userName || "")
                            .toLowerCase()
                            .includes(qss.toLowerCase())
                        ) {
                          return currentUser;
                        }
                      })
                      .map((key, index) => (
                        <tr key={index}>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div class="flex items-center ">
                              <div class="">
                                <p class="text-gray-900   whitespace-no-wrap">
                                  {key.id} - {key.userName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                             {key.roles.map((i)=><div>{i.roleName}</div>)}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {key.userMail}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden="true"
                                class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                              ></span>
                              <span class="relative">
                                {" "}
                                {key.isVerified.toString()}{" "}
                              </span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <Link to={{ pathname: "/user/" + key.id }}>
                              <button class="text-white bg-lime-500 rounded-full px-2 py-1 ml-2 hover:bg-lime-600">
                                profil
                              </button>
                            </Link>
                            <Link>
                              <button
                                onClick={() => deleteUser(key.id)}
                                class="text-white  bg-red-500 rounded-full px-2 py-1 ml-2 hover:bg-red-600"
                              >
                                sil
                              </button>
                            </Link>
                            <Link>
                              <button class="text-white bg-blue-500 rounded-full ml-2 px-2 py-1 hover:bg-blue-600">
                                düzenle
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div class="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                  <Pagination userPerPage={userPerPage} totalUser={allUser.length} paginate={paginate} ></Pagination>
                  {/* <div class="flex items-center">
                    <button
                      type="button"
                      class="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
                    >
                      1
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      class="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AllUser;
