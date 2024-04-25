import { BiBriefcase } from "react-icons/bi";

const work = {
  name: "work",
  title: "Work Experience",
  type: "document",
  icon: BiBriefcase,
  fields: [
    {
      name: "companyName",
      title: "Company Name",
      type: "string",
      description: "What is the name of the company?",
    },
    {
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      description: "What is the job title? (e.g: Software Developer)",
    },
    {
      name: "logo",
      title: "Company Logo",
      type: "image",
      description: "Provide the logo of the company.",
    },
    {
      name: "url",
      title: "Company Website",
      type: "url",
      description: "Provide the link to the company website.",
    },
    {
      name: "jobDescription",
      title: "Job Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Write a brief description about this role.",
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      description: "Provide date of when you started this role.",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Provide date of when you ended this role.",
    },
  ],
};

export default work