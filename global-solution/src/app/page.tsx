"use client";
import Background from "@/components/Background/Background";
import Login from "@/components/Login/Login";

export default function Home() {
  return (
    <>
      <div className="flex">
        <Login />
        <Background />
      </div>
    </>
  );
}
