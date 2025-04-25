/*
calculadora imc v3
1. total hombres y mujeres registrados ~
2. promedio de edad hombres y mujeres ~
3. total menores registrados ~
4. total hombres y mujeres con sobrepeso
5. paciente de mas bajo imc
*/

"use strict";



let pacientes = []; //arreglo de pacientes vacio


function agregarPacientes() {

    let running = true;

    const nomb = "Ingrese nombre del paciente"
    const age ="Ingrese edad del paciente";
    const sex ="Ingrese genero (M/F)";
    const p = "Ingrese el peso en Kg";
    const alt = "ingrese la altura en metros";



    do{
        alert("NUEVO PACIENTE");
        
        let nombre = prompt(nomb); // 
        let edad = prompt(age);
        let sexo = prompt(sex);
        let peso = prompt(p);
        let altura = prompt(alt);

        let imc = peso/(altura**2);

        let mensaje = "";

        if (imc < 18.5) {
            mensaje = `Su IMC es ${imc}, su composición corporal es: bajo peso.`;
        } else if (imc >= 18.5 && imc <= 24.9) {
            mensaje = `Su IMC es ${imc}, su composición corporal es: peso normal.`;
        } else if (imc >= 25 && imc <= 29.9) {
            mensaje = `Su IMC es ${imc}, su composición corporal es: sobrepeso.`;
        } else if (imc >= 30) {
            mensaje = `Su IMC es ${imc}, su composición corporal es: obesidad.`;
        } else {
            alert("ALGO SALIÓ MAL");
            continue;
        }

        alert(mensaje);
        //               0       1     2     3     4      5
        let paciente =[nombre, edad, sexo, peso, altura, imc];
        pacientes.push(paciente);
        console.log("paciente registrado:",paciente);
        alert(paciente);

        running = confirm('desea agregar un nuevo paciente?')

    } while(running);
}

function mostrarResultados() {

    if (pacientes.length === 0) {
        alert("No hay pacientes registrados aún.");
        return;
    }

    let TH = pacientes.filter(p => p[2] === "M");
    let TM = pacientes.filter(p => p[2] === "F");

    let cantidad_H = TH.length; 
    let cantidad_M = TM.length;

    //.filter es un metodo que crea un nuevo arreglo con los elementos que cumple la condicion 
    // p => p[2] === "M" uncion flecha que comprueba si se cumple la condicion segun el sexo 
    // .length la el valor de la cantidad de datos en el arreglo
  
    let ageH = TH.map(p => parseInt(p[1])); //ARREGLAR
    let ageM = TM.map(p => parseInt(p[1]));

    // .map recorre al paciente que se busca con el filter y extrae la edad deacuerdo a como se almaceno en el arreglo principal 

    let Tpacientes_m = pacientes.filter(p => p[1] < 18).length;
    // .p => p[1] < 18 para extraer los datos del arreglo principal y haciendo una comparacion para solo extraer datos menores a 18 de edad

    function promedioR(arr, i = 0, suma = 0) {
    if (i >= arr.length) {
        return (suma / (arr.length || 1));
    }
    return promedioR(arr, i + 1, suma + arr[i]);
    }

    //uso de funcion recursiva para calcular promedio de edades de hombres y mujeres

    let promAgeH = promedioR(ageH);
    let promAgeM = promedioR(ageM);


    let HSobrep = TH.filter(p => p[5] >= 25 && p[5] < 30).length;
    let MSobrep = TM.filter(p => p[5] >= 25 && p[5] < 30).length;

    function PacienteIMC_Min(pacientes, i = 1, min = pacientes[0]) {
    if (i >= pacientes.length) return min;

    let actual = pacientes[i];
    let nuevoMin = (actual[5] < min[5]) ? actual : min;

    return encontrarPacienteIMCMin(pacientes, i + 1, nuevoMin);
    }

    let pacienteBajoIMC = PacienteIMC_Min(pacientes);

    alert(`
    RESULTADOS:

    Total pacientes: ${pacientes.length}
    Total hombres: ${cantidad_H}
    Total mujeres: ${cantidad_M}
    Pacientes menores de edad: ${Tpacientes_m}

    Promedio edad hombres: ${promAgeH.toFixed(1)}
    Promedio edad mujeres: ${promAgeM.toFixed(1)}

    Hombres con sobrepeso (IMC 25-30): ${HSobrep}
    Mujeres con sobrepeso (IMC 25-30): ${MSobrep}

    Paciente con menor IMC: ${pacienteBajoIMC[0]} - IMC: ${pacienteBajoIMC[5]}
    `);
}

function menu() {
    let opcion;
    do {
        opcion = prompt(
            "MENÚ PRINCIPAL\n\n" +
            "1. Agregar pacientes\n" +
            "2. Ver resultados\n" +
            "3. Salir\n\n" 
        );

        switch (opcion) {
            case "1":
                agregarPacientes();
                break;
            case "2":
                mostrarResultados();
                break;
            case "3":
                alert("¡Gracias por usar la calculadora de IMC!");
                break;
            default:
                alert("Opción no válida, intenta de nuevo.");
        }

    } while (opcion !== "3");
}

menu();













/*

let pacienteBajoIMC = pacientes.reduce((min, p) => p[5] < min[5] ? p : min, pacientes[0]);
*/