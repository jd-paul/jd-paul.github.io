import React from "react";

const AboutLayout = ({ children }) => {
  return (
    <div
      className="about-layout"
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <h2>About Section</h2>
      </header>
      {children}
      <footer
        style={{
          marginTop: "20px",
          paddingTop: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <p>About page footer</p>
      </footer>
    </div>
  );
};

export default AboutLayout;
