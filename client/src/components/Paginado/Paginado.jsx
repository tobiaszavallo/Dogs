import React from 'react';
import styles from './Paginado.module.css';

export default function Paginado({dogsPerPage, allDogs, paginado, currentPage}) {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav className={styles.Paginado}>
            <ul className={styles.Paginadoul}>
                {
                    pageNumbers && pageNumbers.map( number => (
                        <li key={number} className={styles.Paginadoli}>
                            <button className={currentPage=== number ? styles.PaginadoButton : styles.PaginadoButtonOff} onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}