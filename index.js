const [, , method, route, ...args] = process.argv;

const [resource, id] = route.split('/');

const BASE_URL = "https://fakestoreapi.com"

const request = async (url, options = {}) => {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json();
}

try {
    if (method === 'GET') {
        if (id) {
            const data = await request(`${BASE_URL}/${resource}/${id}`)
            console.log(data)
        } else {
            const data = await request(`${BASE_URL}/${resource}`)
            console.log(data);
        }
    } else if (method === 'POST') {
        const [title, price, description] = args;

        if (!title || !price || !description) {
            throw new Error(`Title and Body are required for POST request on ${resource}`)
        }

        const data = await request(`${BASE_URL}/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                price: Number(price),
                description,
                image: '',
                category: description
            })
        });
        console.log(data);

    } else if (method === "DELETE") {
        if (!id) {
            throw new Error(`ID is requiered ofr DELETE Request on ${resource}`)
        }

        await request(`${BASE_URL}/${resource}/${id}`, { method: "DELETE" })
            .then(response => console.log(response))
    } else {
        console.log(`Unsupported method: ${method}`)
    }
} catch (error) {
    console.error(error)
}
