import mongoose from "mongoose";
export async function CoonectDb() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/dbfornextapp")
    .then((res) => {
      console.log("Ok");
    })
    .catch((err) => {
      console.log("Error");
    });
}
