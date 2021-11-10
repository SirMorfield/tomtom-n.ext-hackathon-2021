const CODAM = { lng: 4.916270, lat: 52.371800 }

var API_KEY = 'API_KEY';


var map = tt.map({
	key: API_KEY,
	container: 'map-div',
	center: CODAM,
	basePath: 'sdk/',
	zoom: 12,
	theme: {
		style: 'buildings',
		layer: 'basic',
		source: 'vector'
	}
});
