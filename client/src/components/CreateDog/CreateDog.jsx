import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { postDog } from '../../redux/actions';
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
        errors.años_de_vida = 'La esperanza de vida tiene que ser mayor a 0 y menor de 30 años';
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
    const [errors, setErrors] = useState({});
    //const [submitBtn, setSubmitBtn] = useState("true");

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
            altura: `${input.alturaMin} - ${input.alturaMax} CM`,
            peso: `${input.pesoMin} - ${input.pesoMax} KG`,
            años_de_vida: `${input.añosDeVida} YEARS`
        }))
        setErrors(() => (validate({
            ...input,
            [e.target.name]: e.target.value
        })));
        /* if(input.nombre === "") {
            setSubmitBtn(() => "true")
        } else if (Object.entries(errors).length > 0) {
            setSubmitBtn(() => "true")
        } else {
            setSubmitBtn(() => "")
        } */
       
    }

    const handleCheck = (e) => {
        e.preventDefault();
        if (e.target.checked) {
            setInput((prev) => ({
                ...prev,
                grupo_raza: e.target.value
            }))
        }
    }

    const handleSelect = (e) => {
        setInput((prev) => ({
            ...prev,
            temperamento: [...input.temperamento, e.target.value]
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
                    <div>
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
                    <div className={styles.LabelDiv}>
                        <label className={styles.LabelGrupoDeRaza}>Grupo de Raza:</label>
                        <label className={styles.LabelToy}>
                        <input 
                        type="checkbox"
                        name="Toy"
                        value="Toy"
                        onChange= {(e) => handleCheck(e)}
                        />Toy</label>
                        <label><input
                        type="checkbox"
                        name="Hound"
                        value="Hound"
                        onChange= {(e) => handleCheck(e)}
                        />Hound</label>
                        <label><input
                        type="checkbox"
                        name="Terrier"
                        value="Terrier"
                        onChange= {(e) => handleCheck(e)}
                        />Terrier</label>
                        <label><input
                        type="checkbox"
                        name="Working"
                        value="Working"
                        onChange= {(e) => handleCheck(e)}
                        />Working</label>
                        <label><input
                        type="checkbox"
                        name="Mixed"
                        value="Mixed"
                        onChange= {(e) => handleCheck(e)}
                        />Mixed</label>
                        <label><input
                        type="checkbox"
                        name="Non-Sporting"
                        value="Non-Sporting"
                        onChange= {(e) => handleCheck(e)}
                        />Non-Sporting</label>
                        <label><input
                        type="checkbox"
                        name="Sporting"
                        value="Sporting"
                        onChange= {(e) => handleCheck(e)}
                        />Sporting</label>
                        <label><input
                        type="checkbox"
                        name="Herding"
                        value="Herding"
                        onChange= {(e) => handleCheck(e)}
                        />Herding</label>
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
                            <option value={t.nombre}>{t.nombre} </option>  
                            ))}
                        </select>
                    </div>
                    <button className={Object.entries(errors).length > 0 ? styles.ButtonCreateOff : styles.ButtonCreateOn } type="submit">Crear Dog</button>
                </form>
                {
                    input.temperamento && input.temperamento.map(temp => (
                        <div className={styles.divButtonTemps}>
                            <button className={styles.ButtonTemperaments}onClick={() => handleDelete(temp)}>{temp}</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};
