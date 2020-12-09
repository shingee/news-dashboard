import express from "express";
import cors from "cors";
import Axios from "axios";
import { PORT, ACCESS_TOKEN, USER_ID } from "./config.js";

const app = express();
app.use(cors({ origin: true }));

app.get("/fetch", async (req, res) => {
  const count = req.query.count;

  let result;
  try {
    result = await Axios.get(
      `https://cloud.feedly.com/v3/streams/user%2F${USER_ID}%2Fcategory%2Fglobal.all/contents?unreadOnly=true&count=${count}&continuation=${req.query.continuation}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(500);
  }

  console.log("Successfully fetched Feedly articles.");

  res.send(result.data);
});

app.listen(PORT, () => console.log(`Server ready: http://localhost:${PORT}`));
