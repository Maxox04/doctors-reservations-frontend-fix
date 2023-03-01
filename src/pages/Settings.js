import React, { useState } from "react";

export default function Settings() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [numberGenerated, setNumberGenerated] = useState(-1);
  const clickHandler = async () => {
    const num = Math.floor(100000 + Math.random() * 900000);
    setNumberGenerated(num);
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/admin/add-code",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: num }),
      }
    );
    console.log(response.status);
  };
  return (
    <div>
      <div className=" rounded-xl bg-sky-200 h-full m-10 pb-3">
        <h1 className=" text-5xl font-bold p-3">SETTINGS</h1>
        <div className="h-full mx-5 rounded-xl bg-sky-100 my-6 p-2">
          <div className="flex flex-col gap-2 ml-3">
            <div className="flex">
              <h3 className="font-bold text-xl mx-1">NAME: </h3>
              <h3 className="text-xl ">{user.Name}</h3>
            </div>
            <div className="flex">
              <h3 className="font-bold text-xl mx-1">SURNAME: </h3>
              <h3 className="text-xl ">{user.Surname}</h3>
            </div>
            <div className="flex">
              <h3 className="font-bold text-xl mx-1">EMAIL: </h3>
              <h3 className="text-xl ">{user.Email}</h3>
            </div>
            <div className="flex">
              <h3 className="font-bold text-xl mx-1">POSITION: </h3>
              <h3 className="text-xl ">{user.Position}</h3>
            </div>
            <div className="flex">
              <h3 className="font-bold text-xl mx-1">STATUS: </h3>
              <h3 className="text-xl ">{user.IsAdmin ? "Admin" : "User"}</h3>
            </div>
          </div>
          {user.IsAdmin && (
            <div className="flex flex-col mt-10">
              <h3 className="font-bold text-3xl">Generate code</h3>
              <button
                className="w-[200px] h-[50px] rounded-xl bg-blue-500 font-bold"
                onClick={clickHandler}
              >
                Generate
              </button>
              <div>
                <h4 className="text-xl font-bold">Code:</h4>
                <h4 className="font-extrabold text-3xl">
                  {numberGenerated === -1
                    ? "no number generated yet"
                    : numberGenerated}
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
