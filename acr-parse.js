const fs = require('fs');
const {parse} = require('csv-parse');
const {stringify} = require('csv-stringify');


const parser = parse({columns:true}, (err, records) => {
    const acrData = records.map(record => JSON.parse(record.metadata));
    
    stringify(acrData, 
        {header: true, quoted:true, quoted_empty:true},
        (err, output) => {
            fs.writeFileSync(__dirname+'/clean-acr-feb-apr.csv', output)
    })
});

fs.createReadStream(__dirname+'/acr_dump.csv').pipe(parser);