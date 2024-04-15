import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAxios, { baseUrl } from "../../axios/customAxios";
import Loader from "../Constants/Louder";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLaod, setIsLoad] = useState(false);

  const handleLogin = async () => {
    setIsLoad(true);
    axios
      .post(`${baseUrl}auth/login/super-admin`, { email, password })
      .then((res) => {
        localStorage.setItem("isAuth", "true"); // Ensure consistent typing for boolean in localStorage
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
        setIsLoad(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("isAuth") == "true") {
      navigate("/");
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-center bg-[url(https://images.unsplash.com/photo-1693590614566-1d3ea9ef32f7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen bg-center">
        <div className="h-[90%] w-full md:w-full pt-20 flex flex-col justify-center items-center">
          <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
            <h1 className="font-semibold text-3xl text-gray-700 m-2">Логин</h1>
          </div>
          <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8 relative">
            <div className="">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Логин"
                className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
            </div>
            <div className="">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Пароль"
                className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
            </div>
            {isLaod ? (
              <div className="z-1 absolute">
                <Loader />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="text-center mt-7">
            <button
              onClick={handleLogin}
              className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium"
              disabled={isLaod}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
