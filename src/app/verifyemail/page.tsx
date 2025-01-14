"use client";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function page() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  //   const router = useRouter();
  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      console.log(res, "res");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }

    useEffect(() => {
      const urltoken = window.location.search.split("=")[1];
      console.log(urltoken, "urltoken");
      setToken(urltoken || "");

      //   const { query } = router;
      //   const token: any = query.token;
      //   setToken(token);
    }, []);

    useEffect(() => {
      if (token.length > 0) {
        verifyUserEmail();
      }
    }, [token]);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No Token"}
      </h2>
      {verified && (
        <div>
          <h2>Verified </h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>{error} </h2>
        </div>
      )}
      <button onClick={verifyUserEmail}> veriy</button>
    </div>
  );
}
