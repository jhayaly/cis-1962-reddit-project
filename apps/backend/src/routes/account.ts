import express from 'express';
import User from '../models/user';
import requireAuth from '../middlewares/require-auth';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email.endsWith('.edu')) {
      return res.status(409).json({ message: 'Not an edu email!' });
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({ message: 'You already have an account! Log in instead.' });
    } else {
      const newAcc = new User({ email: email, password: password });
      await newAcc.save();
      req.session!.user = newAcc;
      return res.status(201).json({ message: 'User created!' });
    }
  } catch (err) {
    next(err);
  }
});


router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const currUser = await User.findOne({ email : email });
    if (!currUser) {
      return res.status(409).json({ message: 'No account found! Sign up?' });
    } else if (currUser.password !== password) {
      return res.status(409).json({ message: 'Incorrect password!' });
    } else {
      req.session!.user = currUser;
      return res.status(201).json({ message: 'Logged in' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/logout', requireAuth, async (req, res, next) => {
  try {
    req.session!.user = null;
    return res.status(201).json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
});

router.get('/loggedin', (req, res) => { 
  return req.session && req.session.user ? res.json({ loggedIn: true }) : res.json({ loggedIn: false });
});

export default router;