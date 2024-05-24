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
