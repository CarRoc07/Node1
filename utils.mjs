import inquirer from "inquirer";
import fs from 'fs';

const agregarGasto = async () => {
    const response = await inquirer.prompt([{
        name: 'tipo',
        message: '¿Qué tipo de gasto deseas agregar?',
    },
    {
        name: 'monto',
        message: '¿Cuál es el monto del gasto?'
    }]);
    
    const tipoGasto = response.tipo.toLowerCase();
    
    try {
        const data = await fs.promises.readFile('gastos.json', 'utf8');
        const arregloExistente = JSON.parse(data);
        arregloExistente.push({ "tipo": tipoGasto, "monto": response.monto });
        const newContent = JSON.stringify(arregloExistente);
        await fs.promises.writeFile('gastos.json', newContent, 'utf8');
        console.log('Se guardó el gasto.');
    } catch (err) {
        console.error('Error al guardar el gasto.');
    }
};

    const consultarGasto = async () => {
    const response = await inquirer.prompt([{
        name: 'tipo',
        message: '¿Qué tipo de gasto deseas consultar?',
    }]);
    
    const tipoGasto = response.tipo.toLowerCase();
    
    try {
        const data = await fs.promises.readFile('gastos.json', 'utf8');
        const dataParsed = JSON.parse(data);
        const gasto = dataParsed.filter(Gasto => Gasto.tipo === tipoGasto);
        console.log(gasto);
    } catch (err) {
        console.error(`Error al leer el archivo: ${err}`);
    }
};

    const totalGasto = async () => {
    try {
        const data = await fs.promises.readFile('gastos.json', 'utf8');
        const dataParsed = JSON.parse(data);
        const totalGasto = dataParsed.reduce((acc, valor) => {
            return acc += Number(valor.monto);
        }, 0);
        console.log(totalGasto);
    } catch (err) {
        console.error(`Error al leer el archivo: ${err}`);
    }
};

    export default {
        agregarGasto,
        consultarGasto,
        totalGasto
    };
