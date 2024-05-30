import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/CardText";
import CustomTooltip from "../components/CustomTooltip";
import suggestRates from "../utils/suggestRates";
import "../styles/newsafe.css";
import axios from "axios";
import BlackCard from "../components/BlackCard";

interface CreateNewSafeProps {}

const CreateNewSafe: React.FC<CreateNewSafeProps> = () => {
  // placeholder values
  const user_location = 6;
  // const user_id = 1

  const navigate = useNavigate();
  const [safeName, setSafeName] = useState("");
  const [safeTypes, setSafeTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [safeType, setSafeType] = useState<string>("");
  const [withholdingAccount, setWithholdingAccount] = useState<string>(""); // [public key / nickname
  const [withholdingAmount, setWithholdingAmount] = useState<number>(0);
  const [spendings, setSpendings] = useState<number>(0);
  const [amount, setAmount] = useState<number | undefined>(0);
  const [error, setError] = useState<string | null>(null);

  // fetch Safe types from the DB
  useEffect(() => {
    const fetchSafeTypes = async () => {
      try {
        let {
          data: { data: safe_types, error },
        } = await axios.post("https://staxer.uc.r.appspot.com/select", {
          table: "safe_types",
        });

        if (error) {
          console.error("Error fetching safe types:", error);
        } else {
          // Extract descriptions from the fetched data
          // Array.isArray is used to check if safe_types isn't null
          if (Array.isArray(safe_types)) {
            const descriptions = safe_types.map((type) => type.description);
            setSafeTypes(descriptions);
          }
        }
      } catch (error) {
        console.error("Error fetching safe types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSafeTypes();
  }, []);

  // calls suggestRates function when the safe type changes
  useEffect(() => {
    const fetchRates = async () => {
      if (safeType && user_location) {
        setLoading(true);
        setError(null);
        try {
          const rate = await suggestRates(safeType, user_location, amount);
          console.log("rate", rate);
          setWithholdingAmount(rate);
        } catch (err) {
          setError('Failed to fetch rates');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRates();
  }, [safeType, user_location, amount]);

  // fetches change in safe types
  const handleSafeTypeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSafeType(e.target.value);
    console.log("safeType", e.target.value);
  };

  let calculateSpendings = (rate: number) => `${(100 - rate)}%`;

  useEffect(() => {
    setSpendings(parseFloat(calculateSpendings(withholdingAmount)));
  }, [withholdingAmount]);

  const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(newAmount);

    if (safeType) {
      try {
        const suggestedRate = await suggestRates(
          safeType,
          user_location,
          newAmount
        );
        setWithholdingAmount(suggestedRate);
        console.log("suggested rate", suggestedRate);
      } catch (error) {
        console.error("Error suggesting rates:", error);
      }
    }
  };

  const formatPercentage = (rate: number | null) => {
    if (rate === null) {
      return "";
    }
    return `${rate.toFixed(2)}%`;
  }

  const CreateNewSafeClickHandler = () => {
    if (!safeType || !safeName) {
      alert("Please fill al the values.");
      return;
    } else if (!withholdingAmount) {
      alert("Please enter a withholding amount.");
      return;
    }

    // Send new safe info to the backend

    navigate("/newsafe/2", {
      state: {
        safeName,
        safeType,
        withholdingAccount,
        withholdingAmount,
        spendings,
        amount,
      },
    });
  };

  return (
    <main className="createsafe">
      <h2>Select what applies to you</h2>
      <BlackCard text="Staxer is still in the alpha stage of development and we don't have the full features ready yet. It is intended to suggest which percentage of your wallets you need to withhold for tax purposes according to your location." />

      <Card text="A safe is a space for saving a part of your income automatically. You can create different rules for each safe." />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <select
          defaultValue=""
          value={safeType}
          onChange={handleSafeTypeChange}
          className="form-select-wide"
        >
          <option value="" disabled hidden>
            Choose which safe you want to create
          </option>
          {safeTypes.map((description, index) => (
            <option 
              value={description} 
              key={index} 
              label={description}
              disabled={description === "Employment income"}
            >
              {description}
            </option>
          ))}
        </select>
      )}

      <span className="form-name">
        <label htmlFor="safeName">Name of safe: </label>

        <input
          type="text"
          id="safeName"
          value={safeName}
          onChange={(e) => {
            setSafeName(e.target.value);
          }}
        />
      </span>

      <span        
        style={{ display: safeType === "Employment income" ? "block" : "none" }}
      >
        <label htmlFor="safeName">
          Income amount:{" "}
          <CustomTooltip text="Insert your crypto income as a result of employment." />
        </label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </span>

      <Card text="Based on your previous answers, we recomment the following settings." />

      <p>
        Withholding amount <CustomTooltip text="Income Tax" />{" "}
      </p>
      <span className="form-text-button">
        <input
          type="text"
          value={formatPercentage(withholdingAmount)}
          onChange={(e) => setWithholdingAmount(parseFloat(e.target.value))}
        />
      </span>

      <p>
        Withholding account{" "}
        <CustomTooltip text="Plase add a name to your withholding account." />
      </p>
      <span className="form-text-button">
        <input
          type="text"
          placeholder="Public key / nickname"
          value={withholdingAccount}
          onChange={(e) => setWithholdingAccount(e.target.value)}
        />
      </span>

      <p>Spendings amount</p>
      <span className="form-text-button">
        <input
          type="text"
          value={spendings + " %"}
          readOnly
          onChange={(e) => setSpendings(parseFloat(e.target.value))}
        />
      </span>

      { error ? <BlackCard text={error}/> : null }

      <button onClick={CreateNewSafeClickHandler} className="button-wide">
        Continue
      </button>
    </main>
  );
};

export default CreateNewSafe;
