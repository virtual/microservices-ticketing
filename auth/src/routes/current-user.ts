import express from 'express';
const router = express.Router();

// A bit different from normal
// app.get('/api/users/currentuser', (req, res) => {
//   res.send('mew');
// });

router.get('/api/users/currentuser', (req, res) => {
  res.send('mew');
});

export { router as currentUserRouter };
