"use client";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Logo from "./components/Logo";
import { useRouter } from "next/navigation";

export default function page() {
  const [email, setEmail] = useState("");
  const router=useRouter()
  useEffect(() => {
    const emails = localStorage.getItem("email");
    if (emails) {
      setEmail(emails);
    }
  }, []);

  return (
    <div className="min-h-screen min-w-full container mx-auto bg-bng text-text flex items-center justify-between px-12 ">
      <div className="fir">
        <div className="h-full w-full">
          <Logo />
        </div>
        <div className="mt-4">
          <h1 className="text-4xl font-bold text-gray-800">
            unopinionated aesthetic
            <br />
            <span className="grd">colorful</span> routine generator.
          </h1>
        </div>
      </div>
      <div className="sec">
        {/* <p>
          {" "}
          <b>Colorful Routine </b>: *exists*
        </p>
        <p>
          {" "}
          <b>le black-white routine </b>:{" "}
        </p>
        <div className="rounded-md">
          <img
            src="https://memeheist.com/wp-content/uploads/2023/12/Aukat-Dikha-Di-Meme-template-2.jpg"
            alt=""
          />
        </div> */}
        {!email && (
          <h1 className="text-sms font-bold text-white px-4 py-2 rounded-md bg-black mb-4">
            Sign in to generate
          </h1>
        )}
        {email && (
          <button onClick={()=>{
            router.push("/class-routine")
          }} className="text-sms font-bold text-white px-4 py-2 rounded-md bg-black mb-4">
            Generate Now
          </button>
        )}
        <div>{!email && <Login />}</div>
      </div>
    </div>
  );
}
