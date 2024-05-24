import supabase from '../utils/supabase';

const suggestRates = async (safeType: string, user_location: number, amount?: number) => {
  if (safeType === 'Employment income') {
    try {
      const { data: income_tax_brackets, error } = await supabase
        .from('income_tax_brackets')
        .select('income_tax')
        .eq('state_id', user_location)
        .gt('lower_bound', amount)
        .lt('upper_bound', amount);
      console.log(income_tax_brackets);
      return income_tax_brackets[0].income_tax;
      // Do something with income_tax_brackets
    } catch (error) {
      console.error('Error fetching income tax:', error);
      throw error;
    }
  } else {
    try {
      const { data: suggested_rates, error } = await supabase
        .from('countries_and_states')
        .select(
          safeType === 'Business revenue'
            ? 'def_vat_tax'
            : safeType === 'Trading'
            ? 'def_capgain_tax'
            : 'def_emp_tax'
        )
        .eq('id', user_location);
      console.log(suggested_rates);
      return suggested_rates[0];
      // Do something with suggested_rates
    } catch (error) {
      console.error('Error fetching suggested rates:', error);
      throw error;
    }
  }

  
};

export default suggestRates;
