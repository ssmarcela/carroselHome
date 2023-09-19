public with sharing class sws_vencimentoInsumos {
    
    @AuraEnabled
    public static List<Payment> buscarInsumos(){
        List<Payment> buscarInsumosVenc = [Select Amount, Data_final__c, Data_inicial__c FROM Payment];
        return buscarInsumosVenc;
    }

}