import React from "react";
import InputField from "../component/InputField";

const Register = () => {
  return (
    <div className="bg-[#FAFAFA] flex justify-center items-center py-30">
      <section className="w-full max-w-[620px] bg-white p-8">
        <h2>Create your account</h2>
        <div className="space-y-6">
          <div className="flex gap-5">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="John Doe"
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="John Doe"
            />
          </div>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="john@email.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Create password"
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat password"
          />
          <p>
            By clicking Create Account, you agree to the Terms of Use and
            Privacy Policy.
          </p>
          <button className="bg-blue-100 w-full p-3 text-white rounded-md">
            Create Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Register;
