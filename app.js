const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const port = 3000;

app.use(cookieParser());

const clientDomain = "alienawy.site";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", `https://${clientDomain}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/login", (req, res) => {
  console.log("POST '/login'");
  res
    .cookie("token", "1234567890", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      domain: clientDomain,
    })
    .json({ status: 200, message: "cookie must be set" });
});

app.get("/access", (req, res) => {
  if (req.cookies.token) {
    return res.json({ message: "success" });
  }
  return res.json({ message: "no no no no no no no" });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
