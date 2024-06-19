import mongoose from "mongoose";
import { Schema } from "mongoose";

const employerUserDetailsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
},
  basicInformation: {
    companyName: String,
    industry: String,
    yearFounded: String,
    companySize: String,
    headquartersLocation: String,
    websiteURL: String,
  },
  companyOverview: {
    missionStatement: String,
    uniqueSellingPoints: String,
    productsOrServices: String,
    hiringProcessAndExpectations: {
      hiringProcessOverview: String,
      candidateCriteria: String,
    },
  },
  jobOpportunities: {
    currentOpenings: [{
      jobTitle: String,
      jobDescription: String,
      requiredQualifications: {
        education: [String],
        min_experience: String,
      },
      skillsNeeded: {
        technical: [String],
        soft: [String],
      },
      salaryRange: String,
    }],
  },
  teamAndCulture: {
    leadershipTeam: [{
      name: String,
      title: String,
      bio: String,
    }],
    cultureDescription: String,
    coreValues: String,
    employeeBenefits: String,
  },
  contactInformation: {
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    linkedIn: String,
    twitter: String,
  },
});


export const EmployerUserDetails = mongoose.model('EmployerUserDetails',employerUserDetailsSchema);