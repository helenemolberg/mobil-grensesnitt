const API_URL = 'http://localhost:1337/api/images';

// Fetches all data
export async function getImages() {
    //console.log("mmm: ", API_URL);
    const response = await fetch(API_URL);
    return response.json();
}

// Sorts on one project
export async function getFilesProject(prosjekt) {
    console.log("11: ", `${API_URL}/${prosjekt}`);
    const response = await fetch(`${API_URL}/${prosjekt}`);
    return response.json();
}

// Fetches the pictures
export async function getPictures(filename) {
    /*
    const res = await fetch(`${API_URL}/image/${filename}`).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('error...');
        }
    })
    .then(responseJson => {
        return responseJson.data;
    });
    //const text = await response.json();
    //return text.data; */
    const response = await fetch(`${API_URL}/image/${filename}`);
    const text = await response.json();
    //console.log(text.data);
    return text.data;
}

// Sort on DateRange
export async function getDateRange(value) {
    console.log(value);
    const response = await fetch(`${API_URL}/daterange/${value}`);
    return response.json();
}

// Headeren må være tom
// POST: the new entry data
export function sendFile(entry) {
    return fetch(API_URL, {
        method: 'POST',
        body: entry,
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => {console.error(error) });
}