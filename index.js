import inquirer from "inquirer"
import utils from "./utils.mjs";

const promptUser = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'Operacion',
        message: '¿Qué necesitas hacer?',
        choices: ['Agregar gasto', 'Consultar gasto', 'Ver total de gastos', 'EXIT']
    }]).then(async response => {
        switch (response.Operacion) {
            case 'Agregar gasto':
                await utils.agregarGasto();
                promptUser();
                break;
            case 'Consultar gasto':
                await utils.consultarGasto();
                promptUser();
                break;
            case 'Ver total de gastos':
                await utils.totalGasto();
                promptUser();
                break;
            case 'EXIT':
                console.log('Saliendo...');
                break;
            default:
                promptUser();
                break;
        }
    });
    };

promptUser();

