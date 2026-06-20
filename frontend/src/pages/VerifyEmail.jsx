import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setstatus] = useState("...Verifying");
  const navigate = useNavigate();

  const verifyEmail = async () => {
    const baseURL = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(
        // `http://localhost:3000/api/v1/user/verify`,
        `${baseURL}/api/v1/user/verify`,

        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.success) {
        setstatus(` ✅ Email verified Successfully`);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setstatus("❌ Verification failed. please try again");
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <div className="relative w-full h-190 overflow-hidden bg-pink-100">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl  shadow-mg w-[90%] max-w-md text-center">
          <h2 className=" text-xl font-semibold text-grey-800">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
