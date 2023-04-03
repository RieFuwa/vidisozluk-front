import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportTitle from "../../components/createTitle/ReportTitle";
import Footer from "../../components/layouts/Footer";
import CreateTitle from "../../components/createTitle/CreateTitle";
import { formatDate } from "../../components/FormatDate/StringFormatter";
import CreateComment from "../../components/createComment/CreateComment";

function Tarih() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPostCard] = useState([]);

  const getAllPost = () => {
    axios
      .get("/post/getAllPostTypePost?postTypeId=3")
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setPostCard(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  if (error) {
    return <div>error</div>;
  } else if (!isLoaded) {
    return <div class=" text-5xl font-bodyFont font-bold "> Loading... </div>;
  } else {
    return (
      <div>
        <div class="mt-12 px-2   min-h-screen">
          <h1 class=" text-5xl font-bodyFont font-bold  ">
            vıdı<span class=" text-lime-600">Tarih</span>
            <div class=" border-lime-600 border-2"></div>
            <div class="flex  justify-end align-middle mt-2 ">
              <CreateTitle></CreateTitle>
            </div>
          </h1>
          <div class="  grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-3 2xl:grid-cols-3 gap-12 p-4 ">
            {post .map((key) => {
              if (key.connectedPostId === null)
                return (
                  <div class="bg-white dark:bg-gray-800 w-96 shadow shadow-gray-500 mx-auto rounded-xl p-4">
                    <div>
                      <p class="text-lime-600 lowercase font-semibold ">
                        PostId: {key.id} {key.postTitle}{" "}
                      </p>
                      <p class="row text-gray-600 dark:text-white">
                        {" "}
                        {key.postText}
                      </p>
                      <div class="flex items-center mt-4">
                        <Link to={{ pathname: "/user/" + key.user.id }}>
                          <button class="relative block text-white  font-bodyFont bg-lime-500 w-10 h-10 rounded-full">
                            {key.user.userName.charAt(0).toUpperCase()}
                            {key.user.userName.charAt(1)}
                          </button>
                        </Link>
                        <div class="flex flex-col justify-between ml-2">
                          <span class="text-sm flex items-center align-middle font-semibold  text-lime-600">
                            <Link to={{ pathname: "/user/" + key.user.id }}>
                              <button>{key.user.userName}</button>
                            </Link>
                            &emsp;
                          </span>
                          <span class="flex items-center text-xs dark:text-gray-400">
                            {formatDate(key.createDate)} &emsp;{" "}
                            <FaHeart class="text-red-500 text-2xl"> </FaHeart>
                            &nbsp; 11
                            <ReportTitle
                              userId={203}
                              postId={key.id}
                            ></ReportTitle>
                            <CreateComment
                              postId={key.id}
                              connectedPostId={key.id}
                              userId={203}
                              postTypeId={key.postType.id}
                            ></CreateComment>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default Tarih;
