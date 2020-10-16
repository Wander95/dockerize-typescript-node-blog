import { Request, Response } from 'express';
import firebaseConfig from '../firabase';

const { admin, firebase } = firebaseConfig;

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
    return res.status(200).json({
      currentUser,
    });
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
  const { email, password, name } = req.body;

  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
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
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
