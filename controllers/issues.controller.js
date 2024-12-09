// import issueModel from "../models/issues.model.js";
// import cloudinary from "../service/cloudinary.service.js";
// import pLimit from "p-limit";

// export default {
//   addIssues: async (req, res) => {
//     try {
//       const {
//         issue_building,
//         issue_floor,
//         issue_apartment,
//         issue_description,
//       } = req.body;

//       if (
//         !issue_building ||
//         !issue_floor ||
//         !issue_apartment ||
//         !issue_description ||
//         !req.files ||
//         req.files.length === 0
//       )
//         throw new Error("all fields required!");

//       const limit = pLimit(5);

//       const images = req.files.map((file) =>
//         limit(async () => await cloudinary.uploader.upload(file.path))
//       );

//       const results = await Promise.all(images);

//       req.body.issue_images = results.map((result) => result.secure_url);

//       console.log(req.body);
//       const issue = await issueModel.create(req.body);

//       res.status(200).json({
//         success: true,
//         message: "Success add issue",
//         issue,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         massege: "not Success add new issue",
//       });
//     }
//   },
// };
