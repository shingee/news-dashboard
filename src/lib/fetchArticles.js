import Axios from "axios";
import { PORT } from "../config";

const fetchArticles = async () => {
  const result = await Axios.get(`http://localhost:${PORT}/fetch?count=480`);

  return result;
};

export default fetchArticles;
