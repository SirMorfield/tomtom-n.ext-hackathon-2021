import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import fetch from 'cross-fetch'
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	FormGroup,
	Label,
	Input,
	Navbar,
	NavbarBrand
} from "reactstrap";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
// import { showDeicedRoads } from "./showDeicedRoads"

const MAX_ZOOM = 17;

function App() {
	const mapElement = useRef();
	const [mapLongitude, setMapLongitude] = useState(4.891953);
	const [mapLatitude, setMapLatitude] = useState(52.377271);
	const [mapZoom, setMapZoom] = useState(13);
	let [map, setMap] = useState({});
	let currentCenter = [99, 999]

	const increaseZoom = () => {
		if (mapZoom < MAX_ZOOM) {
			setMapZoom(mapZoom + 1);
		}
	};

	const decreaseZoom = () => {
		if (mapZoom > 1) {
			setMapZoom(mapZoom - 1);
		}
	};

	const updateMap = () => {
		map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
		map.setZoom(mapZoom);
	};

	function dist2coordates(a: [number, number], b: [number, number]): number {
		// console	.log(a, b)
		return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2))
	}
	async function showDeicedroadsLoop() {
		await new Promise((resolve) => setTimeout(() => { resolve() }, 500)) // wait for map's styles to load
		while (1) {
			const newCenter = map.getCenter()
			if (dist2coordates([newCenter.lng, newCenter.lat], currentCenter) > 0.0007) {
				await showDeicedRoads(newCenter.lat, newCenter.lng)
				currentCenter = [newCenter.lng, newCenter.lat]
			}
			await new Promise((resolve) => setTimeout(() => { resolve() }, 10))
		}
	}

	useEffect(() => {
		map = tt.map({
			/*
			This key will API key only works on this Stackblitz. To use this code in your own project,
			sign up for an API key on the TomTom Developer Portal.
			*/
			key: "nG6oY1L34rbTfoLz0D205CrB42a3mf8m",
			container: mapElement.current,
			center: [mapLongitude, mapLatitude],
			zoom: mapZoom
		});
		// map.addLayer()

		map.addControl(new tt.FullscreenControl());
		map.addControl(new tt.NavigationControl());
		setMap(map);
		showDeicedroadsLoop()
		return () => { }
	}, []);

	function drawLine(id, properties) {
		if (map.getLayer(id)) {
			return // ignore addition if road is already added
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

	async function showDeicedRoads(lat: number, long: number) {
		try {
			// console.log(`//localhost:8081/coords/?lat=${lat}&long=${long}&range=0.5&max=100&type=Strooier`)
			const response = await fetch(`//localhost:8081/coords/?lat=${lat}&long=${long}&range=0.008&max=100000&type=Strooier`)
			let data = await response.text()
			data = JSON.parse(data)
			console.log(`Added ${data.length} streets`)
			for (const street of data) {
				const properties = {
					color: '#FF0810',
					width: 2.5,
					route: JSON.parse(street.points),
					// route: [[4.811208606546883, 52.35102184564605], [4.809627067026637, 52.35393016689613]],
					style: {
						name: 'line-opacity',
						value: 0.7
					}
				}
				drawLine(String(street.id), properties)
				// await new Promise((resolve) => setTimeout(() => { resolve() }, 1))

				//console.log('drawline', street.id, typeof street.points)
			}
		} catch (err) { console.error(err) }
	}



	return (
		<div className="App">
			<Navbar dark={true} style={{ backgroundColor: "#4287f5" }}>
				<NavbarBrand>TomTom Maps + React = 😃</NavbarBrand>
			</Navbar>
			<Container className="mapContainer">
				<Row>
					<Col xs="4">
						<h4>Map Controls</h4>
						<FormGroup>
							<Label for="longitude">Longitude</Label>
							<Input
								type="text"
								name="longitude"
								value={mapLongitude}
								onChange={(e) => setMapLongitude(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="latitude">Latitude</Label>
							<Input
								type="text"
								name="latitude"
								value={mapLatitude}
								onChange={(e) => setMapLatitude(e.target.value)}
							/>
						</FormGroup>
						<Col xs="12">
							<Row>Zoom</Row>
							<Row>
								<Button outline color="primary" onClick={decreaseZoom}>
									-
								</Button>
								<div className="mapZoomDisplay">{mapZoom}</div>
								<Button outline color="primary" onClick={increaseZoom}>
									+
								</Button>
							</Row>
						</Col>
						<Col xs="12">
							<Row className="updateButton">
								<Button color="primary" onClick={updateMap}>
									Update Map
								</Button>
							</Row>
						</Col>
					</Col>
					<Col xs="8">
						<div ref={mapElement} className="mapDiv" />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
