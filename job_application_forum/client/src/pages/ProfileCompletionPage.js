import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import J1 from "../components/JobseekerProfileComponent/J1";
import J2 from "../components/JobseekerProfileComponent/J2";
import J3 from "../components/JobseekerProfileComponent/J3";
import J4 from "../components/JobseekerProfileComponent/J4";
import J5 from "../components/JobseekerProfileComponent/J5";
import E1 from "../components/EmployerProfileComponent/E1";
import E2 from "../components/EmployerProfileComponent/E2";
import E3 from "../components/EmployerProfileComponent/E3";
import E4 from "../components/EmployerProfileComponent/E4";
import E5 from "../components/EmployerProfileComponent/E5";
import Loading from "../components/Loading";
import logo from "../utils/Logo.jpeg";
import axios from "axios";

const initialJObSeekerUserDetails = {
  userId: "",
  personalInformation: {
    fullName: {
      firstname: "",
      lastname: "",
    },
    dateOfBirth: "",
    gender: "",
    contactInformation: {
      email: "",
      phone: "",
    },
    locationDetails: {
      currentLocation: "",
      preferredJobLocations: [],
    },
    professionalHeadline: "",
  },
  professionalExperience: {
    employmentHistory: [],
    skills: {
      technical: [],
      soft: [],
    },
  },
  education: {
    educationalBackground: [],
    certificationsAndCourses: {
      certifications: [],
      professionalDevelopmentCourses: [],
    },
  },
  jobPreferences: {
    desiredJobTitles: [],
    industryPreferences: [],
    employmentType: "",
    salaryExpectations: "",
    workAuthorization: "",
  },
  additionalInformation: {
    portfolioOrWorkSamples: "",
    languages: [],
    additionalComments: "",
  },
};

const initialEmployerDetails = {
  userId:"",
  basicInformation: {
    companyName: "",
    industry: "",
    yearFounded: "",
    companySize: "",
    headquartersLocation: "",
    websiteURL: "",
  },
  companyOverview: {
    missionStatement: "",
    uniqueSellingPoints: "",
    productsOrServices: "",
    hiringProcessAndExpectations: {
      hiringProcessOverview: "",
      candidateCriteria: "",
    },
  },
  jobOpportunities: {
    currentOpenings: [
      {
        jobTitle: "",
        jobDescription: "",
        requiredQualifications: {
          education: [],
          min_experience: "",
        },
        skillsNeeded: {
          technical: [],
          soft: [],
        },
        salaryRange: "",
      },
    ],
  },
  teamAndCulture: {
    leadershipTeam: [
      {
        name: "",
        title: "",
        bio: "",
      },
    ],
    cultureDescription: "",
    coreValues: "",
    employeeBenefits: "",
  },
  contactInformation: {
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country:"",
      zip: "",},
    linkedIn: "",
    twitter: "",
  },
};

const ProfileCompletionPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");
  const [userDetails, setUserDetails] = useState(initialJObSeekerUserDetails);
  const [employerDetails, setEmployerDetails] = useState(
    initialEmployerDetails
  );
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  useEffect(() => {
    if(currentStep === 6){
      postData();
    }
  }, [currentStep]);
  const postData = async () => {
    if (currentStep === 6) {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.userType === "job_seeker") {
        // const response = await axios.post(
        //   `/api${location.pathname}?${searchParams}`,
        //   userDetails
        // );
        console.log(userDetails)
        // if (response.status === 201) {
        //   navigate(`/dashboard`);
        // }
      } else {
        const response = await axios.post(
          `/api${location.pathname}?${searchParams}`,
          employerDetails
        );
        if (response.status === 201) {
          navigate(`/dashboard`);
        }
      }
    }
  };
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setUserType(() => searchParams.get("userType"));
    fetchData();
    console.log();
    setLoading(false);
  }, [location.search]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/profile-completion-page");
      if (response.status === 404) {
        navigate("/login");
      } else {
        const data = await response.json();
        console.log(data);
        if (data.userType !== userType) {
          navigate(`/profile-completion-page?userType=${data.userType}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderJobSeekerComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <J1
            onPrev={handlePrevious}
            onNext={handleNext}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      case 2:
        return (
          <J2
            onPrev={handlePrevious}
            onNext={handleNext}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      case 3:
        return (
          <J3
            onPrev={handlePrevious}
            onNext={handleNext}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      case 4:
        return (
          <J4
            onPrev={handlePrevious}
            onNext={handleNext}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      case 5:
        return (
          <J5
            onPrev={handlePrevious}
            onNext={handleNext}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      default:
        return null;
    }
  };
  const renderEmployerSeekerComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <E1
            onPrev={handlePrevious}
            onNext={handleNext}
            employerDetails={employerDetails}
            setEmployerDetails={setEmployerDetails}
          />
        );
      case 2:
        return (
          <E2
            onPrev={handlePrevious}
            onNext={handleNext}
            employerDetails={employerDetails}
            setEmployerDetails={setEmployerDetails}
          />
        );
      case 3:
        return (
          <E3
            onPrev={handlePrevious}
            onNext={handleNext}
            employerDetails={employerDetails}
            setEmployerDetails={setEmployerDetails}
          />
        );
      case 4:
        return (
          <E4
            onPrev={handlePrevious}
            onNext={handleNext}
            employerDetails={employerDetails}
            setEmployerDetails={setEmployerDetails}
          />
        );
      case 5:
        return (
          <E5
            onPrev={handlePrevious}
            onNext={handleNext}
            employerDetails={employerDetails}
            setEmployerDetails={setEmployerDetails}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex justify-center items-center overflow-hidden   min-h-screen min-w-screen bg-slate-300 dark:bg-black">
      <Background />

      <div className="flex   gap-5  justify-center items-center bg-[rgba(255, 255, 255, 0.1)] p-5   backdrop-blur-sm  flex-col">
        <img className="h-32 " src={logo} alt="logo" />
        {loading ? (
          <Loading />
        ) : userType === "job_seeker" ? (
          renderJobSeekerComponent()
        ) : (
          renderEmployerSeekerComponent()
        )}
      </div>
    </div>
  );
};

export default ProfileCompletionPage;
