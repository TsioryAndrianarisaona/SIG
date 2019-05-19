"use strict";
const TitreService=require("./TitreService");
module.exports=class TerrainService{
    getTerrainSpecifique(idProprio,surfaceMin,surfaceMax){
        return new Promise (function (resolve,reject) {
            let result=[];
            var titreService= new TitreService();
            var promiseTitre=titreService.getTitreSpecifique(idProprio,surfaceMin,surfaceMax);
            promiseTitre.then(function(value){
                var data=[];
                 value.forEach(element => {
                   var datum={
                       titreid:element.titreid,
                       proprietaireid:element.proprietaire,
                       prix:element.prix,
                       surface:element.surface,
                       coordonees:JSON.parse(element.coordonnee).coordinates[0]
                   }
                   data.push(datum); 
                });
                resolve(data);
            });
        });   
    }
    insererTerrain(data){
        return new Promise(function(resolve,reject){           
            let string="  ST_Polygon(ST_GeomFromText('LINESTRING(";
            for(var i=0;i<data.point.length;i++){
                string+=""+data.point[i].latitude+" "+data.point[i].longitude;
                    string+=",";
                if(i==data.point.length-1){
                    string+=""+data.point[0].latitude+" "+data.point[0].longitude;
                }
            }
            string+=" )'),4326)";
            var titreService= new TitreService();
            var promiseVerification=titreService.verifierTerrain(string);
            promiseVerification.then(function(verification){
                if(!verification){
                    var promiseInsertion=titreService.insererTitre(string,data.category);
                    promiseInsertion.then(function(insertion){
                        resolve(insertion);
                    });
                }
                else{
                    resolve("Intersection avec d'autres terrains");
                }
            });
        });
        
    }
}