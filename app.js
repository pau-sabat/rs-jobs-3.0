const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Configure marked for safe HTML output
let marked;
(async () => {
  const { marked: markedModule } = await import("marked");
  marked = markedModule;
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
})();

// Add md function to locals for use in templates
app.use((req, res, next) => {
  res.locals.md = (text) => {
    if (!marked) return text || "";
    return marked(text || "");
  };
  next();
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/home.json"));
  res.render("rsjobs-home", { data });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
