const express=require("./lib/node_modules/express");
const server=express();
const path=require("path");
const bodyParser=require("./lib/node_modules/body-parser");
server.listen(80);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
console.log("Server is Running ... ");
// Import class
const Ville=require("./model/Ville");
const VilleService=require("./controller/VilleService");
const TerrainService=require("./controller/TerrainService");
// Routage
server.use(express.static(path.join(__dirname,"../App/")));
server.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname,"../App/index.html"));
    res.end();
});
server.post("/zommerSurVille",(req,res)=>{
    let villeService= new VilleService();
    villeService.getVille(req.body.ville,(error,resultat)=>{
        res.send({error:error,resultat:resultat});
        res.end();
    });
});
server.post("/terrainSpec",(req,res)=>{
    var terrainService=new TerrainService();
    var promise=terrainService.getTerrainSpecifique(req.body.idProprio,req.body.surfaceMin,req.body.surfaceMax);
    promise.then(function(value){
        res.send(value);
    });
});
server.post("/insererTerrain",(req,res)=>{
    var terrainService=new TerrainService();
    var promise=terrainService.insererTerrain(req.body);
    promise.then(function(value){
        res.send(value);
    });
});
