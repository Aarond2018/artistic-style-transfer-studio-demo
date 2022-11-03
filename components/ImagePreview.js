import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function ImagePreview( {generateArt, reqStatus} ) {
  const [firstFile, setFirstFile] = useState("");
	const [secondFile, setSecondFile] = useState("");

  const firstImageRef = useRef();
	const secondImageRef = useRef();

  const onFileChange = (e) => {
    if(e.target.id === "first") setFirstFile(e.target.files[0]);
    if(e.target.id === "second") setSecondFile(e.target.files[0]);
	};

  return (
    <>
      <div className={styles.studio_images}>
				<div onClick={() => firstImageRef.current.click()}>
					<input
						type="file"
						ref={firstImageRef}
						style={{ display: "none" }}
						onChange={onFileChange}
            id="first"
					/>
					{firstFile ? (
						<img
							src={`${URL.createObjectURL(firstFile)}`}
							alt="selected image"
						/>
					) : (
						<p>Click to select image</p>
					)}
				</div>
				<div onClick={() => secondImageRef.current.click()}>
					<input
						type="file"
						ref={secondImageRef}
						style={{ display: "none" }}
						onChange={onFileChange}
            id="second"
					/>
					{secondFile ? (
						<img
							src={`${URL.createObjectURL(secondFile)}`}
							alt="selected image"
						/>
					) : (
						<p>Click to select image</p>
					)}
				</div>
			</div>
      <div className={styles.generate}>
        <button onClick={() => generateArt(firstFile, secondFile)}>Generate Artwork</button>
        {reqStatus && <p className={styles.status}>{reqStatus}</p>}
      </div>
    </>
  )
}
