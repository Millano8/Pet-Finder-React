import algoliasearch from "algoliasearch";
import "dotenv/config";
const ALGOLIA_APP_ID = "7TZRWG2V1D"
const ALGOLIA_KEY = "9203668199b4848b61117fb5afef8ad3" 
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_KEY);

const petIndex = client.initIndex('pets');

export {petIndex};