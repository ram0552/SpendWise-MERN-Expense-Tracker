import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password,
    setPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

const submitHandler = async (e) => {
  e.preventDefault();

  if (loading) return;

  try {
    setLoading(true);

    await API.put(
      `/auth/reset-password/${token}`,
      { password }
    );

    toast.success(
      "Password Updated Successfully"
    );

    navigate("/login");

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Reset Failed"
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
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
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
          disabled={loading}
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
          {loading
    ? "Updating..."
    : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;