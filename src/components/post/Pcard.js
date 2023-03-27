import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReportTitle from "../createTitle/ReportTitle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../FormatDate/StringFormatter";
import CreateTitle from "../createTitle/CreateTitle";
import CreateComment from "../createComment/CreateComment";
import { useParams } from "react-router";
import { isEmptyObject } from "jquery";
import AllUser from "../admin/pages/AllUser";
import { render } from "@testing-library/react";
import Main from "../../pages/Main";

function PostCard(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPostCard] = useState([]);

  const [qss, setQss] = useState("");

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setQss(lowerCase);
    console.log(lowerCase);
  };

  const getAllPost = () => {
    axios
      .get("/post/getTodayPost")
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
        <div>
          <input
            class=" mt-5 h-10 w-60 p-2 rounded-lg border-lime-600  text-sm  border-2 placeholder-gray-700 "
            placeholder=" arama..."
            type="search"
            value={qss}
            onChange={inputHandler}
          />
          <div class="flex  justify-end  ">
            <CreateTitle userId={203} getAllPost={getAllPost}></CreateTitle>
          </div>
        </div>

        <div class="  grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-3 2xl:grid-cols-3 gap-12 p-4 ">
          {post
            .filter((key) => {
              if (qss === "") {
                return post;
              }
              if (
                (key.postTitle || "")
                  .toLowerCase()
                  .includes(qss.toLowerCase()) ||
                qss.toString() === key.user.id.toString()
              ) {
                return post;
              }
            })
            .map((key) => {
              if (!key.id) {
                return <div class="text-2xl font-bodyFont font-semibold ">HENUZ VERİ BULUNAMADI</div>;
              }
              if (key.connectedPostId === null)
                return (
                  <div class="bg-white dark:bg-gray-800 w-96 shadow shadow-gray-500 mx-auto rounded-xl p-4">
                    <div>
                      <p class="text-lime-600 lowercase font-semibold ">
                        PostId: {key.id} {key.postTitle}{" "}
                      </p>
                      <p class="row text-gray-600 dark:text-white">
                        {" "}
                        To get social media testimonials like these, keep your
                        customers engaged with your social media accounts by
                        posting regularly yourself
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
    );
  }
}
export default PostCard;
