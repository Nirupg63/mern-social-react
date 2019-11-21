const create = (user) => {
    return fetch('localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => console.log(err))
}

const list = () => {
    return fetch('localhost:3000/api/users/', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}