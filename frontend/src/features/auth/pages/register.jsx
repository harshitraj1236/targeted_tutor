import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!loading) {
        gsap.from(".animate", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [loading],
    },
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
    <main ref={containerRef} className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-400 to-blue-950 opacity-90">
      <div className="h-[70vh] w-full max-w-5xl flex items-center justify-center bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20">
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/30 p-8 shadow-2xl flex flex-col">
          <h1 className="font-semibold text-center text-white tracking-wide text-3xl mb-8 animate">
            Register
          </h1>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleRegister({ username, email, password });
              navigate("/");
            }}
            className="w-full space-y-6"
          >
            <div className="animate flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-200">Username</label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                className="w-full bg-white text-gray-900 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            
            <div className="animate flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-200">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                className="w-full bg-white text-gray-900 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div className="animate flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full bg-white text-gray-900 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <button className="animate w-full bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md py-3 shadow-lg transition-colors mt-2" type="submit">
                Register
            </button>
          </form>

          <div className="animate mt-6 text-center text-sm text-gray-300">
            <span>Already have an account?</span>{" "}
            <Link
                to={"/login"}
                className="text-white font-semibold hover:underline underline-offset-4 transition-all"
            >
                Login
            </Link>
          </div>  
        </div>
      </div>
    </main>
  );
};

export default Register;