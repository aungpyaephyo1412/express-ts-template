import express from 'express';
import { UserModel } from '../models/user.service';

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error, req.baseUrl);
    return res.sendStatus(400);
  }
};
export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    return res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: 'User not found!' });
  }
};
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    await UserModel.findOneAndDelete({ _id: id });
    return res.status(204).json({ message: 'Delete user successfully!' }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!username || !email) {
      return res.sendStatus(400);
    }

    const user = await UserModel.findById(id);

    user.username = username;
    user.email = email;
    await user.save();

    return res.status(200).json({ message: 'Update user successfully!' }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};