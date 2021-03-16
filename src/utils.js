const fs = require('fs');
const readline = require('readline');

// function to read file line by line and store it in an array
const parseFileToArray = (file) => {
    let array = [];
    const readInterface = readline.createInterface({
        input: fs.createReadStream(file),
        output: process.stdout,
        console: false
    });
    
    readInterface.on('line', (line) => {
        array.push(line);
    })
    return array;
}

// parse an array into an object 
const parseArrayToObject = (arr, myObj={}) => {
	let modify = [];
	for(let s of arr){
		if(s.includes(':')){
			// push the substring
			let split = s.split(':').map(item => item.trim().toLowerCase());
			modify.push(split);
		}
	}

	for(let ele of modify){
		const key = ele[0];
		const value = ele[1];
		if(key === 'receipt id'){ 
			myObj['receiptId'] = value; 
		}
		if(key === 'total'){ myObj[key] = value; }
		// more preprocess when getting data for date
		if(key === 'date'){ myObj[key] = value.split(' ')[0]; }
	}

	return myObj;
};

exports.parseFileToArray = parseFileToArray;
exports.parseArrayToObject = parseArrayToObject;

