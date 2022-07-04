import React from 'react'; 
import Header from '../Header/Header.jsx';
import styles from './About.module.css';




export default function About() {
    return (
        <div className={styles.DivContainerAbout}>
            <Header />
            <div className={styles.AboutDiv}>
                <p>blablablablablablablablablablablabla</p>
            </div>
        </div>
    )
}

    