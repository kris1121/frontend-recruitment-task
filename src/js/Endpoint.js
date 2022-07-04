const url = "https://jsonplaceholder.typicode.com/users";

export const getDataFromEndpoint = async () => {
    
    try {
        return await fetch(url)
            .then(response => response.json())    
        } catch (error) {
            console.log(error)
    }

}