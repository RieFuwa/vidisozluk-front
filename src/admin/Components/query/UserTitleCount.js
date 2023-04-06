import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTitleCount() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allUserTitleCount, setAllUserTitleCount] = useState([]);

  const getAllUserTitleCount = () => {
    axios
      .get("/post/getUserTitleByCount")
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAllUserTitleCount(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    getAllUserTitleCount();
  }, []);
  return (
    <div class="mt-20   w-min-auto font-bodyFont  border border-black ">
      <p class="text-xl font-bold px-3 py-1">Kullanıcıların Aktivite Puanı </p>

      <table class="min-50 text-base leading-normal">
        <thead>
          <tr>
            <th
              scope="col"
              class="px-3 py-1   text-left text-gray-800  bg-white border-b border-gray-200"
            >
              Yazar Adı
            </th>
            <th
              scope="col"
              class="px-3 py-1   text-left text-gray-800  bg-white border-b border-gray-200"
            >
              Aktivite Puanı
            </th>

            <th
              scope="col"
              class="px-3 py-1   text-left text-gray-800  bg-white border-b border-gray-200"
            ></th>
          </tr>
        </thead>
        <tbody>
          {allUserTitleCount.map((key, index) => (
            <tr key={index}>
              <td class="px-3 py-1 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center ">
                  <div class="">
                    <p class="text-gray-900   whitespace-no-wrap">
                      {key.userName}{" "}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-3 py-1 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">
                  {key.countTitle * 100}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTitleCount;
