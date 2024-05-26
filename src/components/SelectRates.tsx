import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/onboarding.css";
import Card from "./CardText";
import axios from "axios";

interface SelectRatesProps {}

const SelectRates: React.FC<SelectRatesProps> = () => {
  // get user id
  const user_id = 1;

  const navigate = useNavigate();

  const [trade, setTrade] = useState<boolean>(false);
  const [tradeRate, setTradeRate] = useState<number>(0);

  const [income, setIncome] = useState<boolean>(false);
  const [incomeRate, setIncomeRate] = useState<number>(0);

  const [donation, setDonation] = useState<boolean>(false);
  const [donationRate, setDonationRate] = useState<number>(0);

  const SelectRatesClickHandler = async () => {
    // Send percentage info to the backend
    const {
      data: { error },
    } = await axios.post("https://staxer.uc.r.appspot.com/insert", {
      table: "user_rates",
      body: {
        id_user: user_id,
        trade_rate: trade ? tradeRate : null,
        income_rate: income ? incomeRate : null,
        donation_rate: donation ? donationRate : null,
      },
    });

    if (error) {
      console.error("Error inserting rates:", error);
    } else {
      navigate("/newsafe");
    }
  };

  return (
    <main>
      <h2>Select what applies to you</h2>

      <Card text="Your withholding rate defines your percentage  auto-deducting from incoming funds to your wallet for taxes or expenses." />

      <div className="rates-grid">
        <span className="rates-headline">tax rate</span>

        <input
          type="checkbox"
          checked={trade}
          onChange={(e) => setTrade(e.target.checked)}
        />
        <p>I trade</p>
        <input
          type="text"
          placeholder="20%"
          onChange={(e) => setTradeRate(parseFloat(e.target.value))}
        />

        <input
          type="checkbox"
          checked={income}
          onChange={(e) => setIncome(e.target.checked)}
        />
        <p>I receive income</p>
        <input
          type="text"
          placeholder="20%"
          onChange={(e) => setIncomeRate(parseFloat(e.target.value))}
        />

        <input
          type="checkbox"
          checked={donation}
          onChange={(e) => setDonation(e.target.checked)}
        />
        <p>I donate</p>
        <input
          type="text"
          placeholder="10%"
          onChange={(e) => setDonationRate(parseFloat(e.target.value))}
        />
      </div>

      <button onClick={SelectRatesClickHandler}>Continue</button>
    </main>
  );
};

export default SelectRates;
