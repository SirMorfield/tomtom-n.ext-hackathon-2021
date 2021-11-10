
function drawLine(map, id, properties) {
	console.log('aaa', map)
	if (map.getLayer(id)) {
		map.removeLayer(id);
		map.removeSource(id);
	}

	map.addSource(id, {
		type: 'geojson',
		data: {
			type: 'Feature',
			properties: {
				color: properties.color
			},
			geometry: {
				type: 'LineString',
				coordinates: properties.route
			}
		}
	})

	let layerProperties = {
		id: id,
		type: 'line',
		source: id,
		paint: {
			'line-width': properties.width,
			'line-color': ['get', 'color']
		}
	}

	if (properties.style) {
		layerProperties.paint[properties.style.name] = properties.style.value;
	}

	map.addLayer(layerProperties);
}

export function showDeicedRoads(map) {
	const properties = {
		color: '#008D8D',
		width: 6,
		route: [[52, 4], [52, 3]],
		style: {
			name: 'line-opacity',
			value: 0.5
		}
	}
	drawLine(map, 'testLine', properties)
}
