import React from "react";

const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-green-500">
          ✅ Check Your Email
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed">
          We've sent you an email to verify your account. Please check your
          inbox and click the verification link to activate your account.
        </p>
      </div>
    </div>
  );
};

export default Verify;