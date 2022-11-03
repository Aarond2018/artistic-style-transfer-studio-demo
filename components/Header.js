import React from 'react'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/"><h2>ARTIFY</h2></Link>
      <Link href="/artworks">View all artworks</Link>
    </header>
  )
}
 