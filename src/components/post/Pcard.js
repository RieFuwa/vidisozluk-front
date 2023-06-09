import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReportTitle from "../createTitle/ReportTitle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../FormatDate/StringFormatter";
import CreateTitle from "../createTitle/CreateTitle";
import CreateComment from "../createComment/CreateComment";
import { FaCheckCircle } from "react-icons/fa";

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
            {localStorage.getItem("signedUserId") == null ? (
              <Link to="/login">
                <CreateTitle></CreateTitle>
              </Link>
            ) : (
              <CreateTitle
                userId={localStorage.getItem("signedUserId")}
                getAllPost={getAllPost}
              ></CreateTitle>
            )}
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
                return (
                  <div class="text-2xl font-bodyFont font-semibold ">
                    HENUZ VERİ BULUNAMADI
                  </div>
                );
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
                        {key.postText}
                        {key.likeList.length}
                      </p>
                      <div class="flex items-center mt-4">
                        <Link to={{ pathname: "/user/" + key.user.id }}>
                          <button class="relative block text-white  font-bodyFont bg-lime-500 w-10 h-10 rounded-full">
                            {key.user.userName.charAt(0).toUpperCase()}
                            {key.user.userName.charAt(1)}
                          </button>
                        </Link>
                        <div class="flex flex-col justify-between ml-2">
                          <span class="text-sm flex  items-center align-middle font-semibold  text-lime-600">
                            <Link to={{ pathname: "/user/" + key.user.id }}>
                              <button class="flex justify-start">
                                {key.user.userName}{" "}
                                <span>
                                  {key.user.isVerified == true ? (
                                    <FaCheckCircle class="text-lime-600 w-4 mt-1 ml-1 "></FaCheckCircle>
                                  ) : null}
                                </span>
                              </button>
                            </Link>
                            &emsp;
                          </span>
                          {localStorage.getItem("signedUserId") == null ? (
                            <Link to="/login">
                              <span class="flex items-center  text-xs dark:text-gray-400">
                                {formatDate(key.createDate)} &emsp;{" "}
                              
                                <ReportTitle
                                  userId={localStorage.getItem("signedUserId")}
                                  postId={key.id}
                                ></ReportTitle>
                                <CreateComment
                                  getAllPost={getAllPost}
                                  postId={key.id}
                                  likeList={key.likeList}
                                  connectedPostId={key.id}
                                  userId={localStorage.getItem("signedUserId")}
                                  postTypeId={key.postType.id}
                                ></CreateComment>
                              </span>{" "}
                            </Link>
                          ) : (
                            <span class="flex items-center text-xs dark:text-gray-400">
                              {formatDate(key.createDate)} &emsp;{" "}
                             
                              <ReportTitle
                                userId={localStorage.getItem("signedUserId")}
                                postId={key.id}
                              ></ReportTitle>
                              <CreateComment
                                postId={key.id}
                                likeList={key.likeList}
                                connectedPostId={key.id}
                                userId={localStorage.getItem("signedUserId")}
                                postTypeId={key.postType.id}
                              ></CreateComment>
                            </span>
                          )}
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
