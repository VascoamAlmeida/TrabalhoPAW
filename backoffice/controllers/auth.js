const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../jwt_secret/config");

var authController = {};

authController.getLogin = (req, res) => {
  res.render("auth/login");
};

authController.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).redirect('login') //send("No user found.");

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res.status(401).redirect('login');

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    // return the information including token as JSON
    res.cookie('auth-token', token, { maxAge: 86400000, httpOnly: true, sameSite: 'lax' }); // 24 hours
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error on the server.").redirect('login');
  }
};

authController.logout = function(req, res, next) {
  res.clearCookie('auth-token')
  res.redirect('/')
};

authController.getRegister = (req, res) => {
  res.render("auth/register");
};

authController.register = async (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  try {
    const user = await User.create({
      name: req.body.name || "",
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "Doador",
      points: req.body.points || 0
    });

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.cookie('auth-token', token, { maxAge: 86400000, httpOnly: true, sameSite: 'lax' });
    res.redirect("/home");
    //res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error on the server.").redirect('register');
  }
};

authController.verifyToken = function(req, res, next) {

    const authToken = req.cookies['auth-token']
    if (!authToken) 
      return res.status(403).redirect('/auth/login');
    // verifies secret and checks exp
    jwt.verify(authToken, config.secret, function(err, decoded) {      
      if (err) {
        console.log(err)
        return res.status(500).redirect('login'); 
      }
        
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  
  }

  authController.verifyTokenAdmin = function(req, res, next) {

    const authToken = req.cookies['auth-token']
    if (!authToken) 
      return res.status(403).redirect('/auth/login');
  
    // verifies secret and checks exp
    jwt.verify(authToken, config.secret, function(err, decoded) {        
      if (err || decoded.role !== 'Admin') {
        console.log(err)
        return res.status(500).redirect('/auth/login');    
      }
        
      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    });
  
  }


authController.verifyTokenStaff = function(req, res, next) {
  const authToken = req.cookies['auth-token'];
  if (!authToken) return res.status(403).redirect('/auth/login');

  jwt.verify(authToken, config.secret, function(err, decoded) {
    if (err || !['Admin', 'Funcionario'].includes(decoded.role)) {
      return res.status(403).redirect('/auth/login');
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

module.exports = authController;
