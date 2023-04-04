import React, { useEffect, useRef, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../FormatDate/StringFormatter";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

export default function ShowTitle(props) {
  const [showModal, setShowModal] = React.useState(false);
  const { postId, userId } = props;
  const [postById, setPostById] = useState([]);
  const [setIsLoadedPost] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const getPostById = async () => {
    await axios
      .get("/post/" + postId)
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setPostById(result);
          setIsLoadedPost(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };
 
  useEffect(() => {
    getPostById();
  }, []);
  return (
    <>
      <button
        class="cursor-pointer text-white bg-lime-500 px-2 py-1  hover:bg-lime-600 rounded-full  align-middle ml-3  text-sm"
        type="button"
        onClick={() => setShowModal(true)}
      >
        başliga git
      </button>
      {showModal ? (
        <>
          <div className="justify-center lowercase items-center font-bodyFont  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative     font-bodyFont w-auto my-6 mx-auto max-w-5xl">
              {/*content*/}
              <div className=" border-2 border-lime-600 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className=" items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <Link to={{ pathname: "/user/" + postById.user.id }}>
                    <button class="relative block text-white text-2xl font-bodyFont bg-lime-500 w-14 h-14 rounded-full">
                      {postById.user.userName.charAt(0).toUpperCase()}
                      {postById.user.userName.charAt(1)}
                    </button>
                  </Link>
                  
                  <div class="flex flex-col justify-between">
                    <span class="text-sm flex items-center mt-2   align-middle  text-lime-60">
                      <Link to={{ pathname: "/user/" + postById.user.id }}>
                        <button>kullanıcı adı: {postById.user.userName}</button>
                      </Link>
                    </span>
                    <p class="text-sm ">kullanıcı id'si: {postById.user.id} </p>
                    <p class="text-sm ">
                      baslık acılma tarihi: {formatDate(postById.createDate)}
                    </p>
                  </div>
                 
                </div>
                {/*body*/}

                <div className=" relative block items-center align-middle ml-4 mt-2">
                  <div class="flex  flex-col justify-between">
                    <p className=" text-lime-600  text-xl ">
                      {postById.postTitle}
                    </p>
                    <p className="my-4 text-black text-lg ">
                      {postById.postText}
                    </p>
                  </div>
                  <div class="  grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 2xl:grid-cols-2 gap-4 p-2 "></div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 duration-200 transition ease-in border-2 rounded-lg background-transparent font-bold  px-5 py-3 text-sm outline-none focus:outline-none m-2 "
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
