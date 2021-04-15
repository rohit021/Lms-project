var RadixSource =require('../models/RadixSource.model')
var RelpSource=require('../models/RelpSource.model')
var AnardanaOutlets=require('../models/AnardanaOutlets.model')
var RadixPlatform =require('../models/RadixPlatform.model')
var AnardanaPlatform =require('../models/AnardanaPlatform.model')
var PropertyName =require('../models/PropertyName.model')
var RadixDepartment=require('../models/RadixDepartment.model')
var WoodappleCategory=require('../models/WoodappleCategory.model')
var RadixDoctor=require('../models/RadixDoctor.model')


    //Radix Source
exports.setRadixSource = function(req,res){
    var list =[
      "Friends",
      "Google",
      "Social",
      "Email",
      "Radix Practo",
      "Dental Practo",
    ];
    var count= 1;
    for(var i=0;i<list.length;i++){
        var radixsource = new RadixSource();
        radixsource.text = list[i];
        radixsource.value = list[i];
        radixsource.key = list[i].toLowerCase(); //to make it lower case
        radixsource.keyIndex = i + 1;
        radixSource.save(function(err){
            if(err) console.log("errr",err);
            count++;
            if(count==list.length){
                res.send("successfully set Radix Source");
            }
        });
    }
}

exports.getRadixSource = function(req,res){
    RadixSource.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
        var result = [];
        for(var i=0;i<texts.length;i++){
            result.push(texts[i].text);
        }
        res.status(200).send(result);
    }).catch(function(err){
        console.log("something went wrong====",err);
        return res.status(400).send({ error: 'something went wrong' })
    })
}
    // RELP SOURCE
    exports.setRelpSource = function(req,res){
        var list =[
         "Housing",
         "99 acres"
        ];
        var count= 1;
        for(var i=0;i<list.length;i++){
            var relpsource = new RelpSource();
            relpsource.text = list[i];
            relpsource.value = list[i];
            relpsource.key = list[i].toLowerCase(); //to make it lower case
            relpsource.keyIndex = i + 1;
            relpsource.save(function(err){
                if(err) console.log("errr",err);
                count++;
                if(count==list.length){
                    res.send("successfully set Relp Source");
                }
            });
        }
    }
    
    exports.getRelpSource = function(req,res){
        RelpSource.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
            var result = [];
            for(var i=0;i<texts.length;i++){
                result.push(texts[i].text);
            }
            res.status(200).send(result);
        }).catch(function(err){
            console.log("something went wrong====",err);
            return res.status(400).send({ error: 'something went wrong' })
        })
    }
    // Anardana Outlets
    exports.setAnardanaOutlets = function(req,res){
        var list =[
          "Vikas Marg",
          "Chandigarh"
        ];
        var count= 1;
        for(var i=0;i<list.length;i++){
            var anardanaoutlets = new AnardanaOutlets();
            anardanaoutlets.text = list[i];
            anardanaoutlets.value = list[i];
            anardanaoutlets.key = list[i].toLowerCase(); //to make it lower case
            anardanaoutlets.keyIndex = i + 1;
            anardanaoutlets.save(function(err){
                if(err) console.log("errr",err);
                count++;
                if(count==list.length){
                    res.send("successfully set Anardana Outlets");
                }
            });
        }
    }
    
    exports.getAnardanaOutlets = function(req,res){
        AnardanaOutlets.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
            var result = [];
            for(var i=0;i<texts.length;i++){
                result.push(texts[i].text);
            }
            res.status(200).send(result);
        }).catch(function(err){
            console.log("something went wrong====",err);
            return res.status(400).send({ error: 'something went wrong' })
        })
    }
    
// RadixPlatform
exports.setRadixPlatform = function(req,res){
    var list =[
      "Google",
      "Facebook",
      "Justdial",
      "MouthShut",
      "Practo",
      "Lybrate"

    ];
    var count= 1;
    for(var i=0;i<list.length;i++){
        var radixplatform = new RadixPlatform();
        radixplatform.text = list[i];
        radixplatform.value = list[i];
        radixplatform.key = list[i].toLowerCase(); //to make it lower case
        radixplatform.keyIndex = i + 1;
        radixplatform.save(function(err){
            if(err) console.log("errr",err);
            count++;
            if(count==list.length){
                res.send("successfully set Radix Platform");
            }
        });
    }
}

exports.getRadixPlatform = function(req,res){
    RadixPlatform.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
        var result = [];
        for(var i=0;i<texts.length;i++){
            result.push(texts[i].text);
        }
        res.status(200).send(result);
    }).catch(function(err){
        console.log("something went wrong====",err);
        return res.status(400).send({ error: 'something went wrong' })
    })
}

//Anardana Platform
exports.setAnardanaPlatform = function(req,res){
    var list =[
      "Google",
      "Facebook",
      "Justdial",
      "MouthShut",
      "Swiggy",
      "Zomato",
    ];
    var count= 1;
    for(var i=0;i<list.length;i++){
        var anardanaplatform = new AnardanaPlatform();
        anardanaplatform.text = list[i];
        anardanaplatform.value = list[i];
        anardanaplatform.key = list[i].toLowerCase(); //to make it lower case
        anardanaplatform.keyIndex = i + 1;
        anardanaplatform.save(function(err){
            if(err) console.log("errr",err);
            count++;
            if(count==list.length){
                res.send("successfully set Anardana Platform");
            }
        });
    }
}

exports.getAnardanaPlatform = function(req,res){
    AnardanaPlatform.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
        var result = [];
        for(var i=0;i<texts.length;i++){
            result.push(texts[i].text);
        }
        res.status(200).send(result);
    }).catch(function(err){
        console.log("something went wrong====",err);
        return res.status(400).send({ error: 'something went wrong' })
    })
}

//PropertyName
exports.setPropertyName = function(req,res){
    var list =[
      "Amrapali B-1704",
      "Amrapali G-1204",
      "Amrapali G-201",
      "Grand Omaxe",
      "Palla Plot",
      "Ramprastha Plot",
    ];
    var count= 1;
    for(var i=0;i<list.length;i++){
        var propertyname = new PropertyName();
        propertyname.text = list[i];
        propertyname.value = list[i];
        propertyname.key = list[i].toLowerCase(); //to make it lower case
        propertyname.keyIndex = i + 1;
        propertyname.save(function(err){
            if(err) console.log("errr",err);
            count++;
            if(count==list.length){
                res.send("successfully set Property Name");
            }
        });
    }
}

exports.getPropertyName = function(req,res){
    PropertyName.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
        var result = [];
        for(var i=0;i<texts.length;i++){
            result.push(texts[i].text);
        }
        res.status(200).send(result);
    }).catch(function(err){
        console.log("something went wrong====",err);
        return res.status(400).send({ error: 'something went wrong' })
    })
}

// WoodApple Category
exports.setWoodappleCategory = function(req,res){
    var list =[
      "Banquet",
      "Room"
    ];
    var count= 1;
    for(var i=0;i<list.length;i++){
        var woodapplecategory = new WoodappleCategory();
        woodapplecategory.text = list[i];
        woodapplecategory.value = list[i];
        woodapplecategory.key = list[i].toLowerCase(); //to make it lower case
        woodapplecategory.keyIndex = i + 1;
        woodapplecategory.save(function(err){
            if(err) console.log("errr",err);
            count++;
            if(count==list.length){
                res.send("successfully set Woodapple category");
            }
        });
    }
}

exports.getWoodappleCategory = function(req,res){
    WoodappleCategory.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
        var result = [];
        for(var i=0;i<texts.length;i++){
            result.push(texts[i].text);
        }
        res.status(200).send(result);
    }).catch(function(err){
        console.log("something went wrong====",err);
        return res.status(400).send({ error: 'something went wrong' })
    })
}

    //Radix Department
exports.setRadixDepartment = function(req,res){
    var list =[
      "Medicine",
      "Orthopaedics",
      "IVF",
      "Dermatology",
      "Diagnostics",
      "Physiotherapy",
      "Psychiatry",
      "Neurosciences",
      "Plastic Surgery",
      "Radiology",
      "Diabetes",
      "Gastroenterology",
      "Urology",
      "Opthalmology",
      "Cardiology",
      "Bariatric Surgery",
      "Dietician",
      "Gynaecology",
      "Cosmo Dental",
      "Dental",
      "Paediatric",
      "Others",
    ];
    var count= 1;
    for(var i=0;i<list.length;i++){
        var radixdepartment = new RadixDepartment();
        radixdepartment.text = list[i];
        radixdepartment.value = list[i];
        radixdepartment.key = list[i].toLowerCase(); //to make it lower case
        radixdepartment.keyIndex = i + 1;
        radixdepartment.save(function(err){
            if(err) console.log("errr",err);
            count++;
            if(count==list.length){
                res.send("successfully set Radix Department");
            }
        });
    }
}

exports.getRadixDepartment = function(req,res){
    RadixDepartment.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
        var result = [];
        for(var i=0;i<texts.length;i++){
            result.push(texts[i].text);
        }
        res.status(200).send(result);
    }).catch(function(err){
        console.log("something went wrong====",err);
        return res.status(400).send({ error: 'something went wrong' })
    })
}
// Radix Doctor

exports.setRadixDoctor = function(req,res){
    var list =[
  {name:"Dr.Ravi Malik", dept:"Paediatric"},
  {name:"Dr.Renu Malik", dept:"Gynaecology"},
  {name:"Dr.Shruti Malik", dept:"Dental"},
  {name:"Dr.Vaishali Saini", dept:"Gynaecology"},
  {name:"Dr.Meenu Aggarwal", dept:"Gynaecology"},
  {name:"Dr.Rajni", dept:"Gynaecology"},
  {name:"Dr.Rupam Arora", dept:"Gynaecology"},
  {name:"Dr.K.K Sinha", dept:"Radiology"},
  {name:"Dr.T.K Vohraa", dept:"Radiology"},
  {name:"Dr.Kirti Dwivedi", dept:"Physiotherapy"},
  {name:"Dr.Ravi Kumar", dept:"Physiotherapy"},
  {name:"Dr.Amit Batra", dept:"Neurosciences"},
  {name:"Dr.Rahul Gupta", dept:"Neurosciences"},
  {name:"Dr.Sandeep Govil", dept:"Psychiatry"},
  {name:"Dr.Mohit Sharma", dept:"Psychiatry"},
    ];
    var count= 1;
    for(var i=0;i<list.length;i++){
        var radixdoctor = new RadixDoctor();
        radixdoctor.text = list[i].name;
        radixdoctor.dept=list[i].dept;
        radixdoctor.value = list[i].name;
        radixdoctor.key = list[i].name.toLowerCase(); //to make it lower case
        radixdoctor.keyIndex = i + 1;
        radixdoctor.save(function(err){
            if(err) console.log("errr",err);
            count++;
            if(count==list.length){
                res.send("successfully set Radix Doctor");
            }
        });
    }
}

exports.getRadixDoctor = function(req,res){
    RadixDoctor.find({}).select('text -_id').sort({ keyIndex:1 }).exec().then(function(texts){
        var result = [];
        for(var i=0;i<texts.length;i++){
            result.push(texts[i].text);
        }
        res.status(200).send(result);
    }).catch(function(err){
        console.log("something went wrong====",err);
        return res.status(400).send({ error: 'something went wrong' })
    })
}
