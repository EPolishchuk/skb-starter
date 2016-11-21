module.exports = color => {
	console.log(color)	

	if (!color) {
		return "Invalid color";
	} 
	else if (color.indexOf('rgb') > -1) {
		color = (2 === color.split('#').length) ? '' : color.replace(/\s/g, '');
		color = color.match(/([R][G][B][A]?[(]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])(\s*,\s*((0\.[0-9]{1})|(1\.0)|(1)))?[)])/i);///^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		return color ? "#" +
		 ("0" + parseInt(color[2],10).toString(16)).slice(-2) +
		 ("0" + parseInt(color[3],10).toString(16)).slice(-2) +
		 ("0" + parseInt(color[4],10).toString(16)).slice(-2) : "Invalid color";
	}
	else if (color.indexOf('hsl') > -1) {
		color = color.replace(/(\s)|(%20)/g, '');
		color = color.match(/^hsl\(\s*(0|[1-9]\d?|[12]\d\d|3[0-5]\d)\s*,\s*((0|[1-9]\d?|100)%)\s*,\s*((0|[1-9]\d?|100)%)\s*\)$/);
		return color ? hslToRgb(color) : "Invalid color";
	}
	else {
		let isHex = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/gi;	
		color = (2 === color.split('#').length) ? color.replace(/(%23)|(#)/gi, '') : color.trim();
		if (!isHex.test(color)) {
			//console.log(color);	
			return "Invalid color";
		}
		else {	
			return (color.length > 3) ? ('#' + color.toLowerCase()) : ('#' + color[0] + color[0] + color[1] + color[1] + color[2] + color[2]);
		}
	}
}

let hslToRgb = arr => {
	let h = arr[1] / 360,
		s = arr[3] / 100,
		l = arr[5] / 100;
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        let hue2rgb = (p, q, t) => {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return rgbArrToHex([Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]);
};

let rgbArrToHex = arr => {
	return "#" +
		 ("0" + parseInt(arr[0],10).toString(16)).slice(-2) +
		 ("0" + parseInt(arr[1],10).toString(16)).slice(-2) +
		 ("0" + parseInt(arr[2],10).toString(16)).slice(-2);
};

/*hslToRgb = bits => {
	var rgba = {}, hsl = {
		h: bits[1] / 360,
		s: bits[2] / 100,
		l: bits[3] / 100,
		a: parseFloat(bits[ 4 ])
	};
	if (hsl.s === 0) {
		let v = 255 * hsl.l;
		rgba = {
			r: v,
			g: v,
			b: v,
			a: hsl.a
		};
	} else {
		let q = hsl.l < 0.5 ? hsl.l * ( 1 + hsl.s ) : ( hsl.l + hsl.s ) - ( hsl.l * hsl.s );
		let p = 2 * hsl.l - q;
		rgba.r = hueToRgb(p, q, hsl.h + ( 1 / 3 ) ) * 255;
		rgba.g = hueToRgb(p, q, hsl.h) * 255;
		rgba.b = hueToRgb(p, q, hsl.h - ( 1 / 3 ) ) * 255;
		rgba.a = hsl.a;
	}

	return rgba;
};

 hueToRgb = (p, q, t) => {
	if (t < 0) {
		t += 1;
	}
	if (t > 1) {
		t -= 1;
	}
	if (t < 1 / 6) {
		return p + ( q - p ) * 6 * t;
	}
	if (t < 1 / 2) {
		return q;
	}
	if (t < 2 / 3) {
		return p + ( q - p ) * ( ( 2 / 3 - t ) * 6 );
	}

	return parseInt(p, 16);
};*/