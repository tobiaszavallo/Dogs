import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';


export default function Header() {

    return (
        <div className={styles.Header}>
            
                <div className={styles.HeaderContainerH1a}>
                    <Link to='/home'><h1 className={styles.HeaderH1}>Home</h1></Link>   
                </div>
                <div className={styles.HeaderContainerH1b}>
                    <Link to='/create'><h1 className={styles.HeaderH1}>Create</h1></Link>
                </div>
                <div className={styles.HeaderContainerH1c}>
                    <Link to='/about'><h1 className={styles.HeaderH1}>About</h1></Link>    
                         
            </div>
        </div>
    )
};