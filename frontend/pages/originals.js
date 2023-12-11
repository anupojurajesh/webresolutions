import React from "react";
import CommonLayout from "../components/shop/common-layout";
import Originals from "./layouts/Art/components/Originals/Originals";
import BannerSection from "./layouts/Art/components/Originals/Bannersection"

const originals = () => {
  
  return (
    <>
      <CommonLayout parent="home" title="Originals">
      <Originals />
      <BannerSection />
      </CommonLayout>
    
      
    </>
  );
};

export default originals;
