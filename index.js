const express = require('express');
const app = express();
const port = process.env.PORT;

//BOdy Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const airlines = ["SouthWest", "American", "JetBlue", "United", "Delta", "Alaskan", "Hawaiian"];
const cities = ["Los Angeles", "New York", "Miami", "Sacramento", "Seattle", "Salt Lake City", "Portland", "Austin", "Detroit", "Chicago", "Newark", "Dover", "Cincinati", "Cleveland", "Dallas", "El Paso", "Minneaoplis", " Atlanta", "Jacksonville", "Honolulu", "San Diego", "Austin", "St. Louis", "Tampa Bay", "Orlando", "New Orleans", "Lafayette", "Bismark", "Boise", "Boston", "Hilo", "Washington DC", "Des Moines"];


let flightData = [];
for (let i = 0; i < 30; i++) {
    flightData[i] = 
    {
        carrier: airlines[Math.floor(Math.random() * airlines.length)],
        dCity: cities[Math.floor(Math.random() * cities.length)],
        aCity: cities[Math.floor(Math.random() * cities.length)],
        date: `1/${Math.floor(Math.random() * 30)}`,
        price: Math.floor(Math.random() * 1000)
    }
    /* if (flightData[i].dCity === flightData[i].aCity) {
        
    } */
}


randomizeFlightData = (array) => {
    for (let i = 0; i < 30; i++) {
        array[i] = 
        {
            carrier: airlines[Math.floor(Math.random() * airlines.length)],
            dCity: cities[Math.floor(Math.random() * cities.length)],
            aCity: cities[Math.floor(Math.random() * cities.length)],
            date: `1/${Math.floor(Math.random() * 30)}`,
            price: Math.floor(Math.random() * 1000)
        }
    }
    return array;
}


let bookedFlights = [];

app.get('/', (req, res) => res.send("Hello World"));
app.get('/availableFlights', (req, res) => res.send(flightData));
app.get('/refreshFlights', (req, res) => {
    let newArray = randomizeFlightData(flightData);
    flightData = newArray;
    res.send(flightData);
})
app.get('/BookedFlights', (req, res) => res.send(bookedFlights));
app.post('/BookedFlights', (req, res) => {
    const newFlight = {
        carrier: req.body.carrier,
        dCity: req.body.dCity,
        aCity: req.body.aCity,
        date: req.body.date,
        passengers: req.body.passengers,
        bags: req.body.bags,
        carryOn: req.body.carryOn,
        class: req.body.class,
        totalPrice: req.body.price,
        id: req.body.id
    }
    
    bookedFlights.push(newFlight);
})
app.delete('/BookedFlights', (req, res) => {
    const updateFlights = bookedFlights.filter(flight => {
        return flight.id !== req.body.id;
    })
    bookedFlights = updateFlights;

})

app.listen(port, () => console.log(`Example app listening on port ${port}.`));