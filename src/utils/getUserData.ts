import axios from "axios";

const getUserData = async (id: number) => {
  // Fetch nickname from database
  let {
    data: { data: users },
  } = await axios.post("https://staxer.uc.r.appspot.com/select", {
    table: "users",
    match: {
      id,
    },
  });

  return users;
};

export default getUserData;
