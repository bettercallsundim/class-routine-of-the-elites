"use client";

import { getDataFromLocal } from "@/utils/localStorage";
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
  const [tokenData, setTokenData] = useState(null);
  const userFromState = useSelector((state) => state.globalSlice.user);
  const router = useRouter();
  const continueGoogle = async (data) => {
    const response = await axios.post(
      "http://localhost:4000/user/signup",
      data
    );
  };
  useEffect(() => {
    const { token: gotToken } = getDataFromLocal("token");
    if (gotToken) {
      setTokenData(gotToken);
    }
  }, []);
  if (!tokenData || !userFromState?.email) {
    return (
      <div className="my-auto mx-auto">
        <Toaster
          toastOptions={{
            className: "",
            position: "top-right",
          }}
        />

        {(!userFromState?.email || !tokenData) && (
          <GoogleLogin
            onSuccess={({ credential }) => {
              const notify = () =>
                toast.success("Logged in successfully. Redirecting...");
              notify();
              const decoded = jwtDecode(credential);
              dispatch(setUser(decoded));
              const { email, name, picture } = decoded;
              continueGoogle({ name, email, picture });
              router.push("/feed");
            }}
            onError={() => {
              const notifyFail = () => toast.error("Logged in failed");
              notifyFail();
            }}
            useOneTap
          />
        )}
      </div>
    );
  }
}
