import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
//agregar una imagen de fondo

export default function Landing() {
    return(
        <div className={styles.Landing}>
            <h1>Henry Dogs App</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}