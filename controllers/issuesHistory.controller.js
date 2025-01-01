import issuesHistoryModel from "../models/issuesHistory.model.js";

export default {
  getAllHistories: async (req, res) => {
    try {
      const allhistories = await issuesHistoryModel
        .find()
        .populate("issue_profession");

      res.status(200).json({
        success: true,
        message: true,
        data: allhistories,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: false,
        error: error || error.message,
      });
    }
  },
};
