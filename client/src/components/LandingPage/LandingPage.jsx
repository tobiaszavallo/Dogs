import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function Landing() {
    return(
        <div className={styles.Landing}>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}