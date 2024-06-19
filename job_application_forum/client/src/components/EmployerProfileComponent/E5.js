import React, { useEffect, useState } from "react";

const E5 = ({ onNext, onPrev, employerDetails, setEmployerDetails }) => {
  const initialFormData = {
    email: employerDetails.contactInformation.email || "",
    phone: employerDetails.contactInformation.phone || "",
    address: {
      street: employerDetails.contactInformation.address.street || "",
      city: employerDetails.contactInformation.address.city || "",
      state: employerDetails.contactInformation.address.state || "",
      country: employerDetails.contactInformation.address.country || "",
      zip: employerDetails.contactInformation.address.zip || "",
    },
    linkedIn: employerDetails.contactInformation.linkedIn || "",
    twitter: employerDetails.contactInformation.twitter || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name.includes(".")){
      const [parent,child] = name.split(".");
      setFormData((prev)=>({
       ...prev,
        [parent]:{
         ...prev[parent],
          [child]:value
        }
      }))
    }
else{

  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
}
  };

  const handleSubmit = (e) => {
    setEmployerDetails((prevDetails) => ({
      ...prevDetails,
      contactInformation: formData,
    }));
   
  };


  return (
    <form
      className="p-4 flex flex-col gap-5 text-slate-700 dark:text-slate-300"
      onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit()
        onNext();
      }}
    >
      <h2 className="self-center text-4xl">Step 5: Contact Information</h2>

      <label className="text-xl cursor-pointer">
        Email:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="text-xl cursor-pointer">
        Phone:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </label>
      <h2></h2>
      <h3 className="text-2xl">Address:</h3>
      <label className="text-xl cursor-pointer ml-3">
        Street:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className="text-xl cursor-pointer ml-3">
        City:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="text-xl cursor-pointer ml-3">
        State:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="address.state"
          value={formData.address.state}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className="text-xl cursor-pointer ml-3">
        Country:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="address.country"
          value={formData.address.country}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className="text-xl cursor-pointer ml-3">
        ZIP:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="address.zip"
          value={formData.address.zip}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="text-xl cursor-pointer">
        LinkedIn:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="linkedIn"
          value={formData.linkedIn}
          onChange={handleInputChange}
        />
      </label>

      <label className="text-xl cursor-pointer">
        Twitter:
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={handleInputChange}
        />
      </label>

      <div className="flex self-end gap-5">
          <button
            className="self-end bg-yellow-300 px-3 py-2 text-xl dark:text-slate-800" 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
              onPrev();
            }}
          >
            &lt;-Prev
          </button>
          <button
            className="self-end bg-yellow-300 px-3 py-2 text-xl dark:text-slate-800"
            type="submit"
          >
            Submit;
          </button>
        </div>
    </form>
  );
};

export default E5;
