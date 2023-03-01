import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function LoginPanel() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["loggedIn"]);
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dbemail = "maks@gmail.com";
  const dbpassword = "123456";
  const [log, setLog] = useState(true);
  const emailHandler = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };
  const buttonHandler = async (event) => {
    event.preventDefault();
    /*if (email === dbemail && password === dbpassword) {
      navigate("/dashboard");
      setLog(true);
      setCookie("loggedIn", true, { path: "/" });
    } else {
      setLog(false);
    }*/
    console.log({ Email: email, Password: password });
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, Password: password }),
      }
    );
    if (response.status == 200) {
      setLog(true);
      setCookie("loggedIn", true, { path: "/" });
      const content = await response.json();
      localStorage.setItem("user", JSON.stringify(content.user));

      navigate("/dashboard");
    } else {
      setLog(false);
    }
  };

  return (
    <div class="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-6" action="#"></form>
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">
        Sign in to dental database
      </h5>
      <div>
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          vaule={email}
          onChange={emailHandler}
        />
      </div>

      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your password
        </label>
        <input
          value={password}
          onChange={passwordHandler}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      {!log && (
        <p className=" text-sm font-medium text-red-500 ">
          {" "}
          Wrong password and or Login
        </p>
      )}

      <button
        onClick={buttonHandler}
        class="my-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login to your account
      </button>
      <a href={process.env.REACT_APP_FRONTEND_URL + "/register"}>
        Register User
      </a>
    </div>
  );
}

export default LoginPanel;
