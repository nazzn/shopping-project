import React, {  useState } from "react";
import { HttpService } from "../../serviss/httpservice";
import { Navigate } from "react-router-dom";

type Props = {
  username: string;
  password: string;
};

const Register: React.FC = () => {
  const [inputData, setInputData] = useState<Props>({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", inputData.username);
    formData.append("password", inputData.password);

    try {
      const response = await HttpService.post<string>(
        "/api/auth/register",
        formData,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      )
      // .then((res)=>{
      //   console.log(resp);
      //   Navigate("/products");
      // })
      setMessage("Registration successful!");
      console.log(response.data);
    } catch (error) {
      setMessage("Error during registration. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className=""
          placeholder="Username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
