import { LightningElement, api, track } from 'lwc';
import buscarInsumos from '@salesforce/apex/sws_buscarInsumos.buscarInsumos';

const COLUNAS = [
    { label: 'Qual é a compra?', fieldName: 'Name'},
    { label: 'Valor', fieldName: 'Valor__c', cellAttributes: { alignment: 'left' } },
];

export default class Sws_resumoInsumos extends LightningElement {
    
    colunas = COLUNAS;
    @api recordId;
    @track dadosInsumos = [];

    connectedCallback(){
        this.buscarInsumosFinanceiro();
    }

    buscarInsumosFinanceiro(){
        buscarInsumos({ idCaso : this.recordId })
        .then((result) => {
            this.dadosInsumos = result;
        })
        .catch((error) => {
            console.log(`Erro ao buscar produtos => ${JSON.stringify(error)}`);
        });
    }
}