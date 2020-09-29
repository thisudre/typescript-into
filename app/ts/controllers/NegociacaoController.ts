import { Negociacao, Negociacoes } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';

export class NegociacaoController {
    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('.negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');


    constructor() {
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacoesView.update(this._negociacoes.toArray());
    }
    
    adiciona(event: Event){
        event.preventDefault();
        const data = new Date(this._inputData.val().replace("/-/g", ","));

        if (!this.ehDiaDaSemana(data)) {
            this._mensagemView.update("Apenas dias uteis!");
            
            return;
        }
        
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes.toArray());
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }

    private ehDiaDaSemana(data: Date): boolean {
        
        if (data.getDay() == DiaDaSemana.Domingo || data.getDay() == DiaDaSemana.Sabado) {

            return false;
        }
        return true;
    }

    
}
enum DiaDaSemana{
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}