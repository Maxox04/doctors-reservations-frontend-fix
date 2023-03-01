import React, { useState, useEffect } from "react";
import { ImBin } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import { Doctor, Patient, Reservation } from "./AddReservation";

function AllReservations() {
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
  const [reservations, setReservations] = useState([]);
  const [reservationsCopy, setReservationsCopy] = useState([]);

  const [reservationsWithId, setReservationsWithId] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  //retrieving reservations form the db
  useEffect(() => {
    const execute = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/reservation/all-reservation"
      );
      const responseJSON = await response.json();
      console.log(responseJSON.reservations);
      setReservationsWithId(responseJSON.reservations);
      const reservations = responseJSON.reservations.map((res) => {
        console.log(res.Date);
        const patientJSON = JSON.parse(res.Patient);
        const doctorJSON = JSON.parse(res.Doctor);
        return new Reservation(
          res.Date,
          res.Title,
          res.Description,
          res.RoomNumber,
          new Patient(
            patientJSON.patientName,
            patientJSON.patientSurname,
            patientJSON.patientEmail,
            patientJSON.patientPhone,
            patientJSON.patientPesel
          ),
          new Doctor(doctorJSON.doctorName, doctorJSON.specialization)
        );
      });
      setReservations(reservations);
      setReservationsCopy(reservations);
    };
    execute();
  }, []);

  const [option, setOption] = useState("default");

  const [input, setInput] = useState("");
  const serviceTypeHandler = (event) => {
    const filteredReservations = reservationsCopy.filter((res) => {
      return res["title"].toLocaleLowerCase().includes(event.target.value);
    });

    setReservations(filteredReservations);
    console.log(event.target.value);
  };
  const dateHandler = (event) => {
    const filteredReservations = reservationsCopy.filter((res) => {
      return res.date.slice(0, 10).includes(event.target.value);
    });
    setReservations(filteredReservations);
  };
  const doctorHandler = (event) => {
    const filteredReservations = reservationsCopy.filter((res) => {
      return res.doctor.doctorName.includes(event.target.value);
    });

    setReservations(filteredReservations);
  };
  const deleteHandler = async (event) => {
    console.log(reservationsWithId[event.target.value].Id);
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/reservation/reservation-by-id",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: reservationsWithId[event.target.value].Id }),
      }
    );
    window.location.reload();
  };

  const changeHandler = (event) => {
    setOption(event.target.value);
    console.log(event.target.value);
  };
  const inputHandler = (event) => {
    setInput(event.target.value);
    // const filteredReservations = reservations.filter((res) => {
    //   return res["title"].toLocaleLowerCase().includes(event.target.value);
    // });
    // console.log(filteredReservations);

    // setReservations(filteredReservations);
  };
  const searchHandler = (event) => {
    if (option.length == 0 || option == "default" || input.length == 0) {
      console.log("error");
      setIsInputError(true);
    } else {
      let filteredReservations = reservations.filter((res) => {
        return res[option].toLocaleLowerCase().includes(input);
      });

      console.log(filteredReservations);
      if (filteredReservations.length == 0) {
        setReservations([]);
        setIsSearched(true);
        setIsInputError(false);
        return;
      }
      setReservations(filteredReservations);
      setIsSearched(true);
    }
  };
  const handleCancel = () => {
    const reservations = reservationsWithId.map((res) => {
      const patientJSON = JSON.parse(res.Patient);
      const doctorJSON = JSON.parse(res.Doctor);
      return new Reservation(
        new Date(),
        res.Title,
        res.Description,
        res.RoomNumber,
        new Patient(
          patientJSON.patientName,
          patientJSON.patientSurname,
          patientJSON.patientEmail,
          patientJSON.patientPhone,
          patientJSON.patientPesel
        ),
        new Doctor(doctorJSON.doctorName, doctorJSON.specialization)
      );
    });
    setReservations(reservations);
    setInput("");
    setOption("default");
    setIsSearched(false);
    setIsInputError(false);
  };
  return (
    <div className="overflow-scroll h-screen">
      <div className=" w-full flex flex-col p-3">
        <div className="h-full mx-5 rounded-xl bg-sky-100 py-6 ">
          <div className="grid grid-cols-12 gap-1">
            <input
              onChange={inputHandler}
              value={input}
              className="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            ></input>

            <select
              onChange={changeHandler}
              value={option}
              id="options"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="default" selected>
                Choose an option{" "}
              </option>
              <option value="title">Title</option>
              <option value="description">Description</option>
              <option value="roomNumber">Room Number</option>
            </select>
            <select
              onChange={doctorHandler}
              id="countries"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>
                Choose a doctor
              </option>
              {polishNames.map((doctor) => (
                <option value={doctor.name}>{doctor.name}</option>
              ))}
            </select>
            <input
              type="date"
              onChange={dateHandler}
              //value={date}
              className="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            <select
              onChange={serviceTypeHandler}
              id="countries"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>
                Choose a type of medical service
              </option>
              {services.map((service) => (
                <option value={service.value}>{service.type}</option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={searchHandler}
              class=" my-4 w-6/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
            {isSearched && (
              <button
                onClick={handleCancel}
                class=" my-4 w-6/12 text-white bg-red-300/50 hover:bg-red-600/50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
            )}
          </div>

          {isInputError && (
            <a className="text-red-600 font-bold">
              Error, please provide input and select an option.
            </a>
          )}
        </div>
        {reservations.length == 0 ? (
          <a className="font-bold text-3xl">No reservations found</a>
        ) : (
          reservations.map((reservation, index) => (
            <div className="w-600 rounded-xl self-center p-2 my-3 bg-sky-200 flex flex-col">
              <h1 className="text-2xl font-bold">{reservation.title}</h1>
              <p>{reservation.description}</p>
              <div className="gap-20 flex justify-between rounded-lg bg-sky-100 p-2">
                <div className="p-3">
                  <h2 className="flex gap-2">
                    Name:{" "}
                    <h3 className="font-bold">
                      {reservation.patient.patientName}
                    </h3>{" "}
                  </h2>
                  <h2 className="flex gap-2">
                    Surname:
                    <h3 className="font-bold">
                      {reservation.patient.patientSurname}
                    </h3>
                  </h2>
                  <h2 className="flex gap-2">
                    Phone:{" "}
                    <h3 className="font-bold ">
                      {reservation.patient.patientPhone}
                    </h3>
                  </h2>
                  <h2 className="flex gap-2">
                    Email:{" "}
                    <h3 className="font-bold">
                      {reservation.patient.patientEmail}
                    </h3>
                  </h2>
                  <h2 className="flex gap-2">
                    Pesel:
                    <h3 className="font-bold ">
                      {" "}
                      {reservation.patient.patientPesel}
                    </h3>
                  </h2>
                </div>
                <div className="p-3">
                  <h2 className="flex gap-2">
                    Date:
                    <h3 className="font-bold ">{` ${new Date(
                      reservation.date
                    ).getDate()}-${
                      new Date(reservation.date).getMonth() + 1
                    }-${new Date(reservation.date).getFullYear()}`}</h3>
                  </h2>
                  <div>
                    <h2 className="flex gap-2">
                      Hour:
                      <h3 className="font-bold ">
                        {` ${new Date(reservation.date).getHours()}:${
                          new Date(reservation.date).getMinutes() < 10
                            ? "0" + new Date(reservation.date).getMinutes()
                            : new Date(reservation.date).getMinutes()
                        }`}
                      </h3>
                    </h2>
                    <h2 className="flex gap-2">
                      Doctor Name:
                      <h3 className="font-bold ">
                        {" "}
                        {reservation.doctor.doctorName}
                      </h3>
                    </h2>
                    <h2 className="flex gap-2">
                      Room number:
                      <h3 className="font-bold "> {reservation.roomNumber}</h3>
                    </h2>
                  </div>
                </div>

                <div className="p-3 flex flex-col justify-around">
                  <button
                    onClick={deleteHandler}
                    value={index}
                    className=" bg-sky-300 hover:bg-sky-400 p-3 rounded-xl mx-2"
                  >
                    <ImBin />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllReservations;

/* const array = [
    new Reservation(
      new Date(),
      "task1",
      "opis",
      "101",
      new Patient("jan", "kowalski", "wew@gmail.com", "12233454566", "pesel"),
      new Doctor("Maks Marmol", "stomatolog")
    ),
    new Reservation(
      new Date(),
      "task1",
      "opis",
      "101",
      new Patient("jan", "kowalski", "wew@gmail.com", "12233454566", "pesel"),
      new Doctor("Maks Marmol", "stomatolog")
    ),
    new Reservation(
      new Date(),
      "task1",
      "opis",
      "101",
      new Patient("jan", "kowalski", "wew@gmail.com", "12233454566", "pesel"),
      new Doctor("Maks Marmol", "stomatolog")
    ),
    new Reservation(
      new Date(),
      "task1",
      "opis",
      "101",
      new Patient("jan", "kowalski", "wew@gmail.com", "12233454566", "pesel"),
      new Doctor("Maks Marmol", "stomatolog")
    ),
    new Reservation(
      new Date(),
      "task1",
      "opis",
      "101",
      new Patient("jan", "kowalski", "wew@gmail.com", "12233454566", "pesel"),
      new Doctor("Maks Marmol", "stomatolog")
    ),
    new Reservation(
      new Date(),
      "task1",
      "opis",
      "101",
      new Patient("jan", "kowalski", "wew@gmail.com", "12233454566", "pesel"),
      new Doctor("Maks Marmol", "stomatolog")
    ),
  ];*/
