import issueModel from "../models/issues.model.js";
import cloudinary from "../service/cloudinary.service.js";
import pLimit from "p-limit";

export default {
  addIssues: async (req, res) => {
    try {
      const {
        issue_building,
        issue_floor,
        issue_apartment,
        issue_description,
      } = req.body;

      if (
        !issue_building ||
        !issue_floor ||
        !issue_apartment ||
        !issue_description ||
        !req.files ||
        req.files.length === 0
      )
        throw new Error("all fields required!");

      const limit = pLimit(5);

      const images = req.files.map((file) =>
        limit(async () => await cloudinary.uploader.upload(file.path))
      );

      const results = await Promise.all(images);

      req.body.issue_images = results.map((result) => result.secure_url);

      console.log(req.body);
      const issue = await issueModel.create(req.body);

      res.status(200).json({
        success: true,
        message: "Success add issue",
        issue,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        massege: "not Success add new issue",
      });
    }
  },
  getAllIssues: async (req, res) => {
    try {
      const { page = 1, limit = 4 } = req.query;

      const count = await issueModel.countDocuments();

      const skip = (page - 1) * limit;

      const allIssues = await issueModel
        .find()
        .skip(skip)
        .limit(limit);
      res.status(200).json({
        success: true,
        message: true,
        data: allIssues,
        count: count,
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
  autocompleteIssue: async (req, res) => {
    const INDEX_NAME = "autocomplete";
    try {
      const SearchQuery = req.query.query;

      const pipeline = [];
      pipeline.push({
        $search: {
          index: INDEX_NAME,
          autocomplete: {
            query: SearchQuery,
            path: "issue_building",
            tokenOrder: "sequential",
          },
        },
      });
      pipeline.push({ $limit: 7 });
      pipeline.push({
        $project: {
          _id: 1,
          score: { $meta: "searchScore" },
          issue_building: 1,
          issue_floor: 1,
          issue_apartment: 1,
          issue_description: 1,
          issue_images: 1,
        },
      });
      const result = await issueModel.aggregate(pipeline).sort({ score: -1 });
      res.json({
        success: true,
        message: "the issue is found successfully",
        result,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "the issue is not found successfully",
      });
    }
  },
};
