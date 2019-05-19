"use strict";
module.exports=class Ville{
    constructor(){};
    get VilleId(){
        return this.villeId;
    }          
    set VilleId(villeId){
        this.villeId=villeId;
    }          
    get Nom(){
        return this.nom;
    }              
    set Nom(nom){
        this.nom=nom;
    }              
    get Longitude(){
        return this.longitude;
    }
    set Longitude(longitude){
        this.longitude=longitude;
    }
    get Latitude(){
        return this.latitude;
    }
    set Latitude(latitude){
        this.latitude=latitude;
    } 
    get Zoom(){
        return this.zoom;
    }
    set Zoom(zoom){
        this.zoom=zoom;
    }
};