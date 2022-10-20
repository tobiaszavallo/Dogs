import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { detailsClean } from '../../redux/actions';
import { useHistory } from 'react-router-dom';


export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector((state) => state.dogDetail);

    let clean = (e) => {
        if (Object.entries(details).length) {
            dispatch(detailsClean());
            history.push("/home");
        }
        history.push("/home");
    }

    return (
        <div className={styles.Header}>
            
                <div className={styles.HeaderContainerH1a}>
                    <h1 className={styles.HeaderH1} onClick={(e) => clean(e)}>Home</h1>
                </div>
                <div className={styles.HeaderContainerH1b}>
                    <Link className={styles.HeaderLink} to='/create'><h1 className={styles.HeaderH1}>Create</h1></Link>
                </div>
                <div className={styles.HeaderContainerH1c}>
                    <Link className={styles.HeaderLink} to='/about'><h1 className={styles.HeaderH1}>About</h1></Link>    
                                             
                </div>
        </div>
    )
};