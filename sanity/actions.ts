// this file contains all the sanity query functions

import { groq } from "next-sanity";
import { client } from "./lib/client";

// function for fetching profile from sanity
export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"]{
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
      skills
    }`
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