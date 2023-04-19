
const calcMesesEntreFechas = async ({ fechaBeg, fechaEnd, prestamoCantidad, idPrestamo, insteres }) => {

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
    const cantMeses = Math.round(diffMeses);  //meses del prestamo
    const cantyears = Math.round(cantMeses/12) //Años del prestamo
    const totalPrestamosInteres = prestamoCantidad*cantyears*insteres; //Total a pagar del prestamo
    const cantPorMes = totalPrestamosInteres / cantMeses; // Redondea y devuelve la cantidad de meses

    let cuotas = []

    for (let fechaActual = fecha1Ms; fechaActual <= fecha2Ms; fechaActual.setMonth(fechaActual.getMonth() + 1)) {
        // Creamos un objeto con los datos de la cuota del préstamo para la fecha actual
        const cuota = {
            idPrestamo,
            tipo: "",
            fechaPlanificado: fechaActual,
            monto: cantPorMes
        };

        // Agregamos la cuota al arreglo de cuotas
        cuotas.push(cuota);
    }
    return cuotas;

}

module.exports = {
    calcMesesEntreFechas
}