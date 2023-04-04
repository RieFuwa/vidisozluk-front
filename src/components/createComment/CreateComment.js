import React, { useEffect, useRef, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../FormatDate/StringFormatter";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { DeleteWithAuth, PostWithAuth } from "../../services/HttpService";

export default function CreateComment(props) {
  const [setIsLoadedPost] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const [postById, setPostById] = useState([]);
  const [postCommentById, setPostCommentById] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const isInitialMount = useRef(true);
  const { postId, connectedPostId, userId, postTypeId,getAllPost } = props;
  const [isDeleted, setIsDeleted] = useState(false);

  let navigate = useNavigate();

  const [postComment, setPostComment] = useState({
    postText: "",
  });

  const [formError, setFormError] = useState({
    postText: "",
  });

  const validateFormInput = async (event) => {
    event.preventDefault();
    let inputError = {
      postText: "",
    };

    if (postComment.postText.trim().length === 0) {
      setFormError({
        ...inputError,
        postText: "yorum kısmı boş bırakılamaz.",
      });
      return;
    } else {
      alert("yorumunuz başarılı bir şekilde iletilmiştir.");
      setFormError(inputError);
      await sendComment();
      setIsSend(true);
      setPostComment({
        postText: "",
      });
      await getPostComment();
    }
  };
  const sendComment = async () => {
    await PostWithAuth("/post/add", {
      connectedPostId: postId,
      postTypeId: postTypeId,
      userId: userId,
      postText: postComment.postText,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
  const getPostComment = async () => {
    await axios
      .get("/post/postAnswers?connectedPostId=" + connectedPostId)
      .then(function (response) {
        return response.data;
      })
      .then(
        (result) => {
          setPostCommentById(result);
          setIsLoadedPost(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const deleteComment = async () => {
    axios.delete("/post/" + postId, {
      headers: { authorization: localStorage.getItem("token") },
    });    
    navigate("/user/"+localStorage.getItem("signedUserId"));
    await getAllPost()
  };

  useEffect(() => {
    getPostById();
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getPostComment();
    }
  }, []);

  const onInputChange = (e) => {
    setPostComment({ ...postComment, [e.target.name]: e.target.value });
    setIsSend(false);
  };

  return (
    <>
      <FaCommentDots
        class="cursor-pointer align-middle ml-3 text-lime-600 text-2xl"
        type="button"
        onClick={() => setShowModal(true)}
      ></FaCommentDots>
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
                    <span class="text-sm flex items-center mt-2  align-middle  text-lime-60">
                      <Link to={{ pathname: "/user/" + postById.user.id }}>
                        <button>{postById.user.userName}</button>
                      </Link>
                    </span>
                    <p class="text-sm "> {formatDate(postById.createDate)}</p>
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
                  <div class="  grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 2xl:grid-cols-2 gap-4 p-2 ">
                    {postCommentById.map((key, index) => (
                      <div class="bg-white dark:bg-gray-800 w-96 shadow shadow-gray-500 mx-auto rounded-xl p-4">
                        <p class="row text-gray-600 text-base dark:text-white">
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
                              <FaHeart class="text-lime-600  align-middle ml-5 text-xl">
                                {" "}
                              </FaHeart>
                              &nbsp; 11
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <form onSubmit={validateFormInput}>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <div class=" relative">
                      <input
                        onChange={(e) => onInputChange(e)}
                        type="text"
                        id="postText"
                        value={postComment.postText}
                        name="postText"
                        maxLength={250}
                        class=" rounded-lg  leading-relaxed lowercase border-2 mr-10 h-16 appearance-none border-lime-400  w-96 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                        placeholder="yanıtla"
                      />
                      <p class=" text-red-500 font-semibold text-base">
                        {formError.postText}
                      </p>
                    </div>
                    {postById.user.id ==
                    localStorage.getItem("signedUserId") ? (
                      <div class="col-auto">
                        <button
                          type="button"
                          className="text-white bg-red-500 hover:bg-red-600 duration-200 transition ease-in border-2 rounded-lg background-transparent font-bold  px-5 py-3 text-sm outline-none focus:outline-none m-2 "
                          onClick={deleteComment}
                        >
                          Başlığı Sil
                        </button>
                      </div>
                    ) : null}
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 duration-200 transition ease-in border-2 rounded-lg background-transparent font-bold  px-5 py-3 text-sm outline-none focus:outline-none m-2 "
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Kapat
                    </button>
                    <button
                      class="block  rounded-lg bg-lime-600 transition ease-in duration-200  hover:bg-lime-700 px-5 py-3 text-sm font-bold  text-white"
                      type="submit"
                    >
                      Yolla
                    </button>
                  </div>{" "}
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
