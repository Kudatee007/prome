import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../component/InputField";
import { useLoginMutation } from "@/api/authApi";
import { loginSucceeded } from "./authSlice";
import { useAppDispatch } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const token = useAppSelector((s) => s.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const [login, { error, isLoading }] = useLoginMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await login({
        identifier: values.email,
        password: values.password,
      }).unwrap();

      // Save token + user to Redux
      dispatch(loginSucceeded({ token: res.jwt, user: res.user }));

      // Redirect after successful login
      navigate("/", { replace: true });
    } catch (err) {
      // Error is already captured in the `error` state
      console.error("Login failed:", err);
    }
  });

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === "object" && "data" in error) {
      const fetchError = error as FetchBaseQueryError;
      if (
        fetchError.data &&
        typeof fetchError.data === "object" &&
        "error" in fetchError.data
      ) {
        const data = fetchError.data as { error?: { message?: string } };
        return data.error?.message ?? "Login failed";
      }
    }
    return "Login failed";
  };

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary" />
      </div>
    );
  if (error) return <p data-testid="error-state">Error loading Page</p>;

  return (
    <div className="bg-[#FAFAFA] flex justify-center items-center h-screen">
      <section className="w-full max-w-[620px] bg-white p-8 shadow-sm">
        <form
          data-testid="login-form"
          className="space-y-6"
          onSubmit={onSubmit}
        >
          <div>
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              data-testid="login-email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p
                className="text-red-600 text-sm mt-1"
                data-testid="login-email-error"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              data-testid="login-password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p
                className="text-red-600 text-sm mt-1"
                data-testid="login-password-error"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* {error && (
            <p className="text-red-700 text-sm" data-testid="login-error">
              {(error as unknown)?.data?.error?.message ?? "Login failed"}
            </p>
          )} */}

          {error && (
            <p className="text-red-700 text-sm" data-testid="login-error">
              {getErrorMessage(error)}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            data-testid="login-submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
