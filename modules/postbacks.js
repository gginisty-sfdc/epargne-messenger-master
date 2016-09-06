"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

exports.schedule_visit = (sender, values) => {
    salesforce.findProperties({id: values[1]}).then(properties => {
        messenger.send(formatter.formatAppointment(properties[0]), sender);
    });
};

exports.contact_broker = (sender, values) => {
    messenger.send({text: "Voici les compétences requises pour postuler à ce projet : "}, sender);
    messenger.send(formatter.formatBroker(), sender);
};

exports.confirm_visit = (sender, values) => {
    messenger.send({text: `C'est noté, votre rendez-vous est confirmé pour le ${values[2]}. ${values[1]}.`}, sender);
};

exports.contact_me = (sender, values) => {

    let propertyId = values[1];
    messenger.getUserInfo(sender).then(response => {
        salesforce.createCase(propertyId, response.first_name + " " + response.first_name, sender).then(() => {
            messenger.send({text: `Merci pour votre intérêt ${response.first_name}. J'ai demandé à un conseiller de vous contacter dès que possible`}, sender);
        });
    });

};
