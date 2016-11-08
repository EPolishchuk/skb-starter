exports.fullToShort = name => {
	if (name.length < 2) {
		return capitalize(name[name.length - 1]);	
	}
	else if (name.length < 3) {
		let lastName = name[name.length - 1];
		let firstName = name[name.length - 2];

		return capitalize(lastName) + " " + firstName.charAt(0).toUpperCase() + ".";
	}
	else {
		let lastName = name[name.length - 1];		
		let middleName = name[name.length - 2];
		let firstName = name[name.length - 3];

		return capitalize(lastName) + " " + firstName.charAt(0).toUpperCase() + ". " + middleName.charAt(0).toUpperCase() + ".";
	}
};

function capitalize(name) {
	name = name.toLowerCase();
	return name.charAt(0).toUpperCase() + name.slice(1);
}