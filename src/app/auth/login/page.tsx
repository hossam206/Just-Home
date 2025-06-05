"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LoginStyles } from "./classNames";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PiSpinnerGap } from "react-icons/pi";
import { IoIosLock } from "react-icons/io";
import { HiExclamationTriangle } from "react-icons/hi2";
import { IoIosUnlock } from "react-icons/io";
import { useRouter } from "next/navigation";
import TextInput from "@/src/components/UI/TextInput";
import Button from "@/src/components/UI/Button";
import Paragraph from "@/src/components/UI/Paragraph";
import { SocialSignupBtns } from "./assets";
import SignUpChoiceBtn from "@/src/components/SignUpChoiceBtn";
import Head from "next/head";

const Page = () => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginVia, setLoginVia] = useState("email");
  // handle login choice
  const handleLoginVia = (value: string) => {
    setLoginVia(value);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().when("loginVia", {
      is: "email",
      then: (schema) =>
        schema
          .required("email is required")
          .email("plaser enter a valid email"),
      otherwise: (schema) => schema.notRequired(),
    }),
    phone: Yup.string().when("loginVia", {
      is: "phone",
      then: (schema) =>
        schema
          .required("Phone number is required")
          .matches(/^\+?[0-9\s-]{6,}$/, "Invalid Phone number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: Yup.string()
      .required("password is required")
      .min(10, "Password must be at least 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit: async () => {
      setErrMsg("");
      setLoading(true);
      try {
        localStorage.setItem("loggedIn", JSON.stringify(true));
        router.replace("/admin/properties/create");
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login | Just Home</title>
        <meta
          name="description"
          content="Sign in to your Just Home account to manage properties, view favorites, and more."
        />
        <meta property="og:title" content="Login | Just Home" />
        <meta
          property="og:description"
          content="Access your Just Home account to manage your property listings."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="relative w-full h-screen">
        <div className="w-full px-4 py-2  flex items-center justify-between ">
          <Image
            src={"/Images/Logo/darkLogo.png"}
            alt="website logo"
            width={100}
            height={20}
            style={{ width: "auto", height: "auto" }}
          />
          <Link
            href="need-help"
            className="text-sm text-gray-800 tracking-tight outline-none hover:underline"
          >
            Need Help ?
          </Link>
        </div>
        <div className=" container mx-auto w-full my-auto max-w-sm md:mt-2  mt-12">
          <div>
            <div className={LoginStyles.welcomeMsgContainer}>
              <h1 className="text-3xl font-medium text-center  ">
                Hi, Welcome back!
              </h1>
              <Image
                src="/Images/Login/wave.png"
                width={28}
                height={28}
                alt="wave img"
              />
            </div>
            {/* choose  login with  */}
            <div className={LoginStyles.chooseLoginVia}>
              <span
                onClick={() => handleLoginVia("email")}
                className={`${LoginStyles.loginVia} ${
                  loginVia === "email" ? "bg-white" : "bg-transparent"
                }`}
              >
                Email
              </span>
              <span
                onClick={() => handleLoginVia("phone")}
                className={`${LoginStyles.loginVia} ${
                  loginVia === "phone" ? "bg-white" : "bg-transparent"
                }`}
              >
                Phone
              </span>
            </div>
            {/* Login err */}
            <div
              className={`${LoginStyles.wrongCredintials} ${
                errMsg ? "opacity-100 flex" : "opacity-0 hidden"
              }`}
            >
              <HiExclamationTriangle size={20} className="text-red-600" />
              <span className="block text-xs text-red-600">{errMsg}</span>
            </div>

            <form
              className=" w-full  mt-3 space-y-4  "
              onSubmit={formik.handleSubmit}
            >
              {loginVia === "email" ? (
                <TextInput
                  id="email"
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  placeholder="example@gmail.com"
                  type="text"
                  mandatory={true}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.email}
                  error={formik.errors.email}
                />
              ) : (
                <div className="w-full">
                  <label htmlFor="phone" className={LoginStyles.labelStyle}>
                    Phone Number
                  </label>
                  <PhoneInput
                    inputProps={{
                      className:
                        "w-full px-2 py-2 h-full overflow-hidden  border-none rounded-md outline-none  ",
                      name: "phone",
                    }}
                    preferredCountries={["eg"]}
                    name="phone"
                    defaultCountry="eg"
                    placeholder="Enter your phone number"
                    value={formik.values.phone}
                    onChange={(phone) => {
                      formik.setFieldValue("phone", phone);
                    }}
                    onBlur={() => formik.setFieldTouched("phone", true)}
                    className={`${LoginStyles.phoneInput} ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-30"
                    }`}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>
              )}
              <TextInput
                id="password"
                label="password"
                name="password"
                value={formik.values.password}
                placeholder="must be + 10 characters"
                type="password"
                mandatory={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.password}
                error={formik.errors.password}
              />
              <Link
                href="/auth/forget-password"
                className={LoginStyles.forgetPassword}
              >
                Forget Password ?
              </Link>
              <Button
                type="submit"
                variant="btn-primary"
                className="w-full space-x-2"
                disabled={formik.isSubmitting || loading}
              >
                {loading ? (
                  <>
                    <PiSpinnerGap
                      size={16}
                      className="text-white animate-spin transition-all duration-300"
                    />
                    Loading...
                  </>
                ) : (
                  <>
                    Log in <IoIosUnlock size={16} />
                  </>
                )}
              </Button>
            </form>
            <Paragraph color="darkGray" className="my-3 text-xs font-semibold">
              OR
            </Paragraph>
            <div className="flex flex-col items-center  justify-center space-y-4 md:space-y-2">
              <div className="w-full">
                <Button
                  onClick={() => console.log("hello 2fa")}
                  className={LoginStyles.SocialBtn}
                >
                  <IoIosLock size={21} />
                  <span className="block">Login Using 2FA</span>
                </Button>
              </div>
              {SocialSignupBtns?.map((item) => (
                <SignUpChoiceBtn
                  key={item._id}
                  name={item.name}
                  Img={item.Img}
                />
              ))}
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <Paragraph className="my-3 text-sm font-medium">
                Don’t have an account?
              </Paragraph>
              <Link
                href="/auth/signup"
                className="font-semibold hover:underline text-sm"
              >
                Sign UP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
