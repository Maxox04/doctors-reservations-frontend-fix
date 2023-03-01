import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function StartingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);
  return <div></div>;
}

export default StartingPage;
