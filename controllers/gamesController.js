const { readData, writeData } = require("../utils/fileHelper");

exports.getAllGames = (req, res) => {
  const data = readData();
  res.json(data); // Return the entire data object
};

exports.addGame = (req, res) => {
  const data = readData();

  // Define the new game structure
  const newGame = {
    name: req.body.name || "",
    version: req.body.version || "",
    includes: req.body.includes || [""],
    id: Date.now().toString(),
    tags: req.body.tags || [""],
    companies: req.body.companies || [""],
    language: req.body.language || "",
    original_size: req.body.original_size || "",
    repack_size: req.body.repack_size || "",
    download_links: {
      direct_links: req.body.download_links?.direct_links || [
        { link: "", link_name: "", text: "" },
        { link: "", link_name: "", text: "" },
        { link: "", link_name: "", text: "" },
      ],
      torrent: req.body.download_links?.torrent || [
        { link: "", link_name: "", text: "" },
      ],
    },
    banner_image: req.body.banner_image || "",
    images: req.body.images || [""],
    imagevid: req.body.imagevid || "",
    repack_details: {
      title: req.body.repack_details?.title || "",
      features: req.body.repack_details?.features || [""],
    },
    game_details: {
      description: req.body.game_details?.description || "",
      no_return_mode: req.body.game_details?.no_return_mode || "",
      features: req.body.game_details?.features || [""],
    },
  };

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
