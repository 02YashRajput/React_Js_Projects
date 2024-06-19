import React, { useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import {toast} from "react-toastify"
const E4 = ({ onNext, onPrev, employerDetails, setEmployerDetails }) => {
  const [cultureInfo, setCultureInfo] = useState({
    leadershipTeam: employerDetails.teamAndCulture.leadershipTeam.length>0 ? employerDetails.teamAndCulture.leadershipTeam.map((member) => ({
      name: member.name || '',
      title: member.title || '',
      bio: member.bio || ''
    })) : {
      name: '',
      title: '',
      bio: ''
    },
    cultureDescription: employerDetails.teamAndCulture.cultureDescription || '',
    coreValues: employerDetails.teamAndCulture.coreValues || '',
    employeeBenefits: employerDetails.teamAndCulture.employeeBenefits || ''
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCultureInfo((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setCultureInfo((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleInputChangeLeadership = (index,e)=>{
    const { value, name } = e.target;
    const updatedLeadership = [...cultureInfo.leadershipTeam];
    updatedLeadership[index][name] = value;
    setCultureInfo((prev) => ({
     ...prev,
      leadershipTeam: updatedLeadership
    }));

  }
  const removeLeadership = (index) => {
    if (cultureInfo.leadershipTeam.length === 1) {
      toast.error("Please fill atleast one");
    } else {
      const updatedcultureInfo = cultureInfo.leadershipTeam.filter(
        (_, idx) => idx !== index
      );

      setCultureInfo((prev)=>({...prev,leadershipTeam : updatedcultureInfo}));
    }
  };

  const addnewLeadership = ()=>{
    setCultureInfo((prev)=>({
      ...prev,
      leadershipTeam: [...prev.leadershipTeam, {
        name: '',
        title: '',
        bio: ''
      }]
    }))
  }

  const handleSubmit = () => {
    setEmployerDetails((prev) => ({
      ...prev,
      teamAndCulture: cultureInfo
    }));
  };


  useEffect(() => {
    console.log(cultureInfo);
  }, [cultureInfo]);

  useEffect(()=>{
    console.log(employerDetails);
  },[employerDetails])

  return (
    <form
      className="p-4 flex flex-col text-slate-700 gap-5 dark:text-slate-300"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        onNext();
      }}
    >
      <h2 className="self-center text-4xl">Team and Culture Details:</h2>


      <h3 className="text-2xl mt-5">Leadership Team:</h3>
      {cultureInfo.leadershipTeam.map((member, index) => (
        <div key={index} className="flex flex-col relative gap-3">
          <label className="text-xl ml-3 cursor-pointer">
            Name:
            <input
              className="cursor-pointer mt-3 border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
              type="text"
              name="name"
              value={member.name}
              onChange={(e)=>handleInputChangeLeadership(index,e)}
              placeholder="Enter name"
            />
          </label>
          <label className="text-xl ml-3 cursor-pointer">
            Title:
            <input
              className="cursor-pointer mt-3 border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
              type="text"
              name="title"
              value={member.title}
              onChange={(e)=>handleInputChangeLeadership(index,e)}
              placeholder="Enter title"
            />
          </label>
          <label className="text-xl ml-3 cursor-pointer">
            Bio:
            <input
            type='text'
              className="cursor-pointer mt-3 border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
              name="bio"
              value={member.bio}
              onChange={(e)=>handleInputChangeLeadership(index,e)}
              placeholder="Enter bio"
            />
          </label>
          <button
              className="absolute top-0 right-5 text-4xl hover:bg-[rgba(255,255,255,0.1)] p-1 rounded-full light:text-red-600 "
              type="button"
              onClick={() => {
                removeLeadership(index);
              }}
            >
              {" "}
              <IoIosClose />
            </button>
        </div>
      ))}

<button
        className="self-end flex items-center gap-2 bg-blue-300 rounded-md px-3 py-2 text-xl dark:text-slate-800"
        type="button"
        onClick={addnewLeadership}
      >
        Add New Job <GrAdd className=" text-xl text-red-600 font-bold" />
      </button>


      <label className="text-xl cursor-pointer">
        Culture Description:
        <input
        type='text'
        
          className="cursor-pointer mt-3 border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          name="cultureDescription"
          value={cultureInfo.cultureDescription}
          onChange={handleInputChange}
          placeholder="Describe your company culture"
          required
        />
      </label>

      <label className="text-xl cursor-pointer">
        Core Values:
        <input
          className="cursor-pointer mt-3 border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="coreValues"
          value={cultureInfo.coreValues}
          onChange={handleInputChange}
          placeholder="List core values"
          required
        />
      </label>

      <label className="text-xl cursor-pointer">
        Employee Benefits:
        <input
          className="cursor-pointer mt-3 border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="employeeBenefits"
          value={cultureInfo.employeeBenefits}
          onChange={handleInputChange}
          placeholder="Describe employee benefits"
          required
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
          Next-&gt;
        </button>
      </div>
    </form>
  );
};

export default E4;
