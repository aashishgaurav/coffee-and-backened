import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import uploadCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
  //   res.status(200).json({
  //   message: "app is running good"
  // })

  const {fullName, password, email, username} = req.body
  console.log("email:", email)
  if(
    [fullName, email, password, username].some((field) => field.trim() ==="")
  ){
     throw new ApiError(400, "All fields are compulsory")
  }

  const existedUser =User.findOne({
    $or: [{username}, {email}]
  })
  if(existedUser){
    throw new ApiError(409, "User with email or username is already existed")
  }


  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar files are required")
  }

  const avatar = await uploadCloudinary(avatarLocalPath)
  const coverImage = await uploadCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400, "Avatar files are required")
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase()
  })
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )

})

export default registerUser
