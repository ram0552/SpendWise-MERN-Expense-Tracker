import { useForm } from "react-hook-form";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../services/api";

import useAuthStore from "../../store/authStore";

const Register = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await API.post(
        "/auth/register",
        data
      );

      setAuth(
        response.data.user,
        response.data.token
      );

      toast.success("Registered Successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
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
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: true,
          })}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg"
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Already have account?{" "}
          <Link
            to="/login"
            className="text-indigo-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;