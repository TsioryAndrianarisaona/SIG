"use strict";
const postgres=require("../model/Connection.js");
module.exports=class TitreService{
    constructor(){}
    getTitreSpecifique(idProprio,surfaceMin,surfaceMax){
        return new Promise(function(resolve,reject){
            let result=[];
            let sql="SELECT Titre.titreid as titreid,proprietaire.nom as proprietaire, Titre.prix , ST_asGeoJson(Titre.polygone) as coordonnee,ST_AREA(Titre.polygone) AS surface from titre JOIN PROPRIETAIRE ON Titre.proprietaireid=Proprietaire.proprietaireid ";
            if(idProprio != "" && idProprio != null){
                sql+=" WHERE TITRE.PROPRIETAIREID ="+idProprio;
            
            }
            sql += "group by Titre.titreid,proprietaire.proprietaireid,prix, ST_asGeoJson(Titre.polygone)"
            if((surfaceMin != "" && surfaceMin != null) ||(surfaceMax != "" && surfaceMax != null) ){
                sql+=" HAVING "
                if(surfaceMin != null && surfaceMin != ""){
                   sql+=" ST_AREA(Titre.polygone) >= "+surfaceMin;
                   if(surfaceMax != null && surfaceMax != ""){
                       sql+=" and ST_AREA(Titre.polygone) <= "+surfaceMax;
                   }
               }
               else{
                if(surfaceMax != null && surfaceMax != ""){
                    sql+="  ST_AREA(Titre.polygone) <= "+surfaceMax;
                }
               }
            }
            postgres().query(sql,function(err,res){
                for(var column in res.rows){
                    result.push(res.rows[column]);
                }
                postgres().end();
                resolve(result);
            }
            );   
        });   
    }
    verifierTerrain(polygone){
        return new Promise(function(resolve,reject){
            let result=false;
            let sql="SELECT titreid  from titre";
            postgres().query(sql,function(err,res){
                for(var indice in res.rows){
                       sql="SELECT ST_INTERSECTS((SELECT polygone  from titre where titreid =  "+res.rows[indice].titreid+"),"+polygone+")";
                       postgres().query(sql,function(error,resultat){
                        for(var column in resultat.rows){
                            if(resultat.rows[column].st_intersects){
                                postgres().end();
                                result=true;
                                resolve(true);
                            }
                        }
                   });
                }
                setTimeout(() => {
                    postgres().end();
                    resolve(result);
                }, 2000);
            });   
        });
    }
    insererTitre(points,proprietaire){
        return new Promise(function(resolve,reject){
            let prix=null;
            let sql="  SELECT avg(titre.prix) from TITRE WHERE ST_CONTAINS( ST_BUFFER("+points+",30000),titre.polygone)";
            postgres().query(sql,function(err,res){
                for (var indice in res.rows) {
                    prix=res.rows[indice].avg;
                }
                if(prix==null){
                    prix=120;
                }
                sql="INSERT INTO TITRE VALUES(default,"+proprietaire+","+prix+","+points+")";               
                postgres().query(sql,function(error,resultat){
                    if(error){
                        resolve(error);
                    }
                    else{
                        resolve(null);
                    }
                });
            });
        });

    }
}