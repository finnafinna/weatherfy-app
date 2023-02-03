

export type City = {
    name: string;
    latitude: number;
    longitude: number;
    country: string;
}

const API_KEY = 'Xf8ASCbW/eq0gflVA/PLXQ==POoZB5V0sBrf8wSF';

export function getCoords(search: string) {
    return fetch(`https://api.api-ninjas.com/v1/geocoding?city=${search}`, {
        headers: {
            'X-Api-Key': API_KEY,
        },
    })
        .then((response) => response.json())

}