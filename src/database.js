import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect('mongodb+srv://nabucodonosor:nDnSbFD4XwkYuWs@cluster0-vvcsq.azure.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('>>> DB is conected');
  } catch (e) {
    console.log('Something goes wrong!');
    console.log(e);
  }
}