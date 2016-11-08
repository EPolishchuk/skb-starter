import express from 'express';
import cors from 'cors';
import changer from './fullToShort';

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
	//let query = req.query.fullname.replace(/\s+/g,' ').trim();
	let name = req.query.fullname ? req.query.fullname.replace(/\s+/g,' ').trim() : false;
	if (name)  {		
		name = name.split(' ');
	}
	console.log(req.query.fullname);
	if (!name) {
		res.send("Invalid fullname");
	}
	else if (name.length >3) {
		//console.log(name);
		res.send("Invalid fullname");
	}
	else {
		name.forEach( element => {
			if (/\d+/g.test(element)) {
				res.send("Invalid fullname");
			} else if (/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi.test(element)) {
				res.send("Invalid fullname");
			} 
		});
		res.send(changer.fullToShort(name));
	}
	//res.send(name);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
