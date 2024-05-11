import React from "react";
import Heading from "../components/Header";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/ButtomWarning";

const SignIn = () => {
  return (
    <div className="flex h-screen bg-slate-300 justify-center">
      <div className="flex flex-col justify-center">
        <div className="text-center bg-white rounded-lg w-80 px-4 p-2 h-max">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder="prasad@gmail.com" />
          <InputBox label={"Password"} />
          <div className=" pt-4">
            <Button label={"Sign In"} />
          </div>
          <div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign Up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
