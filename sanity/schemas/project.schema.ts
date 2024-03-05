import { BiPackage } from "react-icons/bi";
import { defineField } from "sanity";

const project = {
  name: "project",
  title: "My Projects",
  description: "Project Schema",
  type: "document",
  icon: BiPackage,
  fields: [
    {
      name: "projectName",
      title: "Project Name",
      type: "string",
      description: "Provide the name of the project.",
    },
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.max(60).required(),
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: 
        "Provide a custom slug for the URL or generate one from the name.",
      options: { source: "projectName" },  
    },
    defineField({
      name: "logo",
      title: "Project Logo",
      type: "image",
      description: "Provide a logo for the project.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectUrl",
      title: "Project URL",
      type: "url",
      description: "Provide a link to the project. Leaving this blank will add a cuming soon button.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      validation: (rule) => rule.required(),
      description: "Provide a cover image for this project.",
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
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Write a full description about this project",
      validation: (rule) => rule.required(),
    }),
  ],
};

export default project