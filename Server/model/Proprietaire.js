"use strict";
module.exports=class Proprietaire{
    constructor(){}
    get ProprietaireId(){
        return this.proprietaireId;
    }
    get Nom(){
        return this.nom;
    } 
    set ProprietaireId(proprietaireId){
        this.proprietaireId=proprietaireId;
    }
    get Nom(nom){
         this.nom=nom;
    } 
}