import { BiCodeAlt } from "react-icons/bi";

const skills = {
  name: "skills",
  title: "Skills",
  description: "Skills Schema",
  type: "document",
  icon: BiCodeAlt,
  fields: [
    {
      name: "name",
      title: "Skill Name",
      type: "string",
      description: "The name of your skill",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "url",
      title: "Skill Link",
      type: "url",
      description: "Provide the link to the information about this skill.",
    },
    {
      name: "logo",
      title: "Skill Logo",
      type: "image",
      description: "Provide the image of the skill.",
    },
    {
      name: "type",
      title: "Skill Type",
      type: "string",
      description: "Select the type of skill this is.",
      options: {
        list: [ 'Technologies','Tools','Platform', 'Programming Language' ]
      }
  },
  ],
}
export default skills