import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ImagePreview from "../components/ImagePreview";
import styles from "../styles/Home.module.css";

export default function studio() {
  const [artworkUrl, setArtworkUrl] = useState("")
  const [title, setTitle] = useState("")
  const [reqStatus, setReqStatus] = useState("")
  const [publishStatus, setPublishStatus] = useState("")

	const router = useRouter();

 //return to login if id was found 
	useEffect(() => {
		if (!localStorage.getItem("artify_id")) {
			router.push("/");
		}
	}, []);

 //handles request to generate the artwork 
  const generateArt = async (firstFile, secondFile) => {
    setReqStatus("loading...")
    
    const formData = new FormData();
    formData.append("file", firstFile);
    formData.append("file", secondFile);

    try {
      const response = await axios.post("/api/art", formData)
      const url = /'(.+)'/.exec(response.data);
      setArtworkUrl(url[1]);
      setReqStatus("Done")
    } catch (error) {

      setReqStatus("failed, try again")
    }
  }

//handles request to publish a generated artwork  
  const onPublish = async () => {
    setPublishStatus("loading...")
    try {
      const id = localStorage.getItem("artify_id");
      const response = await axios.post("/api/publishArt", {title, url: artworkUrl, id})
      setPublishStatus("Done.")
    } catch (error) {
      setPublishStatus("failed, try again")
    }
  }

	return (
		<section className={styles.studio}>
			<h2>Art studio</h2>
			<p>You don't have to be an artist to create beautiful art designs</p>
			<ImagePreview generateArt={generateArt} reqStatus={reqStatus} />
      {artworkUrl && (
        <>
          <div className={styles.output}>
            <img src={artworkUrl} alt="" />
          </div>
          <input type="text" placeholder="Enter a simple title" onChange={e => setTitle(e.target.value)} />
          <button onClick={onPublish} disabled={publishStatus === "loading..."}>Publish</button>
          {publishStatus && <p className={styles.status}>{publishStatus}</p>}
        </>
      )}
		</section>
	);
}