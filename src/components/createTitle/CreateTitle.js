import { Fragment, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PostWithAuth } from "../../services/HttpService";

export default function CreateTitle(props) {
  const [open, setOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [error, setError] = useState(false);
  const [ptype, setpType] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { userId, getAllPost } = props;

  let navigate = useNavigate();

  const [title, setTitle] = useState({
    postTypeId: "",
    postText: "",
    postTitle: "",
  });

  const [formError, setFormError] = useState({
    postTitle: "",
    postText: "",
  });

  const validateFormInput = async (event) => {
    event.preventDefault();
    let inputError = {
      postTitle: "",
      postText: "",
    };

    if (title.postTitle.trim().length === 0) {
      setFormError({
        ...inputError,
        postTitle: "başlık boş bırakılamaz.",
      });
      return;
    }
    if (title.postText.length === 0) {
     
      setFormError({
        ...inputError,
        postText: "acıklama kısmı boş bırakılamaz.",
      });
      return;
    } else {
      alert("Başlığınız başarılı bir şekilde oluşturulmuştur.");
      setFormError(inputError);
      await sendPost();
      setIsSend(true);
      setTitle({
        postTypeId: "",
        postText: "",
        postTitle: "",
      });
      navigate("/");
      getAllPost();
    }
  };

  const sendPost = async () => {
    await PostWithAuth("/post/add", {
      postTypeId: title.postTypeId,
      userId: userId,
      postTitle: title.postTitle,
      postText: title.postText,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onInputChange = (e) => {
    setTitle({ ...title, [e.target.name]: e.target.value });
    setIsSend(false);
  };
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <div className=" mb-3 flex gap-3 font-bodyFont ">
        <FaPencilAlt
          class="text-white cursor-pointer   bg-lime-600 text-3xl rounded-lg p-1 "
          onClick={handleOpen}
          variant="gradient"
        ></FaPencilAlt>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody class="border-2 border-lime-600 rounded-lg" divider>
          <form onSubmit={validateFormInput} class="font-bodyFont ">
            <div class="m-10">
              <div className=""></div>
              <div class="px-4 py-2 rounded-t-lg 0">
                <p class="text-center text-3xl font-bold">
                  baslık<span class="text-lime-600">olustur</span>
                </p>

                <div class="mt-5">
                  <label for="email" class="sr-only">
                    Email
                  </label>

                  <div class="relative">
                    <input
                      onChange={(e) => onInputChange(e)}
                      type="text"
                      id="postTitle"
                      value={title.postTitle}
                      name="postTitle"
                      maxLength={50}
                      class=" rounded-lg lowercase border-2  flex-1 appearance-none border-lime-400  w-96 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                      placeholder="baslık"
                    />
                  </div>
                </div>
                <p class="ml-5 text-red-500 font-semibold text-base">
                  {formError.postTitle}
                </p>
                <select
                  value={title.postTypeId}
                  id={title.postTypeId}
                  onChange={(e) => onInputChange(e)}
                  class="block px-3 py-2 required text-gray-500 bg-white border-2 mt-4 border-lime-400 rounded-lg shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  name="postTypeId"
                  placeholder="baslik turu seciniz"
                  required
                >
                  <option selected>baslik türünü seç</option>
                  <option value={1}>spor</option>
                  <option value={2}>siyaset</option>
                  <option value={3}>tarih</option>
                  <option value={4}>ekonomi</option>
                  <option value={5}>müzik</option>
                  <option value={6}>teknoloji</option>
                </select>

                <textarea
                  onChange={(e) => onInputChange(e)}
                  type="text"
                  id="postText"
                  value={title.postText}
                  name="postText"
                  row="4"
                  maxLength={250}
                  class=" rounded-lg mt-5 border-2 lowercase flex-1 appearance-none border-lime-400  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                  placeholder="baslık icerigi"
                ></textarea>
                <p class="ml-5 text-red-500 font-semibold text-base">
                  {formError.postText}
                </p>
              </div>

              <div class="flex items-center justify-between px-4 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lime-600 rounded-lg focus:ring-4 transition focus:ring-lime-500 dark:focus:ring-lime-900 hover:bg-lime-700"
                >
                  Yolla
                </button>
              </div>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}
