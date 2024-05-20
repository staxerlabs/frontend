import supabase from './supabase';

const fetchLocationSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('countries_and_states')
          .select('description, name')
          .ilike('description', `%${query}%`);

        if (error) {
          throw new Error(`Error fetching location suggestions: ${error.message}`);
        }

        console.log('Fetched locations:', data);
        setResults(data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        setResults([]);
      }
    }, 300), // 300ms debounce delay
    []
  );