import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import PROJECT_OBJECT from '@salesforce/schema/Projeto__c';
import NAME_FIELD from '@salesforce/schema/Projeto__c.Name';
import QUAL_SERVICO_SERA_ENTREGUE from '@salesforce/schema/Projeto__c.Qual_servico_sera_entregue__c';
import VALOR from '@salesforce/schema/Projeto__c.Valor__c';
import DESCRICAO from '@salesforce/schema/Projeto__c.Descricao__c';

export default class Sws_criarNovoProjeto extends LightningElement {
    projectName;
    serviceToBeDelivered;
    valor;
    description;
    qualServicoEntregue = 'Site';

    handleNameChange(event) {
        this.projectName = event.target.value;
    }

    handleServiceChange(event) {
        this.serviceToBeDelivered = event.target.value;
    }

    handleValueChange(event) {
        this.valor = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    } 

    get qualServico(){
        return [
            { label:'Landing Page', value:'Landing Page'},
            { label:'Site', value:'Site'},
            { label:'Single Page', value:'Single Page'},
        ]
    }

    handleCreateProject() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.projectName;
        fields[QUAL_SERVICO_SERA_ENTREGUE.fieldApiName] = this.serviceToBeDelivered;
        fields[VALOR.fieldApiName] = this.valor;
        fields[DESCRICAO.fieldApiName] = this.description;

        const recordInput = { apiName: PROJECT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(project => {
                alert('Projeto criado com o ID: ' + project.id);
            })
            .catch(error => {
                alert('Erro ao criar o projeto: ' + error.body.message);
            });
    }
}