const express = require('express');
const config = require('../config/database');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
//Register

router.post('/register', (req, res, next) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, err => {
		if (err) {
			res.json({ success: false, msg: 'Failed to register user' });
		} else {
			res.json({ success: true, msg: 'User registered' });
		}
	});
});

router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	User.getUserByUserName(username, (err, user) => {
		if (err) throw err;
		if (!user) {
			return res.json({ success: false, msg: 'User not found' });
		}

		User.comparePassword(password, user.password, (error, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				const token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 604800 //1 Week
				});
				res.json({
					success: true,
					token: 'JWT' + token,
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			} else {
				return res.json({ success: false, msg: 'Wrong password' });
			}
		});
	});
});

router.get('/profile', (req, res, next) => {
	res.send('PROFILE');
});

//Validate Route
router.get('/validate', (req, res, next) => {
	res.send('VALIDATE');
});

module.exports = router;
