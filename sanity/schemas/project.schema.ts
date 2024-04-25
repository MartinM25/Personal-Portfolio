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
      validation: (rule) => rule.required(),
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
      description: "Provide a link to the project. Leaving this blank will add a coming soon button.",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      description: "Provide a link to the gitHub repo of the project. Leaving it blank will add a confidential button.",
    }),
    defineField({
      name: "toolsUsed",
      title: "Tools Used",
      type: "array",
      validation: (rule) => rule.required(),
      description: "List the tools used for this project.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      validation: (rule) => rule.required(),
      description: "Provide cover images for this project.",
      of: [
        {
          type: "image",
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