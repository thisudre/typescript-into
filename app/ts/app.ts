import { NegociacaoController } from './controllers/index';

const controller = new NegociacaoController();
$('.form').submit((controller.adiciona.bind(controller)));
$('#import-button').click((controller.importa.bind(controller)));