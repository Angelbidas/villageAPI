import User from "./../models/user";
import houseModel from "./../models/houseModel";
import { hashedPassword } from "./../helpers/bcrypt";
exports.createUser = async (req, res, next) => {
  try {
    const hashPassword = await hashedPassword(req.body.password);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nID: req.body.nID,
      email: req.body.email,
      phone: req.body.phone,
      password: hashPassword,
    });
    res.status(200).json({
      Status: "Succeeded",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      Status: "failed",
      error: error.message,
    });
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(201).json({
      Status: "Okay",
      result,
    });
  } catch (error) {
    res.status(400).json({
      Status: "failed",
      error,
    });
  }
};

exports.addHouse = async (req, res) => {
  let ids = [];
  let i = 0;
  const arrayData = req.body;
  let house;
  for (let c of arrayData) {
    const citizen = {
      firstName: c.firstName,
      lastName: c.lastName,
      nID: c.nID,
      email: c.email,
      phone: c.phone,
    };
    try {
      const userData = await User.create(citizen);
      ids[i] = userData._id;
      i = i + 1;
      const len = ids.length;
      house = {
        head: ids[0],
        spouse: ids[1],
        child: ids.slice(2, len)
      };
      
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  try {
     const houseData = await houseModel.create(house);
     res.status(200).json({ message: "success", houseData });
   } catch (error) {
     res.status(404).json({ message: error.message });
   }
};
