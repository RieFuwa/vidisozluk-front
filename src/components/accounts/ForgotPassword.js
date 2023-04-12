import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [isSend, setIsSend] = useState(false);
  let navigate = useNavigate();

  const [user, setUser] = useState({
    userMail: "",
  });

  const [formError, setFormError] = useState({
    userMail: "",
  });

  const { userMail } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setIsSend(false);
  };

  const validateFormInput = async (event) => {
    event.preventDefault();
    let inputError = {
      userMail: "",
    };

    if (user.userMail.trim().length === 0) {
      setFormError({
        ...inputError,
        userMail: "Email giriniz.",
      });
      return;
    }
    if (user.userMail.includes("@") == false) {
      setFormError({
        ...inputError,
        userMail: "Girdiğiniz Email kontrol ediniz.",
      });
      return;
    }
    alert("Emailinize gerekli link gönderilmiştir.")
    setFormError(inputError);
    await onSubmit();
  };
  const onSubmit = async (e) => {
    await axios.post("/user/emailCheck" + userMail).then(function (response) {
      localStorage.setItem("changePasswordUserMail", user.userMail);

      return response.data;
    });

    setIsSend(true);
  };

  return (
    <div class="mx-auto max-w-screen-xl font-bodyFont  px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto flex flex-col max-w-md px-4 py-8 bg-whit rounded-lg sm:px-6 md:px-8 lg:px-10">
        <Link to="/login">
          {" "}
          <button class="relative w-20 transition ease-in duration-200 rounded-md hover:bg-lime-700 bg-lime-600 p-1 text-white ">
            &nbsp;menu&nbsp;
          </button>
        </Link>
        <form
          onSubmit={validateFormInput}
          action="#"
          class="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 border-lime-600 border-2"
        >
          <p class="text-center text-lg font-bold">
            vıdı<span class="text-lime-600">Sifre</span>
          </p>

          <div>
            <div class="relative">
              <input
                onChange={(e) => onInputChange(e)}
                id="userMail"
                value={userMail}
                name="userMail"
                maxLength={30}
                class=" lowercase rounded-lg border-transparent flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent"
                placeholder="email"
              />

              <p class="text-red-500 font-semibold text-xl">
                {formError.userMail}
              </p>
            </div>
          </div>

          <button
            type="submit"
            class="block w-full rounded-lg bg-lime-600 transition ease-in duration-200  hover:bg-lime-700 px-5 py-3 text-sm font-medium text-white"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
