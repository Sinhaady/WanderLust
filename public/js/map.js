const parsedCoordinates = JSON.parse(coordinates);

maptilersdk.config.apiKey = MapToken;

const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  center: parsedCoordinates,
  zoom: 10,
});

const marker = new maptilersdk.Marker({ color: "#7c3aed" })
  .setLngLat(parsedCoordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 })    // offset = distance from marker
      .setHTML(`
        <div style="padding: 0.5rem">
          <h4 style="margin:0 0 4px">${listingLocation}</h4>
          <p style="margin:0; color:gray">Further details will be available after booking process is done.</p>
        </div>
      `)
  )
  .addTo(map);

// Auto open popup on load
marker.getPopup().addTo(map);
