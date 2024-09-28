import { useEffect } from "react";
import Swal from "sweetalert2";


const fallbackImage="../assets/download.png"

export const getImageUrl = (url: string): string => {
    if (!url) return fallbackImage;

    // Check if URL is a full path or a relative path
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `http://localhost:3000/news/${url}`; // Adjust based on your local setup
  };

 
 
  
  export const handleFetch = async (url: string, method: string, bodyData?: any) => {
    const token = localStorage.getItem("token");
    console.log(token)
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    }
    const response = await fetch(url, options);
    return response;
  };





  // export const 
  export const formattedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString("en-GB", { 
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  