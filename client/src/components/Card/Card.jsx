import React from 'react';
import img from '../../img/dogmeme.jpg';
import styles from './Card.module.css';



export default function Card({imagen, nombre, grupo_raza, temperamentos, peso}) {

    return (
        <div className={styles.Card}>
            <div>
            <img src={imagen ? imagen : img} alt="img not found" width="250px" height="250px" />
            </div>
            <h3 className={styles.CardNombre}>{nombre}</h3>
            <h5 className={styles.Cardh}>{grupo_raza}</h5>
            <span className={styles.Cardspan}>Temperament: </span><h5 className={styles.CardTemp}>{temperamentos}</h5>
            <span className={styles.Cardspan}>Weight: </span><h5 className={styles.CardH5Weight}>{peso}</h5>
        </div>
    )
}