"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/globalSlice";
export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const userFromState = useSelector((state) => state.globalSlice.user);
  const router = useRouter();
  const continueGoogle = async (data) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/user/signup`,
      data
    );
  };
  useEffect(() => {
    const emails = localStorage.getItem("email");
    if (emails) {
      setEmail(emails);
    }
  }, []);
  if (!email) {
    return (
      <div className="my-auto mx-auto">
        <Toaster
          toastOptions={{
            className: "",
            position: "top-right",
          }}
        />

        <GoogleLogin
          onSuccess={({ credential }) => {
            const notify = () =>
              toast.success("Logged in successfully. Redirecting...");
            notify();
            const decoded = jwtDecode(credential);
            dispatch(setUser(decoded));
            const { email, name, picture } = decoded;
            localStorage.setItem("email", email);
            continueGoogle({ name, email, picture });
            router.push("/class-routine");
          }}
          onError={() => {
            const notifyFail = () => toast.error("Logged in failed");
            notifyFail();
          }}
          useOneTap={false}
        />
      </div>
    );
  }
}
