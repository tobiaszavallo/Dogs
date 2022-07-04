import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../redux/actions';
import img from '../../img/dogmeme.jpg';
import Header from '../Header/Header';
import {DeleteDog} from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import styles from './Detail.module.css';

export default function Detail() {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.dogDetail);
    const {id} = useParams();
    const history = useHistory();

    const handleDelete = (id) => {
        dispatch(DeleteDog(id))
        alert("Dog eliminado exitosamente");
        history.push("/home");
    };


    useEffect (() => {
        dispatch(getDetails(id))
    },[dispatch, id]);
    
    return (
        <div className={styles.Detail}>
                <Header/>
            <div>
                <h1>Dog detail</h1>
            </div>
            <div className={styles.DivContainer}>
                {
                    details.length > 0 ? 
                    <div className={styles.DetailDivContainer}>
                        <h1>{details[0].nombre}</h1>
                        <img className={styles.DetailImg} src={details[0].imagen ? details[0].imagen : img} alt='img' width="500px" height="300px" />
                        <div className={styles.DivContainerResto}>
                            <div className={styles.DivWeight}>
                            <h2>Weight:</h2>
                            <h3>{details[0].peso}</h3>
                            </div>
                            <div className={styles.DivHeight}>
                            <h2>Height:</h2>
                            <h3>{details[0].altura}</h3>
                            </div>
                            <div className={styles.DivLifeExpectancy}>
                            <h2>Life expectancy:</h2>
                            <h3>{details[0].años_de_vida}</h3>
                            </div>
                            <div className={styles.DivTemperaments}>
                            <h2>Temperaments:</h2>
                            <h3>{!details[0].creadoEnDb ? details[0].temperamento : details[0].temperamentos.map(el => " " + el.nombre).toString().slice(1)}</h3>
                            </div>
                        </div>
                    </div> : <p>Loading...</p>
                }
                {
                    details.length > 0 && details[0].creadoEnDb && <div>
                    <button className={styles.ButtonEliminar} onClick={() => handleDelete(id)}>Eliminar</button>
                    <button className={styles.ButtonEditar}>Editar</button>
                </div> 
                }
            </div>
        </div>
    )
};