
require("dotenv").config();

const cloudinary = require("./utils/cloudinary");

async function testUpload() {
  try {
    console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API key exists:", !!process.env.CLOUDINARY_API_KEY);
    console.log("API secret exists:", !!process.env.CLOUDINARY_API_SECRET);

    const result = await cloudinary.uploader.upload(
      "./test-image.png",
      { folder: "pvt/posts" }
    );

    console.log("Upload successful!");
    console.log("Image URL:", result.secure_url);
  } catch (error) {
    console.error("Full error:", error);
    console.error("Error message:", error.message);
    console.error("HTTP status:", error.http_code);
  }
}

testUpload();