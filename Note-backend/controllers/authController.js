const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {

    const { name, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
        res.status(400).json({ message: `User already Exist` })
        return
    }
    const hashedPasswrod = bcrypt.hashSync(password, 10)

    const userCreated = await User.create({ name, email, phone, password: hashedPasswrod });

    res.status(200).json({ messgae: "User created successfully", token: await userCreated.generateToken() });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        if (bcrypt.compareSync(password, userExist.password)) {
            res.status(200).json({ message: 'login successful', token: await userExist.generateToken() })
        }
        else {
            res.status(400).json({ message: 'invalid credentials' })
        }
    }
    else {
        res.status(500).json({ message: 'invalid credentials' })
    }

}


module.exports = { register, login};
