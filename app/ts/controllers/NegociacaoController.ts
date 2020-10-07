import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { MensagemView, NegociacoesView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';

export class NegociacaoController {
    
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('.negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();


    constructor() {
        this._negociacoesView.update(this._negociacoes.toArray());
    }
    
    adiciona(event: Event){
        event.preventDefault();
        const data = new Date(this._inputData.val().replace("/-/g", ","));

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes.toArray());
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }

    @throttle()
    importa() {

            function isOk (res: Response) {
                if (res.ok) {
                    return res;
                }
                throw new Error;
            }

            this._service.obterNegociacoes(isOk).then(
                negociacoes => {
                    negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
                    this._negociacoesView.update(this._negociacoes.toArray());
                    this._mensagemView.update('Negociações importadas com sucesso!');
                } 
            )
    }
    
}