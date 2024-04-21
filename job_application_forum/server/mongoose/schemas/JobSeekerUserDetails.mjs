import mongoose, { Schema } from "mongoose";

// Define UserDetails schema
const jobSeekerUserDetailsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInformation: {
    fullName: {
      type: Schema.Types.String,
      required: true
    },
    dateOfBirth: {
      type: Schema.Types.Date
    },
    gender: {
      type: Schema.Types.String,
      enum: ['Male', 'Female', 'Other']
    },
    contactInformation: {
      email: {
        type: Schema.Types.String,
        required: true,
        unique: true
      },
      phone: {
        type: Schema.Types.String
      }
    },
    locationDetails: {
      currentLocation: {
        city: {
          type: Schema.Types.String
        },
        state: {
          type: Schema.Types.String
        },
        country: {
          type: Schema.Types.String
        }
      },
      preferredJobLocations: [{
        type: Schema.Types.String
      }]
    },
    professionalHeadline: {
      type: Schema.Types.String
    }
  },
  professionalExperience: {
    employmentHistory: [{
      employer: {
        type: Schema.Types.String
      },
      jobTitle: {
        type: Schema.Types.String
      },
      employmentDuration: {
        startDate: {
          type: Schema.Types.Date
        },
        endDate: {
          type: Schema.Types.Date
        }
      },
      responsibilitiesAndAchievements: {
        type: Schema.Types.String
      }
    }],
    skills: {
      technical: [{
        type: Schema.Types.String
      }],
      soft: [{
        type: Schema.Types.String
      }]
    }
  },
  education: {
    educationalBackground: [{
      degree: {
        type: Schema.Types.String
      },
      institutionName: {
        type: Schema.Types.String
      },
      fieldOfStudy: {
        type: Schema.Types.String
      },
      graduationYear: {
        type: Schema.Types.Number
      }
    }],
    certificationsAndCourses: [{
      name: {
        type: Schema.Types.String
      },
      type: {
        type: Schema.Types.String
      }
    }]
  },
  jobPreferences: {
    desiredJobTitles: [{
      type: Schema.Types.String
    }],
    industryPreferences: [{
      type: Schema.Types.String
    }],
    employmentType: {
      type: Schema.Types.String,
      enum: ['Full-time', 'Part-time', 'Contract']
    },
    salaryExpectations: {
      type: Schema.Types.Number
    },
    workAuthorization: {
      type: Schema.Types.String
    }
  },
  additionalInformation: {
    portfolio: {
      type: Schema.Types.String
    },
    languages: [{
      language: {
        type: Schema.Types.String
      },
      proficiency: {
        type: Schema.Types.String
      }
    }],
    additionalComments: {
      type: Schema.Types.String
    }
  }
});

// Create UserDetails model
const UserDetails = mongoose.model("UserDetails", jobSeekerUserDetailsSchema);

export default UserDetails;
