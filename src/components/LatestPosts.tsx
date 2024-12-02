import { useEffect, useState } from "react"
import axios from "axios";
import { useQuery } from "react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CloudIcon, CloudSunIcon, SunIcon, WindIcon } from "lucide-react";

import { PostDatabaseProps } from "@/pages/SocialPage";

export default function LatestPosts() {
  const userLatitude = Number(localStorage.getItem('latitude') || -1);
  const userLongitude = Number(localStorage.getItem('longitude') || -1);

  async function getPosts() {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/getlocalposts`, {
      latitude: userLatitude,
      longitude: userLongitude,
      distance: localStorage.getItem("distance") ? localStorage.getItem("distance") : 1.6875,
    });
  
    return response.data;
  }

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery("postsDashData", getPosts);

  


  return (
    <div className="max-w-sm">

    </div>

  )
}