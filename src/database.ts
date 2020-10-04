import { connect } from 'mongoose';
export const startConnection = async () => {
  try {
    await connect('mongodb://localhost/blogpost', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`Database online`);
  } catch (error) {
    console.log(error);
  }
};
