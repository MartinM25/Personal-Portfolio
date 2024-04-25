// contains the types for the objects being stored in sanity
import { PortableTextBlock } from "sanity";

// profile type with its attributes
export type ProfileType = {
  _id: string;
  fullName: string;
  headline: string;
  email: string;
  profileImage: {
    image: string;
    lqip: string;
    alt: string;
  };
  shortBio: string;
  location: string;
  fullBio: PortableTextBlock[];
  resumeURL: string;
  og: string;
  softSkills: PortableTextBlock[];
};


export type ImageType = {
  alt: string;
  image: string;
  lqip?: string;
};
// project type with its attributes
export type ProjectsType = {
  _id: string;
  projectName: string;
  slug: string;
  tagline: string;
  projectUrl: string;
  githubUrl: string;
  logo: string;
  coverImage: ImageType;
  images: ImageType[];
  description: PortableTextBlock[];
  toolsUsed: string[];
};

// work type with its attributes
export type WorkType = {
  _id: string;
  companyName: string;
  jobTitle: string;
  logo: string;
  url: string;
  jobDescription: PortableTextBlock[];
  startDate: Date;
  endDate: Date;
};

// skills type with its attibutes
export type SkillsType = {
  _id: string;
  name: string;
  logo: string;
};
