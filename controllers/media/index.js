const {
    uploadFile,
    getFileListPerUser,
  } = require("../../services/media");
  const response = require("responsify-requests");
  const { messages, status } = require("../../constants/messages");
  const { convertLocalFileToUrl } = require("../../helpers/fileHelpers");
  
  const uploadFileController = async (req, res) => {
    try {
      let files = req.file;
      let fileData;
      console.log('files ', req.file)
      let fileUrl = convertLocalFileToUrl(files?.filename);
  
      if (files.fieldname == "media") {
        fileData = {
          fileName: files?.filename,
          fileType: files?.mimetype,
          fileSize: files?.size,
        };
  
        let fileUploadService = await uploadFile(fileData, req.userId);
  
        if (fileUploadService == 2) {
          return response(
            res,
            {},
            0,
            messages.USER_NOT_FOUND,
            status.BAD_REQUEST
          );
        } else if (fileUploadService == 0) {
          return response(
            res,
            {},
            0,
            messages.FILE_UPLOAD_FAILURE,
            status.BAD_REQUEST
          );
        } else {
          return response(
            res,
            { fileUrl: fileUrl },
            1,
            messages.FILE_UPLOAD_SUCCESS,
            status.SUCCESS
          );
        }
      } else {
        return response(res, {}, 0, messages.ONLY_ONE_FILE, status.BAD_REQUEST);
      }
    } catch (error) {
      console.log("error in uploadFileCotroller ", error);
      return response(res, {}, 0, messages.INTERNAL_SERVER_ERROR);
    }
  };
  
  const getFileListController = async (req, res) => {
    try {
      const getListService = await getFileListPerUser(req.body, req.userId);
  
      if (getListService == 2) {
        return response(
          res,
          {},
          0,
          messages.USER_NOT_FOUND,
          status.BAD_REQUEST
        );
      } else if (getListService == 1) {
        return response(res, [], 1, messages.FILE_FETCH_FAILURE, status.SUCCESS);
      } else {
        return response(
          res,
          getListService,
          1,
          messages.FILE_FETCH_SUCCESS,
          status.SUCCESS
        );
      }
    } catch (error) {
      console.log("error in get file list controller ", error);
      return response(res, {}, 0, messages.INTERNAL_SERVER_ERROR);
    }
  };

module.exports = {
    uploadFileController,
    getFileListController,
}