const validate = (input) => {
    let errors = {};
    let regexImage = /^(http|https):\/\/[^\s]+\.png$/
    
    if (!input.nombre) {
        errors.nombre = "Campo obligatorio";
    };

    if (input.nombre.length > 10) {
        errors.nombre = "Debe ser menor a 10 caracteres";
    };

    if (!/^[a-zA-Z]+$/.test(input.nombre)) {
        errors.nombre = "El nombre solo puede contener letras";
    };

    if (!input.imagen) {
        errors.imagen = "Campo obligatorio";
    };

    // if (!regexImage.test(input.imagen)) {
    //     errors.imagen = "Ingrese una URL de imagen PNG válida";
    // }

    if (input.vida <= 0) {
        errors.vida = "vida deber ser mayor a 0";
    };

    if (input.vida >= 251) {
        errors.vida = "vida no puede ser mayor a 250"
    };

    if (input.ataque <= 0) {
        errors.ataque = "El ataque deber ser mayor a 0";
    };

    if (input.ataque >= 251) {
        errors.ataque = "El ataque no puede ser mayor a 250"
    };

    if (input.defensa <= 0) {
        errors.defensa = "La defensa deber ser menor a 0";
    };

    if (input.defensa >= 251) {
        errors.defensa = "La defensa no puede ser mayor a 250"
    };

    if (input.velocidad <= 0 && input.velocidad.length) {
        errors.velocidad = "La velocidad deber ser menor a 0";
    };

    if (input.velocidad >= 251) {
        errors.velocidad = "La velocida no puede ser mayor a 250"
    };

    if (input.altura <= 0 && input.altura.length) {
        errors.altura = "La altura deber ser menor a 0";
    };

    if (input.height >= 251) {
        errors.height = "La altura no puede ser mayor a 250"
    };

    if (input.peso <= 0 && input.peso.length) {
        errors.peso = " El peso deber ser menor a 0";
    };

    if (input.peso >= 251) {
        errors.peso = "El peso no puede ser mayor a 250"
    };

    // Validación de los tipos
    if (input.types.length > 2) {        
        errors.types ="Solo vas a poder seleccionar 2 tipos";
    };


    return errors;
};

export default validate;