import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context";

export type loginType = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [user, setUser] = useState<loginType>({
    username: "",
    password: "",
  });

  const onLogin = (e: any) => {
    e.preventDefault();

    authCtx
      .login(user.username, user.password)
      .then((res) => {
        navigate("/dashboard")
      })
      .catch((er) => {
        alert("Login failed!");
      });
    
  };

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <form onSubmit={onLogin} className="border p-6 rounded-xl m-4  shadow-lg">
        <div className="">
          <div className="">
            <span className="text-lg text-gray-500 ">Username</span>
          </div>
          <input
            type="text"
            placeholder="Please enter username!"
            name="username"
            className="w-full max-w-xs p-2 shadow-md rounded-md
             placeholder-pink-200"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
        </div>
        <div className="pt-8">
          <div className="">
            <span className="text-lg text-gray-500 ">Password</span>
          </div>
          <input
            type="password"
            placeholder="Please enter Password!"
            name="username"
            className="w-full max-w-xs p-2 placeholder-pink-200 shadow-md rounded-md "
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        <div className="flex justify-end pt-5 ">
          <button className="bg-pink-200 p-2 rounded-xl text-green-700">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
