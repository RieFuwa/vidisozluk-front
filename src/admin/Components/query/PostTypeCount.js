import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PostTypeCount() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allPostTypeCount, setAllPostTypeCount] = useState([]);

  const getAllPostTypeCount = () => {
    axios
      .get("/post/getPostTypeByCount")
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAllPostTypeCount(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    getAllPostTypeCount();
  }, []);
  return (
    <div class="  mt-20 ml-20 font-bodyFont  border border-black">
      <p class="text-xl font-bold px-3 py-1">Başlık Türüne Göre Başlık Sayısı</p>
      <table class="text-base leading-normal">
        <thead>
          <tr>
            <th
              scope="col"
              class="px-3 py-1   text-left text-gray-800  bg-white border-b border-gray-200"
            >
              Başlık Tipi
            </th>
            <th
              scope="col"
              class="px-3 py-1   text-left text-gray-800  bg-white border-b border-gray-200"
            >
              Başlık Sayısı
            </th>

            <th
              scope="col"
              class="px-3 py-1   text-left text-gray-800  bg-white border-b border-gray-200"
            ></th>
          </tr>
        </thead>
        <tbody>
          {allPostTypeCount.map((key, index) => (
            <tr key={index}>
              <td class="px-3 py-1 text-sm bg-white border-b border-gray-200">
                <div class="flex items-center ">
                  <div class="">
                    <p class="text-gray-900   whitespace-no-wrap">
                      {key.postTypeName}{" "}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-3 py-1 text-sm bg-white border-b border-gray-200">
                <p class="text-gray-900 whitespace-no-wrap">{key.countTitle}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostTypeCount;
