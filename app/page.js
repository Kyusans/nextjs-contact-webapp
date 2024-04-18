"use client";
import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if(localStorage.getItem("url") !== "http://localhost/contact/api/"){
      localStorage.setItem("url", "http://localhost/contact/api/");
    }
  },[]);
  return (
    <main className="flex justify-center items-center h-screen">
      <LoginForm />
    </main>
  );
}
