const messages = {
    // Login specific messages
    USER_LOGIN_FAILURE: "Unable to login the user, try again",
    USER_LOGIN_SUCCESS: "User logged-in successfully",
    INVALID_CREDENTIALS: "Invalid credentials",
  
    // Authentication specific messages
    TOKEN_EXPIRED: "Token expired, Kindly login again",
    USER_NOT_FOUND: "No user found, Kindly register.",
    USER_NOT_AUTHORIZED: "User is not authorized, Kindly login.",
  
    INTERNAL_SERVER_ERROR: "Internal server error, try again after some time",
  
    // File specific messages
    FILE_UPLOAD_FAILURE: "Unable to upload file, try again",
    FILE_UPLOAD_SUCCESS: "File uploaded successfully",
    FILE_FETCH_SUCCESS: "Files fetched successfully",
    FILE_FETCH_FAILURE: "Unable to fetch the files list",
    ONLY_ONE_FILE: "Please upload only one file",
  };
  
  const status = {
    UNAUTHORIZED: "UNAUTHORIZED",
    BAD_REQUEST: "BAD_REQUEST",
    SUCCESS: "SUCCESS",
  };

  const allowedFileTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "video/mp4"
  ];

  const maxFileSize = 10 * 1024 * 1024;
  
  module.exports = {
    messages,
    status,
    allowedFileTypes,
    maxFileSize,
  };
  