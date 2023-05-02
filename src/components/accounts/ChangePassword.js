import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
  const [isSend, setIsSend] = useState(false);
  let navigate = useNavigate();
  var localUserMail = localStorage.getItem("changePasswordUserMail");

  const [user, setUser] = useState({
    userPassword: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    userPassword: "",
    confirmPassword: "",
  });

  const { userPassword, confirmPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setIsSend(false);
  };

  const validateFormInput = async (event) => {
    event.preventDefault();
    let inputError = {
      userPassword: "",
      confirmPassword: "",
    };

    if (user.confirmPassword !== user.userPassword) {
      setFormError({
        ...inputError,
        confirmPassword: "sifreler uyuşmuyor.",
      });
      return;
    }
    if (user.userPassword.length <= 6) {
      setFormError({
        ...inputError,
        userPassword: "sifre 6 basamaktan buyuk olmalıdır.",
      });
      return;
    }
    setFormError(inputError);
    console.log(localUserMail);
    await onSubmit();
    alert("Şifreniz başarılı bir şekilde değiştirilmiştir.");
    navigate("/login");
    localStorage.removeItem("changePasswordUserMail");
  };

  const onSubmit = async (e) => {
    await axios
      .put(`/user/changePassword/${localUserMail}`,{
            userPassword: userPassword,
      })
      .then(function (response) {
        return response.data;
      });
    setIsSend(true);
  };

  return (
    <div class="mx-auto max-w-screen-xl font-bodyFont px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto flex flex-col max-w-md px-4 py-8 bg-white   rounded-lg  sm:px-6 md:px-8 lg:px-10">
        <Link to="/login">
          {" "}
          <button
            class="relative w-20 transition ease-in duration-200 rounded-md hover:bg-lime-700 bg-lime-600 p-1 text-white "
          >
            &nbsp;İptal&nbsp;
          </button>
        </Link>
        <form
          onSubmit={validateFormInput}
          // onSubmit={(e) => onSubmit(e)}
          action="#"
          class="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 border-lime-600 border-2"
        >
          <p class="text-center text-lg font-bold">
            vıdı<span class="text-lime-600">SifreDegistir</span>
          </p>

          <div class="flex gap-4 mb-2">
            <div class=" relative ">
              <input
                onChange={(e) => onInputChange(e)}
                required
                type="password"
                id="userPassword"
                maxLength={20}
                name="userPassword"
                value={userPassword}
                class="   rounded-lg border-transparent flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent"
                placeholder="şifreniz"
              />
            </div>

            <div class=" relative ">
              <input
                onChange={(e) => onInputChange(e)}
                required
                type="password"
                maxLength={20}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                class="   rounded-lg border-transparent flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent"
                placeholder="şifre tekrar"
              />
            </div>
          </div>
          <p class="text-red-500 font-semibold text-base">
            {formError.userPassword}
          </p>
          <p class="text-red-500 font-semibold text-base">
            {formError.confirmPassword}
          </p>
          <div class="flex w-full my-4">
            <button
              type="submit"
              class="block w-full rounded-lg bg-lime-600 transition ease-in duration-200  hover:bg-lime-700 px-5 py-3 text-sm font-medium text-white"
            >
              Şifre Değiştir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
