import React from "react";
import Link from "next/link";
import axios from "axios";
import { XataClient } from "../src/xata";
import fileDownload from "js-file-download";
import styles from "../styles/Home.module.css";

export default function artworks({ data }) {
//handle image download  
	const handleDownload = (url, filename) => {
		axios
			.get(url, {
				responseType: "blob",
			})
			.then((res) => {
				fileDownload(res.data, filename);
			});
	};

	return (
		<>
			<h3 className={styles.artworks_header}>Artworks</h3>
			<section className={styles.artworks}>
				{data && data.length === 0 && (
					<p>
						No artwork created yet, <Link href="/">Login</Link> to create one.
					</p>
				)}
				{data &&
					data.length !== 0 &&
					data.map((artwork, index) => (
						<React.Fragment key={index}>
							<div>
								<div>
									<img src={artwork.url} alt="" />
								</div>
								<h5>{artwork.title}</h5>
								<button
									onClick={() =>
										handleDownload(artwork.url, `${artwork.title}.jpg`)
									}
								>
									download
								</button>
							</div>
              </React.Fragment>
					))}
			</section>
		</>
	);
}

export const getServerSideProps = async (req, res) => {
	const xata = new XataClient();
	const data = await xata.db.artworks.getMany();
	return { props: { data } };
};
