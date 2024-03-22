import React from 'react';
import styles from "./errorPage.module.css";
import { Link } from 'react-router-dom'; 

export default function ErrorPage() {
  return (
    <div className={styles.notFound}>
        <h1>404 Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className={styles.homeLink}>Go to Homepage</Link>
    </div>
  );
}