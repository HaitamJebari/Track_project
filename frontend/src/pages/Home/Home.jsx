import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "./Home.css";
import vd1 from "../../assets/vd1.mp4";
import vd2 from "../../assets/vd2.mp4";
import "@glidejs/glide/dist/css/glide.core.min.css";
import Header from "../Header/Header";

const Home = () => {
  const glideRef = useRef(null);

  useEffect(() => {
    if (!glideRef.current) return;

    const glide = new Glide(glideRef.current, {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3500,
      animationDuration: 1000,
      gap: 0,
      classes: {
        activeNav: "[&>*]:bg-slate-700",
      },
    });

    glide.mount();

    // Cleanup Glide instance on component unmount
    return () => glide.destroy();
  }, []);

  const handleScrollDown = () => {
    // Scroll down by 500 pixels
    window.scrollTo({
      top: window.scrollY + 500, // Adjust the value as needed
      behavior: "smooth", // Smooth scrolling
    });
  };
  return (
    <>
      <Header />
      <div className="main_glide" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            <li className="glide__slide">
              <video
                className="w-full h-full object-cover object-center"
                autoPlay
                muted
                loop
              >
                <source src={vd2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </li>
            <li className="glide__slide">
              <video
                className="w-full h-full object-cover object-center"
                autoPlay
                muted
                loop
              >
                <source src={vd1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </li>
          </ul>
        </div>
        <div className="glas_div">
          <div className="main_text">
            <p>
              The HOS regulations are found in part 395 of title 49 of the Code
              of Federal Regulations (CFR) in the Federal Motor Carrier Safety
              Regulations (FMCSRs).
            </p>
            <h2>
              These regulations are developed and enforced by the Federal Motor
              Carrier Safety Administration (FMCSA), which is part of the United
              States Department of Transportation.
            </h2>
          </div>
          <div className="buttons">
            <button className="btn " id="about">
              About The Service <i class="ri-arrow-right-line arrow"></i>
            </button>
            <button
              className="btn"
              id="create"
              onClick={handleScrollDown} // Add the click handler
            >
              Create Trip<i class="ri-arrow-right-line arrow"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="main_content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolorem
          minus, voluptates porro quos excepturi in amet blanditiis deleniti
          ipsum eos. Optio molestias, animi eum unde aspernatur libero nesciunt
          voluptatibus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolorem
          minus, voluptates porro quos excepturi in amet blanditiis deleniti
          ipsum eos. Optio molestias, animi eum unde aspernatur libero nesciunt
          voluptatibus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolorem
          minus, voluptates porro quos excepturi in amet blanditiis deleniti
          ipsum eos. Optio molestias, animi eum unde aspernatur libero nesciunt
          voluptatibus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dolorem
          minus, voluptates porro quos excepturi in amet blanditiis deleniti
          ipsum eos. Optio molestias, animi eum unde aspernatur libero nesciunt
          voluptatibus.
        </p>
      </div>
    </>
  );
};

export default Home;
