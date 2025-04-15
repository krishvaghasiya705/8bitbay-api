const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/games.json");

const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
