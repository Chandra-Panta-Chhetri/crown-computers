const app = require("./app");
const express = require("express");
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server Online on PORT ${process.env.PORT}`);
});
