import { Icon } from "@fluentui/react";
import React from "react";
import { FiInstagram } from "react-icons/fi";
import { IoGlobeSharp } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";
export default class FooterComponent extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          width: "100%",
        }}
      >
        <p>
          Developed by:{" "}
          <a
            style={{ color: "#000", textDecoration: "none" }}
            href="https://pratiktiwari.com"
          >
            {" "}
            Pratik K Tiwari
          </a>
        </p>
        <div
          className="footerIconsBottom"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="https://linkedin.com/in/pratikktiwari"
            target="_blank"
            rel="noreferrer"
          >
            <Icon iconName="LinkedInLogo" />
          </a>
          <a href="https://pratiktiwari.com" target="_blank" rel="noreferrer">
            <IoGlobeSharp />
          </a>
          <a
            href="https://github.com/pratikktiwari"
            target="_blank"
            rel="noreferrer"
          >
            <VscGithub />
          </a>
          <a
            href="https://instagram.com/pratikktiwari"
            target="_blank"
            rel="noreferrer"
          >
            <FiInstagram />
          </a>
        </div>
      </div>
    );
  }
}
