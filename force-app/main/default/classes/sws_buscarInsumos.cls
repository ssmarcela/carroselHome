public with sharing class sws_buscarInsumos {
    @AuraEnabled(cacheable=true)
    public static List<Product2> buscarInsumos(){
        List<Product2> insumos = [SELECT Id, Name, Valor__c
                                   FROM Product2 
                                   WHERE RecordType.DeveloperName = 'Despesas'
                                   ];
        return insumos;    
    }
}