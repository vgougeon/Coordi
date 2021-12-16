import { Logic } from './logic';

const api = new Logic()

//Ajoute une pomme manuellement
api.enterCode(1)

//Une seule pomme
api.enterQuantity(1)

//Ajoute une pomme manuellement
api.enterCode(1)

//Une seule pomme
api.enterQuantity(1)

//Scan une poire
api.scanCode(2)

//Quantité 4 poires
api.enterQuantity(4)

//Scan le produit a retourner
api.scanCode(1)

//Veut retourner un produit
api.returnProduct()

//Retourne 1 unité
api.enterQuantity(1)

//Entre un produit inconnu
api.enterCode(123012412421)

//Voit un ecran d'erreur, appuyer sur OK
api.pressOkOnError()

//Terminer la commande et payer
api.payment()

//Sélectionner mode de paiement
api.selectPaymentMethod('cash')

//BONUS 

//Payer avec le mode sélectionné
//Si amount null on paye l'intégralité du panier sinon on paye la value d'amount
api.pay(3)

// FIN





















//Hors scope
//Commande terminée, reset
// api.reset()

