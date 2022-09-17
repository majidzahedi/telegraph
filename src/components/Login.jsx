import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import store from "../store";
const socketUrl = import.meta.env.VITE_SOCKET_URL;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const setToken = store((state) => state.setToken);
  const token = store((state) => state.token);

  const signUp = async (signUpData) => {
    try {
      const data = await axios.post(`${socketUrl}/signup`, signUpData);
      setToken(data.data.token);
    } catch (e) {
      setError("apiError", "Email Already Exists!");
      throw new Error("Email Already Exists!");
    } finally {
      navigate("/");
    }
  };

  const login = async (loginData) => {
    try {
      const res = await axios.post(`${socketUrl}/login`, loginData);
      setToken(res.data.token);
      console.log(data);
    } catch (e) {
      setError("apiError", "Invalid Credentials");
      throw new Error("Invalid Credentials!");
    } finally {
      navigate("/");
    }
  };

  function toggle() {
    setIsLogin((prev) => !prev);
  }

  if (token !== "") return <Navigate to="/" replace={true} />;

  return (
    <div className="fixed top-0 flex h-[100%] w-full items-center justify-center bg-neutral text-base-200">
      <div className="fixed top-0 z-0 h-[33%] w-full bg-neutral-content" />
      <form
        onSubmit={handleSubmit(isLogin ? login : signUp)}
        className="z-10 mx-4 flex min-h-[50%] w-full max-w-xl flex-col items-center space-y-9 rounded-lg bg-neutral-focus px-8 py-12 shadow drop-shadow"
      >
        {!isLogin && (
          <div className="flex w-full flex-col space-y-2">
            <div className="flex justify-between">
              <label htmlFor="username">User Name</label>
              {errors.username && (
                <span className="text-error">{errors.username.message}</span>
              )}
            </div>
            <input
              {...register("username", {
                required: { value: !isLogin, message: "This Is Required" },
                pattern: {
                  value:
                    /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
                  message: "Invalid User Name",
                },
              })}
              name="username"
              type="text"
              className="input input-ghost"
              placeholder="User Name"
            />
          </div>
        )}
        <div className="flex w-full flex-col space-y-2">
          <div className="flex justify-between">
            <label htmlFor="email">Email</label>
            {errors.email && (
              <span className="text-error">{errors.email.message}</span>
            )}
          </div>
          <input
            {...register("email", {
              required: "This Is Required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Please provide a valid email",
              },
            })}
            name="email"
            type="text"
            className="input input-ghost"
            placeholder="User Name"
          />
        </div>
        <div className="flex w-full flex-col space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password">Password</label>
            {errors.password && (
              <span className="text-error">{errors.password.message}</span>
            )}
          </div>
          <input
            {...register("password", {
              required: "This Is Required",
              minLength: {
                value: 8,
                message: "Password Should be more than 8 charcter",
              },
            })}
            name="password"
            type="Password"
            className="input input-ghost"
            placeholder="Password"
          />
        </div>
        <div className="flex w-full flex-col space-y-1 self-center">
          <button className="btn btn-outline btn-ghost text-base-200 ">
            {isLogin ? "login" : "signup"}
          </button>
          <button
            type="button"
            onClick={toggle}
            className="btn btn-outline btn-ghost text-base-200 "
          >
            {isLogin ? "Don't have an account?" : "already have an account?"}
          </button>
        </div>
        <a className="link-info link text-lg">Forgot password?</a>
      </form>
    </div>
  );
};

export default Login;
