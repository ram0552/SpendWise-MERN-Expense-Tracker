import { useForm } from "react-hook-form";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../services/api";

import useAuthStore from "../../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await API.post(
        "/auth/login",
        data
      );

      setAuth(
        response.data.user,
        response.data.token
      );

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have account?{" "}
        </p>
        <div className="flex justify-between items-center mt-4">
            <Link
              to="/register"
              className="text-indigo-600 hover:underline"
            >
              Register
            </Link>

            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
      </form>
    </div>
  );
};

export default Login;