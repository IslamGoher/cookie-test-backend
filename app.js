const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const port = process.env.PORT || 3000;

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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxMjM0NTY3ODkiLCJuYW1lIjoiSXNsYW0gR29oZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.9Aw695oReAWTfRn_D2AuVeo-M4Jf5U51Ramg3Tvjmbo";
  
    res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      domain: clientDomain,
      // maxAge: 10,
      expires: new Date(Date.now() + 10),
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
