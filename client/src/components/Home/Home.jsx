import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, getBreeds, filterDogsByBreeds, 
        orderByName, filterDogsByTemperament, orderByWeight, 
        FilterDbApi } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import Paginado from '../Paginado/Paginado';
import Header from '../Header/Header.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import styles from './Home.module.css';


export default function Home() {
    
    const dispatch = useDispatch();

    // esto es lo mismo al mapStateToProps(state)
    const allDogs = useSelector ((state) => state.dogs);
    const allTemperaments = useSelector ((state) => state.temperaments);
    const allBreeds = useSelector((state) => state.breeds);
    //const [selectFilterByBreeds, setSelectFilterByBreeds] = useState('');
    const [render, setRender] = useState('');
    const [currentPage, setCurrentPage] = useState(1); //inicio estado local pagina actual
    const [dogsPerPage, setDogPerPage] = useState(8); // inicio estado local perros x pagina
    const indexOfLastDog = currentPage * dogsPerPage; // pagactual * perros por pagina //indice del ultimo dog de mi pagina
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // indice del primer dog
    // al arreglo donde tengo todos los dogs -->allDogs(que esta conectado al store)
    // lo parto con el slice pasandole el indice del primer dog y el ultimo de cada pagina
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); 

    const text_default = useRef();

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    //esto es lo mismo al mapDispatchToProps(dispatch)
    // hace como un componentDidMount() o componentDidUpdate()
    useEffect (() => {
        if (allDogs.length === 0) {
            dispatch(getTemperaments())
            dispatch(getBreeds())
            dispatch(getDogs())
        }
    },[dispatch, allDogs]);

    let handleFilterBreeds = (e) => {
        e.preventDefault();
        dispatch(filterDogsByBreeds(e.target.value));
        setCurrentPage(1);
        //setSelectFilterByBreeds(e.target.value);
    }

    let handleFilterTemperaments = (e) => {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value));
        setCurrentPage(1);
    }

    let handleOrderName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setRender(e.target.value);
        setCurrentPage(1);
    }

    let handleOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setRender(e.target.value);
        setCurrentPage(1);
    }

    let handleFilterDbApi = (e) => {
        console.log(e.target.value)
        e.preventDefault();
        dispatch(FilterDbApi(e.target.value))
        setCurrentPage(1);
    }

    return (
        <div className={styles.Home}>
            <Header/>
            <div>
                <SearchBar paginado= {paginado}/>
            </div>
            <div>
                <div className={styles.HomeSelectContainer}>
                <select className={styles.HomeSelect} name='nombres' id='alphabetical' onChange={e => handleOrderName(e)}>
                    <option key="asc" value= 'asc'>A - Z</option>
                    <option key="desc" value= 'desc'>Z - A</option>
                </select>
                <select className={styles.HomeSelect} name='peso' id='weight' ref={text_default} onChange={e => handleOrderByWeight(e)}>
                    <option key="AllPeso" value= 'AllPeso'>All</option>
                    <option key="pesoMayor" value= 'pesoMayor'>Greater weight</option>
                    <option key="pesoMenor" value= 'pesoMenor'>Lower weight</option>
                </select>
                <select className={styles.HomeSelect} name='temperamentos' id='temperaments' ref={text_default} onChange={e => handleFilterTemperaments(e)}>
                    <option key="AllTemperaments" value='AllTemperaments'>All</option>
                    {                           
                        allTemperaments && allTemperaments.map(temperament => {
                            return (
                                <option key={temperament.nombre} value= {temperament.nombre}>{temperament.nombre}</option>
                            )
                        })
                    }
                </select>
                <select className={styles.HomeSelect} name='razas' id='breeds' ref={text_default} onChange={e => handleFilterBreeds(e)}>
                    <option key="allRazas" value='allRazas'>All breeds</option>
                    {
                        allBreeds && allBreeds.map(breed => {
                            return (
                                <option key={breed} value= {breed}>{breed}</option>
                            )
                        })
                    }
                </select>
                <select className={styles.CreatedSelect} onChange={e => handleFilterDbApi(e)}>
                    <option name='All' key="AllCreate" value='All'>All</option>
                    <option name='InApi' key="InApi" value="InApi">Api</option>
                    <option name='Created' key="Created" value="Created">Created</option>
                </select>
                </div>
                <h1 className={styles.HomeDogh1}>Dogs breeds</h1>
                <div className={styles.HomeContenedorCards}>
                {   
                    currentDogs && currentDogs.map(dog => {
                        return (
                            <div key={dog.id}>
                                <Link className={styles.CardStylesText} to={`/home/${dog.id}`}>
                                <Card imagen={dog.imagen} nombre={dog.nombre} grupo_raza={dog.grupo_raza} 
                                temperamentos={!dog.creadoEnDb ? dog.temperamento : dog.temperamentos.map(el => " " + el.nombre).toString().slice(1)} peso={dog.peso} />
                                </Link>
                            </div>
                        )    
                    })
                }
                </div>
                <Paginado 
                dogsPerPage= {dogsPerPage} 
                allDogs= {allDogs.length}
                paginado= {paginado}
                currentPage= {currentPage}
                />
                {
                    !allDogs && <div className={styles.DivMensajeBusquedaVacia}><h2>Lo sentimos, no hemos encontrado ese dog!</h2></div> 
                }  
            </div>
        </div>
        
    )

}



