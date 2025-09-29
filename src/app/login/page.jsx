"use client";
import { Button } from "@/components/elements";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { loginSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { handleLogin } from "@/lib/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Aos from "aos";
import "aos/dist/aos.css";

const Page = () => {
  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginSchema),
  });

  const inputs = [
    {
      label: "Email",
      type: "email",
      icon: "fi fi-rr-at",
      required: true,
      placeholder: "email",
      register: register("email"),
      error: errors.email?.message,
    },
    {
      label: "Password",
      type: "password",
      icon: "fi fi-rr-lock",
      required: true,
      placeholder: "password",
      register: register("password"),
      error: errors.password?.message,
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const success = await handleLogin(data, setError);
        if (success) {
          handleNavigate("/");
          // console.log(data);
        } else {
          console.log("error in login");
        }
      })}
    >
      <main
        className="grid grid-cols-1 min-h-svh gap-12 place-items-center 
    bg-[var(--smokey)] p-5
    "
      >
        <div
          className="flex flex-col gap-8 max-w-[100%] bg-[white] p-7 rounded-2xl shadow-md"
          data-aos="zoom-out"
        >
          <div
            className="flex flex-col gap-1 "
            data-aos="fade-in"
            data-aos-delay="100"
          >
            <div className="flex gap-4 text-[var(--teal)] text-xl items-center">
              <i className="fi fi-rr-sign-in-alt mt-1.5"></i>

              <h1 className="font-semibold ">Login</h1>
            </div>
            <div className="flex gap-2 text-[var(--black)] text-base items-center">
              <p className="opacity-30">
                Type your email and password to login
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {inputs.map((input, i) => {
              return (
                <div
                  key={i}
                  data-aos="zoom-in"
                  data-aos-delay={200 + i * 100}
                  className="flex flex-col gap-1 max-w-[100%] w-[300px]"
                >
                  <div className="flex rounded-full border border-[var(--sky)] px-4 py-2 items-center gap-4">
                    <i className={`${input.icon} mt-1.5 text-[var(--sky)]`}></i>

                    <input
                      {...input.register}
                      type={input.type}
                      placeholder={input.placeholder}
                      className=" text-[var(--sky)] outline-0 w-full "
                    />
                  </div>
                  {input.error && (
                    <p className="text-[var(--red)] text-xs ml-4 flex items-center gap-2 lowercase">
                      <i className="fi fi-rr-info mt-1.5 text-[var(--red)] "></i>
                      {input.error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 flex-wrap justify-center items-start">
            {errors.root && (
              <p className="shadow px-3 rounded-full text-[var(--red)] text-xs flex items-center gap-2 lowercase">
                <i className="fi fi-rr-info mt-1.5 text-[var(--red)] "></i>
                {errors.root?.message}
              </p>
            )}
            <div className="flex gap-8 flex-wrap justify-center items-center w-full">
              <div className="">
                <button
                  type="button"
                  className="cursor-pointer opacity-30 text-[var(--black)] capitalize hover:opacity-70 transition"
                  onClick={() => {
                    handleNavigate("/signup");
                  }}
                >
                  create account ?
                </button>
              </div>
              <div className="flex-1">
                <Button
                  type={"submit"}
                  title={"Login"}
                  textColor={""}
                  color1={"var(--gold)"}
                  color2={"var(--red)"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
};

export default Page;
