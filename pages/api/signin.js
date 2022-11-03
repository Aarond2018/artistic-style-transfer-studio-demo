import { getXataClient } from "../../src/xata";
import bcrypt from "bcrypt";
import { promisify } from "util";

export default async function handler(req, res) {
  const compare = promisify(bcrypt.compare);
  const hash = promisify(bcrypt.hash);

  const {email, password} = req.body
  
//creates the xata instance and extract the user record  
    const xata = getXataClient();
    const user = await xata.db.users.filter({ email }).getFirst();

//create new user if no user record was found
    if (!user) {
      const newUser = await xata.db.users.create({
        email,
        password: await hash(password, 10),
      });
      return res.status(201).json({
        status: "success",
        id: newUser.id
      })
    }
  
// compare passwords if user exist
    const passwordsMatch = await compare(password, user.password);
 
    if (!passwordsMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password for the email provided"
      })
    }
  
    return res.status(200).json({
      status: "success",
      id: user.id
    })
  };

