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
      const { data: income_tax_brackets }: any = await supabase
        .from("income_tax_brackets")
        .select("income_tax")
        .eq("state_id", user_location)
        .gt("lower_bound", amount)
        .lt("upper_bound", amount);
      return income_tax_brackets[0].income_tax;
    } catch (error) {
      console.error("Error fetching income tax:", error);
      throw error;
    }
  } else {
    try {
      const { data: suggested_rates, error } = await supabase
        .from("countries_and_states")
        .select(
          safeType === "Business revenue"
            ? "def_vat_tax"
            : safeType === "Trading"
            ? "def_capgain_tax"
            : "def_emp_tax"
        )
        .eq("id", user_location);

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
