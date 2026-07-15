import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const login = () => {
  const { loading, handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const containerRef = useRef(null);

    useGSAP(
      () => {
        if (!loading) {
          gsap.from(".animate", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
          });
        }
      },
      { scope: containerRef, dependencies: [loading] },
    );

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-blue-950 text-white">
        <h1 className="animate-pulse text-2xl font-semibold tracking-wider">
          Loading...
        </h1>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-400 to-blue-950 opacity-90"
    >
      <div className="h-[70vh] w-full max-w-5xl flex items-center justify-center bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10">
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/30 p-8 shadow-2xl flex flex-col">
          <h1 className="animate text-3xl font-semibold text-white tracking-wide text-center mb-8">
            Login
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleLogin({ username, password });
              navigate("/");
            }}
            className="w-full space-y-6"
          >
            <div className="animate flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-200"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Your Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="w-full bg-white text-gray-900 rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
            <div className="animate flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full bg-white text-gray-900 rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
            <button className="animate w-full bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md py-3 shadow-lg transition-colors mt-2">
              Login
            </button>
          </form>
          <div className="animate mt-6 text-center text-sm text-gray-300">
            <span>Don't have an account yet?</span>{" "}
            <Link
              to={"/register"}
              className="text-white font-semibold hover:underline underline-offset-4 transition-all"
            >
              Register for free
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default login;
