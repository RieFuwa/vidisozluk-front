import { Fragment, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PostWithAuth } from "../../services/HttpService";

export default function ReportTitle(props) {
  const { postId, userId } = props;
  const [isSend, setIsSend] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  let navigate = useNavigate();

  const [reportText, setReportText] = useState("");

  const [formError, setFormError] = useState({
    reportText: "",
  });

  const validateFormInput = async (event) => {
    event.preventDefault();
    let inputError = {
      reportText: "",
    };

    if (reportText.trim().length === 0) {
      setFormError({
        ...inputError,
        reportText: "şikayet sebebi boş bırakılamaz.",
      });
      return;
    } else {
      alert("Şikayetiniz başarılı bir şekilde iletilmiştir.");
      setFormError(inputError);
      await sendReport();
      setIsSend(true);
      setReportText("");
      navigate("/");
    }
  };

  const sendReport = async () => {
    await PostWithAuth("/report/add", {
        userId: userId,
        postId: postId,
        reportText: reportText,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleComment = (value) => {
    setReportText(value);
    setIsSend(false);
  };

  return (
    <Fragment>
      <div className="flex">
        <FaExclamationCircle
          class="text-2xl ml-10 align-middle cursor-pointer text-red-700"
          onClick={handleOpen}
          variant="gradient"
        ></FaExclamationCircle>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody class="border-2 border-lime-600 rounded-lg"  divider>
          <form onSubmit={validateFormInput} class="font-bodyFont">
            <div class="m-10">
              <div className="w-96"></div>
              <div class="px-4 py-2 rounded-t-lg 0">
                <p class="text-center text-3xl font-bold">
                  baslık<span class="text-lime-600">bildir</span>
                </p>
                <textarea
                  onChange={(i) => handleComment(i.target.value)}
                  type="text"
                  id="reportText"
                  value={reportText}
                  name="reportText"
                  maxLength={250}
                  class=" rounded-lg mt-5 border-2 lowercase  flex-1 appearance-none border-lime-400  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                  placeholder="sikayet sebebin"
                ></textarea>
              </div>
              <p class="ml-5 text-red-400 font-semibold text-base">
                {formError.reportText}
              </p>
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
