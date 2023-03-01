import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import TodaysReservations from "./TodaysReservations";
import Allreservations from "./AllReservations";
import Settings from "./Settings";
import AddReservation from "./AddReservation";
import Search from "./Search";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
  const [chosen, setChosen] = useState(1);
  const logoutHandler = () => {
    removeCookie("loggedIn");
  };
  const clickHandler = (event) => {
    setChosen(Number(event.target.value));
  };
  const renderSwitch = (param) => {
    switch (param) {
      case 1:
        return <Allreservations></Allreservations>;
      case 2:
        return <AddReservation />;
      case 4:
        return <Settings />;
      case 6:
        return <TodaysReservations />;
      default:
        return <Allreservations />;
    }
  };
  useEffect(() => {
    if (cookies.loggedIn == false || cookies.loggedIn == undefined) {
      navigate("/login");
    }
    console.log(cookies.loggedIn);
  }, [cookies]);
  return (
    <div className="grid grid-cols-6">
      <div className="bg-sky-300 h-screen grid grid-rows-5">
        <button
          onClick={clickHandler}
          value={1}
          className={` font-bold flex items-center justify-center bg-blue-100 hover:bg-blue-400 ${
            chosen === 1 ? "bg-blue-400" : ""
          } `}
        >
          All Reservations
        </button>
        <button
          onClick={clickHandler}
          value={2}
          className={` font-bold flex items-center justify-center bg-blue-100 hover:bg-blue-400 ${
            chosen === 2 ? "bg-blue-400" : ""
          } `}
        >
          Add Reservations
        </button>

        <button
          onClick={clickHandler}
          value={6}
          className={` font-bold flex items-center justify-center bg-blue-100 hover:bg-blue-400 ${
            chosen === 4 ? "bg-blue-400" : ""
          } `}
        >
          Todays Reservations
        </button>
        <button
          onClick={clickHandler}
          value={4}
          className={` font-bold flex items-center justify-center bg-blue-100 hover:bg-blue-400 ${
            chosen === 4 ? "bg-blue-400" : ""
          } `}
        >
          Settings
        </button>
        <button
          value={5}
          className={` font-bold flex items-center justify-center bg-blue-100 hover:bg-blue-400 ${
            chosen === 5 ? "bg-blue-400" : ""
          } `}
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <div className=" col-span-5 bg-sky-100 h-screen">
        {renderSwitch(chosen)}
      </div>
    </div>
  );
}
