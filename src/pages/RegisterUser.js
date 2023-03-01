import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [registerCode, setRegisterCode] = useState("");
  const [error, setError] = useState(false);
  const registerCodeHandler = (event) => {
    setRegisterCode(event.target.value);
  };
  const userNameHandler = (event) => {
    setName(event.target.value);
  };
  const userSurnameHandler = (event) => {
    setSurname(event.target.value);
  };
  const userEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const userPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const userPositionHandler = (event) => {
    setPosition(event.target.value);
  };
  const userIsAdminHandler = (event) => {
    setIsAdmin(!isAdmin);
    console.log(isAdmin);
  };
  const cancelHandler = () => {
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setPosition("");
    setIsAdmin(false);
    setRegisterCode("");
  };
  const registerHandler = async () => {
    //check input validity
    if (
      name.length < 3 ||
      surname.length < 3 ||
      email.length < 3 ||
      password < 6
    ) {
      setError(true);
      return;
    }
    //check if user with given email exists

    const response1 = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/check-if-user-exists",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email }),
      }
    );
    if (response1.status == 200) {
    } else {
      setError(true);
      return;
    }

    //check if register code is ok
    const response2 = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/admin/check-if-code-is-valid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: registerCode }),
      }
    );
    const resJSON = await response2.json();
    if (resJSON.valid == false) {
      setError(true);
      return;
    }
    const user = {
      Name: name,
      Surname: surname,
      Email: email,
      Password: password,
      IsAdmin: isAdmin ? 1 : 0,
      Position: position,
    };

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/addUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (response.status == 200) {
      cancelHandler();
      //redirect to login page
      navigate("/login");
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <div className="rounded-xl bg-sky-200 h-full m-10 py-2">
        <h1 className=" text-5xl font-bold p-3">REGISTER USER</h1>
        <div className="h-full mx-5 rounded-xl bg-sky-100 my-6 ">
          <div className="m-6 w-4/12">
            <h2 className="font-bold">Name</h2>
            <input
              onChange={userNameHandler}
              value={name}
              placeholder="Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12">
            <h2 className="font-bold">Surname</h2>
            <input
              onChange={userSurnameHandler}
              value={surname}
              placeholder="Surname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12">
            <h2 className="font-bold">Email</h2>
            <input
              onChange={userEmailHandler}
              value={email}
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12">
            <h2 className="font-bold">Password</h2>
            <input
              onChange={userPasswordHandler}
              value={password}
              placeholder="password"
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12">
            <h2 className="font-bold">Position</h2>
            <input
              onChange={userPositionHandler}
              value={position}
              placeholder="Position"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12">
            <h2 className="font-bold">Admin Status</h2>
            <label>
              <input
                type="checkbox"
                value={isAdmin}
                onClick={userIsAdminHandler}
              />
              Check if user is to be an Admin
            </label>
          </div>
          <div className="m-6 w-4/12">
            <h2 className="font-bold">Register code</h2>
            <input
              onChange={registerCodeHandler}
              value={registerCode}
              placeholder="Register code"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="font-bold flex p-6 gap-2">
            <button
              onClick={registerHandler}
              class=" w-2/12 my-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>
            <button
              onClick={cancelHandler}
              class="  w-2/12 my-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Clear
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              class="  w-2/12 my-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Return
            </button>
          </div>
          {error && (
            <a className="font-bold text-red-500">
              Error occured while adding a user.
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
//{"Id":"3223","Name":"Jan","Surname":"Kowalski","Email":"janko@gmail.com","Password":"12345678","IsAdmin":1,"Position":"Admin"}
