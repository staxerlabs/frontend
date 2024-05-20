import apiKey from "./location_api";
import supabase from "./supabase";

export default async function getLocationfromGeocode(latitude: number, longitude: number) {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
    //   console.log('Location data:', data.items[0].address.countryCode);

        const countryCode = data.items[0].address.countryCode;

      
        let { data: countries_and_states } = await supabase
        .from('countries_and_states')
        .select('name')
        .eq('name', countryCode)

        return countries_and_states               

      // Process the location data as needed
    } catch (error) {
      console.error('Error calling location API:', error);
    }
  }
  