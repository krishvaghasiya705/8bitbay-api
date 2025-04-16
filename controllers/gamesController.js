const { readData, writeData } = require("../utils/fileHelper");

exports.getAllGames = (req, res) => {
  const data = readData();
  res.json(data); // Return the entire data object
};

exports.addGame = (req, res) => {
  let data = readData();

  // Ensure data is an object with a 'record' array
  if (!data || typeof data !== "object" || !Array.isArray(data.record)) {
    data = { record: [] };
  }

  const newGame = { ...req.body, id: Date.now().toString() };
  data.record.push(newGame);
  writeData(data);
  res.status(201).json(newGame);
};

exports.updateGame = (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.record.findIndex((game) => game.id === id);
  if (index === -1) return res.status(404).json({ message: "Game not found" });

  data.record[index] = { ...data.record[index], ...req.body };
  writeData(data);
  res.json(data.record[index]);
};
