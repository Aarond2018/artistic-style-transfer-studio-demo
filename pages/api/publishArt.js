import { XataClient } from "../../src/xata"

export default async function handler(req, res) {
  const { title, url, id } = req.body

  const author = {
    id: id
  }

  try {
    const xata = new XataClient();
    const response = await xata.db.artworks.create({ title, url, author });
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}
