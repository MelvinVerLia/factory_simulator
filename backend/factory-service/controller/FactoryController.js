const {
  getAllFactories,
  buyFactorys,
  getPlayerById,
  getFactoryById,
  updateWallet,
} = require("../repository/FactoryRepository");

const selectAllFactories = async (req, res) => {
  try {
    const response = await getAllFactories();
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const buyFactory = async (req, res) => {
  const player_id = "02bed726-39f3-453a-88bc-2c9b5aa7161a";
  const factory_id = "ab9f8e0a-792f-463e-9f1a-f911e21199ab";
  try {
    const player = await getPlayerById(player_id);
    const factory = await getFactoryById(factory_id);

    if (!player || !factory) return res.json("Factory or player not found");

    const wallet = parseFloat(player.wallet);

    const price = parseFloat(factory.price);

    if (wallet < price) return res.json("You Dont Have Enough Money!");

    const response = await buyFactorys(player_id, factory_id, price);

    res.json(response.rows).status(200);
  } catch (error) {
    res.json(error.message).status(500);
  }
};

const processResources = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  selectAllFactories,
  buyFactory,
};
