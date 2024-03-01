import { defineField } from "sanity";
import { BiUser } from "react-icons/bi";

const profile = {
  name: "profile",
  title: "Personal Profile",
  type: "document",
  icon: BiUser,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      description: "What is your full name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "What do you do?",
      validation: (rule) => rule.required().min(40).max(80),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "What is your email address?",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Provide a profile picture.",
      options: {
        hotspot: true,
        metadata: ["lqip"], 
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 4,
      description: "Write a short bio about yourself.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Where are you located?",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullBio",
      title: "Full Bio",
      type: "array",
      of: [{ type: "block" }],
      description: "Write a full bio about yourself and your experiences.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resumeURL",
      title: "Upload CV/Resume",
      type: "file",
      description: "Provide your CV/Resume.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "softSkills",
      title: "Soft Skills",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
};

export default profile;