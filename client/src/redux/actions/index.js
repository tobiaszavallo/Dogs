import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_BREEDS = 'GET_BREEDS';
export const GET_NAME_DOGS = 'GET_NAME_DOGS';
export const GET_DETAILS = 'GET_DETAILS';
export const DETAILS_CLEAN = 'DETAILS_CLEAN';
export const FILTER_BY_BREEDS = 'FILTER_BY_BREEDS';
export const FILTER_BY_TEMPERAMENTS = 'FILTER_BY_TEMPERAMENTS';
export const FILTER_DB_API = 'FILTER_DB_API';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const POST_DOG = 'POST_DOG';
export const DELETE_DOG_DB = 'DELETE_DOG_DB';

export const getDogs = () => {
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        });
    }
};

export const getBreeds = () => {
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/dogs");
        let breeds_duplicados = json.data.map(dog => dog.grupo_raza);
        let breeds = [...new Set(breeds_duplicados)];
        return dispatch({
            type: GET_BREEDS,
            payload: breeds
        });
    }
};

export const getNameDogs = (name) => {
    return async function(dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type: GET_NAME_DOGS,
                payload: json.data
            })
        } catch(e) {
            console.log(e);
            return dispatch({
                type: GET_NAME_DOGS,
                payload: ""
            })
        }
    }
};

export const getTemperaments = () => {
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/temperaments");
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data
        });
    }
};

export const getDetails = (id) => {
    return async function(dispatch) {

        try {
            let json = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch(e){
            console.log(e);
        }
    }
};

export const detailsClean = () => {
    return {
        type: DETAILS_CLEAN,
        payload: {}
    }
}

export const postDog = (payload) => {
    return async function(dispatch) {
        try {
            let json = await axios.post("http://localhost:3001/dogs", payload)
            return json;
        } catch(e) {
            console.log(e);
        }
    }
}

export const filterDogsByBreeds = (payload) => {
    return {
        type: FILTER_BY_BREEDS,
        payload
    };   
};


export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    };
};

export const orderByWeight = (payload) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    };
};


export const filterDogsByTemperament = (temp) => {
    return async function(dispatch) {
        if (temp === 'AllTemperaments'){
            return dispatch({
                type: FILTER_BY_TEMPERAMENTS,
                payload: temp
            })
        }else {
            try {
                let json = await axios.get(`http://localhost:3001/dogs/temperaments?tem=${temp}`);
                return dispatch({
                    type: FILTER_BY_TEMPERAMENTS,
                    payload: json.data
                })
            } catch(e) {
                console.log(e)
            }
        }
    }
};

export const FilterDbApi = (payload) => {
    return {
        type: FILTER_DB_API,
        payload 
    }
};

export const DeleteDog = (id) => {
    return async function(dispatch) {
        try {
            await axios.delete(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: DELETE_DOG_DB,
                payload: ""
            })
        } catch(e){
            console.log(e);
        }
    }
};
