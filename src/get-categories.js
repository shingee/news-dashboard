import Axios from "axios";
import { ACCESS_TOKEN } from "./config.js";

const getUserCategories = async () => {
  let result;
  try {
    result = await Axios.get(`https://cloud.feedly.com/v3/collections`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  } catch (e) {
    console.log(e);
    return;
  }

  return result.data;
};

(async () => {
  const cats = await getUserCategories();
  if (cats) {
    cats.forEach(cat => {
      console.log(`${cat.label} — ${cat.id}`);
    });
  }

  process.exit();
})();
