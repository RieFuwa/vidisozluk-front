import React, { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import ReportTitle from "../components/createTitle/ReportTitle";
import { formatDate } from "../components/FormatDate/StringFormatter";
import CreateComment from "../components/createComment/CreateComment";
import { FaCheckCircle } from "react-icons/fa";
import Notfication from "../components/notification/Notification";

function User() {
  const { userId } = useParams();
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [isLoadedPost, setIsLoadedPost] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [userById, setUserById] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const isInitialMount = useRef(true);

  const getUserById = async () => {
    await axios
      .get("/user/" + userId)
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setUserById(result);
          setIsLoadedUser(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getUserPost = async () => {
    await axios
      .get("/post/getAllUserPost?userId=" + userId)
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setUserPost(result);
          setIsLoadedPost(true);
        },
        (error) => {
          setError(true);
          setIsLoadedPost(true);
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getUserById();
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getUserPost();
    }
  }, []);

  if (isLoadedUser) {
    return (
      <div class="p-16 font-bodyFont">
        <div class="p-8 bg-white shadow mt-10 border-2 border-lime-700">
          {" "}
          <div class="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0 "></div>{" "}
            <div class="relative">
              {" "}
              <div class="w-36 h-36 font-bodyFont text-5xl bg-lime-600 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-white">
                {userById.userName.charAt(0).toUpperCase()}
                {userById.userName.charAt(1)}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div class="mt-28 text-center border-b pb-12">
            {" "}
            <h1 class=" text-4xl font-medium flex justify-center  text-center text-gray-700">
              {userById.userName}
              <span class="">
                {userById.isVerified == true ? (
                  <FaCheckCircle class="text-lime-600 w-6 mt-1 ml-1 "></FaCheckCircle>
                ) : null}
              </span>
              {/* {userById.isVerified == true ? (
                  <FaCheckCircle class="text-lime-600 w-6 mt-1 ml-1 "></FaCheckCircle>
                ) : null} */}
            </h1>{" "}
            <p class="font-light text-gray-600 mt-3">{userById.userMail} </p>{" "}
            <p class="mt-8 text-black">
              Aktivite Puanı: {userPost.length * 100}{" "}
            </p>{" "}
            {userById.id == localStorage.getItem("signedUserId") ? (
              <div class="col-auto">
                <Notfication></Notfication>
              </div>
            ) : null}
            {/* <p class="mt-2 text-gray-500">Like Sayısı:</p>{" "} */}
          </div>{" "}
          <div class=" border-lime-600 border-2"></div>
          <div class="mt-12 flex flex-col justify-center">
            <div class="space-x-8 text-2xl flex justify-start mt-32 md:mt-0 md:justify-start">
              {userById.userName} vıdıları
            </div>{" "}
            <div class="  grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 2xl:grid-cols-2 gap-12 p-4 ">
              {userPost.map((key, index) => {
                if (key.connectedPostId === null)
                  return (
                    <div
                      key={index}
                      class="bg-white dark:bg-gray-800 w-96 shadow shadow-gray-500 mx-auto rounded-xl p-4"
                    >
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

                            {localStorage.getItem("signedUserId") == null ? (
                              <Link to="/login">
                                <span class="flex items-center text-xs dark:text-gray-400">
                                  {formatDate(key.createDate)} &emsp;{" "}
                                
                                  <ReportTitle
                                    userId={localStorage.getItem(
                                      "signedUserId"
                                    )}
                                    postId={key.id}
                                  ></ReportTitle>
                                  <CreateComment
                                    postId={key.id}
                                    likeList={key.likeList}
                                    connectedPostId={key.id}
                                    userId={localStorage.getItem(
                                      "signedUserId"
                                    )}
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
        </div>
      </div>
    );
  }
}
export default User;
