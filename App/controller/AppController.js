let app=angular.module("SigFonciere",["Route"])
    .controller("carteService",carteService);
function carteService($scope,$window,$http) {
     $scope.canCreate=true;
     var map = L.map('map').setView([-18.9791935,47.5411],13);
     var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© ETU 799',
         maxZoom: 19
     });
     
     var polygons=[];
     let pointCreate=[];
     map.addLayer(osmLayer);
     //Afficher polygones
     $scope.recherche=function(){
          let surfaceMin=$scope.surfaceMin;
          let surfaceMax=$scope.surfaceMax;
          let category=$scope.category;
          let ville=$scope.ville;
          //Zoom
          if(ville != "" && ville != null){
               let donnee={ville:ville};
               $http.post("/zommerSurVille",donnee).then(function(data,error) {
                    if(error){
                         $scope.error=error;
                    }
                    else{
                         if(data.data.error != null){
                              $scope.error=data.data.error;
                         }
                         else{
                              map.setZoom(data.data.resultat[0].zoom);
                              var latidude=data.data.resultat[0].latitude;
                              var longitude=data.data.resultat[0].longitude;
                              map.panTo([latidude,longitude]);
                       }
                  }  
               });
          }
          // Recherche                   
          if(polygons != undefined || polygons.length !=0){
               for(var i=0;i<polygons.length;i++){
                    polygons[i].removeFrom(map);
               }
          }
          $http.post("/terrainSpec",{idProprio:category,surfaceMin:surfaceMin,surfaceMax:surfaceMax}).then(function(data,error){
               if(polygons != undefined || polygons.length != 0){
                    for(var index=0;index<polygons.length;index++){
                         polygons[index].removeFrom(map);
                    }
               }
               pointCreate=[]
               $scope.canCreate=false;
               data.data.forEach(titre => {
                    var polygon=L.polygon(titre.coordonees,{showMeasurements:true}).addTo(map);
                    polygon.bindPopup("Proprietaire:"+titre.proprietaireid+"<br>"+"Prix:"+titre.prix);
                    polygons.push(polygon);
               });
          });
     }
     //Effacer les polygones

     $scope.removeAll=function(){
          $scope.canCreate=true;
          if(polygons != undefined || polygons.length != 0){
               for(var index=0;index<polygons.length;index++){
                    polygons[index].removeFrom(map);
               }
          }
     }
     // edit carte
     var editableLayers = new L.FeatureGroup();
     map.addLayer(editableLayers);
     var drawPluginOptions = {
     position: 'topright',
     draw: {
          polygon: {
          allowIntersection: true, // Restricts shapes to simple polygons
          drawError: {
               color: '#e1e100', // Color the shape will turn when intersects
               message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
          },
          shapeOptions: {
               color: '#97009c'
          }
          },
          // disable toolbar item by setting it to false
          polyline: false,
          circle: false, // Turns off this drawing tool
          rectangle: false,
          marker: false,
          },
     edit: {
          featureGroup: editableLayers, //REQUIRED!!
          remove: false
     }
     };

     // Initialise the draw control and pass it the FeatureGroup of editable layers
     var drawControl = new L.Control.Draw(drawPluginOptions);
     map.addControl(drawControl);

     var editableLayers = new L.FeatureGroup();
     map.addLayer(editableLayers);

     map.on('draw:created', function(e) {
     var type = e.layerType,
     layer = e.layer;

     editableLayers.addLayer(layer);
     });
     map.on('click',gererPoint);
    
     function gererPoint(event){
          if($scope.canCreate){
               let data={
                    latitude:event.latlng.lat,
                    longitude:event.latlng.lng
               }
               pointCreate.push(data);
          }
     }
     $scope.insertTerrain=function(){
          if($scope.categoryInsert == "" || $scope.categoryInsert == null){
               $scope.error="Category avant insertion est indispensable";
          }
          else{
               $scope.error=null;
               if(pointCreate.length == 0 ){
                    $scope.error="Pas de points pour creer votre terrain";
               }
               else{
                    if(pointCreate.length <3){
                         $scope.error="Le nombre doit est superieur a 2";
                    }
                    else{
                         let toInsert={
                              category:$scope.categoryInsert,
                              point:pointCreate
                         }
                         $http.post("/insererTerrain",toInsert).then(function(data,error){
                              if(data.data != null && data.data != undefined){
                                   $scope.error=data.data;
                              }
                              pointCreate=[];
                         });
                    }
               }
          }
     }
}
