import { Router, Request, Response } from 'express'
import * as profileServiceImpl from '../db/services/ProfileServiceImpl'
import { ProfileInput } from '../db/models/Profile'
import bcrypt from 'bcrypt';
import generateTokens from '../middleware/userToken';
const registerRouter = Router()


registerRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const payload: ProfileInput = req.body
    const result = await profileServiceImpl.create(payload)
    res.status(201).json({
      result,
      token: await generateTokens(result),
    });
  }
  catch (error) {
    res.status(400).json({ error: error });
  }
});


registerRouter.post('/signin', async (req: Request, res: Response) => {
  const payload: ProfileInput = req.body
  try {
    const result = await profileServiceImpl.getByEmail(payload.email)
    const passwordMatch = (await bcrypt.compare(payload.password, result.password));
    if (result && passwordMatch) {
      res.json({
        businessName: result.businessName,
        email: result.email,
        token: await generateTokens(result),
      });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  }
  catch (error) {
    res.status(400).json({ error: error });
  }
})

export default registerRouter;