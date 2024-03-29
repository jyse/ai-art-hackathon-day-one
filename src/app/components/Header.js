import React from "react";
import "./Header.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <h1>ArtIVerse Studio</h1>
      <div className="menu">
        <Link href="https://discord.gg/Jwvu4pJ3S5">
          <h2>Go to Discord</h2>
        </Link>
        <Link href="https://www.linkedin.com/in/jessy-the/">
          <LinkedInIcon fontSize="large" />
        </Link>
        <Link href="https://www.linkedin.com/in/jessy-the/">
          <InstagramIcon fontSize="large" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
