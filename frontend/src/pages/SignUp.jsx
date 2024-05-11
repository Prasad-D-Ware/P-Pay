import React from "react";
import Header from "../components/Header";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/ButtomWarning";
import Button from "../components/Button";

const SignUp = () => {
  return (
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="w-80 bg-white p-2 h-max px-4 rounded-lg text-center">
          <Header label={"Sign Up"} />
          <SubHeading label={"Enter your information to create your accout"} />
          <InputBox label={"First Name"} placeholder={"Prasad"} />
          <InputBox label={"Last Name"} placeholder={"Ware"} />
          <InputBox label={"Email"} placeholder={"prasad@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <div className="pt-4">
            <Button label={"Sign Up"} />
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
