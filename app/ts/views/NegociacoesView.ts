import { View } from './index';
import { Negociacao } from '../models/index';

export class NegociacoesView extends View<Negociacao[]> {

    template(negociacoes: Negociacao[]): string{
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>

                ${
                    negociacoes.map(negociacao => 
                        `
                        <tr>
                        <td>${negociacao.data.getDate() + 1}/${negociacao.data.getMonth() + 1}/${negociacao.data.getFullYear()}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                        </tr>
                        `
                    ).join('')
                }
                </tbody>
                
                <tfoot>
                </tfoot>
            </table>
        `
    }
}