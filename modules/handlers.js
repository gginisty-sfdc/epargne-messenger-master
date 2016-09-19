"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

exports.searchHouse = (sender) => {
    messenger.send({text: `D'accord, voici nos placements disponibles ...`}, sender);
    salesforce.findProperties().then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_City = (sender, values) => {
    messenger.send({text: `D'accord, je recherche les ${values[1]}`}, sender);
    salesforce.findProperties({city: values[1]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms_City_Range = (sender, values) => {
    messenger.send({text: `C'est compris. Je recherche les ${values[1]} chambres à ${values[2]} entre ${values[3]} et ${values[4]}`}, sender);
    salesforce.findProperties({bedrooms: values[1], city: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms_City = (sender, values) => {
    messenger.send({text: `Bien reçu. Voici nos ${values[1]} à horizon de placement ${values[2]} ans:`}, sender);
    salesforce.findProperties({bedrooms: values[1], city: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchProducts_City_Address = (sender, values) => {
    messenger.send({text: `Bien reçu. Voici nos ${values[1]} à risque ${values[2]}`}, sender);
    salesforce.findProperties({city: values[1], address: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Bedrooms = (sender, values) => {
    messenger.send({text: `C'est noté. Voici nos placements à horizon ${values[1]} ans`}, sender);
    salesforce.findProperties({bedrooms: values[1]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.searchHouse_Range = (sender, values) => {
    messenger.send({text: `Bien reçu. Voici les biens entre ${values[1]} et ${values[2]} euros :`}, sender);
    salesforce.findProperties({priceMin: values[1], priceMax: values[2]}).then(properties => {
        messenger.send(formatter.formatProperties(properties), sender);
    });
};

exports.priceChanges = (sender, values) => {
    messenger.send({text: `D'accord; voici les produits dont la VL a évolué ces derniers jours :`}, sender);
    salesforce.findPriceChanges().then(priceChanges => {
        messenger.send(formatter.formatPriceChanges(priceChanges), sender);
    });
};

exports.hi = (sender) => {
    messenger.getUserInfo(sender).then(response => {
        messenger.send({text: `Bonjour, ${response.first_name}! Que puis-je faire pour vous aujourd'hui ?`}, sender);
    });
};

exports.help = (sender) => {
    messenger.send({text: `J'aide les épargnants Natixis à choisir les produits les plus adaptés. 
Vous pouvez me poser des questions du type "Produits à horizon 10 ans", "Quels sont les PERCO à risque faible?" ou bien "Quel est mon plafond d'abondement?"`}, sender);
};

exports.details = (sender) => {
    messenger.send({text: `Le plafond d'abondement de votre société est de 2200,00€ mensuels pour l'épargne salariale.
    Pour plus d'informations, contactez votre responsable épargne au +33 1 72 10 94 00`}, sender);
};
