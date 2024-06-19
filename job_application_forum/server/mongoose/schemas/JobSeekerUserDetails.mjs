import mongoose from "mongoose"; 
import { Schema } from "mongoose";
// Define the schema for job seeker user details
const jobSeekerUserDetailsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    personalInformation: {
        fullName: {
            firstname: String,
            lastname:String
        },
        dateOfBirth: Date,
        gender: {
          type: Schema.Types.String,
          enum: ['male', 'female','Male','Female'],
          required: true
        },
        contactInformation: {
            email: String,
            phone: String
        },
        locationDetails: {
            currentLocation: String,
            preferredJobLocations: [String]
        },
        professionalHeadline: String
    },
    professionalExperience: {
        employmentHistory: [
            {
                employer: String,
                jobTitle: String,
                startDate: Date,
                endDate: Date,
                responsibilities:String,
                achievements:String
            }
        ],
        skills: {
            technical: [String],
            soft: [String]
        }
    },
    education: {
        educationalBackground: [
            {
              institutionName: String,
                degree: String,
                majorFieldOfStudy: String,
                graduationYear: String,
                grade: String
            }
        ],
        certificationsAndCourses: {
            certifications: [String],
            professionalDevelopmentCourses: [String]
        }
    },
    jobPreferences: {
        desiredJobTitles: [String],
        industryPreferences: [String],
        employmentType: String,
        salaryExpectations: String,
        workAuthorization: String
    },
    additionalInformation: {
        portfolioOrWorkSamples: String,
        languages: [String],
        additionalComments: String
    }
});

// Create and export the model based on the schema
export const JobSeekerUserDetails = mongoose.model('JobSeekerUserDetails', jobSeekerUserDetailsSchema);


