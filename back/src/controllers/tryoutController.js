import * as tryoutService from "../services/tryoutService.js";

export const getTryout = async (req, res) => {
  try {
    const tryout = await tryoutService.getTryout();
    res.status(200).json(tryout);
  } catch (err) {
    console.error("Error fetching tryout:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTryout = async (req, res) => {
  try {
    const tryoutData = req.body;
    const newTryout = await tryoutService.createTryout(tryoutData);
    res.status(200).json(newTryout);
  } catch (err) {
    console.error("Error adding tryout:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTryout = async (req, res) => {
  try {
    const tryoutId = req.params.id;
    const tryoutData = req.body;
    const updatedTryout = await tryoutService.updateTryout(
      tryoutId,
      tryoutData
    );
    if (!updatedTryout) {
      return res.status(404).json({ message: "Tryout not found" });
    }
    res.status(200).json(updatedTryout);
  } catch (err) {
    console.error("Error updating tryout:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTryout = async (req, res) => {
  try {
    const tryoutId = req.params.id;
    const deleted = await tryoutService.deleteTryout(tryoutId);
    if (!deleted) {
      return res.status(404).json({ message: "Tryout not found" });
    }
    res.status(200).send();
  } catch (err) {
    console.error("Error deleting tryout:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchTryout = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const tryouts = await tryoutService.searchTryouts(searchTerm);
    res.status(200).json(tryouts);
  } catch (error) {
    console.error("Error searching tryouts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
