import React from "react";
// import { Fingerprint } from "@phosphor-icons/react";
import logo from "../assets/staxer-black.png";
import worldid_white from "../assets/worldid_white.png";
import "../styles/onboarding.css";

interface WorldIdProps {}

const WorldId: React.FC<WorldIdProps> = () => {

  const worldIdClickHandler = () => {
    const nonce = Date.now();
    console.log(nonce);
    window.location.href = `https://id.worldcoin.org/login?response_type=code&response_mode=query&client_id=app_7cbc22f80e20373856dd02a25468805f&redirect_uri=https://staxer-frontend-beige.vercel.app/worldcoin&ready=true&scope=openid&nonce=${nonce}`;
  };

  return (
    <main className="onboarding">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Automate your tax withholdings and earn interest on withheld taxes.</p>

      <button onClick={worldIdClickHandler} className="button-wide">
        <img src={worldid_white} alt="worldid" className="icon" />
        Verify with World ID
      </button>
    </main>
  );
};

export default WorldId;
