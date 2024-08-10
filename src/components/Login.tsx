import { useForm } from "react-hook-form";
import { UserLoginSchema, UserLoginType } from "../zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../axios/apiClient";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import useFusionStore from "../store";
import google from "../assets/google.png";
const Login = () => {
  const navigate = useNavigate();
  const { setEmail, setToken, setDisplayName } = useFusionStore();
  const [isSpin, setIsSpin] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>({
    resolver: zodResolver(UserLoginSchema),
  });

  const submit = async (data: UserLoginType) => {
    try {
      setIsSpin(true);
      const response = await apiClient.post("/auth/login", data);
      const { message, user, token } = response.data;
      toast.success(message);
      setToken(token);
      setDisplayName(user.fullname);
      setEmail(user.email);
      reset();
      navigate("/", { replace: true });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSpin(false);
    }
  };
  return (
    <div className="max-w-sm w-full text-gray-700 space-y-5">
      <div className="text-center">
        <h1 className="space-x-1 text-2xl">
          <span className="font-semibold text-slate-300">Welcome Back to</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-400 tracking-wider font-extrabold">
            Fusion
          </span>
        </h1>
        <p className="text-sm font-medium text-slate-300"></p>
      </div>
      <form onSubmit={handleSubmit(submit)} className="space-y-7">
        <div className="relative">
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            className="outline-none p-2 rounded-md border w-full placeholder:text-gray-400"
          />
          {errors.email && (
            <p className="text-red-400 text-xs absolute -bottom-4">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("password")}
            type="text"
            placeholder="Password"
            className="outline-none p-2 rounded-md border w-full placeholder:text-gray-400"
          />
          {errors.password && (
            <p className="text-red-400 text-xs absolute -bottom-4">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="p-2 w-full text-white bg-violet-500 rounded-md space-x-2 flex items-center justify-center"
        >
          <span className="font-medium">Login</span>
          {isSpin && <CircleNotch size={20} className="animate-spin" />}
        </button>
      </form>
      <div className="text-center text-gray-500 text-xs">OR</div>
      <div>
        <button className="p-2 w-full text-white bg-neutral-900 rounded-md space-x-2 flex items-center justify-center border border-white/15">
          <span className="font-medium">Login with</span>
          <img src={google} alt="google icon" className="aspect-square w-7" />
        </button>
      </div>
      <div className="text-center space-x-2">
        <span className="text-gray-500">Don't have an account yet ?</span>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
