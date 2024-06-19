import React, { useState } from "react";
import { toast } from "react-toastify";

const J1 = ({ onNext, onPrev, userDetails, setUserDetails }) => {
  const [formData, setFormData] = useState({
    firstname: userDetails.personalInformation.fullName.firstname || "",
    lastname: userDetails.personalInformation.fullName.lastname || "",
    dateOfBirth: userDetails.personalInformation.dateOfBirth || "",
    gender: userDetails.personalInformation.gender || "",
    email: userDetails.personalInformation.contactInformation.email || "",
    phone: userDetails.personalInformation.contactInformation.phone || "",
    currentLocation:
      userDetails.personalInformation.locationDetails.currentLocation || "",
    preferredJobLocations:
      userDetails.personalInformation.locationDetails.preferredJobLocations.join(
        ","
      ) || "",
    professionalHeadline:
      userDetails.personalInformation.professionalHeadline || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Update userDetails object with the new personal information
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      personalInformation: {
        ...prevUserDetails.personalInformation,
        fullName: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        contactInformation: {
          email: formData.email,
          phone: formData.phone,
        },
        locationDetails: {
          currentLocation: formData.currentLocation,
          preferredJobLocations: formData.preferredJobLocations.split(","),
        },
        professionalHeadline: formData.professionalHeadline,
      },
    }));
    // Proceed to the next step
  };
  return (
    <form
      className="p-4 flex flex-col text-slate-700 gap-5 dark:text-slate-300"
      onSubmit={(e) => {
        e.preventDefault();
        if(formData.gender === ""){
          toast.error("Please select a gender");
        }
        else{

          handleSubmit();
          onNext();
        }
      }}
    >
      <h2 className="self-center text-4xl ">Step 1: Personal Details:</h2>
      <label className="text-xl cursor-pointer  ">
        First Name:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          placeholder="John"
          required
        />
      </label>
      <label className="text-xl cursor-pointer  ">
        Last Name:
        <input
          className="cursor-pointer mt-3   border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          placeholder="WeiBer"
          required
        />
      </label>

      <label className="cursor-pointer  ">
        Date of Birth:
        <input
          className="cursor-pointer mt-3   border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />
      </label>

      <div>
        Gender:
        <input
          className="ml-4 mr-1 mt-3  cursor-pointer bg-transparent dark:border-slate-400 "
          type="radio"
          id="male"
          value="male"
          checked={formData.gender === "male"}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
        <label className="cursor-pointer  " htmlFor="male">
          Male
        </label>
        <input
          className="ml-4 mr-1  mt-3 cursor-pointer  bg-transparent dark:border-slate-400"
          type="radio"
          id="female"
          value="female"
          checked={formData.gender === "female"}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
        <label className="cursor-pointer  " htmlFor="female">
          Female
        </label>
      </div>

      <label className="cursor-pointer">
        Email:
        <input
          className="border cursor-pointer mt-3   ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="ABC@example.com"
          required
        />
      </label>
      <label className="cursor-pointer">
        Phone:
        <input
          className="border cursor-pointer mt-3    ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="0101-0101-01"
          required
        />
      </label>
      <label className="cursor-pointer text-xl">
        Current Location:
        <input
          className="border cursor-pointer mt-3   ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="currentLocation"
          value={formData.currentLocation}
          onChange={handleInputChange}
          placeholder="Enter Your Address here..."
          required
        />
      </label>
      <label className="cursor-pointer text-xl">
        Preferred Job Locations:
        <input
          className="border cursor-pointer mt-3   ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="preferredJobLocations"
          value={formData.preferredJobLocations}
          placeholder="A City, B City, C City, D City"
          onChange={handleInputChange}
        />
      </label>
      <label className="cursor-pointer text-xl">
        Professional Headline:
        <input
          className="border cursor-pointer mt-3   ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="professionalHeadline"
          value={formData.professionalHeadline}
          placeholder="Enter Your Professional Headline here..."
          onChange={handleInputChange}
          required
        />
      </label>
      <button
        className="self-end bg-yellow-300 px-3 py-2 text-xl dark:text-slate-800"
        type="submit"
      >
        Next-&gt;
      </button>
    </form>
  );
};

export default J1;
