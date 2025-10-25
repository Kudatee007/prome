import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../component/InputField";
import { useRegisterMutation } from "@/api/authApi";
import { loginSucceeded } from "./authSlice";
import { useAppDispatch } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [registerUser, { error, isLoading }] = useRegisterMutation();

  // Watch password field for confirm password validation
  const password = watch("password");

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await registerUser({
        username: `${values.firstName} ${values.lastName}`.trim(),
        email: values.email,
        password: values.password,
      }).unwrap();

      // Save token + user to Redux/localStorage
      dispatch(loginSucceeded({ token: res.jwt, user: res.user }));

      // Redirect after successful registration
      navigate("/", { replace: true });
    } catch (err) {
      // Error is handled by RTK Query
      console.error("Registration failed:", err);
    }
  });

  // const getErrorMessage = (error: unknown): string => {
  //   if (error && typeof error === "object" && "data" in error) {
  //     const err = error as unknown;
  //     return err?.data?.error?.message ?? "Registration failed";
  //   }
  //   return "Registration failed";
  // };

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
      return "Register failed";
    };

  return (
    <div className="bg-[#FAFAFA] flex justify-center items-center h-screen">
      <section className="w-full max-w-[620px] bg-white p-8 shadow-sm">
        <h2>Create your account</h2>
        <form
          data-testid="register-form"
          className="space-y-6"
          onSubmit={onSubmit}
        >
          <div className="space-y-6">
            <div className="flex gap-5">
              <div className="flex-1">
                <InputField
                  label="First Name"
                  placeholder="John"
                  data-testid="register-firstName"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p
                    className="text-red-600 text-sm mt-1"
                    data-testid="register-firstName-error"
                  >
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <InputField
                  label="Last Name"
                  placeholder="Doe"
                  data-testid="register-lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p
                    className="text-red-600 text-sm mt-1"
                    data-testid="register-lastName-error"
                  >
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <InputField
                label="Email"
                type="email"
                placeholder="john@email.com"
                data-testid="register-email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p
                  className="text-red-600 text-sm mt-1"
                  data-testid="register-email-error"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <InputField
                label="Password"
                type="password"
                placeholder="Create password"
                data-testid="register-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p
                  className="text-red-600 text-sm mt-1"
                  data-testid="register-password-error"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                data-testid="register-confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p
                  className="text-red-600 text-sm mt-1"
                  data-testid="register-confirmPassword-error"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {error && (
              <p className="text-red-700 text-sm" data-testid="register-error">
                {getErrorMessage(error)}
              </p>
            )}

            <p className="text-sm text-gray-600">
              By clicking Create Account, you agree to the Terms of Use and
              Privacy Policy.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              data-testid="register-submit"
              className="bg-blue-600 w-full p-3 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
