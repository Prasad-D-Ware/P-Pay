import React, { useState } from "react";
import Header from "../components/Header";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/ButtomWarning";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="w-80 bg-white p-2 h-max px-4 rounded-lg text-center">
          <Header label={"Sign Up"} />
          <SubHeading label={"Enter your information to create your accout"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
            placeholder={"Prasad"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
            placeholder={"Ware"}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            label={"Email"}
            placeholder={"prasad@gmail.com"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"123456"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    password,
                    firstName,
                    lastName,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/signin");
              }}
              label={"Sign Up"}
            />
          </div>
          <div>
            <BottomWarning
              to={"/signin"}
              buttonText={"Sign in"}
              label={"Already have an account?"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
