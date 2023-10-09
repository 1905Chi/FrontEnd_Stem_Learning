import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmailForm from "./EmailForm/EmailForm";
import PasswordForm from "./passwordform/PasswordForm";
export default function ForgotPassword() {
  const [currentStep, SetCurrentStep] = useState(1);
  const { uuid } = useParams();

  return (
    <>
      <div className="forgotpassword">
        {" "}
        {uuid && uuid.length > 0 ? (
          <PasswordForm uuid={uuid} />
        ) : (
          <EmailForm uuid={uuid} />
        )}{" "}
      </div>{" "}
    </>
  );
}
