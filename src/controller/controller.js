import axios from "axios";

export async function postPokemon(create){
    //event.preventDefault()
    try {
        console.log("previus")
        const response = await axios.post("http://localhost:3001/pokemons", create);
        console.log(response)
        if (response) {
          alert("Pokemon creado con éxito");
        } else {
          alert("Error al crear el driver");
        }
    } catch (error) {
        console.log(error.message)
    }
}