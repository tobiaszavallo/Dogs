const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperamento } = require('../db.js');

const router = Router();

const {API_KEY} = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(dog => {
        return {
            id: dog.id,
            nombre: dog.name,
            altura: `${dog.height.metric} CM`,
            peso: dog.weight.metric === "NaN - 8" || dog.weight.metric === "NaN" ? "" : `${dog.weight.metric} KG`,
            años_de_vida: dog.life_span,
            grupo_raza: dog.breed_group,
            temperamento: dog.temperament ? dog.temperament : "",
            temperamentos: "",
            imagen: dog.image.url
        }
    })
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperamento,
            attributes: ['nombre'],
            through: {
                attributes: [],
            }
        }
    })
}


const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}



router.get('/dogs/temperaments', async (req, res) => {
    const { tem } = req.query;
    if (!tem) return res.status(404).send('Falta enviar datos');

    const api_dogs = await getApiInfo();
    const api_dogs_filtrados = api_dogs.filter(dog => dog.temperamento.includes(tem));

    const dogs_db = await Dog.findAll({
        include: {
            model: Temperamento,
            where: {
                nombre: tem
            }
        }
    })

    const all_dogs_filtrados = api_dogs_filtrados.concat(dogs_db);
    if (all_dogs_filtrados) {
        res.json(all_dogs_filtrados);
    }else {
        res.status(400).send(`No se encontraron dogs con el temperamento ${tem}`);
    }
})


router.get('/dogs', async (req, res) => {
    const {name} = req.query;

    let totalDogs = await getAllDogs();

    if(name) {
       let dogName = await totalDogs.filter(dog => dog.nombre.toLowerCase().includes(name.toLowerCase()));
       dogName.length >= 1 ? res.status(200).json(dogName) : res.status(404).json('Dog no encontrado');
    } else {
        res.status(200).json(totalDogs);
    }
});


router.get('/temperaments', async (req, res) => {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments_sin_dividir = temperamentsApi.data.map(dog => dog.temperament);
    const temperaments_finals = temperaments_sin_dividir.toString().replace(/ /g, "").split(',');
    
    temperaments_finals.forEach(temp => {
        Temperamento.findOrCreate({
            where: {
                nombre: temp
            }
        })
    })
    const allTemperaments = await Temperamento.findAll();
    res.json(allTemperaments);
});


router.get('/dogs/:id', async (req, res) => {
    const {id} = req.params;

    const dogsTotal = await getAllDogs();

    if(id) {
        let dogSearch = await dogsTotal.filter(dog => dog.id.toString() === id.toString());
        dogSearch.length ? res.json(dogSearch) : res.status(404).send(`El dog no ha sido encontrado`);
    }
});


router.post('/dogs', async (req, res) => {
    const {nombre, altura, peso, grupo_raza, años_de_vida, imagen, creadoEnDb, temperamento} = req.body;

    if (typeof nombre !== 'string' || typeof altura !== 'string' || typeof peso !== 'string') {
        res.status(400).send("Error, los tipos de datos son incorrectos");
    };

    if( !nombre || altura.length < 8 || peso.length < 8 ) return res.status(400).send('Falta enviar datos obligatorios');
    const primerLetraMayuscula = nombre.charAt(0).toUpperCase();
    const restoString = nombre.slice(1).toLowerCase();
    const nom = primerLetraMayuscula + restoString;


    let grupoRaza
    if (grupo_raza.length >= 1) {
        const primerString = grupo_raza.charAt(0).toUpperCase();
        const restoStr = grupo_raza.slice(1);
        grupoRaza = primerString + restoStr;
    }
    grupoRaza = grupo_raza;
    
    try {
        let createDog = await Dog.create({
            nombre: nom,
            altura,
            peso,
            grupo_raza: grupoRaza,
            años_de_vida,
            imagen,
            temperamento: "",
            creadoEnDb
        });
    
        let temperamentDb = await Temperamento.findAll({ where: { nombre: temperamento } })

        createDog.addTemperamento(temperamentDb);
        res.status(200).send('Dog creado con éxito');
    } catch(e) {
        console.log(e);
        res.status(404).send('Error al crear el dog')
    }
})

router.delete('/dogs/:id', async (req, res) => {
    const {id} = req.params;

    if(!id) return res.status(400).send("Error, faltan parametros");

    try {
        await Dog.destroy({
            where: {
                id: id
            }
        });
        res.status(200).send("Dog eliminado exitosamente");
    } catch(e) {
        res.status(400).send("Error al intentar eliminar el dog");
    }
});


module.exports = router;
