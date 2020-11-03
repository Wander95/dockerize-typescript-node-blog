import { Request, Response } from 'express';
import { success } from '../libs/ResponseAPI';
import { firebase } from '../firebaseCon';
import UserModel from '../models/User.Model';

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // const { uid } = req.params;
  const { email, password } = req.body;

  try {
    const currentUser = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return res.status(200).json(success('OK', res.statusCode, currentUser));
  } catch (error) {
    console.log('error.message', error.message);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }

  // try {
  //   const user = await admin.auth().getUser(uid);
  //   return res.status(200).json({
  //     success: true,
  //     data: user,
  //   });
  // } catch (error) {
  //   return res.status(400).json({
  //     success: false,
  //     error: error.message,
  //   });
  // }
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, name, lastName } = req.body;

  try {
    const userCredentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const newUser = new UserModel({
      uid: userCredentials.user?.uid,
      email,
      password,
      name,
      lastName,
    });

    await newUser.save();

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const authUser = await admin.auth().createUser({
    //   email,
    //   password: hashedPassword,
    //   displayName: name,
    //   disabled: false,
    //   emailVerified: false,
    // });

    return res.status(200).json({
      success: true,
      user: userCredentials,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
