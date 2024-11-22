import { clsx, type ClassValue } from "clsx"
import { useEffect } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateFromObjectId(objectId: string) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

export function getUserData(): any {
  // useEffect(() => {
  // }, []);
  const userDataString = localStorage.getItem("userData");
    try {
      const userData = userDataString ? JSON.parse(userDataString) : null;
      return(userData);
    }
    catch (e) {
      console.log("Error parsing user data, perhaps the token is invalid?");
      return null;
    }
}