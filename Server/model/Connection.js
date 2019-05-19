let Db=require("../lib/node_modules/pg");
let config="postgres://postgres:1234@localhost:5432/sigFonciere"
function getConnection(){
    const connection=new Db.Client(config);
    connection.connect(function(err) {
        if(err){
           throw err;
        }
    });
    return connection;
}
module.exports=getConnection;