import express from "express";

const app = express();

app.use("/testing-here", (request, response) => {
  response.send("Testing");
});

export default app;
