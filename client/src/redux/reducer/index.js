import { GET_DOGS, GET_TEMPERAMENTS, GET_BREEDS, GET_NAME_DOGS, 
    FILTER_BY_BREEDS, FILTER_BY_TEMPERAMENTS, ORDER_BY_NAME,
     POST_DOG, ORDER_BY_WEIGHT, GET_DETAILS, DELETE_DOG_DB } from '../actions';


const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    breeds: [],
    dogDetail: {}
  };


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
            case GET_TEMPERAMENTS:
                let temperaments_purificados = action.payload.filter(el => el.nombre !== null && el.nombre !== undefined && el.nombre !== '');
                temperaments_purificados = temperaments_purificados.sort((a, b) => {
                    if (a.nombre > b.nombre) {
                        return 1;
                    }
                    if (b.nombre > a.nombre) {
                        return -1;
                    }
                    return 0;
                }) 
                return {
                    ...state,
                    temperaments: temperaments_purificados
                }
            case GET_BREEDS:
            let breeds_array = action.payload.filter(el => el !== null && el !== undefined && el !== '');
            breeds_array = breeds_array.sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (b > a) {
                    return -1;
                }
                return 0;
            });
            return {
                ...state,
                breeds: breeds_array
            }
        case GET_NAME_DOGS:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                dogDetail: action.payload
            }
        case POST_DOG: 
            return {
                ...state
            }      
        case FILTER_BY_BREEDS:
            const allDogs = state.allDogs;
            const breedsFilter = action.payload === 'allRazas' ? allDogs : allDogs.filter( d => d.grupo_raza === action.payload);
            return {
                ...state,
                dogs: breedsFilter
            }
        case FILTER_BY_TEMPERAMENTS:
            const all_Dogs = state.allDogs;
            const filterDog = action.payload === 'AllTemperaments' ? all_Dogs : action.payload;
            return {
                ...state,
               dogs: filterDog
            }
        case ORDER_BY_WEIGHT:
            let ordenadoPorPeso

            if (action.payload === 'AllPeso') {
                ordenadoPorPeso = JSON.parse(JSON.stringify(state.allDogs));
            } else {
                const copia = JSON.parse(JSON.stringify(state.allDogs));
                ordenadoPorPeso = action.payload === 'pesoMenor' ? 
                    copia.sort((a, b) => {return parseInt(a.peso) - parseInt(b.peso)}) 
                    :
                    copia.sort((a, b) => {return parseInt(b.peso) - parseInt(a.peso)});
                    
                    const DogsSinPeso = ordenadoPorPeso.filter(d => d.peso === "");
                    const DogsConPeso = ordenadoPorPeso.filter(d => d.peso !== ""); 
                    ordenadoPorPeso = DogsConPeso.concat(DogsSinPeso);
            }
            return {
                ...state,
                dogs: ordenadoPorPeso
            }
        case ORDER_BY_NAME:
            let ordenado = action.payload === 'asc' ? 
            state.dogs.sort((a, b) => {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (b.nombre > a.nombre) {
                    return -1;
                }
                return 0;
            }) : 
            state.dogs.sort((a, b) => {
                if (a.nombre > b.nombre) {
                    return -1;
                }
                if (b.nombre > a.nombre) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                dogs: ordenado
            }
        case DELETE_DOG_DB:
            return {
                ...state
            }
        default:
            return state;
    }       
}


export default rootReducer;