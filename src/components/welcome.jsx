import React from "react";
import { TitleBar, Cursor } from "@react95/core";
import { Textchat } from "@react95/icons";
import * as S from "./layoutStyling";
import ProfileImage from "../assets/profile.png"; // ✅ using your real image

function Welcome({ closeAboutModal }) {
  return (
    <S.styledModal
      icon={<Textchat variant="16x16_4" />}
      title={"Welcome.txt"}
      titleBarOptions={[
        <TitleBar.Close onClick={closeAboutModal} key="close" />,
      ]}
    >
      <S.styledModalFrame bg="white" boxShadow="$in">
        <div style={{ textAlign: "center" }}>
          <img
            src={ProfileImage}
            alt="Paul San Diego"
            style={{
              height: "120px",
              borderRadius: "4px",
              objectFit: "cover",
              marginBottom: "1rem",
            }}
          />

          <h1 style={{ marginBottom: "0.5rem", color: "#1a73e8" }}>Hej!</h1>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              marginBottom: "0.5rem",
            }}
          >
            I’m Paul San Diego
          </h2>
          <p style={{ fontWeight: 500, fontSize: "0.9rem" }}>
            | PAL Leader @ KCL | Website Manager | 2nd Year CS Student |
          </p>

          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              justifyContent: "center",
              gap: "1.25rem",
            }}
          >
            <a
              href="https://github.com/jd-paul"
              target="_blank"
              rel="noopener noreferrer"
              className={Cursor.Pointer}
            >
              <img
                src="https://img.icons8.com/ios-glyphs/30/github.png"
                alt="GitHub"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/paul-san-diego"
              target="_blank"
              rel="noopener noreferrer"
              className={Cursor.Pointer}
            >
              <img
                src="https://img.icons8.com/ios-filled/30/linkedin.png"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
      </S.styledModalFrame>
    </S.styledModal>
  );
}

export default Welcome;
