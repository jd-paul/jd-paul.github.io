import React from "react";
import { Cursor } from "@react95/core";
import "./styles.scss";
import { Shell32133, Notepad1 } from "@react95/icons";

function Shortcuts({ openPortfolio, openCV }) {
  return (
    <div style={{ width: 100, marginLeft: 20, marginTop: 20 }}>
      <div className={Cursor.Pointer} onClick={() => openPortfolio()}>
        <Notepad1 variant="32x32_4" style={{ marginLeft: 32, marginTop: 15 }} />
        <p
          style={{
            fontFamily: "MS Sans Serif",
            fontSize: 13,
            justifyContent: "center",
            marginTop: 5,
            width: 100,
            textAlign: "center",
            color: "black",
          }}
        >
          Portfolio.exe
        </p>
      </div>
      <div className={Cursor.Pointer} onClick={() => openCV()}>
        <Shell32133
          variant="32x32_4"
          style={{ marginLeft: 32, marginTop: 15 }}
        />
        <p
          style={{
            fontFamily: "MS Sans Serif",
            fontSize: 13,
            justifyContent: "center",
            marginTop: 5,
            width: 100,
            textAlign: "center",
            color: "black",
          }}
        >
          Paul.txt
        </p>
      </div>
    </div>
  );
}

export default Shortcuts;
