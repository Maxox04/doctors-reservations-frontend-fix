import React, { useState } from "react";

export class Patient {
  constructor(
    patientName,
    patientSurname,
    patientEmail,
    patientPhone,
    patientPesel
  ) {
    this.patientName = patientName;
    this.patientSurname = patientSurname;
    this.patientEmail = patientEmail;
    this.patientPhone = patientPhone;
    this.patientPesel = patientPesel;
  }
}
export class Doctor {
  constructor(doctorName, specialization) {
    this.doctorName = doctorName;
    this.specialization = specialization;
  }
}
export class Reservation {
  constructor(date, title, description, roomNumber, patient, doctor) {
    this.date = date;
    this.title = title;
    this.description = description;
    this.roomNumber = roomNumber;
    this.patient = patient;
    this.doctor = doctor;
  }
}
export default function AddReservation() {
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validateOnlyLetters = (string) => {
    return string.toLowerCase().match(/^[a-zA-Z]+$/);
  };
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientSurname, setPatientSurname] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPesel, setPatientPesel] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Input is not valid");
  const titleHandler = (event) => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const patientNameHandler = (event) => {
    setPatientName(event.target.value);
  };
  const patientSurnameHandler = (event) => {
    setPatientSurname(event.target.value);
  };
  const patientPhoneHandler = (event) => {
    setPatientPhone(event.target.value);
  };
  const patientEmailHandler = (event) => {
    setPatientEmail(event.target.value);
  };
  const patientPeselHandler = (event) => {
    setPatientPesel(event.target.value);
  };
  const doctorNameHandler = (event) => {
    console.log(event.target.value);
    setDoctorName(event.target.value);
  };
  const roomNumberHandler = (event) => {
    setRoomNumber(event.target.value);
  };
  const dateHandler = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
  };
  const cancelHandler = () => {
    setTitle("");
    setDescription("");
    setPatientName("");
    setPatientSurname("");
    setPatientPhone("");
    setPatientEmail("");
    setPatientPesel("");
    setDoctorName("");
    setRoomNumber("");
    setDate("");
    setSuccess(false);
    setIsValid(true);
  };
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
  /* const saveHandler = () => {
    if (
      title.length == 0 ||
      description.length == 0 ||
      patientName.length == 0 ||
      patientSurname.length == 0 ||
      patientPhone.length == 0 ||
      patientEmail.length == 0 ||
      patientPesel.length == 0 ||
      doctorName.length == 0 ||
      roomNumber.length == 0 ||
      date.length == 0
    ) {
      setIsValid(false);
    } else {
      const patient = new Patient(
        patientName,
        patientSurname,
        patientEmail,
        patientPhone,
        patientPesel
      );
      console.log(patient);
      const reservation = {
        title,
        description,
        patientName,
        patientSurname,
        patientPhone,
        patientEmail,
        patientPesel,
        doctorName,
        roomNumber,
        date,
      };
      console.log(reservation);
      array.push(reservation);
    }
  };
*/
  const saveHandler = async () => {
    if (
      title.length == 0 ||
      description.length == 0 ||
      patientName.length == 0 ||
      patientSurname.length == 0 ||
      patientPhone.length == 0 ||
      patientEmail.length == 0 ||
      patientPesel.length != 11 ||
      doctorName.length == 0 ||
      roomNumber.length == 0 ||
      date.length == 0 ||
      !validateEmail(patientEmail) ||
      !validateOnlyLetters(patientName) ||
      !validateOnlyLetters(patientSurname)
    ) {
      console.log("Error occured");
      if (!validateEmail(patientEmail)) {
        setErrorMessage("Email adress is not valid.");
        setIsValid(false);
        return;
      }
      if (patientPesel.length != 11) {
        setErrorMessage("Pesel number is not of valid form.");
        setIsValid(false);
        return;
      }

      if (!validateOnlyLetters(doctorName)) {
        setErrorMessage("Doctor name does not contain only letters.");
        setIsValid(false);
        return;
      }
      if (!validateOnlyLetters(patientSurname)) {
        setErrorMessage("Patient Surname name does not contain only letters.");
        setIsValid(false);
        return;
      }
      if (!validateOnlyLetters(patientName)) {
        setErrorMessage("Patient name does not contain only letters.");
        setIsValid(false);
        return;
      }
      setIsValid(false);
      return;
    } else {
      const patient = new Patient(
        patientName,
        patientSurname,
        patientEmail,
        patientPhone,
        patientPesel
      );
      const doctor = new Doctor(doctorName, "Surgeon");
      const reservation = new Reservation(
        date,
        title,
        description,
        roomNumber,
        patient,
        doctor
      );

      //add elems to db
      //add patient
      const responsePatient = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/patient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PatientName: patient.patientName,
            PatientSurname: patient.patientSurname,
            PatientEmail: patient.patientEmail,
            PatientPhone: patient.patientEmail,
            PatientPesel: patient.patientPesel,
          }),
        }
      );
      //add doctor
      // const responseDoctor = await fetch("http://localhost:3000/doctor", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     Name: doctor.doctorName,
      //     Phone: "333444555",
      //     Specialization: doctor.specialization,
      //   }),
      // });
      const responseReservation = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/reservation/add-reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Patient: JSON.stringify(reservation.patient),
            Doctor: JSON.stringify(reservation.doctor),
            Date: reservation.date.toString(),
            Title: reservation.title,
            Description: reservation.description,
            RoomNumber: reservation.roomNumber,
          }),
        }
      );
      cancelHandler();
      setSuccess(true);
    }
  };

  return (
    <div>
      <div className=" rounded-xl bg-sky-200 h-screen overflow-scroll m-10 pb-2">
        <h1 className=" text-5xl font-bold p-3">ADD RESERVATION</h1>
        <div className="h-full mx-5 rounded-xl bg-sky-100 py-6 ">
          <div className="m-6 w-4/12">
            <h2 className="font-bold">Type</h2>
            {/* <input
              onChange={titleHandler}
              value={title}
              placeholder="Title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
  />*/}
            <select
              onChange={titleHandler}
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
          </div>
          <div className="m-6 w-4/1 ">
            <h2 className="font-bold">Description</h2>
            <input
              onChange={descriptionHandler}
              value={description}
              placeholder="Description"
              className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12 ">
            <h2 className="font-bold">Patient Name</h2>
            <input
              onChange={patientNameHandler}
              value={patientName}
              placeholder="Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12 ">
            <h2 className="font-bold">Patient Surname</h2>
            <input
              onChange={patientSurnameHandler}
              value={patientSurname}
              placeholder="Surname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12 ">
            <h2 className="font-bold">Phone</h2>
            <input
              onChange={patientPhoneHandler}
              value={patientPhone}
              placeholder="Phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12 ">
            <h2 className="font-bold">Email</h2>
            <input
              onChange={patientEmailHandler}
              value={patientEmail}
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12 ">
            <h2 className="font-bold">Pesel</h2>
            <input
              onChange={patientPeselHandler}
              value={patientPesel}
              placeholder="Pesel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12 ">
            <h2 className="font-bold">Dr Name</h2>
            {/* <input
              onChange={doctorNameHandler}
              value={doctorName}
              placeholder="Dr Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />*/}
            <select
              onChange={doctorNameHandler}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={doctorName} selected>
                Choose a doctor
              </option>
              {polishNames.map((doctor) => (
                <option value={doctor.name}>{doctor.name}</option>
              ))}
            </select>
          </div>
          <div className="m-6 w-4/12 ">
            <h2 className="font-bold">Room</h2>
            <input
              onChange={roomNumberHandler}
              value={roomNumber}
              placeholder="Room number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="m-6 w-4/12 ">
            <h2 className="font-bold">Date</h2>
            <input
              type="datetime-local"
              onChange={dateHandler}
              value={date}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          {!isValid && <p className="text-red-500">{errorMessage}</p>}
          {success && (
            <p className="text-green-500">{"Reservation added succesfully!"}</p>
          )}
          <div className="font-bold flex p-6 gap-2">
            <button
              onClick={saveHandler}
              class=" w-2/12 my-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
            <button
              onClick={cancelHandler}
              class="  w-2/12 my-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
