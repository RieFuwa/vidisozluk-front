import AdminNavbar from "../layouts/AdminNavbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ShowTitle from "../../showTitle/ShowTitle";
import { formatDate } from "../../FormatDate/StringFormatter";

function ReportOperations() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allReport, setAllReport] = useState([]);
  const [qss, setQss] = useState("");

  const getAllReport = () => {
    axios
      .get("/report/getAll")
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAllReport(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const deletePost = async (postId) => {
    axios.delete(`/post/${postId}`).catch(function (error) {
      console.log(error);
    });
    getAllReport();
  };

  useEffect(() => {
    getAllReport();
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
                vıdı<span class="text-lime-600  ">şikayet</span>
              </h2>
              <div class="text-end">
                
              </div>
            </div>
            <div class="px-4 py-4 -mx-4  overflow-x-auto sm:-mx-8 sm:px-8">
              <div class="inline-block min-w-full overflow-hidden border rounded-lg shadow">
                <table class="min-w-full text-base leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-5 py-3   text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        şikayet id
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3   text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        Şikayet Eden
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3  text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        Başlık id
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3  text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        Şikayet Tarihi
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3   text-left text-gray-800  bg-white border-b border-gray-200"
                      >
                        Şikayet Açıklaması
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3   text-left text-gray-800  bg-white border-b border-gray-200"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allReport.map((key, index) => (
                      <tr key={index}>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div class="flex items-center ">
                            <div class="">
                              <p class="text-gray-900   whitespace-no-wrap">
                                {key.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {key.userId}
                          </p>
                        </td>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {key.postId}
                          </p>
                        </td>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p class="text-gray-900 whitespace-no-wrap">
                          {formatDate(key.createDate)} &emsp;{" "}
                          </p>
                        </td>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span class="relative"> {key.reportText}</span>
                          </span>
                        </td>
                        <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <ShowTitle postId={key.postId} userId={key.userId}></ShowTitle>
                          <Link>
                            <button
                              onClick={() => deletePost(key.postId)}
                              class="text-white bg-red-500 px-2 py-1  ml-2 hover:bg-red-600 rounded-full"
                            >
                              başlığı  sil
                            </button>
                          </Link>
                        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div class="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                  <div class="flex items-center">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ReportOperations;
