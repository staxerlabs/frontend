import axios from "axios";

export default async function getLocationFromId(id: number) {
    try {
      const {
        data: { data, error },
      } = await axios.post("https://staxer.uc.r.appspot.com/select", {
        table: "countries_and_states",
        match: {
          id: id,
        },
      });
  
      if (error) {
        throw new Error(`Error retrieving description by id: ${error.message}`);
      }
  
      if (data.length === 0) {
        throw new Error(`No description found for id ${id}`);
      }
  
      return data[0].description;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  