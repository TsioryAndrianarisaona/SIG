"use strict";
const postgres=require("../model/Connection.js");
module.exports=class VilleService{
    constructor(){}
    getVille(villeName,callback) {
        let result=[];
        let error=null;
        let sql="SELECT * FROM VILLE where NOM like '"+villeName+"'";
        postgres().query(sql,function(err,resultat){
            if(err){
                error=err;
            }
            else{
                if(resultat.length == 0){
                    error="Ville Not Found";
                }
                else{
                  for (let index = 0; index < resultat.rows.length; index++) {
                      result.push(resultat.rows[index]);
                  }
                }
            }
            postgres().end();
            callback(error,result);
        });
    }
};