const cloudinary = require("cloudinary").v2;
const { myUploadMiddleware, runMiddleware } = require("../../helpers/helpers");

//configure the cloudinary instance
cloudinary.config({
	cloud_name: process.env.CLD_CLOUD_NAME,
	api_key: process.env.CLD_API_KEY,
	api_secret: process.env.CLD_API_SECRET,
	secure: true,
});

export default async function handler(req, res) {
//run the multer middleware  
	await runMiddleware(req, res, myUploadMiddleware);

//transform the files to its base64 equivalence
  const base64images = req.files.map(file => {
    const b64 = Buffer.from(file.buffer).toString("base64");
		let dataURI = "data:" + file.mimetype + ";base64," + b64;
    return dataURI
  })

//upload to cloudinary and also apply the add-on  
	try {
		await cloudinary.uploader.upload(
			base64images[0], async function (error, result_one) {
        await cloudinary.uploader.upload(base64images[1], async function(error, result_two) {
          const response = await cloudinary.image(`${result_one.public_id}.jpg`, {
            sign_url: true,
            transformation: [
              { height: 700, width: 700, crop: "fill" },
              { overlay: result_two.public_id },
              { effect: "style_transfer", flags: "layer_apply" },
            ],
          });
          res.status(200).json(response);
        })  
			}
		);
	} catch (error) {
		res.json(error);
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};