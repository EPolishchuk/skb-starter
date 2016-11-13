import express from 'express';
import cors from 'cors';
import changer from './fullToShort';
import username from './extractName';

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

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});