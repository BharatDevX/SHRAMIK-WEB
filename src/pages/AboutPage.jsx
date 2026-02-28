import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div style={{ overflowX: "hidden", background: "#0F172A" }}>
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
}