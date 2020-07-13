import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
// We will use the body from express-validator to validate
// the req.body, as middleware
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

// router.post('/api/users/signup', (req, res) => {
router.post(
  '/api/users/signup',
  // add validation middleware
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 40 })
      .withMessage('Password must be 4-40 characters')
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // turns errors object to array and returns it
      // return res.status(400).send(errors.array());
      // to be consistent, instead throw an error
      // which uses our custom error middleware
      // throw new Error('Invalid email or password');

      // now use the new extended error subclasses
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    // throw new Error('Error connecting to database');
    throw new DatabaseConnectionError();
    console.log('Create a user... v!! 1');

    res.send({ email, password });
  }
);

export { router as signupRouter };
