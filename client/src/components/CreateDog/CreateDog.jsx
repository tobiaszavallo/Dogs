import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { postDog, getTemperaments, getBreeds } from '../../redux/actions';
import Header from '../Header/Header.jsx';
import styles from './CreateDog.module.css';


const validate = (input) => {
    let errors = {};
    if (!input.nombre) {
        errors.nombre = 'Se requiere un nombre';
    } else if (input.nombre && !/^[A-Z]+$/i.test(input.nombre)) {
       errors.nombre = 'el campo *Nombre no admite números o simbolos'
    } else if (input.nombre.length > 25) {
        errors.nombre = 'el campo *nombre no puede ser mayor a 25 caracteres'
    }
    
    if (!input.alturaMax || !input.alturaMin) {
        errors.altura = 'Los campos de *Altura min y max son requeridos';
    } else if (input.alturaMin && !/^[0-9]+$/i.test(input.alturaMin)) {
        errors.altura = 'El campo *Altura *Min solo admite números';
    } else if (input.alturaMax && !/^[0-9]+$/i.test(input.alturaMax)) {
        errors.altura = 'El campo *Altura *Max solo admite números';
    } else if (parseInt(input.alturaMin) < 0 || parseInt(input.alturaMax) > 120) {
        errors.altura = 'La altura no puede ser menor a 0 ni mayor a 120 cms'
    } else if (parseInt(input.alturaMin) >= parseInt(input.alturaMax)) {
        errors.altura = 'La altura máxima tiene que ser mayor a la altura minima'
    }  else if (!input.pesoMax || !input.pesoMin) {
        errors.peso = 'Los campos de *Peso min y max son requeridos';
    } else if (input.pesoMax && !/^[0-9]+$/i.test(input.pesoMax)) {
        errors.peso = 'El campo *Peso *Max solo admite números';
    } else if (input.pesoMin && !/^[0-9]+$/i.test(input.pesoMin)) {
        errors.peso = 'El campo *Peso *Min solo admite números';
    } else if (parseInt(input.pesoMin) < 0 || parseInt(input.pesoMax) > 120) {
        errors.peso = 'El peso no puede ser menor a 0 Kg ni mayor a 120 Kg'
    } else if (parseInt(input.pesoMin) >= parseInt(input.pesoMax)) {
        errors.peso = 'El peso máximo tiene que ser mayor al peso minimo'
    } else if (!input.añosDeVida) {
        errors.años_de_vida = 'El campo *Esperanza de vida es requerido'
    } else if (!/^[0-9]+$/i.test(input.añosDeVida)) {
        errors.años_de_vida = 'El campo *Esperanza de vida solo admite números';
    } else if (parseInt(input.añosDeVida) <= 0 || parseInt(input.añosDeVida) > 30) {
        errors.años_de_vida = 'La esperanza de vida tiene que ser mayor a 0 y como máximo 30 años';
    } else if (input.imagen && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.imagen)) {
        errors.imagen = 'La URL ingresada en el campo *Imagen es incorrecta'
    } else if (input.imagen.length > 250) {
        errors.imagen = 'La URL ingresada debe ser menor a 250 caracteres';
    }

    return errors;
}




export default function CreateDog (){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const temperamentos = useSelector((state) => state.temperaments);
    const breeds = useSelector((state) => state.breeds);
    const [errors, setErrors] = useState({});


    useEffect (() => {
        if (!temperamentos.length || !breeds.length) {
            dispatch(getTemperaments())
            dispatch(getBreeds())
        }
    },[dispatch, temperamentos, breeds]);

    const [input, setInput] = useState({
        nombre: "",
        altura: "",
        alturaMin: "",
        alturaMax: "",
        peso: "",
        pesoMin: "",
        pesoMax: "",
        grupo_raza: "",
        añosDeVida: "",
        años_de_vida: "",
        imagen: "",
        creadoEnDb: true,
        temperamento: []
    })

    const handleChange = (e) => {
        e.preventDefault();
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            altura: `${e.target.name === "alturaMin" ? e.target.value : input.alturaMin} - ${e.target.name === "alturaMax" ? e.target.value : input.alturaMax} CM`,
            peso: `${e.target.name === "pesoMin" ? e.target.value : input.pesoMin} - ${e.target.name === "pesoMax" ? e.target.value : input.pesoMax} KG`,
            años_de_vida: `${e.target.name === 'añosDeVida' ? e.target.value : input.añosDeVida} - YEARS`
        }))
        setErrors(() => (validate({
            ...input,
            [e.target.name]: e.target.value
        })));
       
    }

    const handleSelect = (e) => {
            if (input.temperamento.includes(e.target.value) || input.temperamento.length >= 10) {
                setInput((prev) => ({
                    ...prev
                }))
            } else {
                setInput((prev) => ({
                    ...prev,
                    temperamento: [...input.temperamento, e.target.value]
                }))
            } 
    };

    const handleSelectBreed = (e) => {
        e.preventDefault();
        setInput((prev) => ({
            ...prev,
            grupo_raza: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.entries(errors).length > 0 || input.pesoMin === "") {
            alert("Falta completar los campos obligatorios *. Intenta de nuevo.")
        } else {
            dispatch(postDog(input))
            alert("El dog ha sido creado exitosamente")
            setInput(() => ({
                nombre: "",
                altura: "",
                alturaMin: 0,
                alturaMax: 0,
                peso: "",
                pesoMin: 0,
                pesoMax: 0,
                grupo_raza: "",
                añosDeVida: 0,
                años_de_vida: "",
                imagen: "",
                creadoEnDb: true,
                temperamento: []
            }))
            history.push("/home");
        }
    }

    const handleDelete = (temp) => {
        setInput((prev) => ({
            ...prev,
            temperamento: input.temperamento.filter(t => t !== temp)
        }))
    }


    return (
        <div className={styles.CreateDog}>
            <Header />
            <h1>Crea un Dog!</h1>
            <div className={styles.divContainerForm}>
                <span className={styles.CreatoDogSpan}>Los campos con * son obligatorios</span>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.DivNombre}>
                        <label>*Nombre:</label>
                        <input
                        type="text"
                        value={input.nombre}
                        name="nombre"
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.nombre && (
                                <p className={styles.danger}>{errors.nombre}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivAltura}>
                        <label className={styles.LabelAltura}>*Altura (centimetros):</label>
                        <label>*Min </label><input
                        className={styles.InputAltura}
                        type="text"
                        value={input.alturaMin}
                        name="alturaMin"
                        onChange={(e) => handleChange(e)}/>
                        <label>*Max </label><input
                        className={styles.InputAltura} 
                        type="text"
                        value={input.alturaMax}
                        name="alturaMax"
                        onChange={(e) => handleChange(e)}/>
                        {
                            errors.altura && (
                                <p className={styles.danger}>{errors.altura}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivPeso}>
                        <label className={styles.LabelPeso}>*Peso (KG):</label>
                        <label>*Min </label><input
                        className={styles.InputPeso}
                        type="text"
                        value={input.pesoMin}
                        name="pesoMin"
                        onChange={(e) => handleChange(e)}/>
                        <label>*Max </label><input
                        className={styles.InputPeso} 
                        type="text"
                        value={input.pesoMax}
                        name="pesoMax"
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.peso && (
                                <p className={styles.danger}>{errors.peso}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivSelectGrupoDeRaza}>
                        <label>Grupo de Raza: </label>
                        <select onChange={(e) => handleSelectBreed(e)}>
                            <option value="">Select</option>
                            {  
                                breeds && breeds.map(breed => (
                                <option name={breed} value={breed} key={breed}>{breed}</option>  
                                )) 
                            }
                        </select>
                    </div>
                    <div className={styles.DivEsperanzaVida}>
                        <label>*Esperanza de vida: </label>
                        <input 
                        type="text"
                        value={input.añosDeVida}
                        name="añosDeVida"
                        onChange={(e) => handleChange(e)}
                        /><span> (Años)</span>
                        {
                            errors.años_de_vida && (
                                <p className={styles.danger}>{errors.años_de_vida}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivImagen}>
                        <label>Imagen:</label>
                        <input 
                        type="text"
                        value={input.imagen}
                        name="imagen"
                        onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.imagen && (
                                <p className={styles.danger}>{errors.imagen}</p>
                            )
                        }
                    </div>
                    <div className={styles.DivTemperamentos1}>
                        <label>Temperamentos:</label>
                        <select multiple onChange={(e) => handleSelect(e)}>
                            {temperamentos && temperamentos.map(t => (
                            <option name={t.nombre} value={t.nombre} key={t.nombre}>{t.nombre}</option>  
                            ))}
                        </select>
                    </div>
                    <button className={Object.entries(errors).length > 0 ? styles.ButtonCreateOff : styles.ButtonCreateOn } type="submit">Crear Dog</button>
                </form>
                {
                    input.temperamento.length > 0 && <p>(Recuerda que puedes agregar hasta 10 temperamentos)</p>
                }
                {
                    input.temperamento && input.temperamento.map(temp => (
                        <div className={styles.divButtonTemps} key={`${temp} a`}>
                            <button className={styles.ButtonTemperaments}onClick={() => handleDelete(temp)}>{temp} </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};
