"use client";
// import { DockerImageCard } from "@/components/home/docker-image-card";
// import { getDockerhubStats } from "@/services/dockerhub";
// import { Session } from "@/types";
// import { Star } from "lucide-react";
// import { useEffect, useState } from "react";
import { AdventagesCard } from "@/components/home/advantages-card";

export default function Home() {
  // const [dockerhubStats, setDockerhubStats] = useState();

  // const call = async() => {

  //   const dockerStats = await getDockerhubStats();
  //   setDockerhubStats(dockerStats);
  // }

  // useEffect(() => {
  //   call();
  // }, []);

  return (
    <div>
      <h1 className="text-9xl font-semibold tracking-tight text-zinc-50 text-center">
        Moonarr
      </h1>
      <div className="grid grid-cols-3 gap-20 my-16">
        <AdventagesCard type="open-source"/>
        <AdventagesCard type="self-hosted"/>
        <AdventagesCard type="free"/>
      </div>
      <p className="text-2xl w-300 text-center">
        Moonarr, is a solution to create, modify and improve your GitHub Profile !
        To modify your GitHub Profile, Moonarr Create a Repository with your username as repository name, and a README.md (if it doesn&apos;t exists already). 
      </p>
      {/* <div className="flex">
        <Star className="hover:text-yellow-300"/>
        <span className="ml-1">
          Please stars the project to support it.
        </span>
      </div>
      <DockerImageCard data={dockerhubStats} type="Docker"/> */}
    </div>
  );
}
