const fs = require('fs');
const path = require('path');


let dir = process.argv[2];

const exp = "require\((.[a-zA-Z]*.)\)";
const regex = new RegExp(exp,'gmi');

let requires = [];

let files = fs.readdirSync(dir);
for ( let f of files ){
    let fileName = path.join(dir, f);
   
    let content = fs.readFileSync(fileName).toString();
   
    let matches = matchAll(content);
    for ( let m of matches ){
        requires.push(m);
    }
    
    //console.log(matches);
    
}

let responses = {};

for ( let m of requires){
    m = m.replaceAll("'",'');
    m = m.replaceAll('"','');
    responses[m] = m;
}

//console.log("MATCHES COUNT", requires.length);
//console.log(responses);
for ( let module of Object.keys(responses) ){
    console.log(module);
}



function matchAll(str, exp ){
    const regex = /require\((.[a-zA-Z]*.)\)/gmi;

    let responses = [];
    let m;

    while ((m = regex.exec(str)) !== null) {
        
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        responses.push(m[1]);
    }

    return responses;
}