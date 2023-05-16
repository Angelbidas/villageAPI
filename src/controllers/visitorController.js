import Visitor from '../models/visitor.js';

export const addVisitor = async (req, res) => {
  try {
    const visitor = new Visitor(req.body);
    const savedVisitor = await visitor.save();
    res.status(201).json(savedVisitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
