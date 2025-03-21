const { default: mongoose } = require('mongoose');
const { convertLocalFileToUrl } = require('../../helpers/fileHelpers');
const mediaModel = require('../../models/mediaModel');
const userModel = require('../../models/userModel');

const uploadFile = async (fileData, userId) => {
    try {
      const findUserForMedia = await userModel.findOne({
        _id: userId,
      });
      if (!findUserForMedia) {
        return 2; // No user found
      } else {
        let createFileData = await mediaModel.create({
          ...fileData,
          userId: userId,
        });
  
        if (!createFileData) {
          return 0; // Unable to upload the file, try again
        } else {
          return 1; // File uploaded successfully
        }
      }
    } catch (error) {
      console.log("error in upload file service", error);
      throw new Error();
    }
};

const getFileListPerUser = async (reqBody, userId) => {
    try {
      const findUserById = await userModel.findOne({
        _id: userId,
      });
  
      if (!findUserById) {
        return 2; // Unable to find user.
      } else {
        const list = await mediaModel.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $unwind: {
              path: "$userDetails",
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $match: {
              "userDetails._id": new mongoose.Types.ObjectId(userId),
            },
          },
          {
            $addFields: {
              fileUrl: { $concat: [convertLocalFileToUrl("/"), "$fileName"] },
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ]);
  
        if (list.length == 0) {
          return 1; // No files for given user
        } else {
          return list;
        }
      }
    } catch (error) {
      console.log("error in getting file list service", error);
      throw new Error();
    }
  };


module.exports = {
    uploadFile,
    getFileListPerUser,
}