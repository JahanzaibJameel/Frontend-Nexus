import { loadLibrary } from '../core/libraryLoader.js';

const TILES = {
  osm:   { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attr: '© <a href="https://openstreetmap.org">OpenStreetMap</a>' },
  topo:  { url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',   attr: '© OpenTopoMap contributors' },
  dark:  { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attr: '© CartoDB' },
  light: { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attr: '© CartoDB' },
};

export default class MapsPage {
  constructor() {
    this._map = null;
    this._markers = [];
    this._tileLayer = null;
    this._handlers = [];
  }

  async init() {
    await loadLibrary('leaflet');
    this._buildMap();
    this._bindControls();
  }

  _buildMap() {
    const el = document.getElementById('map-container');
    if (!el || !window.L) return;

    this._map = L.map(el, { zoomControl: true }).setView([20, 0], 2);
    const tile = TILES.osm;
    this._tileLayer = L.tileLayer(tile.url, { attribution: tile.attr, maxZoom: 18 }).addTo(this._map);

    this._map.on('click', e => this._addMarker(e.latlng));

    // Default points of interest
    [
      { lat: 51.505, lng: -0.09,  label: 'London, UK' },
      { lat: 40.7128, lng: -74.006, label: 'New York, USA' },
      { lat: 35.6762, lng: 139.6503, label: 'Tokyo, Japan' },
      { lat: -33.8688, lng: 151.2093, label: 'Sydney, Australia' },
    ].forEach(p => this._addMarker({ lat: p.lat, lng: p.lng }, p.label));
  }

  _addMarker(latlng, label = null) {
    if (!window.L) return;
    const marker = L.marker(latlng).addTo(this._map);
    const text = label || `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
    marker.bindPopup(text).openPopup();
    this._markers.push(marker);
    const out = document.getElementById('location-output');
    if (out) out.textContent = `Marker placed: ${text}`;
  }

  _bindControls() {
    const locateBtn = document.getElementById('map-locate');
    const clearBtn  = document.getElementById('map-clear');
    const tilesSel  = document.getElementById('map-tiles');

    this._on(locateBtn, 'click', () => {
      navigator.geolocation?.getCurrentPosition(
        p => {
          const ll = { lat: p.coords.latitude, lng: p.coords.longitude };
          this._map.setView(ll, 13);
          this._addMarker(ll, 'You are here 📍');
        },
        () => { const out = document.getElementById('location-output'); if (out) out.textContent = 'Location access denied.'; }
      );
    });

    this._on(clearBtn, 'click', () => {
      this._markers.forEach(m => m.remove());
      this._markers = [];
      const out = document.getElementById('location-output');
      if (out) out.textContent = 'All markers removed.';
    });

    this._on(tilesSel, 'change', e => {
      const t = TILES[e.target.value];
      if (t && this._tileLayer) {
        this._tileLayer.setUrl(t.url);
        this._tileLayer.options.attribution = t.attr;
      }
    });
  }

  _on(el, evt, fn) { if (!el) return; el.addEventListener(evt, fn); this._handlers.push({ el, evt, fn }); }

  destroy() {
    if (this._map) { this._map.remove(); this._map = null; }
    this._handlers.forEach(({ el, evt, fn }) => el?.removeEventListener(evt, fn));
    this._handlers = [];
    this._markers = [];
  }
}
