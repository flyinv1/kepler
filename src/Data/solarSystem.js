let unused = {
    sun: {
        name: "Sol",
        mass: 1.989e30,
        mu: 132712000000,
        bodyMeanRadius: 6.957e5
    },
    earth: {
        name: "Earth",
        mass: 5.927e24,
        mu: 3.986004418e6,
        bodyMeanRadius: 6371.0,
        equitorialRadius: 6378.1,
        orbitalParameters: {
            semimajorAxis: 1.00000261,
            eccentricity: 0.0167123,
            inclination: -0.00001531,
            rightAscension: 0.0,
            argumentOfPeriapsis: 102.93768193,
            meanLongitude: 100.46457166,
        }
    }
};

//TODO:: THIS IS ONLY TEST DATA, NOT ACCURATE!
//Orbits are assumed to be planar!
export default {
    sun: {
        id: "PFNVND",
        name: "Sol",
        mass: 1.989e30,
        radius: 6.957e5,
        position: [0, 0, 0],
        velocity: [0, 0, 0],
    },
    earth: {
        id: "BRVEPQ",
        name: "Earth",
        mass: 5.927e24,
        radius: 6371.0,
        position: [147.10e6, 0, 0],
        velocity: [0, 30.29, 0],
    },
    mars: {
        id: "VPETMV",
        name: "Mars",
        mass: 6.39e23,
        radius: 3389.5,
        position: [0, 206.6545e8, 0],
        velocity: [-26.5, 0, 0],
    }
}