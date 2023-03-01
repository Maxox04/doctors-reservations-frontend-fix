import React, { useEffect, useState } from "react";
import { Doctor, Patient, Reservation } from "./AddReservation";
import { ImBin } from "react-icons/im";

function TodaysReservations() {
  const [reservations, setReservations] = useState([]);
  const [reservationsWithId, setReservationsWithId] = useState([]);
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
  useEffect(() => {
    const execute = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/reservation/all-reservation"
      );
      const responseJSON = await response.json();
      console.log(responseJSON.reservations);
      setReservationsWithId(responseJSON.reservations);
      const reservations = [];
      responseJSON.reservations.forEach((res) => {
        console.log(res.Date);
        const patientJSON = JSON.parse(res.Patient);
        const doctorJSON = JSON.parse(res.Doctor);
        console.log(patientJSON);
        const resDate = res.Date.slice(0, 10);
        const todaysDate = new Date().toISOString().split("T")[0];
        console.log(todaysDate);
        if (resDate == todaysDate) {
          reservations.push(
            new Reservation(
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
            )
          );
        }
      });
      console.log("reservations:", reservations);
      setReservations(reservations);
    };
    execute();
    //download all reservations
    //filter them with todays date
  }, []);
  return (
    <div>
      <div className=" rounded-xl bg-sky-200 h-screen overflow-scroll m-10 pb-3">
        <h1 className=" text-5xl font-bold p-3">Today's Reservations</h1>
        <div className="h-full mx-5 rounded-xl bg-sky-100 my-6 p-2">
          <div className="flex flex-col gap-2 ml-3">
            {reservations.length == 0 ? (
              <a className="font-bold text-3xl">No reservations found</a>
            ) : (
              reservations.map((reservation, index) => (
                <div className="w-600 rounded-xl self-center p-2 my-3 bg-sky-200 flex flex-col">
                  <h1 className="text-2xl font-bold">{reservation?.title}</h1>
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
                          <h3 className="font-bold ">
                            {" "}
                            {reservation.roomNumber}
                          </h3>
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
      </div>
    </div>
  );
}

export default TodaysReservations;
