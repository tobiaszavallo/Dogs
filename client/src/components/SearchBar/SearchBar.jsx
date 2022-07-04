import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDogs, getDogs } from '../../redux/actions';
import styles from './SearchBar.module.css';


export default function SearchBar() {
    
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
        console.log(input);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNameDogs(input));
    }

    let handleClickRefresh = (e) => {
        e.preventDefault();
        setInput('');
        dispatch(getDogs());
    }

    return (
        <div className={styles.SearchBar}>
            <button className={styles.SearchBarButton} onClick={(e) => handleClickRefresh(e)}>Refresh</button>
            <input
            className={styles.SearchBarInput} 
            type='text'
            placeholder='Search...'
            name='buscador'
            value={input}
            onChange={(e) => handleInputChange(e)}
            />
            <button className={styles.SearchBarButton} type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}