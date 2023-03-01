import React, { useState } from "react";

export default function Search() {
  const services = [
    { value: "checkup", type: "Dental checkup" },
    { value: "cleaning", type: "Teeth cleaning" },
    { value: "filling", type: "Filling" },
    { value: "extraction", type: "Exctraction" },
  ];
  const polishNames = [
    { value: 1, name: "Jan Kowalski" },
    { value: 2, name: "Anna Nowak" },
    { value: 3, name: "Piotr Wiśniewski" },
    { value: 4, name: "Katarzyna Wójcik" },
  ];
  const [option, setOption] = useState("default");
  const [input, setInput] = useState("");
  const buttonHandler = (event) => {
    if (option.length == 0 || option == "default" || input.length == 0) {
      console.log("error");
    } else {
      console.log("okej");
    }
  };
  const changeHandler = (event) => {
    setOption(event.target.value);
    console.log(event.target.value);
  };
  const inputHandler = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div className="h-full">
      <div className=" rounded-xl bg-sky-200 h-full m-10">
        <h1 className=" text-5xl font-bold p-3">SEARCH</h1>
        <div className="h-full mx-5 rounded-xl bg-sky-100 py-6 ">
          <div className="grid grid-cols-12 gap-1">
            <input
              onChange={inputHandler}
              className="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            ></input>

            <select
              onChange={changeHandler}
              id="options"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default" selected>
                Choose an option{" "}
              </option>
              <option value="PESEL">Pesel</option>
              <option value="DOCTOR">Doctor</option>
              <option value="DATE">Date</option>
              <option value="SURNAME">Patient Surname</option>
              <option value="PHONE">Patient Phone</option>
            </select>
          </div>
          <select
            // onChange={titleHandler}
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" selected>
              Choose a type of medical service
            </option>
            {services.map((service) => (
              <option value={service.value}>{service.type}</option>
            ))}
          </select>
          <button
            onClick={buttonHandler}
            class=" my-4 w-6/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>{" "}
      </div>
    </div>
  );
}
