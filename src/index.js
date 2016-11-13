import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import changer from './fullToShort';
import username from './extractName';

/*const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });*/

let pc = {"board":{"vendor":"IBM","model":"IBM-PC S-100","cpu":{"model":"80286","hz":12000},"image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg","video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"},"ram":{"vendor":"CTS","volume":1048576,"pins":30},"os":"MS-DOS 1.25","floppy":0,"hdd":[{"vendor":"Samsung","size":33554432,"volume":"C:"},{"vendor":"Maxtor","size":16777216,"volume":"D:"},{"vendor":"Maxtor","size":8388608,"volume":"C:"}],"monitor":null,"length":42,"height":21,"width":54};

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get ('/task2A', (req,res) => {
	const sum = (+req.query.a || 0) + (+req.query.b || 0);
	res.send(sum.toString());
});

app.get ('/task2B', (req,res) => {
	let name = req.query.fullname ? req.query.fullname.replace(/\s{2,}/g,' ').trim() : false;
	
	if (!name) {
		res.send("Invalid fullname");
		return;
	} 

	name = name.split(' ');

	if (name.length >3) {
		res.send("Invalid fullname");
		return;
	}
	else {
			let symbols = true;
			name.some( element => {
				if (/\d+/g.test(element)) {		
					symbols = false;
				} else if (/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi.test(element)) {		
					symbols = false;
				} 			
			});		
			if (!symbols) {
				res.send("Invalid fullname");
				return;
			}
			else {				
				res.send(changer.fullToShort(name));
				return;
			}
	}
	res.send("Error unknown. Query: " + req.query);
});

app.get ('/task2C', (req,res) => {
	const link = req.query.username || false;
	res.send(username(link));
});

app.get ('/task3A/volumes', (req,res) => {	
	let result = {};
	pc.hdd.forEach((element)=>{
		console.log(element);
		if (result[element.volume]) {
			result[element.volume] += element.size;
		} 
		else {			
			result[element.volume] = element.size;
		}
	});	

	for(var key in result) {
	   result[key] += 'B';
	}

	return res.send(JSON.stringify(result));
});

app.get (['/task3A', '/task3A/*?'], (req,res) => {
	let queryString = req.url.substring(8).split('/').join('+');
	let result = Object.byString(pc, queryString);	    
	if (typeof result === 'undefined') {
		return res.status(404).send('Not Found');
	}
	else {
		return res.send(JSON.stringify(result));
	}	

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

Object.byString = function(o, s) {
    s = s.replace(/\+$/, '');
    if (!s) {
    	return o;
    } 
    else {  	
    	var a = s.split('+');
    	for (var i = 0, n = a.length; i < n; ++i) {
    	    var k = a[i];
    	    if ((typeof o === "object") && 
    	    	(k in o) && 
    	    	(Object.keys(o).indexOf(k) != -1)) {
    	        	o = o[k];
    	    } else {
    	        return;
    	    }
    	}
    	return o;
    }
}