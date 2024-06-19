// sign-up.js

import { Router } from 'express';
import { hashPassword } from '../utils/helpers.mjs';
import { User } from '../mongoose/schemas/user.mjs';
import {
  validationResult,
  checkSchema,
  matchedData,
} from 'express-validator';
import { signUpSchema } from '../utils/validationSchemas.mjs';

const router = Router();

router.post('/api/sign-up', checkSchema(signUpSchema), async (request, response) => {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    return response.status(400).send(result.array());
  }

  const data = matchedData(request);
  data.password = hashPassword(data.password);
  
  try {
    const newUser = new User(data);
    console.log(newUser);
    const savedUser = await newUser.save();

    request.login(savedUser, async (err) => {
      if (err) {
        console.error('Error during login:', err);
        return response.status(500).send({ message: 'Error creating user and logging in' });
      }


      return response.status(201).json({ message: 'User created and logged in successfully' });
    });

  } catch (err) {
    console.log(err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return response.status(400).send({ message: 'Email already exists' });
    }
    return response.status(500).send({ message: 'Error creating user' });
  }
});

export default router;
