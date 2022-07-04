import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../img/NotFound_404.jpg';
import styles from './NotFound.module.css';

export default function NotFound() {
    return(
        <div className={styles.NotFound}>
            <img src={img} alt="img"/>
            <Link to='/home'>
                <button className={styles.buttonVolver}>Home</button>
            </Link>
        </div>
    )
}
