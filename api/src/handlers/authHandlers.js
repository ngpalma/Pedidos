const {
  loginController,
  registerController,
} = require("../controllers/authControllers");

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginUser = await loginController(email, password);
    res.cookie("PEDIDOS-AUTH", loginUser.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    res.status(200).json(loginUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const registerHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const registerUser = await registerController(
      email,
      password,
      firstName,
      lastName
    );
    res.status(200).json(registerUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { loginHandler, registerHandler };
