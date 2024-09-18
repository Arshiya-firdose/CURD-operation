import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//EXPRESS
const app = express();
app.use(express.json());
//CORS
app.use(cors());

//MONGODB-CONNECTION
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/CURD");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};
connectDB();

//USER-SCHEMA
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//CREATE-MODEL
const User = mongoose.model("User", userSchema);

//REST-API'S
//CREATE-USER
app.post("/createUser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

app.get("/readAllUser", async (req, res) => {
  try {
    const allData = await User.find({});
    res.send(allData);
  } catch (error) {
    res.send(error);
  }
});

app.get("/readSingleUserData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleUserData = await User.findById({ _id: id });
    res.send(singleUserData);
  } catch (error) {
    res.send(error);
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    //req.body contain updated dataand new true i that will return new updated data as by defaault findbyidandupdate returnold data
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/deleteUser/:id",async(req,res)=>{
    try {
        const id=req.params.id
     const user=await User.findByIdAndDelete({_id:id})   
     res.send(user)
    } catch (error) {
        res.send(error)
    }
})
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app running on  ${PORT}`);
});
