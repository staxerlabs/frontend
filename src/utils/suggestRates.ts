import axios from "axios";
import supabase from "../utils/supabase";

const suggestRates = async (
  safeType: string,
  user_location: number,
  amount?: number
) => {
  // const countries_fixed_taxes = [
  //   {name: 'Capital gains tax', value: 'def_capgain_tax'},
  //   {name: 'Employment income tax', value: 'def_emp_tax'},
  //   {name: 'Value-added tax', value: 'def_vat_tax'},
  // ];

  if (safeType === "Employment income") {
    try {
      const {
        data: { data: income_tax_brackets },
      } = await axios.post("https://staxer.uc.r.appspot.com/select-range", {
        table: "income_tax_brackets",
        match: {
          state_id: user_location,
        },
        upperbound: {
          column: "lower_bound",
          value: amount,
        },
        lowerbound: {
          column: "upper_bound",
          value: amount,
        },
      });
      return income_tax_brackets[0].income_tax;
    } catch (error) {
      console.error("Error fetching income tax:", error);
      throw error;
    }
  } else {
    try {
      const {
        data: { data: suggested_rates, error },
      } = await axios.post("https://staxer.uc.r.appspot.com/select", {
        table: "countries_and_states",
        match: {
          id: user_location,
        },
      });

      if (error) {
        throw error;
      }

      if (suggested_rates.length > 0) {
        const rateValue = Object.values(suggested_rates[0])[0]; // Get the value from the first (and only) key
        return rateValue;
      } else {
        throw new Error("No matching suggested rates found");
      }
    } catch (error) {
      console.error("Error fetching suggested rates:", error);
      throw error;
    }
  }
};

export default suggestRates;
