// import axios from "axios";

interface CreateSafeParams {
    safeName: string;
    safeType: string;
    withholdingAccount: string;
    withholdingAmount: number;
    spendings: number;
    amount?: number;
    user_id: number;
  }
  
  const CreateSafe = async ({
    safeName,
    safeType,
    withholdingAccount,
    withholdingAmount,
    spendings,
    amount,
    user_id
  }: CreateSafeParams) => {
    try {
      // Example API endpoint - replace with your actual API endpoint
      // const apiEndpoint = 'https://staxer.uc.r.appspot.com/create-safe';
  
      // Construct the request payload
      const payload = {
        safeName,
        safeType,
        withholdingAccount,
        withholdingAmount,
        spendings,
        amount,
        user_id,
      };
      
      // Set the spendings amount as a remainder safe?

      // Log the API call instead of making the actual call
      console.log('API safe creation call:', payload);
  
      // Make the API call to create the safe
      // const response = await axios.post(apiEndpoint, payload);
  
      // Handle the response (you can customize this based on your API's response structure)
      // if (response.status === 200) {
      //   console.log('Safe created successfully:', response.data);
      //   return response.data;
      // } else {
      //   console.error('Error creating safe:', response.statusText);
      //   throw new Error('Failed to create safe');
      // }
    } catch (error) {
      console.error('Error creating safe:', error);
      throw error;
    }
  };
  
  export default CreateSafe;
  