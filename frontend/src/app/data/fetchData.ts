'use client';

export class SatelliteObj {
    id: number;
    name: string;
    latitude: number;
    longitude: number;

    constructor(id: number, name: string, latitude: number, longitude: number) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    updateData(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
};

export class SatelliteList {
    satellites: SatelliteObj[];

    constructor() {
        this.satellites = [];
    }

    addSatellite(satellite: SatelliteObj) {
        this.satellites.push(satellite);
    }

    updateSatelliteData(latitude: number, longitude: number) {
        this.satellites.forEach((satellite) => {
            satellite.updateData(latitude, longitude);
        });
    }
}

// const SatelliteDataObj: Array<SatelliteObjType> = [
//     {
//         id: 1,
//         name: "sattelite 1",
//         location: [51.505, -0.09]
//     },
//     {
//         id: 2,
//         name: "spaceX Sattelite",
//         location: [51.6, -0.09]
//     },
//     {
//         id: 3,
//         name: "Elon Munsk!",
//         location: [51.7, -0.09]
//     },
//     {
//         id: 4,
//         name: "Trumt",
//         location: [51.8, -0.09]
//     },
//     {
//         id: 5,
//         name: "USA USA USA",
//         location: [51.9, -0.09]
//     },
// ];

// export const getSatelliteData = async () => {
//     return SatelliteDataObj
// }

// export const updateSatelliteData = async () => {
//     console.log(SatelliteDataObj);
//     const newData = SatelliteDataObj.map((satellite) => {
//         return(
//             satellite.location = [satellite.location[0] + 0.1, satellite.location[1] + 0.1]
//         )
//     });
//     console.log(newData);
//     return newData
// }