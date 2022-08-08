mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'show-map', 
    style: 'mapbox://styles/mapbox/light-v10',
    center: campground.geometry.coordinates, 
    zoom: 9, 
    projection: 'globe' 
});


const marker1 = new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(popup)
.addTo(map);

map.addControl(new mapboxgl.NavigationControl());