module.exports = link => {	
	let result = link.replace(/\s{2,}/g, '').match( /((http:|https:)?(\/\/)?(www.)?([a-z0-9-]+\.)?([a-z0-9-]+\/)?)?@?([a-zа-яё0-9._]+)/ );
    result = result[result.length - 1];
    return "@" + result;
};