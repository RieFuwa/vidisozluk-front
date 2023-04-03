import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isSend, setIsSend] = useState(false);
  let navigate = useNavigate();

  const [user, setUser] = useState({
    userMail: "",
    userPassword: "",
  });

  const [formError, setFormError] = useState({
    userMail: "",
    userPassword: "",
  });

  const { userMail, userPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setIsSend(false);
  };

  const validateFormInput = async (event) => {
    event.preventDefault();
    let inputError = {
      userMail: "",
      userPassword: "",
    };

    if (user.userPassword.length <= 3) {
      setFormError({
        ...inputError,
        confirmPassword: "sifreniz yanlistir.",
      });
      return;
    }

    setFormError(inputError);
    await onSubmit();
  };

  const onSubmit = async (e) => {
    await axios.post("/userAuth/register", user).then(function (response) {
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("signedUserId", response.data.userId);
      console.log(localStorage.getItem("token"))
    });
    setIsSend(true);
    navigate(-1);
  };

  return (
    <div class="mx-auto max-w-screen-xl font-bodyFont  px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto flex flex-col max-w-md px-4 py-8 bg-whit rounded-lg sm:px-6 md:px-8 lg:px-10">
        <Link to="/">
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
            vıdı<span class="text-lime-600">giriş</span>
          </p>

          <div>
            <div class="relative">
              <input
                onChange={(e) => onInputChange(e)}
                required
                type="email"
                id="userMail"
                value={userMail}
                name="userMail"
                maxLength={30}
                class=" lowercase rounded-lg border-transparent flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent"
                placeholder="email"
              />
              <p class="text-red-500 font-semibold text-xl"></p>
            </div>
          </div>

          <div>
            <div class="relative">
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
              <p class="text-red-500 font-semibold text-xl">
                {formError.userPassword}
              </p>
            </div>
          </div>

          <button
            type="submit"
            class="block w-full rounded-lg bg-lime-600 transition ease-in duration-200  hover:bg-lime-700 px-5 py-3 text-sm font-medium text-white"
          >
            Giriş
          </button>

          <p class="text-center text-sm text-gray-500">
            Hesabın yok mu?
            <Link to="/register">
              <button class=" text-lime-600 font-bold">
                &nbsp; <span class="underline">Kayıt Ol</span>
              </button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
