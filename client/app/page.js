"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Logo from "./components/Logo";

export default function page() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    const emails = localStorage.getItem("email");
    if (emails) {
      setEmail(emails);
    }
  }, []);

  return (
    <div className="min-h-screen min-w-full container mx-auto bg-bng text-text flex items-center justify-between px-20 ">
      <div className="fir">
        <div className="h-full w-full">
          <Logo />
        </div>
        <div className="mt-4">
          <h1 className="text-4xl font-bold text-gray-800">
            aesthetic & <span className="grd">colorful</span>
            <br />
            routine generator.
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
          <button
            onClick={() => {
              router.push("/class-routine");
            }}
            className="text-sms font-bold text-white px-4 py-2 rounded-md bg-black mb-4 hover:bg-white hover:text-black duration-300 hover:border-2 hover:border-black"
          >
            Generate Now
          </button>
        )}
        <div>{!email && <Login />}</div>
      </div>
      <span className="fixed bottom-8 right-8 font-medium bg-slate-950 text-white opacity-90 p-2 rounded-md">
      আয়োজনে : জাতীয় রুটিন দেখা কমিটি 🌙{" "}
      </span>
    </div>
  );
}
