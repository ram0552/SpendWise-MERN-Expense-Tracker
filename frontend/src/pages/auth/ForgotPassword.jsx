import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {

  const [email, setEmail] =
    useState("");

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/auth/forgot-password",
          { email }
        );

        toast.success(
          "Reset email sent"
        );

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed"
        );
      }
    };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      dark:bg-slate-900
      "
    >
      <form
        onSubmit={submitHandler}
        className="
        bg-white
        dark:bg-slate-800
        p-8
        rounded-xl
        shadow-lg
        w-full
        max-w-md
        "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-6
          text-center
          dark:text-white
          "
        >
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          p-3
          border
          rounded-lg
          mb-4
          bg-white
          dark:bg-slate-700
          dark:text-white
          dark:border-slate-600
          "
        />

        <button
          type="submit"
          className="
          w-full
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          p-3
          rounded-lg
          transition
          "
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;