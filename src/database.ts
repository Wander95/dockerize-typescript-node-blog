import { connect } from 'mongoose';
export const startConnection = async () => {
  try {
    const database = await connect('mongodb://localhost/blogpost', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`Database online: ${database.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
