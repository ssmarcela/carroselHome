public with sharing class MessagingInboundEmailHandler implements Messaging.InboundEmailHandler {
    public Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, Messaging.InboundEnvelope envelope) {
        Messaging.InboundEmailResult result = new Messaging.InboundEmailresult();

        try {
            Case newCase = new Case(
                Subject = email.subject,
                Description = email.plainTextBody,
                Origin = 'Email',
                Status = 'New'
            );

            insert newCase;

            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new String[] { envelope.fromAddress });
            mail.setSubject('Confirmação de recebimento: ' + email.subject);
            mail.setPlainTextBody('Recebemos seu caso com o assunto: ' + email.subject + 
                                  ' e em breve nossa equipe entrará em contato.');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });

            System.debug('Sucesso:');

            result.success = true;
        } catch (Exception e) {
            System.debug('Erro ao processar o e-mail: ' + e.getMessage());
            result.success = false;
        }
        return result;
    }
}