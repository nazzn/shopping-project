import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context";

type Props = {
  username: string;
  password: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState<Props>({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authCtx
      .onRegister(user.username, user.password)
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((er) => {
        alert("Register failed!");
      });
  };

  return (
    <div className="flex justify-center w-full pt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center m-2  gap-2 p-4 
      border rounded-xl shadow-inner"
      >
        {" "}
        <div>
          <div>
            <span className="text-lg text-gray-500 ">username</span>
          </div>
          <input
            type="text"
            className="p-2 shadow-sm rounded-md placeholder-pink-200"
            placeholder="nazzn00"
            name="username"
            onChange={handleChange}
            required
          />{" "}
        </div>
        <div>
          <div>
            <span className="text-lg text-gray-500 ">Password</span>
          </div>
          <input
            type="password"
            className="p-2 shadow-sm rounded-md placeholder-pink-200"
            placeholder="123456"
            name="password"
            onChange={handleChange}
            required
          />{" "}
        </div>
        <div className="text-green-700  flex justify-center">
          <button
            type="submit"
            className=" border bg-pink-200 rounded-xl p-4 w-full">
            Register
          </button>
        </div>
      </form>
      <div>{message && <p>{message}</p>}</div>
    </div>
  );
};

export default Register;
