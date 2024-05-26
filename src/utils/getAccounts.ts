import axios from "axios";

interface Account {
  nickname: string;
}

export const getAccounts = async (): Promise<Account[] | Error> => {
  try {
    let {
      data: { data: accounts, error },
    } = await axios.post("https://staxer.uc.r.appspot.com/select", {
      table: "accounts",
    });

    if (!accounts || accounts.length === 0) {
      console.error(error);
      return new Error("No accounts found");
    } else {
      // console.log(accounts);
      return accounts as Account[];
    }
  } catch (error: any) {
    console.error("Error while fetching accounts:", error);
    throw error;
  }
};
