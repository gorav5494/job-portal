import React from "react";
import Banner from "../component/Banner";
import Membership from "../component/Membership";
import Viewjoblisting from "./Jobs/viewjoblisting";
import TopCompanies from "../component/TopCompanies";

function Home() {
  return (
    <div>
      <Banner />
      <TopCompanies />
      <Viewjoblisting />
      <Membership />
    </div>
  );
}

export default Home;
