import mongoose from "mongoose";
import bcrypt, { compare } from 'bcryptjs' 

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "lawyer", "admin"],
      default: "customer",
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[0-9]{10,15}$/.test(v); // Basic phone validation
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    // location: {
    //   type: String,
    //   trim: true,
    // },
    profileImg:{
        type: String,
    },
    password:{
      type: String,
      required: true,
      minlength: 6,
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// hash password before saving the user
userSchema.pre('save', async function(next){

  if(!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

// compare password function
userSchema.methods.comparePassword = async function(userPassword) {
  return await bcrypt.compare(userPassword, this.password)
}

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
