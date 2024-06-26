// this file contains all the sanity query functions

import { groq } from "next-sanity";
import { client } from "./lib/client";
import { ProfileType } from "./types";

// function for fetching profile from sanity
export async function getProfile(): Promise<ProfileType> {
  return client.fetch(
    groq`*[_type == "profile"][0]{
      _id,
      fullName,
      headline,
      email,
      profileImage {
        alt,
        "image": asset->url
      },
      shortBio,
      location,
      fullBio,
      "resumeURL": resumeURL.asset->url,
      softSkills
    }`
  );
}

// function for fetching projects from sanity
export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]{
      _id,
      projectName,
      "slug": slug.current,
      tagline,
      "logo": logo.asset->url,
      toolsUsed,
      projectUrl,
      githubUrl,

    }`
  );
}

// function for fetching a single project from sanity
export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      projectName,
      projectUrl,
      githubUrl,
      toolsUsed,
      "images": images[]{
        alt,
        "image": asset->url
      },
      tagline,
      description
    }`,
    { slug }
  );
}

// function for fetching work experience from sanity
export async function getWork() {
  return client.fetch(
    groq`*[_type == "work"] | order(_createdAt desc){
      _id,
      companyName,
      jobTitle,
      "logo": logo.asset->url,
      url,
      jobDescription,
      startDate,
      endDate,
    }`
  );
}

export async function getSkills() {
  return client.fetch(
    groq`*[_type == "skills"] {
      _id,
      name,
      "logo": logo.asset->url,
    }`
  );
}
