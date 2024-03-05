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

// project type with its attributes
export type ProjectsType = {
  _id: string;
  projectName: string;
  slug: string;
  tagline: string;
  projectUrl: string;
  logo: string;
  coverImage: {
    alt: string | null;
    image: string;
    lqip: string;
  };
  description: PortableTextBlock[];
};

// work type with its attributes
export type WorkType = {
  _id: string;
  companyName: string;
  jobTitle: string;
  logo: string;
  url: string;
  jobDescription: string;
  startDate: Date;
  endDate: Date;
};

// skills type with its attibutes
export type SkillsType = {
  _id: string;
  name: string;
  tagline: string;
  logo: string;
  url: string;
  type: string;
};
