import Home from "@/pages/Home";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const ApplicationRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":codes" element={<Home />} />
      </Routes>
    </>
  );
};

export default ApplicationRoutes;
