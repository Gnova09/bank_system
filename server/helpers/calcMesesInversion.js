
const calcMesesInversion = async ({ fechaBeg, fechaEnd, inversionCantidad, idInversion, insteres }) => {

    const fecha1Ms = new Date(fechaBeg); // Obtiene la cantidad de milisegundos desde 1970 para la primera fecha
    const fecha2Ms = new Date(fechaEnd); // Obtiene la cantidad de milisegundos desde 1970 para la segunda fecha
    const diffMs = fecha2Ms.getTime() - fecha1Ms.getTime(); // Calcula la diferencia en milisegundos entre las dos fechas
    const diffMeses = diffMs / (1000 * 60 * 60 * 24 * 30); // Convierte la diferencia en meses
    /*  
        1000 milisegundos por segundo
        60 segundos por minuto
        60 minutos por hora
        24 horas por día
        30 días por mes (valor aproximado) 
    */
    // console.log(diffMeses)
    const interesAnual = insteres / 100; //Interes anual
    const cantMeses = Math.round(diffMeses);  //Meses del prestamo
    const cantyears = Math.round(cantMeses / 12) //Años del prestamo
    const totalPrestamosInteres = inversionCantidad * (1 + (cantyears * interesAnual)); //Total a pagar del prestamo
    const cantPorMes = totalPrestamosInteres / cantMeses; // Cantidad a pagar mensual

    let cuotas = []

    for (let fechaActual = fecha1Ms; fechaActual <= fecha2Ms; fechaActual.setMonth(fechaActual.getMonth() + 1)) {
        const fechaActualizada = new Date(fechaActual);
        console.log(fechaActual)
        // Creamos un objeto con los datos de la cuota del préstamo para la fecha actual
        var cuota = {
            idInversion,
            tipo: "",
            fechaPlanificado: fechaActualizada,
            monto: cantPorMes
        };

        // Agregamos la cuota al arreglo de cuotas
        cuotas.push(cuota);
    }
    console.log(cuotas)
    return cuotas;

}

module.exports = {
    calcMesesInversion
}