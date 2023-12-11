import React, { Fragment, useEffect } from "react";
import Helmet from "react-helmet";
import HeaderSeven from "../../frontend/components/headers/header-seven";
import MasterFooter from "../components/footers/common/MasterFooter";
import Banner from "./layouts/Art/components/Home/banner";
import About from "./layouts/Art/components/Home/About";
import Originals from "./layouts/Art/components/Home/Originals";
import BannerSection from "./layouts/Art/components/Home/Bannersection"


const Art = () => {
  
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={"/assets/images/favicon/1.png"} />
      </Helmet>
      <HeaderSeven logoName={"logo/13.png"} />
      <Banner/>
      <About />
      <Originals />
      <BannerSection />
      <MasterFooter footerClass={`footer-light`} footerLayOut={"light-layout upper-footer"} footerSection={"small-section border-section border-top-0"} belowSection={"section-b-space light-layout"} newLatter={true} logoName={"logo.png"} />
      </>
  );
};

export default Art;
