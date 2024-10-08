const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// //REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.AES_SEC_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();

    const { password, ...others } = savedUser._doc;

    res.status(201).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try{
    const user = await User.findOne({
      username: req.body.username
    });
    
    !user && res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.AES_SEC_KEY
    );

    const stringPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    stringPassword != req.body.password && 
      res.status(401).json("Wrong Password");

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SEC_KEY,
    {expiresIn: "3d"}
  );
    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});

  }catch(err){
    return res.status(500).json(err);
  }
});

module.exports = router;