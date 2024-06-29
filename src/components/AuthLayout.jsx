import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    } else {
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);
  if (loader) {
    return <div>Loading...</div>;  // Display a loader while checking authentication status
  }

  return <div>{children}</div>;
};

export default Protected;
