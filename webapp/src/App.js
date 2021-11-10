import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
	const [map, setMap] = useState({});

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

	useEffect(() => {
		let map = tt.map({
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
		return () => map.remove();
	}, []);


	function drawLine(id, properties) {
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

	function showDeicedRoads() {
		const properties = {
			color: '#FFFFFF',
			width: 6,
			route: [[4.847626862237297, 52.38515011506334], [4.847678991868759, 52.384743334930192], [4.847190727736259, 52.384723178986697], [4.847212199615573, 52.384851243982169], [4.847260046839946, 52.385060570314479], [4.847378665239381, 52.385295169130089], [4.847345736368611, 52.385636318465636], [4.84724344099584, 52.385729414196824], [4.847004596910148, 52.385782790506148], [4.845505189317328, 52.385709549301069], [4.845299991572108, 52.385756020719533], [4.845153593424259, 52.38591778569716], [4.845142653689031, 52.386243099859527], [4.846909475479608, 52.386051313893326], [4.847330118596437, 52.386204800999209], [4.84769908486659, 52.386312726160988], [4.848297706377958, 52.386339269126417], [4.84954446185128, 52.386270535627915], [4.850813371662083, 52.3861538410573], [4.853413044462631, 52.385920114764701], [4.855936887264987, 52.385764283235709], [4.858935406083533, 52.385688790213727], [4.860919023082445, 52.385718536247538], [4.862272064262022, 52.385796892328329], [4.86396142297138, 52.386080865994238], [4.86590494790504, 52.386550110470772], [4.867284129500027, 52.386973840580069]],
			style: {
				name: 'line-opacity',
				value: 0.5
			}
		}
		drawLine('testLine', properties)
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
						<Col xs="12">
							<Row className="showDeicedRoads">
								<Button color="primary" onClick={() => showDeicedRoads(map)}>
									Show deiced roads
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
