import { Negociacao } from './Negociacao';

export class Negociacoes{
    private _negociacoes: Negociacao[];

    constructor(){
        this._negociacoes = new Array;
    }

    adiciona(negociacao: Negociacao): void{
        this._negociacoes.push(negociacao);
    }

    toArray(): Negociacao[]{
        return [].concat(this._negociacoes);
    }
}