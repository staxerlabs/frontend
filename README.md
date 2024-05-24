# Staxer dApp

## Setting Up Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Copy the contents of `.env.example` into `.env`.
3. Replace the placeholder values with your actual keys and credentials.

```bash
cp .env.example .env
```

## Location Tracking
We use (https://www.here.com/docs/category/geocoding-search-v7)[HERE Tracking API revert geocode] to track the user's location. The API's free tier allows 1000 requests per day.

## All Supabase calls
 components/CreateNewSafe - function fetchSafeTypes get all safe_types

### utils folder
getAccounts - fetch user account
getLocationFromGeocode - does the API call and match/add it to Supabase
getSafes - as it is, doesn't connect to user_id
supabaseLocation - Looks if the user location is already in the DB, and if it's not, adds it to the DB
transaction.json - Placeholder data for the history transaction, while the blochchain connections are still under development.
