// require('cloud/app.js'); 
var Mandrill = require('mandrill');
Mandrill.initialize('0DQc3dS1JHa7ShAmAdeqww');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});
   
   
Parse.Cloud.define("addRelations", function(request, response)  {
   
                var tempArrayOfObjects = request.params.arrayPassed;
   
                var arrayToSave = [];
   
                for (var k = 0, len = tempArrayOfObjects.length; k < len; k++) {
                var objectToSave = tempArrayOfObjects[k];
                var viewer = request.params.user;
                var relation = objectToSave.relation("viewers");
   
                relation.add(viewer);
   
                arrayToSave.push(objectToSave);
                   
                // objectToSave.save();
   
                }
   
                Parse.Object.saveAll (arrayToSave, {
   
                    success: function(objects){
                        response.success("Relations Set");
                    },
                    error: function (objects, error) {
                        response.success("error in relation");
                    }
   
                })
   
    // response.success("Relations Set");
                   
   
   
});
   
Parse.Cloud.define("standardQuery11", function(request, response)  {
   
    var newGender = request.params.gender;
   
    var query = new Parse.Query("garmentsAPI");
    if (request.params.gender !== "both") {
    query.equalTo ("gender", request.params.gender);
    };
    query.notEqualTo ("viewers", request.params.user);
   
    var limitInteger = 30;
   
    query.limit = limitInteger;
   
    var garments = new Array();
   
    query.count({
   
        success: function(objectsInQuery){
   
            var numberOfQueries = (objectsInQuery / limitInteger);
   
            if (objectsInQuery % limitInteger !== 0) {
                numberOfQueries = numberOfQueries + 1;
            };
   
            numberOfQueries = parseInt(numberOfQueries);
   
            var randomInteger = Math.floor (Math.random()*(numberOfQueries+1));
   
            var randomIntegerIndex = randomInteger * limitInteger;
   
            query.greaterThan ("index", randomIntegerIndex);
   
        query.find ({
        success: function(results){
   
            var tempArrayOfObjects = new Array();
   
            for (var i = 0; i < 16; i++) {
   
                var limitIntegerPlusOne = limitInteger + 1;
   
                var randomTempNumber = Math.floor (Math.random()*limitIntegerPlusOne);
   
                var itemToAdd = results[randomTempNumber];
   
                tempArrayOfObjects.push(itemToAdd);
            };
   
            response.success(tempArrayOfObjects);
                   
   
        },
        error:function() {
   
   
                Parse.Cloud.run("followOnTwoQuery",{"gender" : "Women"},{
                success: function(results) {
  
                        response.success(results);
  
                },
                error: function(results, error) {
  
  
                response.error ("error of chaining followOnTwoQuery 1");
  
                }
                 });
   
        }
   
   
    });
   
            // response.success("There are " + objectsInQuery + "objects in the query and number of queries is" + numberOfQueries + " and random integer is " + randomInteger);
   
            },
        error:function() {
  
                Parse.Cloud.run("followOnTwoQuery",{"gender" : "women"},{
                success: function(results) {
  
                        response.success(results);
  
                },
                error: function(results, error) {
  
  
                response.error ("error of chaining followOnTwoQuery 2");
  
                }
  });
  
   
        }
           
   
    });
   
     
});
  
  
// Parse.Cloud.define("standardQuery", function(request, response)  {
   
   
   
//     var query = new Parse.Query("garmentsAPI");
//     if (request.params.gender !== "both") {
//     query.equalTo ("gender", request.params.gender);
//     };
//     query.notEqualTo ("viewers", request.params.user);
   
       
//     query.limit(9);
   
//     var garments = new Array();
   
//     query.find({
   
//         success: function(objectsInQuery){
   
//             response.success(objectsInQuery);
   
//             },
//         error:function() {
   
//             response.error ("query failed");
//         }
           
   
//     });
   
     
// }); 
   
  
 //OriginalFirstTimeShuffle
// Parse.Cloud.define("firstTimeQuery", function(request, response)  {
   
   
   
//     var query = new Parse.Query("garmentsAPI");
//     if (request.params.gender !== "both") {
//     query.equalTo ("gender", request.params.gender);
//     };
//     query.notEqualTo ("viewers", request.params.user);
   
       
//     query.limit = 50;
   
//     var garments = new Array();
   
//     query.count({
   
//         success: function(objectsInQuery){
   
//             var numberOfQueries = (objectsInQuery / 50);
   
//             if (objectsInQuery % 50 !== 0) {
//                 numberOfQueries = numberOfQueries + 1;
//             };
   
//             numberOfQueries = parseInt(numberOfQueries);
   
//             var randomInteger = Math.floor (Math.random()*(numberOfQueries+1));
   
//             var randomIntegerIndex = randomInteger * 50;
   
//             query.greaterThan ("index", randomIntegerIndex);
   
//         query.find ({
//         success: function(results){
   
//             var tempArrayOfObjects = new Array();
   
//             for (var i = 0; i < 7; i++) {
//                 var randomTempNumber = Math.floor (Math.random()*51);
   
//                 var itemToAdd = results[randomTempNumber];
   
//                 tempArrayOfObjects.push(itemToAdd);
//             };
   
//             response.success(tempArrayOfObjects);
                   
   
//         },
//         error:function() {
   
   
//             response.error ("lookup failed");
   
//         }
   
   
//     });
   
//             // response.success("There are " + objectsInQuery + "objects in the query and number of queries is" + numberOfQueries + " and random integer is " + randomInteger);
   
//             },
//         error:function() {
   
//             response.error ("count has failed");
//         }
           
   
//     });
   
     
// });
  
Parse.Cloud.define("testStandardQuery", function(request, response)  {
   
   
   
    var query = new Parse.Query("garmentsAPI");
    // if (request.params.gender !== "both") {
    // query.equalTo ("gender", request.params.gender);
    // };
    query.equalTo ("gender", "Men" && "gender", "Women");
    query.notEqualTo ("viewers", request.params.user);
   
    var limitInteger = 30;
   
    query.limit = limitInteger;
   
    var garments = new Array();
   
    query.count({
   
        success: function(objectsInQuery){
   
            var numberOfQueries = (objectsInQuery / limitInteger);
   
            if (objectsInQuery % limitInteger !== 0) {
                numberOfQueries = numberOfQueries + 1;
            };
   
            numberOfQueries = parseInt(numberOfQueries);
   
            var randomInteger = Math.floor (Math.random()*(numberOfQueries+1));
   
            var randomIntegerIndex = randomInteger * limitInteger;
   
            query.greaterThan ("index", randomIntegerIndex);
   
        query.find ({
        success: function(results){
   
            var tempArrayOfObjects = new Array();
   
            for (var i = 0; i < 16; i++) {
   
                var limitIntegerPlusOne = limitInteger + 1;
   
                var randomTempNumber = Math.floor (Math.random()*limitIntegerPlusOne);
   
                var itemToAdd = results[randomTempNumber];
   
                tempArrayOfObjects.push(itemToAdd);
            };
   
            response.success(tempArrayOfObjects);
                   
   
        },
        error:function() {
   
   
            response.error ("lookup failed");
   
        }
   
   
    });
   
            // response.success("There are " + objectsInQuery + "objects in the query and number of queries is" + numberOfQueries + " and random integer is " + randomInteger);
   
            },
        error:function() {
  
            response.error ("in error bit");
   
                // var query = new Parse.Query("garmentsAPI");
                // if (request.params.gender !== "both") {
                // query.equalTo ("gender", request.params.gender);
                // };
                // query.notEqualTo ("viewers", request.params.user);
   
       
                // query.limit(9);
   
                // var garments = new Array();
   
                // query.find({
   
                //     success: function(objectsInQuery){
   
                //         response.success(objectsInQuery);
   
                //     },
                //     error:function() {
   
                //         response.error ("error query failed");
                // }
           
   
                //     });
        }
           
   
    });
   
     
});
  
// Parse.Cloud.define("firstTimeNewQuery", function(request, response)  {
  
//                 response.error ("in error bit");
   
//                 var query = new Parse.Query("garmentsAPI");
//                 if (request.params.gender !== "both") {
//                 query.equalTo ("gender", request.params.gender);
//                 };
//                 query.notEqualTo ("viewers", request.params.user);
   
       
//                 query.limit(9);
   
//                 var garments = new Array();
   
//                 query.find({
   
//                     success: function(objectsInQuery){
   
//                         response.success(objectsInQuery);
   
//                     },
//                     error:function() {
   
//                         response.error ("error query failed");
//                 }
           
   
//                     });
  
//     };
  
  
  
Parse.Cloud.define("firstTimeNewQuery", function(request, response)  {
   
   
   
    var query = new Parse.Query("garmentsAPI");
    if (request.params.gender !== "both") {
    query.equalTo ("gender", request.params.gender);
    };
    // query.notEqualTo ("viewers", request.params.user);
   
       
    // query.limit = 25;
   
    var garments = new Array();
   
    query.count({
   
        success: function(objectsInQuery){
   
            var numberOfQueries = (objectsInQuery / 25);
   
            if (objectsInQuery % 25 !== 0) {
                numberOfQueries = numberOfQueries + 1;
            };
   
            numberOfQueries = parseInt(numberOfQueries);
   
            var randomInteger = Math.floor (Math.random()*(numberOfQueries+1));
   
            var randomIntegerIndex = randomInteger * 25;
   
            query.greaterThan ("index", randomIntegerIndex);
   
        query.find ({
        success: function(results){
   
            var tempArrayOfObjects = new Array();
   
            for (var i = 0; i < 7; i++) {
                var randomTempNumber = Math.floor (Math.random()*26);
   
                var itemToAdd = results[randomTempNumber];
   
                tempArrayOfObjects.push(itemToAdd);
            };
   
            response.success(tempArrayOfObjects);
                   
   
        },
        error:function() {
   
            response.error ("lookup failed");
   
        }
   
   
    });
   
            // response.success("There are " + objectsInQuery + "objects in the query and number of queries is" + numberOfQueries + " and random integer is " + randomInteger);
   
            },
        error:function() {
  
            // response.error(Parse.cloud.run ("firstTimeSimpleQuery"));
   
            // Parse.cloud.run ("firstTimeSimpleQuery");
  
            response.error (Parse.error);
        }
           
   
    });
   
     
});
   
   
Parse.Cloud.define("firstTimeQuery11", function(request, response)  {
   
    var newGender2 = request.params.gender;
   
    var query = new Parse.Query("garmentsAPI");
    if (request.params.gender !== "both") {
    query.equalTo ("gender", request.params.gender);
    };
    query.notEqualTo ("viewers", request.params.user);
   
       
    query.limit(9);
   
    var garments = new Array();
   
    query.find({
   
        success: function(objectsInQuery){
   
            response.success(objectsInQuery);
   
            },
        error:function() {
  
                Parse.Cloud.run("followOnTwoQuery",{"gender" : newGender2},{
                success: function(results) {
  
                        response.success(results);
  
                },
                error: function(results, error) {
  
  
                response.error ("error of chaining followOnTwoQuery");
  
                }
                 });
   
  
        }
           
   
    });
   
     
});
Parse.Cloud.define("testQuery", function(request, response) {
  
  var newGender = request.params.gender;
  
  Parse.Cloud.run("followOnTwoQuery",{"gender" : "Women"},{
    success: function(results) {
  
      response.success(results);
  
    },
    error: function(results, error) {
  
  
         response.error ("error of testQuery");
  
    }
  });
  
});
  
Parse.Cloud.define("followOnTwoQuery", function(request, response)  {
  
   
    var query = new Parse.Query("garmentsAPI");
    if (request.params.gender !== "both") {
    query.equalTo ("gender", request.params.gender);
    };
    // query.notEqualTo ("viewers", request.params.user);
  
    var randomIndexNo = Math.floor((Math.random()*150000)+1);
  
    query.greaterThan ("index", randomIndexNo);
   
    query.limit(9);
   
    var garments = new Array();
   
    query.find({
   
        success: function(objectsInQuery){
   
            response.success(objectsInQuery);
   
            },
        error:function() {
   
            response.error ("followontwoquery failed");
        }
           
   
    });
   
     
});
  
Parse.Cloud.define("followOnQuery", function(request, response)  {
   
    var userID = request.params.user;
  
    // var followOnUser;
  
    var queryUser = new Parse.Query("user");
    query.get(userID, {
  success: function(followOnUser) {
    // The object was retrieved successfully.
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
});
  
  
    // var followOnUser = request.object.get (userID);
  
    // var user = request.object.get("user");
   
    var query = new Parse.Query("garmentsAPI");
    // if (request.params.gender !== "both") {
    // query.equalTo ("gender", request.params.gender);
    // };
    // query.notEqualTo ("viewers", request.params.user);
   
       
    query.limit(9);
   
    var garments = new Array();
   
    query.find({
   
        success: function(objectsInQuery){
   
            response.success(objectsInQuery);
   
            },
        error:function() {
   
            response.error ("query failed");
        }
           
   
    });
   
     
});
  
Parse.Cloud.define("firstTimeQuery22", function(request, response)  {
  
var maxIndex = 150000;
  
var arrayOfRandomNumbers = new Array();
  
for (var k = 0; k < 35; k++) {
  
    var randomIndex =  Math.floor((Math.random()*maxIndex)+1);
  
    // var randomIndex =  15;
  
    arrayOfRandomNumbers.push(randomIndex);
  
}
  
  
var query = new Parse.Query("garmentsAPI");
  
    query.containedIn("index", arrayOfRandomNumbers);
    if (request.params.gender !== "both") {
    query.equalTo ("gender", request.params.gender);
    };
    query.notEqualTo ("viewers", request.params.user);
  
    query.find({
  
    success: function(objectsInQuery){
  
        if (objectsInQuery.length > 9) {
  
            var arrayOSelectedObjects = new Array();
  
            for (var j = 0; j < 9; j++) { 
              
                arrayOSelectedObjects.push(objectsInQuery[j]);
  
            }
  
            response.success(arrayOSelectedObjects);
  
        } else{
                // var existingCount = objectsInQuery.count;
                var missingIndex = 9 - objectsInQuery.length;
  
  
                // missingIndex = missingIndex - objectsInQuery.count; 
  
                var query = new Parse.Query("garmentsAPI");
                if (request.params.gender !== "both") {
                query.equalTo ("gender", request.params.gender);
                };
                query.notEqualTo ("viewers", request.params.user);
      
       
                query.limit(missingIndex);
                // query.limit = 9 - objectsInQuery.count;
   
   
                query.find({
  
               success: function(objectsInQuery2){
  
                if ((objectsInQuery.length + objectsInQuery2.length) === 9) {
  
  
                    for (var l = 0; l < missingIndex; l++) { 
  
                        objectsInQuery.push(objectsInQuery2[l]);
  
                    }
   
                    response.success(objectsInQuery);
  
  
                } else {
  
  
  
                    //who knows
  
                    var maxIndex2 = 150000;
  
                    var arrayOfRandomNumbers2 = new Array();
  
                    for (var m = 0; m < 9; m++) {
  
                    var randomIndex =  Math.floor((Math.random()*maxIndex)+1);
  
                    // var randomIndex =  15;
  
                    arrayOfRandomNumbers2.push(randomIndex);
  
                    }
  
                      
                    var query = new Parse.Query("garmentsAPI");
                    query.containedIn("index", arrayOfRandomNumbers2);
                    if (request.params.gender !== "both") {
                    query.equalTo ("gender", request.params.gender);
                    };
                    // query.notEqualTo ("viewers", request.params.user);
      
       
                    query.limit(9);
  
                    query.find ({
  
  
                        success: function (objectsInQuery3){
  
                            response.success (objectsInQuery3);
                        },
  
                        error:function() {
  
                            response.error("there was an error");
                        }
  
  
                    }); 
  
  
                };
  
  
   
                    },
                error:function() {
  
            response.error ("didn't work");
  
                }
  
            }
  
                );
  
  
  
        };
   
              
   
            },
        error:function() {
  
            response.error ("didn't work");
  
        }
  
        });
  
});
  
Parse.Cloud.define("firstTimeQuery", function(request, response)  {
  
var maxIndex = 91811;
var maxWomenIndex = 122309;
var maxMenIndex = 80811;
  
var arrayOfRandomNumbers = new Array();
  
var query = new Parse.Query("garmentsAPI");
  
    if (request.params.gender === "Female") {
  
        //arrayOfRandoms draws on womenIndex, gender set to female
  
        for (var k = 0; k < 35; k++) {
  
            var randomIndex =  Math.floor((Math.random()*maxWomenIndex)+1);
  
            arrayOfRandomNumbers.push(randomIndex);
  
                }
        query.containedIn("womenIndex", arrayOfRandomNumbers);
        query.notEqualTo ("viewers", request.params.user);
  
  
    }else if (request.params.gender === "Male") {
  
        for (var k = 0; k < 35; k++) {
  
            var randomIndex =  Math.floor((Math.random()*maxMenIndex)+1);
  
            arrayOfRandomNumbers.push(randomIndex);
  
                }
  
        query.containedIn("menIndex", arrayOfRandomNumbers);
        query.notEqualTo ("viewers", request.params.user);
  
        //arrayOfRandoms draws on menIndex, gender set to male
  
    }else{
  
        for (var k = 0; k < 35; k++) {
  
            var randomIndex =  Math.floor((Math.random()*maxIndex)+1);
  
            arrayOfRandomNumbers.push(randomIndex);
  
                }
  
        query.containedIn("index", arrayOfRandomNumbers);
        query.notEqualTo ("viewers", request.params.user);
  
    };
  
      
    if (request.params.gender !== "both") {
    query.equalTo ("gender", request.params.gender);
    };
      
  
    query.find({
  
    success: function(objectsInQuery){
  
        if (objectsInQuery.length > 9) {
  
            var arrayOSelectedObjects = new Array();
  
            for (var j = 0; j < 9; j++) { 
              
                arrayOSelectedObjects.push(objectsInQuery[j]);
  
            }
  
            response.success(arrayOSelectedObjects);
  
        } else{
                // var existingCount = objectsInQuery.count;
                var missingIndex = 9 - objectsInQuery.length;
  
  
                // missingIndex = missingIndex - objectsInQuery.count; 
  
                var query = new Parse.Query("garmentsAPI");
                if (request.params.gender !== "both") {
                query.equalTo ("gender", request.params.gender);
                };
                query.notEqualTo ("viewers", request.params.user);
      
       
                query.limit(missingIndex);
                // query.limit = 9 - objectsInQuery.count;
   
   
                query.find({
  
               success: function(objectsInQuery2){
  
                if ((objectsInQuery.length + objectsInQuery2.length) === 9) {
  
  
                    for (var l = 0; l < missingIndex; l++) { 
  
                        objectsInQuery.push(objectsInQuery2[l]);
  
                    }
   
                    response.success(objectsInQuery);
  
  
                } else {
  
  
  
                    //who knows
  
                    var maxIndex2 = 150000;
  
                    var arrayOfRandomNumbers2 = new Array();
  
                    for (var m = 0; m < 9; m++) {
  
                    var randomIndex =  Math.floor((Math.random()*maxIndex)+1);
  
                    // var randomIndex =  15;
  
                    arrayOfRandomNumbers2.push(randomIndex);
  
                    }
  
                      
                    var query = new Parse.Query("garmentsAPI");
                    query.containedIn("index", arrayOfRandomNumbers2);
                    if (request.params.gender !== "both") {
                    query.equalTo ("gender", request.params.gender);
                    };
                    // query.notEqualTo ("viewers", request.params.user);
      
       
                    query.limit(9);
  
                    query.find ({
  
  
                        success: function (objectsInQuery3){
  
                            response.success (objectsInQuery3);
                        },
  
                        error:function() {
  
                            response.error("there was an error");
                        }
  
  
                    }); 
  
  
                };
  
  
   
                    },
                error:function() {
  
            response.error ("didn't work");
  
                }
  
            }
  
                );
  
  
  
        };
   
              
   
            },
        error:function() {
  
            response.error ("didn't work");
  
        }
  
        });
  
});
  
  
Parse.Cloud.define("standardQuery22", function(request, response)  {
  
var maxIndex = 150000;
  
var arrayOfRandomNumbers = new Array();
  
for (var k = 0; k < 40; k++) {
  
    var randomIndex =  Math.floor((Math.random()*maxIndex)+1);
  
    // var randomIndex =  15;
  
    arrayOfRandomNumbers.push(randomIndex);
  
}
  
  
var query = new Parse.Query("garmentsAPI");
  
    query.containedIn("index", arrayOfRandomNumbers);
    if (request.params.gender !== "both") {
    query.equalTo ("gender", request.params.gender);
    };
    query.notEqualTo ("viewers", request.params.user);
  
    query.find({
  
    success: function(objectsInQuery){
  
        if (objectsInQuery.length > 15) {
  
            var arrayOSelectedObjects = new Array();
  
            for (var j = 0; j < 15; j++) { 
              
                arrayOSelectedObjects.push(objectsInQuery[j]);
  
            }
  
            response.success(arrayOSelectedObjects);
  
        } else{
                // var existingCount = objectsInQuery.count;
                var missingIndex = 15 - objectsInQuery.length;
  
  
                // missingIndex = missingIndex - objectsInQuery.count; 
  
                var query = new Parse.Query("garmentsAPI");
                if (request.params.gender !== "both") {
                query.equalTo ("gender", request.params.gender);
                };
                query.notEqualTo ("viewers", request.params.user);
      
       
                query.limit(missingIndex);
                // query.limit = 9 - objectsInQuery.count;
   
   
                query.find({
  
               success: function(objectsInQuery2){
  
                if ((objectsInQuery.length + objectsInQuery2.length) === 15) {
  
  
                    for (var l = 0; l < missingIndex; l++) { 
  
                        objectsInQuery.push(objectsInQuery2[l]);
  
                    }
   
                    response.success(objectsInQuery);
  
  
                } else {
  
  
  
                    //who knows
  
                      
                    var maxIndex2 = 150000;
  
                    var arrayOfRandomNumbers2 = new Array();
  
                    for (var m = 0; m < 15; m++) {
  
                    var randomIndex =  Math.floor((Math.random()*maxIndex)+1);
  
                    // var randomIndex =  15;
  
                    arrayOfRandomNumbers2.push(randomIndex);
  
                    }
  
                      
                    var query = new Parse.Query("garmentsAPI");
                    query.containedIn("index", arrayOfRandomNumbers2);
                    if (request.params.gender !== "both") {
                    query.equalTo ("gender", request.params.gender);
                    };
                    // query.notEqualTo ("viewers", request.params.user);
      
       
                    query.limit(15);
  
                    query.find ({
  
  
                        success: function (objectsInQuery3){
  
                            response.success (objectsInQuery3);
                        },
  
                        error:function() {
  
                            response.error("there was an error");
                        }
  
  
                    }); 
  
  
                };
  
  
   
                    },
                error:function() {
  
            response.error ("didn't work");
  
                }
  
            }
  
                );
  
  
  
        };
   
              
   
            },
        error:function() {
  
            response.error ("didn't work");
  
        }
  
        });
  
});
  
Parse.Cloud.define("standardQuery", function(request, response)  {
  
var maxIndex = 91811;
var maxWomenIndex = 122309;
var maxMenIndex = 80811;
  
var arrayOfRandomNumbers = new Array();
  
var query = new Parse.Query("garmentsAPI");
  
    if (request.params.gender === "Female") {
  
        //arrayOfRandoms draws on womenIndex, gender set to female
  
        for (var k = 0; k < 40; k++) {
  
            var randomIndex =  Math.floor((Math.random()*maxWomenIndex)+1);
  
            arrayOfRandomNumbers.push(randomIndex);
  
                }
        query.containedIn("womenIndex", arrayOfRandomNumbers);
        query.notEqualTo ("viewers", request.params.user);
  
  
    }else if (request.params.gender === "Male") {
  
        for (var k = 0; k < 35; k++) {
  
            var randomIndex =  Math.floor((Math.random()*maxMenIndex)+1);
  
            arrayOfRandomNumbers.push(randomIndex);
  
                }
  
        query.containedIn("menIndex", arrayOfRandomNumbers);
        query.notEqualTo ("viewers", request.params.user);
  
        //arrayOfRandoms draws on menIndex, gender set to male
  
    }else{
  
        for (var k = 0; k < 35; k++) {
  
            var randomIndex =  Math.floor((Math.random()*maxIndex)+1);
  
            arrayOfRandomNumbers.push(randomIndex);
  
                }
  
        query.containedIn("index", arrayOfRandomNumbers);
        query.notEqualTo ("viewers", request.params.user);
  
    };
  
      
    if (request.params.gender !== "both") {
    query.equalTo ("gender", request.params.gender);
    };
  
    query.find({
  
    success: function(objectsInQuery){
  
        if (objectsInQuery.length > 15) {
  
            var arrayOSelectedObjects = new Array();
  
            for (var j = 0; j < 15; j++) { 
              
                arrayOSelectedObjects.push(objectsInQuery[j]);
  
            }
  
            response.success(arrayOSelectedObjects);
  
        } else{
                // var existingCount = objectsInQuery.count;
                var missingIndex = 15 - objectsInQuery.length;
  
  
                // missingIndex = missingIndex - objectsInQuery.count; 
  
                var query = new Parse.Query("garmentsAPI");
                if (request.params.gender !== "both") {
                query.equalTo ("gender", request.params.gender);
                };
                query.notEqualTo ("viewers", request.params.user);
      
       
                query.limit(missingIndex);
                // query.limit = 9 - objectsInQuery.count;
   
   
                query.find({
  
               success: function(objectsInQuery2){
  
                if ((objectsInQuery.length + objectsInQuery2.length) === 15) {
  
  
                    for (var l = 0; l < missingIndex; l++) { 
  
                        objectsInQuery.push(objectsInQuery2[l]);
  
                    }
   
                    response.success(objectsInQuery);
  
  
                } else {
  
  
  
                    //who knows
  
                      
                    var maxIndex2 = 15000;
  
                    var arrayOfRandomNumbers2 = new Array();
  
                    for (var m = 0; m < 15; m++) {
  
                    var randomIndex =  Math.floor((Math.random()*maxIndex)+1);
  
                    // var randomIndex =  15;
  
                    arrayOfRandomNumbers2.push(randomIndex);
  
                    }
  
                      
                    var query = new Parse.Query("garmentsAPI");
                    query.containedIn("index", arrayOfRandomNumbers2);
                    if (request.params.gender !== "both") {
                    query.equalTo ("gender", request.params.gender);
                    };
                    // query.notEqualTo ("viewers", request.params.user);
      
       
                    query.limit(15);
  
                    query.find ({
  
  
                        success: function (objectsInQuery3){
  
                            response.success (objectsInQuery3);
                        },
  
                        error:function() {
  
                            response.error("there was an error");
                        }
  
  
                    }); 
  
  
                };
  
  
   
                    },
                error:function() {
  
            response.error ("didn't work");
  
                }
  
            }
  
                );
  
  
  
        };
   
              
   
            },
        error:function() {
  
            response.error ("didn't work");
  
        }
  
        });
  
});
  
Parse.Cloud.afterSave("_User", function(request) {
  
var Mandrill = require('mandrill');
Mandrill.initialize('12AkG8ijJNp74_RVhkrZEg');
  
  
if (!request.object.existed()) {
  
  
    // var email = request.object.get ("email");
    var email = "peterneill@hotmail.com";
    // var name = "string";
  
    var newFirstName;
  
    // (typeof myVar != 'undefined')
  
    while (request.object.get("first_name") === 'undefined'){
        newFirstName = request.object.get("first_name");
    }
  
    newFirstName = request.object.get("first_name");
  
    // for (var m = 0; m < 10000000; m++) {
    //     newFirstName = request.object.get("first_name");
    // }
    // var firstName = request.object.get("authData");
  
  
  
    // var user = request.object;
    // var authorityData = user.get("authData");
    // var facebookInfo = authorityData.facebook;
  
        if (email.length > 0) {
  
    Mandrill.sendEmail({
message: {
html: "<html><b>Welcome to Stashd</b><br><br>Hey " +newFirstName+",<br><br>It is lovely to e-meet you! My names Jessica and I'm the Co-Founder of Stashd.<br><br>I am touching base to welcome you to Stashd App, we look forward to filling your Stash (and hopefully wardrobe!) full of luxury items!<br><br>I\’m sure you have figured out the \"Stash\" and \"Trash\" process by now, although if you do have any queries, opinions or reviews in regards to Stashd we at Stashd are always welcoming of our users feedback.<br><br>Happy Stashing,<br>Jessica Wilson<br>Co-Founder, <a href='http://stashdapp.com'>Stashd</a><br><br><br><img style='width:25%;' src='http://stashdapp.com/stashdLogoLarge.png'></html> ",
// text: "Text goes here",
subject: "Welcome to Stashd!",
from_email: "jessica@stashdapp.com",
from_name: "Jessica, Co-Founder of Stashd",
to: [
{
email: email,
name: newFirstName
}
]
},
async: true
},{
success: function(httpResponse) {
console.log(httpResponse);
response.success("Email sent!");
},
error: function(httpResponse) {
console.error(httpResponse);
response.error("Uh oh, something went wrong");
}
});
  
}
  
    // if (email.length > 0) {
  
  
                // Mandrill.sendEmail({
                // message: {
                // html: "<p>Example HTML content</p>",
                // text: "Example text content".
                // subject: "Thank you for Joining Foogi :)",
                // from_email: "jessica@stashdapp.com",
                //     from_name: "Jessica, co-founder of Stashd",
                // to: [
                //     {
                // email: email,
                // name:  name
                // }
                // ]
                // },
                // async: true
                //     },{
                // success: function(httpResponse) {
                // console.log(httpResponse);
                // response.success("Email sent!");
                // },
                // error: function(httpResponse) {
                // console.error(httpResponse);
                // response.error("Uh oh, something went wrong");
                // }
                // });
                    // });
    // }
  
}
  
  
});
  
  
Parse.Cloud.define("sendMail", function(request, response) {
  
      
// var Mandrill = require('mandrill');
// Mandrill.initialize('12AkG8ijJNp74_RVhkrZEg');
  
/*
  
Mandrill.sendEmail({
message: {
text: request.params.text,
subject: request.params.subject,
from_email: request.params.fromEmail,
from_name: request.params.fromName,
to: [
{
email: request.params.toEmail,
name: request.params.toName
}
]
},
async: true
},{
success: function(httpResponse) {
console.log(httpResponse);
response.success("Email sent!");
},
error: function(httpResponse) {
console.error(httpResponse);
response.error("Uh oh, something went wrong");
}
});
  
*/
});