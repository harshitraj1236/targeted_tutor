const userModel = require("../models/user.model");
const blacklistmodel = require("../models/blacklist.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUserController(req, res) {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!username) {
      return res.status(400).json({
        message: "Please Provide Username",
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Please Provide email",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Please Provide password",
      });
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must be 3-20 characters and contain only letters, numbers, and underscores",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    const isUserAlreadyPresent = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyPresent) {
      if (username === isUserAlreadyPresent.username) {
        return res.status(400).json({
          message: "Account Already Present with this Username",
        });
      }
      if (email === isUserAlreadyPresent.email) {
        return res.status(400).json({
          message: "Account is already present with this email",
        });
      }
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function loginUserController(req, res) {
    try{
        const username = req.body.username?.trim()
        const password = req.body.password
        if(!username){
            return res.status(400).json({
                message: "Enter Your Username"
            })
        }
        if(!password){
            return res.status(400).json({
                message: "Enter your Password"
            })
        }

        const isUserPresent = await userModel.findOne( { username } )
        if (!isUserPresent) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, isUserPresent.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Password is Incorrect"
            })
        }

        const token = jwt.sign(
            {id: isUserPresent._id, username: isUserPresent.username},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: "Login Succefull",
            user: {
                id: isUserPresent._id,
                username: isUserPresent.username,
                email: isUserPresent.email
            }
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function logoutController(req, res) {
    const token = req.cookies.token

    if(token){
        await blacklistmodel.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(201).json({
        message: "User Details are Fetched",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutController,
  getMeController
};
