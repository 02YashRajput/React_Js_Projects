export const signUpSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
  userType: {
    notEmpty: {
      errorMessage: "userType cannot be empty",
    },
  },
};

export const loginSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
};

export const jobSeekerProfileSchema = {
  personalInformation: {
    fullName: {
      firstname: {
        notEmpty: {
          errorMessage: "First name cannot be empty",
        },
        isString: {
          errorMessage: "First name must be a string!",
        },
      },
      lastname: {
        notEmpty: {
          errorMessage: "Last name cannot be empty",
        },
        isString: {
          errorMessage: "Last name must be a string!",
        },
      },
    },
    dateOfBirth: {
      notEmpty: {
        errorMessage: "Date of birth cannot be empty",
      },
    },
    gender: {
      notEmpty: {
        errorMessage: "Gender cannot be empty",
      },
    },
    contactInformation: {
      email: {
        notEmpty: {
          errorMessage: "Email cannot be empty",
        },
        isString: {
          errorMessage: "Email must be a string!",
        },
      },
      phone: {
        notEmpty: {
          errorMessage: "Phone number cannot be empty",
        },
      },
    },
    locationDetails: {
      currentLocation: {
        notEmpty: {
          errorMessage: "Current location cannot be empty",
        },
      },
      preferredJobLocations: {
        isArray: {
          errorMessage: "Preferred job locations must be an array",
        },
      },
    },
    professionalHeadline: {
      notEmpty: {
        errorMessage: "Professional headline cannot be empty",
      },
    },
  },
  professionalExperience: {
    employmentHistory: {
      isArray: {
        errorMessage: "Employment history must be an array",
      },
    },
    skills: {
      technical: {
        isArray: {
          errorMessage: "Technical skills must be an array",
        },
      },
      soft: {
        isArray: {
          errorMessage: "Soft skills must be an array",
        },
      },
    },
  },
  education: {
    educationalBackground: {
      isArray: {
        errorMessage: "Educational background must be an array",
      },
    },
    certificationsAndCourses: {
      certifications: {
        isArray: {
          errorMessage: "Certifications must be an array",
        },
      },
      professionalDevelopmentCourses: {
        isArray: {
          errorMessage: "Professional development courses must be an array",
        },
      },
    },
  },
  jobPreferences: {
    desiredJobTitles: {
      isArray: {
        errorMessage: "Desired job titles must be an array",
      },
    },
    industryPreferences: {
      isArray: {
        errorMessage: "Industry preferences must be an array",
      },
    },
    employmentType: {
      notEmpty: {
        errorMessage: "Employment type cannot be empty",
      },
    },
    salaryExpectations: {
      notEmpty: {
        errorMessage: "Salary expectations cannot be empty",
      },
    },
    workAuthorization: {
      notEmpty: {
        errorMessage: "Work authorization cannot be empty",
      },
    },
  },
  additionalInformation: {
    portfolioOrWorkSamples: {
      notEmpty: {
        errorMessage: "Portfolio or work samples cannot be empty",
      },
    },
    languages: {
      isArray: {
        errorMessage: "Languages must be an array",
      },
    },
    additionalComments: {
      notEmpty: {
        errorMessage: "Additional comments cannot be empty",
      },
    },
  },
};



export const employerDetailsSchema =  {
  basicInformation: {
    companyName: {
      notEmpty: {
        errorMessage: "Company name cannot be empty",
      },
    },
    industry: {
      notEmpty: {
        errorMessage: "Industry cannot be empty",
      },
    },
    yearFounded: {
      notEmpty: {
        errorMessage: "Year founded cannot be empty",
      },
    },
    companySize: {
      notEmpty: {
        errorMessage: "Company size cannot be empty",
      },
    },
    headquartersLocation: {
      notEmpty: {
        errorMessage: "Headquarters location cannot be empty",
      },
    },
    websiteURL: {
      notEmpty: {
        errorMessage: "Website URL cannot be empty",
      },
      isURL: {
        errorMessage: "Invalid URL format",
      },
    },
  },
  companyOverview: {
    missionStatement: {
      notEmpty: {
        errorMessage: "Mission statement cannot be empty",
      },
    },
    uniqueSellingPoints: {
      notEmpty: {
        errorMessage: "Unique selling points cannot be empty",
      },
    },
    productsOrServices: {
      notEmpty: {
        errorMessage: "Products or services description cannot be empty",
      },
    },
    hiringProcessAndExpectations: {
      hiringProcessOverview: {
        notEmpty: {
          errorMessage: "Hiring process overview cannot be empty",
        },
      },
      candidateCriteria: {
        notEmpty: {
          errorMessage: "Candidate criteria cannot be empty",
        },
      },
    },
  },
  jobOpportunities: {
    currentOpenings: {
      isArray: {
        errorMessage: "Current openings must be an array",
      },
     
    },
  },
  teamAndCulture: {
    leadershipTeam: {
      isArray: {
        errorMessage: "Leadership team must be an array",
      },
    },
    cultureDescription: {
      notEmpty: {
        errorMessage: "Culture description cannot be empty",
      },
    },
    coreValues: {
      notEmpty: {
        errorMessage: "Core values cannot be empty",
      },
    },
    employeeBenefits: {
      notEmpty: {
        errorMessage: "Employee benefits cannot be empty",
      },
    },
  },
  contactInformation: {
    email: {
      notEmpty: {
        errorMessage: "Email cannot be empty",
      },
      isEmail: {
        errorMessage: "Invalid email format",
      },
    },
    phone: {
      notEmpty: {
        errorMessage: "Phone number cannot be empty",
      },
    },
    address: {
      street: {
        notEmpty: {
          errorMessage: "Street address cannot be empty",
        },
      },
      city: {
        notEmpty: {
          errorMessage: "City cannot be empty",
        },
      },
      state: {
        notEmpty: {
          errorMessage: "State cannot be empty",
        },
      },
      country: {
        notEmpty: {
          errorMessage: "Country cannot be empty",
        },
      },
      zip: {
        notEmpty: {
          errorMessage: "ZIP code cannot be empty",
        },
      },
    },
    linkedIn: {
      isURL: {
        errorMessage: "Invalid LinkedIn URL format",
      },
    },
    twitter: {
      isURL: {
        errorMessage: "Invalid Twitter URL format",
      },
    },
  },
};