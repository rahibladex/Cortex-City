// app.js - CortexCity Mangaluru Predictive Traffic Digital Twin Simulator

// 1. DATASETS & CONFIGURATIONS
const MAP_CENTER = [12.9141, 74.8560]; // Centered near Kuntikan / Bejai area

// // Coordinates for Key Mangaluru Junctions (Nodes)
const nodes = {
  surathkal: { name: 'Surathkal Highway (NH 66)', coords: [13.0083, 74.7954] },
  kottara: { name: 'Kottara Chowki Junction', coords: [12.8996, 74.8322] },
  kuntikan: { name: 'Kuntikan Flyover Junction', coords: [12.8912, 74.8414] },
  bejai: { name: 'Bejai (KSRTC Terminal Area)', coords: [12.8856, 74.8447] },
  mg_road: { name: 'MG Road (Lalbagh Circle)', coords: [12.8800, 74.8409] },
  hampankatta: { name: 'Hampankatta (Town Hall Area)', coords: [12.8698, 74.8427] },
  lighthouse: { name: 'Light House Hill Road', coords: [12.8712, 74.8443] },
  pumpwell: { name: 'Pumpwell Flyover (NH 66)', coords: [12.8624, 74.8641] },
  kerala: { name: 'Kerala Border Highway (Talapady NH 66)', coords: [12.7533, 74.8878] },
  bangalore: { name: 'Bangalore Highway (Bantwal NH 75)', coords: [12.8670, 74.9350] },
  pavanje: { name: 'Pavanje (NH 66 North)', coords: [13.0805, 74.8016] },
  madhya: { name: 'Madhya (Mada)', coords: [13.0176, 74.8186] },
  kankanady: { name: 'Kankanady Junction', coords: [12.8503, 74.8582] },
  farangipete: { name: 'Farangipete (NH 75 East)', coords: [12.8738, 74.9567] },
  mulki: { name: 'Mulki Junction (NH 66)', coords: [13.0965, 74.7960] },
  padubidri: { name: 'Padubidri Junction (NH 66)', coords: [13.1430, 74.7850] },
  ullal: { name: 'Ullal Junction (NH 66)', coords: [12.8020, 74.8500] },
  kotekar: { name: 'Kotekar Junction', coords: [12.7840, 74.8600] },
  manjeshwar: { name: 'Manjeshwar Junction', coords: [12.7050, 74.8960] },
  uppala: { name: 'Uppala Junction (NH 66 South)', coords: [12.6800, 74.9020] },
  bc_road: { name: 'B.C. Road Junction (NH 75)', coords: [12.8700, 74.9850] },
  mani: { name: 'Mani Junction (NH 75)', coords: [12.8600, 75.1050] },
  moodushedde: { name: 'Moodushedde Junction', coords: [12.9230, 74.8720] },
  addur: { name: 'Addur Junction', coords: [12.9150, 74.9120] },
  moodbidri: { name: 'Moodbidri Highway', coords: [13.0700, 74.9980] },
  sanoor: { name: 'Sanoor Junction', coords: [13.1250, 75.0080] }
};

// Connecting Road Networks (Edges) with precise coordinates
const edges = [
  {
    id: 'surathkal_kottara',
    name: 'National Highway 66 (Surathkal Link)',
    from: 'surathkal',
    to: 'kottara',
    coords: [
      [13.0083, 74.7954],
      [12.9912, 74.7994],
      [12.9734, 74.8038],
      [12.9566, 74.8080],
      [12.9430, 74.8115],
      [12.9230, 74.8210],
      [12.8996, 74.8322]
    ],
    maxSpeed: 70, // Highway
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'kottara_kuntikan',
    name: 'NH 66 Bypass (Kottara to Kuntikan)',
    from: 'kottara',
    to: 'kuntikan',
    coords: [
      [12.8996, 74.8322],
      [12.8965, 74.8355],
      [12.8935, 74.8385],
      [12.8912, 74.8414]
    ],
    maxSpeed: 60,
    schoolZone: false,
    officeZone: true,
    highway: true
  },
  {
    id: 'kuntikan_bejai',
    name: 'Kuntikan Road (towards KSRTC Terminal)',
    from: 'kuntikan',
    to: 'bejai',
    coords: [
      [12.8912, 74.8414],
      [12.8885, 74.8432],
      [12.8856, 74.8447]
    ],
    maxSpeed: 40,
    schoolZone: true,
    officeZone: false,
    highway: false
  },
  {
    id: 'kuntikan_mg_road',
    name: 'Lalbagh Road (Kuntikan to Lalbagh)',
    from: 'kuntikan',
    to: 'mg_road',
    coords: [
      [12.8912, 74.8414],
      [12.8856, 74.8390],
      [12.8800, 74.8409]
    ],
    maxSpeed: 45,
    schoolZone: true,
    officeZone: true,
    highway: false
  },
  {
    id: 'bejai_mg_road',
    name: 'Bejai Lalbagh Road',
    from: 'bejai',
    to: 'mg_road',
    coords: [
      [12.8856, 74.8447],
      [12.8825, 74.8422],
      [12.8800, 74.8409]
    ],
    maxSpeed: 40,
    schoolZone: true,
    officeZone: false,
    highway: false
  },
  {
    id: 'mg_road_hampankatta',
    name: 'K.S. Rao Road (Hampankatta Main Link)',
    from: 'mg_road',
    to: 'hampankatta',
    coords: [
      [12.8800, 74.8409],
      [12.8755, 74.8412],
      [12.8720, 74.8418],
      [12.8698, 74.8427]
    ],
    maxSpeed: 40,
    schoolZone: false,
    officeZone: true,
    highway: false
  },
  {
    id: 'bejai_lighthouse',
    name: 'Bunts Hostel Road (Bejai to LHH)',
    from: 'bejai',
    to: 'lighthouse',
    coords: [
      [12.8856, 74.8447],
      [12.8810, 74.8465],
      [12.8770, 74.8480],
      [12.8735, 74.8485],
      [12.8715, 74.8465]
    ],
    maxSpeed: 45,
    schoolZone: true,
    officeZone: true,
    highway: false
  },
  {
    id: 'hampankatta_lighthouse',
    name: 'Light House Hill Road (Hampankatta Up-link)',
    from: 'hampankatta',
    to: 'lighthouse',
    coords: [
      [12.8698, 74.8427],
      [12.8705, 74.8450],
      [12.8715, 74.8465]
    ],
    maxSpeed: 35,
    schoolZone: true,
    officeZone: false,
    highway: false
  },
  {
    id: 'lighthouse_pumpwell',
    name: 'Balmatta / Kankanady Road (LHH to Pumpwell)',
    from: 'lighthouse',
    to: 'pumpwell',
    coords: [
      [12.8715, 74.8465],
      [12.8690, 74.8510],
      [12.8660, 74.8560],
      [12.8624, 74.8641]
    ],
    maxSpeed: 40,
    schoolZone: false,
    officeZone: true,
    highway: false
  },
  {
    id: 'hampankatta_pumpwell',
    name: 'Falnir Road (Hampankatta to Pumpwell)',
    from: 'hampankatta',
    to: 'pumpwell',
    coords: [
      [12.8698, 74.8427],
      [12.8670, 74.8460],
      [12.8645, 74.8510],
      [12.8630, 74.8580],
      [12.8624, 74.8641]
    ],
    maxSpeed: 40,
    schoolZone: false,
    officeZone: true,
    highway: false
  },
  {
    id: 'kuntikan_pumpwell',
    name: 'NH 66 bypass (Kuntikan to Pumpwell via Kadri)',
    from: 'kuntikan',
    to: 'pumpwell',
    coords: [
      [12.8912, 74.8414],
      [12.8831, 74.8502],
      [12.8790, 74.8540],
      [12.8705, 74.8596],
      [12.8624, 74.8641]
    ],
    maxSpeed: 65,
    schoolZone: false,
    officeZone: true,
    highway: true
  },
  {
    id: 'pumpwell_kerala',
    name: 'National Highway 66 (Kerala Bypass)',
    from: 'pumpwell',
    to: 'kerala',
    coords: [
      [12.8624, 74.8641],
      [12.8425, 74.8632],
      [12.8250, 74.8560],
      [12.7950, 74.8620],
      [12.7533, 74.8878]
    ],
    maxSpeed: 75,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'pumpwell_bangalore',
    name: 'National Highway 75 (Bangalore Corridor)',
    from: 'pumpwell',
    to: 'bangalore',
    coords: [
      [12.8624, 74.8641],
      [12.8630, 74.8850],
      [12.8655, 74.9120],
      [12.8670, 74.9350]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: true,
    highway: true
  },
  {
    id: 'pavanje_surathkal',
    from: 'pavanje',
    to: 'surathkal',
    name: 'Pavanje - Surathkal NH 66 Corridor',
    coords: [
      [13.0805, 74.8016],
      [13.0620, 74.7980],
      [13.0450, 74.7960],
      [13.0250, 74.7940],
      [13.0083, 74.7954]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'surathkal_madhya',
    from: 'surathkal',
    to: 'madhya',
    name: 'Surathkal - Madhya (Mada) Road',
    coords: [
      [13.0083, 74.7954],
      [13.0100, 74.8050],
      [13.0140, 74.8120],
      [13.0176, 74.8186]
    ],
    maxSpeed: 50,
    schoolZone: false,
    officeZone: false,
    highway: false
  },
  {
    id: 'farangipete_bangalore',
    from: 'farangipete',
    to: 'bangalore',
    name: 'Farangipete - Bangalore Corridor (NH 75)',
    coords: [
      [12.8738, 74.9567],
      [12.8700, 74.9450],
      [12.8670, 74.9350]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'pumpwell_kankanady',
    from: 'pumpwell',
    to: 'kankanady',
    name: 'Pumpwell - Kankanady Bypass Road',
    coords: [
      [12.8624, 74.8641],
      [12.8550, 74.8600],
      [12.8503, 74.8582]
    ],
    maxSpeed: 50,
    schoolZone: false,
    officeZone: true,
    highway: false
  },
  {
    id: 'pavanje_mulki',
    from: 'pavanje',
    to: 'mulki',
    name: 'NH 66 North (Pavanje to Mulki)',
    coords: [
      [13.0805, 74.8016],
      [13.0900, 74.7980],
      [13.0965, 74.7960]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'mulki_padubidri',
    from: 'mulki',
    to: 'padubidri',
    name: 'NH 66 North (Mulki to Padubidri)',
    coords: [
      [13.0965, 74.7960],
      [13.1100, 74.7920],
      [13.1200, 74.7860],
      [13.1350, 74.7850],
      [13.1430, 74.7850]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'pumpwell_ullal',
    from: 'pumpwell',
    to: 'ullal',
    name: 'NH 66 South (Pumpwell to Ullal)',
    coords: [
      [12.8624, 74.8641],
      [12.8450, 74.8610],
      [12.8250, 74.8550],
      [12.8020, 74.8500]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'ullal_kotekar',
    from: 'ullal',
    to: 'kotekar',
    name: 'NH 66 South (Ullal to Kotekar)',
    coords: [
      [12.8020, 74.8500],
      [12.7950, 74.8530],
      [12.7840, 74.8600]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'kotekar_talapady',
    from: 'kotekar',
    to: 'kerala',
    name: 'NH 66 South (Kotekar to Talapady)',
    coords: [
      [12.7840, 74.8600],
      [12.7680, 74.8750],
      [12.7533, 74.8878]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'talapady_manjeshwar',
    from: 'kerala',
    to: 'manjeshwar',
    name: 'NH 66 Kerala (Talapady to Manjeshwar)',
    coords: [
      [12.7533, 74.8878],
      [12.7300, 74.8920],
      [12.7050, 74.8960]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },

  {
    id: 'manjeshwar_uppala',
    from: 'manjeshwar',
    to: 'uppala',
    name: 'NH 66 Kerala (Manjeshwar to Uppala)',
    coords: [
      [12.7050, 74.8960],
      [12.6900, 74.9000],
      [12.6800, 74.9020]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'farangipete_bcroad',
    from: 'farangipete',
    to: 'bc_road',
    name: 'NH 75 East (Farangipete to B.C. Road)',
    coords: [
      [12.8738, 74.9567],
      [12.8700, 74.9700],
      [12.8700, 74.9850]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'bcroad_mani',
    from: 'bc_road',
    to: 'mani',
    name: 'NH 75 East (B.C. Road to Mani)',
    coords: [
      [12.8700, 74.9850],
      [12.8680, 75.0200],
      [12.8650, 75.0600],
      [12.8600, 75.1050]
    ],
    maxSpeed: 70,
    schoolZone: false,
    officeZone: false,
    highway: true
  },
  {
    id: 'kuntikan_moodushedde',
    from: 'kuntikan',
    to: 'moodushedde',
    name: 'Moodbidri Road (Kuntikan to Moodushedde)',
    coords: [
      [12.8912, 74.8414],
      [12.9050, 74.8550],
      [12.9230, 74.8720]
    ],
    maxSpeed: 50,
    schoolZone: false,
    officeZone: false,
    highway: false
  },
  {
    id: 'moodushedde_addur',
    from: 'moodushedde',
    to: 'addur',
    name: 'Moodbidri Road (Moodushedde to Addur)',
    coords: [
      [12.9230, 74.8720],
      [12.9200, 74.8950],
      [12.9150, 74.9120]
    ],
    maxSpeed: 50,
    schoolZone: false,
    officeZone: false,
    highway: false
  },
  {
    id: 'addur_moodbidri',
    from: 'addur',
    to: 'moodbidri',
    name: 'Moodbidri Road (Addur to Moodbidri)',
    coords: [
      [12.9150, 74.9120],
      [12.9300, 74.9400],
      [12.9700, 74.9600],
      [13.0100, 74.9750],
      [13.0700, 74.9980]
    ],
    maxSpeed: 60,
    schoolZone: false,
    officeZone: false,
    highway: false
  },
  {
    id: 'moodbidri_sanoor',
    from: 'moodbidri',
    to: 'sanoor',
    name: 'Moodbidri - Karkala Corridor (NH 169)',
    coords: [
      [13.0700, 74.9980],
      [13.1000, 75.0020],
      [13.1250, 75.0080]
    ],
    maxSpeed: 60,
    schoolZone: false,
    officeZone: false,
    highway: true
  }
];

// Hospitals dataset located on/near the routes
const hospitals = [
  {
    name: "Srinivas Medical Center",
    coords: [13.0215116, 74.7919430], // Exact GPS entrance
    desc: "Multi-specialty tertiary hub near Surathkal NH 66 corridor."
  },
  {
    name: "A.J. Hospital & Research Centre",
    coords: [12.8984, 74.8460], // Exact GPS entrance near NH 66
    desc: "Major trauma and cardiac care hub near Kuntikan Junction."
  },
  {
    name: "KMC Hospital Ambedkar Circle",
    coords: [12.8717224, 74.8484812], // Exact GPS entrance on Balmatta Road
    desc: "Central emergency hospital servicing Hampankatta & MG Road."
  },
  {
    name: "Father Muller Medical Hospital",
    coords: [12.8655, 74.8525], // Main arch gate on Father Muller Road
    desc: "Large clinical complex located near Kankanady."
  },
  {
    name: "Indiana Hospital & Heart Institute",
    coords: [12.86768, 74.86642], // Exact GPS entrance near Pumpwell
    desc: "Cardiac care facility located at the Pumpwell exit highway."
  }
];

// Color variables mapped to tailwind themes
const THEME_COLORS = {
  green: '#10b981',
  yellow: '#FFEA00', // Traffic Yellow
  orange: '#FFA500', // Construction Orange
  purple: '#a855f7', // Flooding Purple
  route_normal: '#f43f5e', // Neon Red/Pink for standard
  route_reroute: '#22d3ee', // Neon Cyan for AI reroute
};

// 2. STATE INITIALIZATION
let map;
let activeTheme = 'cyber'; // cyber (dark matter) or default-light
let currentDay = 'Monday';
let currentWeather = 'sunny';
let currentHour = 9;
let currentMinute = 0;
let simSpeedMultiplier = 1; // 0 = pause, 1 = 1x, 2 = 2x, 5 = 5x
let simTimer = null;
let lastTickTime = Date.now();
let isLiveSyncActive = false;
let activeScenarios = { flood: false, festival: false, construction: false };

// Storage for active path display on map
let activeRouteLayers = [];

// Storage for dynamic OSM all-roads dataset
let allRoads = [];
let allRoadLayers = [];

// Search state tracking variables
let currentSearchTarget = null;
let searchHighlightLayer = null;

// Transparent Google Traffic overlay layer
let googleTrafficOverlay = null;

// Storage for Leaflet elements
let roadLayers = {}; // edge.id -> { glow, solid }
let nodeMarkers = {}; // node.id -> marker

// Storage for live traffic calculations
let edgeTrafficStates = {}; // edge.id -> { congestion, speed, color }

// Particles pool for map animation overlay
let particles = [];
let canvasOverlay;
let canvasCtx;

// Chart.js instance
let forecastChartInstance = null;

// 3. MATHEMATICAL HELPERS (Haversine & Interpolation)
function haversine(c1, c2) {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(c2[0] - c1[0]);
  const dLng = toRad(c2[1] - c1[1]);
  const lat1 = toRad(c1[0]);
  const lat2 = toRad(c2[0]);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calculate the exact distance of an edge by summing segment parts
edges.forEach(edge => {
  let dist = 0;
  for (let i = 0; i < edge.coords.length - 1; i++) {
    dist += haversine(edge.coords[i], edge.coords[i + 1]);
  }
  edge.baseDistance = dist;
});

// Interpolate coordinates along polyline based on progress (0 to 1)
function interpolateCoords(coords, progress) {
  if (coords.length < 2) return coords[0];
  if (progress <= 0) return coords[0];
  if (progress >= 1) return coords[coords.length - 1];

  const totalSegments = coords.length - 1;
  const rawProgress = progress * totalSegments;
  const segmentIdx = Math.floor(rawProgress);
  const segmentProgress = rawProgress - segmentIdx;

  const p1 = coords[segmentIdx];
  const p2 = coords[segmentIdx + 1];

  const lat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
  const lng = p1[1] + (p2[1] - p1[1]) * segmentProgress;
  return [lat, lng];
}

// 4. MAP SETUP & THEMES
function initMap() {
  // Define strict bounding box for Mangaluru to prevent viewing other cities
  const bounds = L.latLngBounds([[12.62, 74.70], [13.20, 75.15]]);

  map = L.map('map', {
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,  // Stiff locking: bounces map back if user attempts to pan away
    minZoom: 11,              // Prevents zooming out to see neighboring cities
    maxZoom: 18,
    preferCanvas: true,       // Essential for high-performance rendering of thousands of OSM roads!
    zoomControl: false,
    attributionControl: false,
    zoomAnimation: true,
    zoomSnap: 0.25,           // Snap to 0.25 increments for smooth fractional zoom
    zoomDelta: 0.25,          // Zoom by 0.25 units per scroll tick / click
    wheelPxPerZoomLevel: 100  // Lower sensitivity for smoother scroll progression
  }).setView(MAP_CENTER, 11.5);

  // Position zoom controls on the top-right instead of top-left
  L.control.zoom({ position: 'topright' }).addTo(map);

  // Initialize Google Traffic transparent overlay (stripped of shop/business POIs and local streets, keeping only highways and place names)
  googleTrafficOverlay = L.tileLayer('https://{s}.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}&apistyle=s.t:2%7Cp.v:off,s.t:4%7Cp.v:off,s.t:3%7Cp.v:off', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps Traffic Overlay',
    opacity: 0.9
  });

  // Apply Cyber dark map theme as default
  setMapTheme('cyber');

  // Render nodes (glowing cyan circle markers)
  Object.keys(nodes).forEach(key => {
    const node = nodes[key];
    const marker = L.circleMarker(node.coords, {
      radius: 6,
      color: '#22d3ee',
      fillColor: '#0b0f19',
      fillOpacity: 1.0,
      weight: 2,
      className: 'pulse-indicator'
    }).addTo(map);

    marker.bindPopup(`
      <div class="font-cyber text-xs text-cyber-cyan font-bold">${node.name}</div>
      <div class="text-[10px] font-tech text-slate-300 mt-1">
        Lat: ${node.coords[0].toFixed(4)}, Lng: ${node.coords[1].toFixed(4)}
      </div>
    `);

    nodeMarkers[key] = marker;
  });

  // Setup the Leaflet Canvas overlay for particle routing
  setupCanvasOverlay();

  // Create road polylines (invisible initial style, colored dynamically in update)
  edges.forEach(edge => {
    // Glow outline polyline (thick background glow)
    const glow = L.polyline(edge.coords, {
      color: '#22c55e',
      weight: 12,
      opacity: 0.12,
      lineCap: 'round',
      lineJoin: 'round',
      className: 'traffic-road-glow'
    }).addTo(map);

    // Core road polyline (solid line)
    const solid = L.polyline(edge.coords, {
      color: '#22c55e',
      weight: 4,
      opacity: 0.85,
      lineCap: 'round',
      lineJoin: 'round',
      className: 'traffic-road-solid'
    }).addTo(map);

    // Bind info popup on mouseover/click
    const popupContent = `
      <div class="font-cyber text-xs font-bold text-slate-100">${edge.name}</div>
      <div class="text-[10px] text-slate-400 font-tech mt-1">
        Junctions: ${nodes[edge.from].name.split(' (')[0]} &harr; ${nodes[edge.to].name.split(' (')[0]}
      </div>
      <div id="popup-traffic-${edge.id}" class="text-[11px] font-tech font-bold mt-2">
        Calculating live status...
      </div>
    `;

    solid.bindPopup(popupContent);
    solid.on('popupopen', () => {
      updatePopupContent(edge.id);
    });

    roadLayers[edge.id] = { glow, solid };
  });

  // Render hospitals with red plus icons and permanent name tooltips
  hospitals.forEach(h => {
    const hospitalIcon = L.divIcon({
      html: `
        <div class="flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 border border-rose-500 shadow-lg shadow-rose-500/20 text-rose-500 font-extrabold text-[11px] animate-pulse">
          <i class="fa-solid fa-plus"></i>
        </div>
      `,
      className: 'custom-hospital-icon-container',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker(h.coords, { icon: hospitalIcon }).addTo(map);

    marker.bindPopup(`
      <div class="font-cyber text-xs text-rose-400 font-bold">${h.name}</div>
      <div class="text-[10px] font-tech text-slate-300 mt-1 leading-normal">${h.desc}</div>
      <div class="text-[9px] font-tech text-slate-500 mt-1">
        Coords: ${h.coords[0].toFixed(4)}, ${h.coords[1].toFixed(4)}
      </div>
    `);
  });
}

function setMapTheme(theme) {
  activeTheme = theme;
  // Remove existing base layers
  map.eachLayer(layer => {
    if (layer instanceof L.TileLayer && layer !== googleTrafficOverlay) {
      map.removeLayer(layer);
    }
  });

  let tileLayer;
  if (theme === 'cyber') {
    tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    });
    document.getElementById('view-theme-toggle').innerHTML = `<i class="fa-solid fa-map-location-dot"></i><span>CYBER 2D</span>`;
  } else {
    tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    });
    document.getElementById('view-theme-toggle').innerHTML = `<i class="fa-regular fa-map"></i><span>LIGHT 2D</span>`;
  }

  tileLayer.addTo(map);

  // Synchronize Google overlay and custom polyline visibilities
  updateMapLayerVisibility();
}

// Show Google Traffic Overlay on Live Mode, and our AI predictions on Custom Future Mode
function updateMapLayerVisibility() {
  const isLive = isLiveSyncActive;

  if (isLive) {
    // Add Google Traffic transparent overlay
    if (googleTrafficOverlay && !map.hasLayer(googleTrafficOverlay)) {
      googleTrafficOverlay.addTo(map);
    }

    // Hide our custom color vectors completely so they don't overlay Google's traffic lines
    // glow: 0.001 (invisible but clickable), solid: 0 (completely invisible)
    edges.forEach(edge => {
      const layer = roadLayers[edge.id];
      if (layer) {
        layer.glow.setStyle({ opacity: 0.001 });
        layer.solid.setStyle({ opacity: 0 });
      }
    });

    allRoadLayers.forEach(layer => {
      layer.glow.setStyle({ opacity: 0.001 });
      layer.solid.setStyle({ opacity: 0 });
    });
  } else {
    // Remove Google Traffic transparent overlay in Future/Time-travel mode
    if (googleTrafficOverlay && map.hasLayer(googleTrafficOverlay)) {
      map.removeLayer(googleTrafficOverlay);
    }

    // Show our custom AI predictive traffic colors
    edges.forEach(edge => {
      const layer = roadLayers[edge.id];
      if (layer) {
        layer.glow.setStyle({ opacity: 0.12 });
        layer.solid.setStyle({ opacity: 0.85 });
      }
    });

    allRoadLayers.forEach(layer => {
      layer.glow.setStyle({ opacity: 0.08 });
      layer.solid.setStyle({ opacity: 0.65 });
    });
  }
}

// 5. CANVAS PARTICLE SIMULATOR OVERLAY
function setupCanvasOverlay() {
  const container = map.getContainer();
  const canvas = document.createElement('canvas');
  canvas.id = 'traffic-particles-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '400';
  container.appendChild(canvas);

  canvasOverlay = canvas;
  canvasCtx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  resizeCanvas();
  map.on('move zoom viewreset resize', resizeCanvas);

  // Start drawing frame loop
  requestAnimationFrame(drawParticlesFrame);
}

function drawParticlesFrame(timestamp) {
  if (!canvasCtx || !canvasOverlay) {
    requestAnimationFrame(drawParticlesFrame);
    return;
  }

  const now = Date.now();
  const deltaTime = (now - lastTickTime) / 1000;
  lastTickTime = now;

  canvasCtx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);

  // Manage particles count for each edge
  edges.forEach(edge => {
    const state = edgeTrafficStates[edge.id];
    if (!state) return;

    let targetCount = 2; // Default smooth flow
    if (state.color === 'yellow') targetCount = 6;
    if (state.color === 'red') targetCount = 15;

    // Filter current active particles on this road segment
    const activeRoadParticles = particles.filter(p => p.edgeId === edge.id);

    // Populate particles if current count is less than target
    if (activeRoadParticles.length < targetCount && Math.random() < 0.15) {
      // Random direction: 1 = from -> to, -1 = to -> from
      const direction = Math.random() > 0.5 ? 1 : -1;
      particles.push({
        edgeId: edge.id,
        progress: Math.random(), // Spawns at a random position to distribute them instantly
        direction: direction,
        speed: 0.04 + Math.random() * 0.02
      });
    }
  });

  // Render & update active particles
  particles = particles.filter(p => {
    const edge = edges.find(e => e.id === p.edgeId);
    const state = edgeTrafficStates[p.edgeId];
    if (!edge || !state) return false;

    // Traffic congestion slows down the speed multiplier
    let speedMult = 1.3;
    if (state.color === 'yellow') speedMult = 0.5;
    if (state.color === 'red') speedMult = 0.12;

    // Scale animation speed by simulation speed
    const step = p.speed * speedMult * (simSpeedMultiplier === 0 ? 0 : simSpeedMultiplier) * deltaTime * 12;
    p.progress += step;

    // Remove if reached destination
    if (p.progress >= 1.0) {
      return false;
    }

    // Determine correct sequence of polyline coords depending on direction
    const routeCoords = p.direction === 1 ? edge.coords : [...edge.coords].reverse();
    const latlng = interpolateCoords(routeCoords, p.progress);

    // Convert geographic coordinates to canvas pixels
    const px = map.latLngToContainerPoint(L.latLng(latlng));

    // Choose glow colors matching speed classifications
    let color = THEME_COLORS.green;
    if (state.color === 'yellow') color = THEME_COLORS.yellow;
    if (state.color === 'orange') color = THEME_COLORS.orange;
    if (state.color === 'purple') color = THEME_COLORS.purple;

    canvasCtx.beginPath();
    canvasCtx.arc(px.x, px.y, 3, 0, 2 * Math.PI);
    canvasCtx.fillStyle = color;
    canvasCtx.shadowColor = color;
    canvasCtx.shadowBlur = 5;
    canvasCtx.fill();
    canvasCtx.shadowBlur = 0; // Reset for canvas performance

    return true;
  });

  requestAnimationFrame(drawParticlesFrame);
}

// 6. SPATIAL-TEMPORAL PREDICTIVE TRAFFIC ENGINE (AI RULES)
function getTrafficState(hour, minute, day, weather, edge) {
  const t = hour + minute / 60; // Decimal hours (e.g. 8.5)

  // 1. Establish baseline congestion by day category
  let baseline = 0.22;
  const isSunday = day === 'Sunday';
  const isSaturday = day === 'Saturday';

  if (isSunday) {
    baseline = 0.12; // Low baseline
  } else if (isSaturday) {
    baseline = 0.28; // Moderate baseline
  }

  // Drastically reduce baseline for minor/residential streets
  if (edge.isMinor) {
    baseline = 0.05;
  }

  let additive = 0;

  // 2. Weekday/Saturday Rush Hour Models
  if (!isSunday) {
    // A. Morning Peak Office & School Zones: 08:00 AM - 10:00 AM
    if (t >= 8.0 && t <= 10.5) {
      // Gaussian peak centered at 9:00 AM
      const peakFactor = Math.max(0, 1 - Math.abs(t - 9.0) / 1.2);
      if (edge.schoolZone && edge.officeZone) {
        additive += 0.65 * peakFactor;
      } else if (edge.schoolZone || edge.officeZone) {
        additive += 0.5 * peakFactor;
      } else {
        additive += 0.3 * peakFactor;
      }
    }
    // B. Afternoon School Dismissals: 01:30 PM - 03:30 PM
    else if (t >= 13.5 && t <= 15.5) {
      const peakFactor = Math.max(0, 1 - Math.abs(t - 14.5) / 1.0);
      if (edge.schoolZone) {
        additive += 0.45 * peakFactor;
      } else {
        additive += 0.15 * peakFactor;
      }
    }
    // C. Evening Peak Office Rush: 05:00 PM - 08:00 PM
    else if (t >= 17.0 && t <= 20.0) {
      const peakFactor = Math.max(0, 1 - Math.abs(t - 18.5) / 1.5);
      if (edge.highway || edge.officeZone) {
        additive += 0.68 * peakFactor;
      } else {
        additive += 0.35 * peakFactor;
      }
    }
    // D. Late Night Clearance: 10:00 PM - 05:00 AM
    else if (t >= 22.0 || t <= 5.0) {
      baseline = 0.05;
      additive = 0;
    }
  } else {
    // Sunday Evening Beach Traffic: 04:00 PM - 08:00 PM
    if (t >= 16.0 && t <= 20.0) {
      const peakFactor = Math.max(0, 1 - Math.abs(t - 18.0) / 2.0);
      if (edge.id === 'surathkal_kottara') {
        additive += 0.55 * peakFactor; // Heavy beachgoers traffic on Surathkal highway bypass
      } else {
        additive += 0.15 * peakFactor;
      }
    }
  }

  // Scale down rush-hour additive traffic impact on minor streets
  if (edge.isMinor) {
    additive = additive * 0.12;
  }

  // 3. Weather Multipliers
  let weatherMult = 1.0;
  if (weather === 'rainy') {
    weatherMult = edge.isMinor ? 1.05 : 1.35;
  } else if (weather === 'stormy') {
    weatherMult = edge.isMinor ? 1.12 : 1.7; // Lower visibility limit on side roads
  }

  // Calculate final congestion density bounded between 2% and 98%
  let congestion = Math.min(0.98, Math.max(0.02, (baseline + additive) * weatherMult));

  // Apply AI Sandbox Scenario modifiers
  let isClosedByFlood = false;
  if (activeScenarios.flood) {
    // Underpass & direct links to Pumpwell closed
    if (edge.id === 'lighthouse_pumpwell' || edge.id === 'hampankatta_pumpwell' || edge.id === 'kuntikan_pumpwell') {
      congestion = 1.0;
      isClosedByFlood = true;
    } else if (edge.id === 'mg_road_hampankatta' || edge.id === 'bejai_lighthouse' || edge.id === 'hampankatta_lighthouse') {
      // Detour routes get heavy spillover
      congestion = Math.min(0.98, congestion + 0.45);
    }
  }
  if (activeScenarios.festival) {
    if (edge.id === 'surathkal_kottara') {
      congestion = Math.min(0.98, congestion + 0.6);
    } else if (edge.id === 'kottara_kuntikan') {
      congestion = Math.min(0.98, congestion + 0.3);
    }
  }
  let isConstructionActive = false;
  if (activeScenarios.construction) {
    if (edge.id === 'mg_road_hampankatta' || edge.id === 'bejai_mg_road' || edge.id === 'kuntikan_mg_road') {
      congestion = Math.min(0.98, congestion + 0.5);
      isConstructionActive = true;
    }
  }

  // 4. Calculate Speed & Colors
  // Speed is inversely proportional to congestion
  let speed = edge.maxSpeed * (1 - congestion * 0.82);

  // Apply extra storm limits (rain drops visibility and increases braking distance)
  if (weather === 'rainy') {
    speed = Math.max(8, speed - 5);
  } else if (weather === 'stormy') {
    speed = Math.max(5, speed - 12);
  }

  // Force speed to a crawl if closed by flooding (which triggers infinite routing cost)
  if (isClosedByFlood) {
    speed = 0.1;
  }

  // Classify congestion color coding based on target speed ratios
  const ratio = speed / edge.maxSpeed;
  let color = 'green';

  if (isClosedByFlood) {
    color = 'purple';
  } else if (isConstructionActive) {
    color = 'orange';
  } else if (ratio < 0.72 || speed < 38) {
    // Keep background OSM streets green, only color the 13 main edges in yellow
    const isOsmBackgroundStreet = edge.id && edge.id.startsWith('osm_');
    color = isOsmBackgroundStreet ? 'green' : 'yellow';
  }

  return {
    congestion: congestion,
    speed: isClosedByFlood ? 0 : Math.round(speed),
    color: color
  };
}

// Auto-detect urban scenarios based on real-time feeds and simulated clock
function autoDetectScenarios() {
  // 1. Flood: closure is active if weather is stormy (heavy rainfall)
  const isStormy = (currentWeather === 'stormy');
  activeScenarios.flood = isStormy;

  // 2. Beach Festival: weekend evenings (Saturday/Sunday) between 4:00 PM and 8:30 PM
  const isWeekend = (currentDay === 'Saturday' || currentDay === 'Sunday');
  const isEvening = (currentHour >= 16 && (currentHour < 20 || (currentHour === 20 && currentMinute <= 30)));
  activeScenarios.festival = isWeekend && isEvening;

  // 3. Construction: active during working hours (09:00 AM to 05:00 PM) on weekdays (Mon-Fri)
  const isWeekday = (currentDay !== 'Saturday' && currentDay !== 'Sunday');
  const isWorkingHours = (currentHour >= 9 && currentHour < 17);
  activeScenarios.construction = isWeekday && isWorkingHours;

  // Sync badges and containers to reflect the auto-detected states
  updateScenarioUI('flood', activeScenarios.flood, 'border-rose-500/35 bg-rose-500/10 text-rose-400');
  updateScenarioUI('festival', activeScenarios.festival, 'border-amber-500/35 bg-amber-500/10 text-amber-400');
  updateScenarioUI('construction', activeScenarios.construction, 'border-purple-500/35 bg-purple-500/10 text-purple-400');
}

// Update helper for scenario badge styling
function updateScenarioUI(id, isActive, activeClasses) {
  const container = document.getElementById(`status-${id}-container`);
  const badge = document.getElementById(`status-${id}-badge`);

  if (container && badge) {
    if (isActive) {
      container.classList.remove('opacity-60');
      container.classList.add('opacity-100');
      badge.textContent = 'Active';
      badge.className = `text-[9px] font-cyber font-bold border px-2 py-0.5 rounded uppercase tracking-wider ${activeClasses}`;
    } else {
      container.classList.remove('opacity-100');
      container.classList.add('opacity-60');
      badge.textContent = 'Inactive';
      badge.className = 'text-[9px] font-cyber font-bold border border-slate-800 bg-slate-950 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider';
    }
  }
}

// 7. CORE SIMULATION REACTION
function updateSimulation() {
  // First, auto-run detector to adjust activeScenarios flag states
  autoDetectScenarios();

  // Update UI Clock Display
  let ampm = currentHour >= 12 ? 'PM' : 'AM';
  let displayHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
  let displayMinute = currentMinute < 10 ? '0' + currentMinute : currentMinute;
  document.getElementById('time-readout').textContent = `${displayHour}:${displayMinute} ${ampm}`;
  document.getElementById('day-readout').textContent = currentDay;

  // Calculate live traffic state for all roads
  let totalSpeedSum = 0;
  let activeBottlenecks = 0;

  edges.forEach(edge => {
    const state = getTrafficState(currentHour, currentMinute, currentDay, currentWeather, edge);
    edgeTrafficStates[edge.id] = state;

    // Only sum fallback edges if OSM roads are not loaded
    if (allRoads.length === 0) {
      totalSpeedSum += state.speed;
      if (state.color === 'yellow' || state.color === 'orange') {
        activeBottlenecks++;
      }
    }

    // Refresh road polylines styles
    const layer = roadLayers[edge.id];
    if (layer) {
      let hexColor = THEME_COLORS.green;
      if (state.color === 'yellow') hexColor = THEME_COLORS.yellow;
      if (state.color === 'orange') hexColor = THEME_COLORS.orange;
      if (state.color === 'purple') hexColor = THEME_COLORS.purple;

      layer.glow.setStyle({ color: hexColor });
      layer.solid.setStyle({ color: hexColor });
    }
  });

  // Calculate live traffic state for all OSM roads citywide
  allRoadLayers.forEach(layer => {
    const road = layer.data;
    const state = getTrafficState(currentHour, currentMinute, currentDay, currentWeather, road);

    // Sum city-wide OSM metrics (bottlenecks counted by speed ratios)
    totalSpeedSum += state.speed;
    if (state.speed < road.maxSpeed * 0.72 || state.color === 'orange' || state.color === 'purple') {
      activeBottlenecks++;
    }

    let hexColor = THEME_COLORS.green;
    if (state.color === 'yellow') hexColor = THEME_COLORS.yellow;
    if (state.color === 'orange') hexColor = THEME_COLORS.orange;
    if (state.color === 'purple') hexColor = THEME_COLORS.purple;

    layer.glow.setStyle({ color: hexColor });
    layer.solid.setStyle({ color: hexColor });
  });

  // Calculate live city metrics
  const totalCount = allRoads.length > 0 ? allRoads.length : edges.length;
  const avgSpeed = Math.round(totalSpeedSum / totalCount);
  document.getElementById('avg-speed-val').textContent = avgSpeed;
  document.getElementById('avg-speed-bar').style.width = `${Math.min(100, (avgSpeed / 60) * 100)}%`;

  // Apply colors dynamically to speed indicators
  const speedElement = document.getElementById('avg-speed-val');
  speedElement.className = 'font-cyber text-2xl font-black transition duration-300 ';
  if (avgSpeed >= 38) {
    speedElement.classList.add('text-cyber-green', 'glow-text-green');
  } else if (avgSpeed >= 22) {
    speedElement.classList.add('text-cyber-yellow', 'glow-text-yellow');
  } else {
    speedElement.classList.add('text-cyber-red', 'glow-text-red');
  }

  // Update active bottleneck counter
  const bottleneckElement = document.getElementById('bottlenecks-count');
  const dotElement = document.getElementById('bottleneck-status-dot');
  const labelElement = document.getElementById('bottleneck-status-lbl');
  bottleneckElement.textContent = activeBottlenecks;

  bottleneckElement.className = 'font-cyber text-2xl font-black ';
  dotElement.className = 'w-2.5 h-2.5 rounded-full ';

  if (activeBottlenecks === 0) {
    bottleneckElement.classList.add('text-cyber-green', 'glow-text-green');
    dotElement.classList.add('bg-cyber-green');
    labelElement.textContent = 'Smooth Flow';
    labelElement.className = 'text-[10px] font-tech text-cyber-green font-bold uppercase tracking-wider';
  } else if (activeBottlenecks < 3) {
    bottleneckElement.classList.add('text-cyber-yellow', 'glow-text-yellow');
    dotElement.classList.add('bg-cyber-yellow');
    labelElement.textContent = 'Minor Delays';
    labelElement.className = 'text-[10px] font-tech text-cyber-yellow font-bold uppercase tracking-wider';
  } else {
    bottleneckElement.classList.add('text-cyber-red', 'glow-text-red');
    dotElement.classList.add('bg-cyber-red');
    labelElement.textContent = 'Gridlock Alert';
    labelElement.className = 'text-[10px] font-tech text-cyber-red font-bold uppercase tracking-wider animate-pulse';
  }

  // Update AI insights panel dynamically
  updateAIInsights(avgSpeed, activeBottlenecks);

  // Synchronize dynamic tile overlays and polyline opacities
  updateMapLayerVisibility();

  // Update search details sidebar panel live
  updateSearchDetailsCardLive();

  // Highlight Chart.js current time indicator
  if (forecastChartInstance) {
    forecastChartInstance.update('none'); // silent update without animation jump
  }
}

function updatePopupContent(edgeId) {
  const el = document.getElementById(`popup-traffic-${edgeId}`);
  if (!el) return;

  const state = edgeTrafficStates[edgeId];
  if (!state) return;

  const edge = edges.find(e => e.id === edgeId);
  const colorMap = { green: 'text-cyber-green', yellow: 'text-cyber-yellow', red: 'text-cyber-red animate-pulse' };
  const labelMap = { green: 'Smooth Flow', yellow: 'Moderate Congestion', red: 'Gridlock / Bottleneck' };

  el.innerHTML = `
    <div class="flex justify-between border-t border-white/10 pt-1.5 mt-1.5">
      <span class="text-slate-400">Current Speed:</span>
      <span class="text-slate-100">${state.speed} km / h</span>
    </div>
    <div class="flex justify-between mt-1">
      <span class="text-slate-400">Status:</span>
      <span class="${colorMap[state.color]} uppercase tracking-wider">${labelMap[state.color]}</span>
    </div>
    <div class="flex justify-between mt-1">
      <span class="text-slate-400">Traffic Density:</span>
      <span class="text-slate-100">${Math.round(state.congestion * 100)}%</span>
    </div>
    <div class="text-[9px] text-slate-500 font-tech mt-2 leading-tight">
      Route Weight: ${edge.schoolZone ? '🏫 School Hub' : ''} ${edge.officeZone ? '🏢 Office Corridor' : ''} ${edge.highway ? '🛣️ Highway Bypass' : ''}
    </div>
  `;
}

// AI insights rule generators
function updateAIInsights(avgSpeed, activeBottlenecks) {
  const panel = document.getElementById('ai-insight-panel');
  const textEl = document.getElementById('ai-insight-text');

  let alertLevel = 'green';
  let insightText = '';

  const t = currentHour + currentMinute / 60;

  if (activeScenarios.flood) {
    alertLevel = 'red';
    insightText = "ALERT: Pumpwell Underpass is completely flooded and closed! Dijkstra routing engine detouring traffic through Kuntikan bypass and Hampankatta.";
  } else if (activeScenarios.festival) {
    alertLevel = 'red';
    insightText = "ALERT: Surathkal Beach Festival active. Critical gridlocks on NH 66. Mass congestion detours near Kottara Chowki bypass.";
  } else if (activeScenarios.construction) {
    alertLevel = 'yellow';
    insightText = "SCENARIO: Metro single lane construction on MG Road active. Avoid Lalbagh and Bejai corridors; expect delays.";
  } else if (currentWeather === 'stormy') {
    alertLevel = 'red';
    insightText = `Storm alerts in Mangaluru city. Torrential rainfall at ${currentDay} ${document.getElementById('time-readout').textContent}. Braking weights increased, speed caps applied. Avoid low-lying underpasses.`;
  } else if (currentWeather === 'rainy') {
    alertLevel = 'yellow';
    insightText = `Wet surface conditions slowing down traffic density. Congestion coefficients scaled. Average speed decreased to ${avgSpeed} km/h.`;
  } else if (activeBottlenecks > 3) {
    alertLevel = 'red';
    insightText = `Critical congestion clusters detected! Severe bottlenecks located around key flyovers. AI engine recommends alternate route scheduling.`;
  } else if (currentHour >= 8 && currentHour <= 9.5 && currentDay !== 'Sunday') {
    alertLevel = 'yellow';
    insightText = `Peak Morning Rush hour active. Higher traffic weights registered near educational institutes (Bejai, Light House Hill) and corporate hubs.`;
  } else if (currentHour >= 17 && currentHour <= 19.5 && currentDay !== 'Sunday') {
    alertLevel = 'yellow';
    insightText = `Peak Evening Office Rush active. Heavy outward flows towards Surathkal Highway and Pumpwell Flyovers. Expect delays.`;
  } else if (currentDay === 'Sunday' && currentHour >= 16 && currentHour <= 20) {
    alertLevel = 'yellow';
    insightText = `Sunday Beach-Goers rush detected. High density spikes calculated on Surathkal Highway link route. Secondary city grid channels remain clear.`;
  } else {
    alertLevel = 'green';
    insightText = `Spatial-Temporal grids operating smoothly. Average speed is a healthy ${avgSpeed} km/h. No major anomalies registered.`;
  }

  textEl.textContent = insightText;

  // Reactively style the insight border glow to matching state colors
  panel.className = 'border rounded-xl p-4 flex gap-3 items-start transition-all duration-300 bg-slate-950/80 ';
  if (alertLevel === 'green') {
    panel.classList.add('border-cyber-green/20', 'border-glow-green');
  } else if (alertLevel === 'yellow') {
    panel.classList.add('border-cyber-yellow/20', 'box-shadow', 'shadow-amber-500/10');
  } else {
    panel.classList.add('border-cyber-red/20', 'border-glow-red');
  }
}

// 8. DIJKSTRA PATHFINDING WITH LIVE TRAFFIC WEIGHTING
function findShortestPath(startNodeId, endNodeId, useTrafficWeights = true) {
  const distances = {};
  const prev = {};
  const queue = new Set();

  Object.keys(nodes).forEach(nodeId => {
    distances[nodeId] = Infinity;
    prev[nodeId] = null;
    queue.add(nodeId);
  });
  distances[startNodeId] = 0;

  while (queue.size > 0) {
    // Find node with minimum distance in priority queue
    let u = null;
    queue.forEach(nodeId => {
      if (u === null || distances[nodeId] < distances[u]) {
        u = nodeId;
      }
    });

    if (u === endNodeId || distances[u] === Infinity) {
      break;
    }

    queue.delete(u);

    // Get adjacent edges
    const neighbors = [];
    edges.forEach(edge => {
      if (edge.from === u) {
        neighbors.push({ node: edge.to, edge: edge });
      } else if (edge.to === u) {
        neighbors.push({ node: edge.from, edge: edge });
      }
    });

    neighbors.forEach(({ node, edge }) => {
      if (!queue.has(node)) return;

      // Calculate path cost with dynamic traffic weighting
      const distance = edge.baseDistance;
      const state = edgeTrafficStates[edge.id];

      let weight = 1.0;
      if (useTrafficWeights && state) {
        if (state.color === 'yellow') weight = 2.2;
        if (state.color === 'red') weight = 6.0; // High penalty to re-route around gridlocks
      }

      const alt = distances[u] + (distance * weight);
      if (alt < distances[node]) {
        distances[node] = alt;
        prev[node] = { parent: u, edge: edge };
      }
    });
  }

  // Trace back the shortest path
  const pathEdges = [];
  const pathNodes = [];
  let curr = endNodeId;

  while (prev[curr] !== null) {
    pathEdges.unshift(prev[curr].edge);
    pathNodes.unshift(curr);
    curr = prev[curr].parent;
  }

  if (pathNodes.length > 0) {
    pathNodes.unshift(startNodeId);
  }

  return {
    nodes: pathNodes,
    edges: pathEdges,
    cost: distances[endNodeId]
  };
}

// 9. ROUTE FINDER CONTROLLERS
function runRouteFinder() {
  const startVal = document.getElementById('route-start').value;
  const endVal = document.getElementById('route-end').value;

  if (startVal === endVal) {
    alert('Please select two distinct locations for routing.');
    return;
  }

  // Clear existing active polylines from the map
  clearActiveRouteLayers();

  // A. Calculate standard path (strictly geographical shortest route)
  const standardPath = findShortestPath(startVal, endVal, false);

  // B. Calculate AI path (congestion-aware routing)
  const aiPath = findShortestPath(startVal, endVal, true);

  if (standardPath.edges.length === 0 || aiPath.edges.length === 0) {
    alert('Unable to calculate connection routes between select points.');
    return;
  }

  // Check if standard path and AI path differ
  const pathsDiffer = JSON.stringify(standardPath.nodes) !== JSON.stringify(aiPath.nodes);

  // Compute travel summaries
  const standardMetrics = getPathMetrics(standardPath.edges);
  const aiMetrics = getPathMetrics(aiPath.edges);

  // Show Reroute UI Panel
  const detailsPanel = document.getElementById('route-details-panel');
  detailsPanel.classList.remove('hidden');
  document.getElementById('btn-clear-route').classList.remove('hidden');

  const timeEl = document.getElementById('route-time');
  const distanceEl = document.getElementById('route-distance');
  const badgeEl = document.getElementById('route-status-badge');
  const savingsBanner = document.getElementById('reroute-savings-banner');

  if (pathsDiffer && aiMetrics.time < standardMetrics.time) {
    // Reroute active
    timeEl.textContent = `${Math.round(aiMetrics.time)} mins`;
    distanceEl.textContent = `${aiMetrics.distance.toFixed(1)} km`;
    badgeEl.textContent = 'AI Rerouted';
    badgeEl.className = 'text-[9px] font-cyber font-extrabold bg-cyber-cyan/15 border border-cyber-cyan/35 text-cyber-cyan px-2 py-0.5 rounded-full uppercase tracking-wider';

    const saved = Math.round(standardMetrics.time - aiMetrics.time);
    document.getElementById('route-time-saved').textContent = `${saved} mins`;
    savingsBanner.classList.remove('hidden');

    // Draw BOTH routes on the map:
    // 1. Draw Direct (Congested) Path as dashed red outline
    standardPath.edges.forEach(edge => {
      const line = L.polyline(edge.coords, {
        color: THEME_COLORS.route_normal,
        weight: 5,
        opacity: 0.7,
        dashArray: '5, 10',
        lineCap: 'round'
      }).addTo(map);
      activeRouteLayers.push(line);
    });

    // 2. Draw AI Reroute as glowing, animated Cyan polyline
    aiPath.edges.forEach(edge => {
      // Glow background
      const glow = L.polyline(edge.coords, {
        color: THEME_COLORS.route_reroute,
        weight: 12,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      // Dash animations
      const solid = L.polyline(edge.coords, {
        color: THEME_COLORS.route_reroute,
        weight: 5,
        opacity: 1.0,
        dashArray: '10, 10', // Animated via CSS in style.css
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      activeRouteLayers.push(glow, solid);
    });

  } else {
    // Standard path is already fastest
    timeEl.textContent = `${Math.round(standardMetrics.time)} mins`;
    distanceEl.textContent = `${standardMetrics.distance.toFixed(1)} km`;
    badgeEl.textContent = 'Optimal Route';
    badgeEl.className = 'text-[9px] font-cyber font-extrabold bg-cyber-green/15 border border-cyber-green/35 text-cyber-green px-2 py-0.5 rounded-full uppercase tracking-wider';

    savingsBanner.classList.add('hidden');

    // Highlight the path in Cyan
    standardPath.edges.forEach(edge => {
      const glow = L.polyline(edge.coords, {
        color: THEME_COLORS.route_reroute,
        weight: 12,
        opacity: 0.3,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      const solid = L.polyline(edge.coords, {
        color: THEME_COLORS.route_reroute,
        weight: 5,
        opacity: 1.0,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      activeRouteLayers.push(glow, solid);
    });
  }

  // Populate route itinerary text listing junctions
  const summaryEl = document.getElementById('route-summary-details');
  summaryEl.innerHTML = '';

  const selectedPathNodes = pathsDiffer ? aiPath.nodes : standardPath.nodes;
  selectedPathNodes.forEach((nodeId, idx) => {
    const nodeName = nodes[nodeId].name.split(' (')[0];
    const isLast = idx === selectedPathNodes.length - 1;

    summaryEl.innerHTML += `
      <div class="flex items-center gap-1.5 py-0.5">
        <span class="w-3.5 h-3.5 rounded-full border border-cyber-cyan bg-slate-950 flex items-center justify-center text-[9px] font-cyber text-cyber-cyan">${idx + 1}</span>
        <span>${nodeName}</span>
        ${!isLast ? '<i class="fa-solid fa-arrow-right text-slate-500 text-[9px] mx-0.5"></i>' : ''}
      </div>
    `;
  });
}

// Compute total geographical distance and predicted travel duration along select edges
function getPathMetrics(pathEdges) {
  let dist = 0;
  let time = 0;

  pathEdges.forEach(edge => {
    dist += edge.baseDistance;
    const state = edgeTrafficStates[edge.id] || { speed: edge.maxSpeed };

    // travel time = distance (km) / speed (km/h) * 60 (mins)
    time += (edge.baseDistance / state.speed) * 60;
  });

  return {
    distance: dist,
    time: time
  };
}

function clearActiveRouteLayers() {
  activeRouteLayers.forEach(layer => map.removeLayer(layer));
  activeRouteLayers = [];
  document.getElementById('route-details-panel').classList.add('hidden');
  document.getElementById('btn-clear-route').classList.add('hidden');
}

function recalculateActiveRouteFinder() {
  const detailsPanel = document.getElementById('route-details-panel');
  // If the routing panel is visible, recalculate A* live to capture changes
  if (!detailsPanel.classList.contains('hidden')) {
    runRouteFinder();
  }
}

// 10. CHART.JS 24-HOUR TRAFFIC MODEL GRAPH
function initChart() {
  const ctx = document.getElementById('forecastChart').getContext('2d');

  // Create gradient overlays
  const gradient = ctx.createLinearGradient(0, 0, 0, 100);
  gradient.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
  gradient.addColorStop(1, 'rgba(34, 211, 238, 0.02)');

  forecastChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 24 }, (_, i) => {
        let h = i % 12 === 0 ? 12 : i % 12;
        let suffix = i >= 12 ? ' PM' : ' AM';
        return h + suffix;
      }),
      datasets: [{
        label: 'Avg Traffic Congestion',
        data: getDayForecastData(currentDay),
        borderColor: '#22d3ee',
        borderWidth: 2,
        backgroundColor: gradient,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#22d3ee',
        pointHoverBorderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleFont: { family: 'Orbitron', size: 10 },
          bodyFont: { family: 'Space Grotesk', size: 10 },
          borderColor: '#22d3ee',
          borderWidth: 1,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return `Congestion Load: ${Math.round(context.raw)}%`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#64748b',
            font: { family: 'Space Grotesk', size: 8 },
            maxTicksLimit: 6
          }
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#64748b',
            font: { family: 'Space Grotesk', size: 8 },
            stepSize: 25,
            callback: value => value + '%'
          }
        }
      }
    },
    // Custom vertical overlay line marking current time cursor
    plugins: [{
      id: 'timeIndicator',
      afterDraw: chart => {
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;

        // Match slider time directly to forecast chart coordinates
        const decimalHour = currentHour + currentMinute / 60;
        const xVal = xAxis.getPixelForValue(decimalHour);

        const canvasCtx = chart.ctx;
        canvasCtx.save();
        canvasCtx.beginPath();
        canvasCtx.moveTo(xVal, yAxis.top);
        canvasCtx.lineTo(xVal, yAxis.bottom);
        canvasCtx.lineWidth = 1.5;
        canvasCtx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
        canvasCtx.setLineDash([3, 4]);
        canvasCtx.stroke();
        canvasCtx.restore();
      }
    }]
  });
}

// Calculate the average city congestion forecast curves for a given day
function getDayForecastData(day) {
  const data = [];
  for (let h = 0; h < 24; h++) {
    let sumCongestion = 0;
    edges.forEach(edge => {
      // Forecast under sunny condition standard
      const state = getTrafficState(h, 0, day, 'sunny', edge);
      sumCongestion += state.congestion;
    });
    const avgCongestionPercent = (sumCongestion / edges.length) * 100;
    data.push(Math.round(avgCongestionPercent));
  }
  return data;
}

function updateForecastChart() {
  if (!forecastChartInstance) return;

  // Refresh graph data array and title headers
  document.getElementById('chart-day-label').textContent = currentDay.substring(0, 3);
  forecastChartInstance.data.datasets[0].data = getDayForecastData(currentDay);
  forecastChartInstance.update();
}

// Fetch Live Weather from Open-Meteo API automatically
async function fetchLiveWeather() {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=12.9141&longitude=74.8560&current=temperature_2m,weather_code';
  try {
    const weatherCard = document.getElementById('live-weather-card');
    const iconContainer = document.getElementById('live-weather-icon-container');
    const iconEl = document.getElementById('live-weather-icon');
    const descEl = document.getElementById('live-weather-desc');
    const tempEl = document.getElementById('live-weather-temp');
    const effectEl = document.getElementById('live-weather-effect');

    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather API returned error status');
    const data = await res.json();
    const current = data.current;
    const code = current.weather_code;
    const temp = current.temperature_2m;

    let condition = 'sunny';
    let iconClass = 'fa-solid fa-sun text-amber-400';
    let desc = 'Clear Sky';
    let effectText = 'Normal Flow (1.0x)';
    let borderStyle = 'border-cyber-cyan/15';

    // Map weather codes:
    // 0: Clear
    // 1-3: Partly Cloudy / Overcast
    // 51-67, 80-82: Drizzle / Rain
    // 95-99: Thunderstorms
    if (code === 0) {
      condition = 'sunny';
      iconClass = 'fa-solid fa-sun text-amber-400';
      desc = 'Clear Sky';
    } else if (code >= 1 && code <= 3) {
      condition = 'sunny';
      iconClass = 'fa-solid fa-cloud-sun text-slate-400';
      desc = 'Partly Cloudy';
    } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      condition = 'rainy';
      iconClass = 'fa-solid fa-cloud-showers-heavy text-blue-400 animate-pulse';
      desc = 'Rainy Conditions';
      effectText = 'Rain Slowdown (1.35x)';
      borderStyle = 'border-cyber-yellow/30';
    } else if (code >= 95) {
      condition = 'stormy';
      iconClass = 'fa-solid fa-cloud-bolt text-purple-400 animate-bounce';
      desc = 'Storm Alerts';
      effectText = 'Gridlock Risk (1.7x)';
      borderStyle = 'border-cyber-red/30';
    } else {
      condition = 'sunny';
      iconClass = 'fa-solid fa-cloud text-slate-400';
      desc = 'Overcast';
    }

    currentWeather = condition;

    // Update DOM
    if (iconContainer) iconContainer.className = 'w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-lg';
    if (iconEl) iconEl.className = iconClass;
    if (descEl) descEl.textContent = desc;
    if (tempEl) tempEl.textContent = `${temp.toFixed(1)} °C | Mangaluru`;
    if (effectEl) effectEl.textContent = effectText;

    if (weatherCard) {
      weatherCard.className = 'bg-slate-950/60 border rounded-lg p-3 flex items-center justify-between transition-all duration-300 ' + borderStyle;
    }

    updateSimulation();
  } catch (err) {
    console.error('Weather API failed, fallback active:', err);
    const descEl = document.getElementById('live-weather-desc');
    const tempEl = document.getElementById('live-weather-temp');
    if (descEl) descEl.textContent = 'API Offline';
    if (tempEl) tempEl.textContent = 'Fallback: Clear Sky (30°C)';
    currentWeather = 'sunny';
    updateSimulation();
  }
}

// Fetch the entire road network of Mangaluru from OpenStreetMap (Overpass API)
async function fetchOSMAllRoads() {
  const descEl = document.getElementById('ai-insight-text');
  if (descEl) descEl.textContent = "AI Twin Engine: Querying OpenStreetMap Overpass API for all Mangaluru highways...";

  // Bounding Box covering core Mangaluru (Surathkal down to Pumpwell, beach to Padil)
  const overpassQuery = `
    [out:json][timeout:35];
    (
      way["highway"~"motorway|trunk|primary|secondary|tertiary|residential|service|unclassified"](12.83,74.80,12.95,74.92);
    );
    out body;
    >;
    out skel qt;
  `;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Overpass status error');
    const data = await res.json();

    // Clear existing OSM layers
    allRoadLayers.forEach(l => {
      map.removeLayer(l.glow);
      map.removeLayer(l.solid);
    });
    allRoadLayers = [];
    allRoads = [];

    // Map node IDs to coordinates
    const nodeMap = {};
    data.elements.forEach(el => {
      if (el.type === 'node') {
        nodeMap[el.id] = [el.lat, el.lon];
      }
    });

    // Parse ways into roads
    data.elements.forEach(el => {
      if (el.type === 'way' && el.nodes) {
        const coords = el.nodes
          .map(nodeId => nodeMap[nodeId])
          .filter(coord => coord !== undefined);

        if (coords.length >= 2) {
          const highwayType = el.tags.highway || 'secondary';
          const name = el.tags.name || 'Mangaluru Street';

          let maxSpeed = 40;
          if (highwayType === 'motorway' || highwayType === 'trunk') maxSpeed = 70;
          else if (highwayType === 'primary') maxSpeed = 55;
          else if (highwayType === 'secondary') maxSpeed = 45;

          const roadData = {
            id: `osm_${el.id}`,
            name: name,
            coords: coords,
            maxSpeed: maxSpeed,
            highway: (highwayType === 'motorway' || highwayType === 'trunk' || highwayType === 'primary'),
            isMinor: (highwayType === 'residential' || highwayType === 'service' || highwayType === 'unclassified'),
            schoolZone: name.toLowerCase().includes('school') || name.toLowerCase().includes('college'),
            officeZone: highwayType === 'primary' || name.toLowerCase().includes('road')
          };

          allRoads.push(roadData);

          // Render background thin polyline glow and solid lines
          const glow = L.polyline(coords, {
            color: '#10b981',
            weight: 6,
            opacity: 0.08,
            lineCap: 'round',
            lineJoin: 'round'
          }).addTo(map);

          const solid = L.polyline(coords, {
            color: '#10b981',
            weight: 2.2,
            opacity: 0.65,
            lineCap: 'round',
            lineJoin: 'round'
          }).addTo(map);

          const popupContent = `
            <div class="font-cyber text-xs font-bold text-slate-100">${name}</div>
            <div class="text-[9px] text-slate-400 font-tech mt-0.5">Type: ${highwayType.toUpperCase()}</div>
            <div id="popup-traffic-${roadData.id}" class="text-[10px] font-tech font-bold mt-1.5">
              Calculating status...
            </div>
          `;
          solid.bindPopup(popupContent);
          solid.on('popupopen', () => {
            updateOsmPopupContent(roadData);
          });

          allRoadLayers.push({ id: roadData.id, glow, solid, data: roadData });
        }
      }
    });

    console.log(`Successfully loaded ${allRoads.length} Mangaluru streets from OSM.`);
    if (descEl) descEl.textContent = `AI Twin Engine: Successfully loaded ${allRoads.length} Mangaluru streets. Dynamic traffic forecasting active citywide.`;

    // Update map to apply initial colors
    updateSimulation();
    updateMapLayerVisibility();
  } catch (err) {
    console.warn("Overpass API failed, using fallback major routes", err);
    if (descEl) descEl.textContent = "AI Twin Engine: Overpass API timeout. Falling back to local major arterial routes.";
  }
}

// Update helper for OSM popup contents
function updateOsmPopupContent(road) {
  const popupEl = document.getElementById(`popup-traffic-${road.id}`);
  if (popupEl) {
    const state = getTrafficState(currentHour, currentMinute, currentDay, currentWeather, road);

    let statusText = 'CLEAR FLOW';
    let colorClass = 'text-cyber-green';

    if (state.color === 'yellow') {
      statusText = 'TRAFFIC SLOWDOWN';
      colorClass = 'text-cyber-yellow';
    } else if (state.color === 'orange') {
      statusText = 'CONSTRUCTION ZONE';
      colorClass = 'text-amber-500';
    } else if (state.color === 'purple') {
      statusText = 'ROAD CLOSED (FLOODED)';
      colorClass = 'text-purple-400';
    }

    popupEl.innerHTML = `
      <div class="flex items-center justify-between gap-4 border-t border-white/5 pt-1.5 mt-1.5 font-tech">
        <span class="text-[9px] uppercase tracking-wider text-slate-500 font-tech">Current Speed</span>
        <span class="font-cyber font-black text-slate-200">${state.speed} <span class="text-[8px] font-tech text-slate-400 font-medium">km/h</span></span>
      </div>
      <div class="flex items-center justify-between gap-4 mt-0.5 font-tech">
        <span class="text-[9px] uppercase tracking-wider text-slate-500 font-tech">Status</span>
        <span class="font-cyber font-black ${colorClass} tracking-wide text-[10px]">${statusText}</span>
      </div>
    `;
  }
}

// 9. SMART AI CITY TELEMETRY SEARCH ENGINE
function handleSearchInput(e) {
  const query = e.target.value.toLowerCase().trim();
  const resultsBox = document.getElementById('search-results-box');
  
  if (!query) {
    resultsBox.innerHTML = '';
    resultsBox.classList.add('hidden');
    return;
  }
  
  const matches = [];
  
  // A. Search junctions (nodes)
  Object.keys(nodes).forEach(key => {
    const n = nodes[key];
    if (n.name.toLowerCase().includes(query)) {
      matches.push({ name: n.name, type: 'Junction', coords: n.coords, rawKey: key, data: n });
    }
  });
  
  // B. Search hospitals
  hospitals.forEach(h => {
    if (h.name.toLowerCase().includes(query)) {
      matches.push({ name: h.name, type: 'Hospital', coords: h.coords, data: h });
    }
  });
  
  // C. Search major simulation edges (routes)
  edges.forEach(edge => {
    if (edge.name.toLowerCase().includes(query)) {
      matches.push({ name: edge.name, type: 'Highway Bypass', coords: edge.coords, rawKey: edge.id, data: edge });
    }
  });
  
  // D. Search OSM background roads
  allRoads.forEach(road => {
    if (road.name !== 'Mangaluru Street' && road.name.toLowerCase().includes(query)) {
      const midIdx = Math.floor(road.coords.length / 2);
      matches.push({ name: road.name, type: 'Street Link', coords: road.coords[midIdx], rawCoords: road.coords, data: road });
    }
  });

  const displayMatches = matches.slice(0, 5);
  
  if (displayMatches.length === 0) {
    resultsBox.innerHTML = `<div class="p-2.5 text-xs text-slate-500 font-tech">No matches found.</div>`;
  } else {
    resultsBox.innerHTML = displayMatches.map((m, idx) => `
      <div class="search-result-item p-2.5 hover:bg-cyber-cyan/10 transition cursor-pointer text-xs font-tech border-b border-white/5 last:border-b-0 flex items-center justify-between" data-index="${idx}">
        <span class="text-slate-200 font-bold truncate mr-2">${m.name}</span>
        <span class="text-[9px] font-cyber bg-slate-900 px-2 py-0.5 rounded text-slate-400 shrink-0 uppercase tracking-widest">${m.type}</span>
      </div>
    `).join('');
    
    resultsBox.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-index'));
        selectSearchResult(displayMatches[idx]);
      });
    });
  }
  
  resultsBox.classList.remove('hidden');
}

function selectSearchResult(match) {
  const resultsBox = document.getElementById('search-results-box');
  const searchInput = document.getElementById('search-input');
  const detailsPanel = document.getElementById('search-details-panel');
  const clearBtn = document.getElementById('btn-clear-search');
  
  resultsBox.classList.add('hidden');
  searchInput.value = match.name;
  detailsPanel.classList.remove('hidden');
  clearBtn.classList.remove('hidden');
  
  if (searchHighlightLayer) {
    map.removeLayer(searchHighlightLayer);
    searchHighlightLayer = null;
  }
  
  map.setView(match.coords, 14.5);
  
  if (match.type === 'Junction') {
    currentSearchTarget = { type: 'node', data: match.data };
    const marker = nodeMarkers[match.rawKey];
    if (marker) marker.openPopup();
    
    document.getElementById('search-item-title').textContent = match.name.split(' (')[0];
    document.getElementById('search-item-type').textContent = 'Junction';
    document.getElementById('search-item-speed').textContent = '--';
    document.getElementById('search-item-status').textContent = 'Live Node';
    document.getElementById('search-item-status').className = 'text-sm font-cyber font-bold text-cyber-cyan';
    document.getElementById('search-item-desc').textContent = `Junction coordinate center located at: [${match.coords[0].toFixed(4)}, ${match.coords[1].toFixed(4)}]`;
  }
  else if (match.type === 'Hospital') {
    currentSearchTarget = { type: 'hospital', data: match.data };
    map.eachLayer(layer => {
      if (layer instanceof L.Marker && layer.getLatLng) {
        const latLng = layer.getLatLng();
        if (Math.abs(latLng.lat - match.coords[0]) < 0.0001 && Math.abs(latLng.lng - match.coords[1]) < 0.0001) {
          layer.openPopup();
        }
      }
    });
    
    document.getElementById('search-item-title').textContent = match.name;
    document.getElementById('search-item-type').textContent = 'Hospital';
    document.getElementById('search-item-speed').textContent = '--';
    document.getElementById('search-item-status').textContent = 'Active Care';
    document.getElementById('search-item-status').className = 'text-sm font-cyber font-bold text-rose-400';
    document.getElementById('search-item-desc').textContent = match.data.desc;
  }
  else if (match.type === 'Highway Bypass') {
    currentSearchTarget = { type: 'edge', data: match.data };
    
    searchHighlightLayer = L.polyline(match.data.coords, {
      color: '#22d3ee',
      weight: 7,
      opacity: 0.85,
      dashArray: '5, 10',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);
    
    const layer = roadLayers[match.rawKey];
    if (layer) layer.solid.openPopup();
    
    document.getElementById('search-item-title').textContent = match.name;
    document.getElementById('search-item-type').textContent = 'Highway';
    document.getElementById('search-item-desc').textContent = `Key arterial highway connecting junctions: ${nodes[match.data.from].name.split(' (')[0]} &harr; ${nodes[match.data.to].name.split(' (')[0]}`;
    
    updateSearchDetailsCardLive();
  }
  else {
    currentSearchTarget = { type: 'osm', data: match.data };
    
    searchHighlightLayer = L.polyline(match.rawCoords, {
      color: '#22d3ee',
      weight: 6,
      opacity: 0.85,
      dashArray: '5, 10',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);
    
    const targetLayer = allRoadLayers.find(l => l.id === match.data.id);
    if (targetLayer) targetLayer.solid.openPopup();
    
    document.getElementById('search-item-title').textContent = match.name;
    document.getElementById('search-item-type').textContent = 'Street Link';
    document.getElementById('search-item-desc').textContent = `City secondary street segment. Maximum designated speed: ${match.data.maxSpeed} km/h. Type: ${match.data.highway ? 'Primary Arterial' : 'Secondary Road'}`;
    
    updateSearchDetailsCardLive();
  }
}

function clearSearchEngine() {
  const searchInput = document.getElementById('search-input');
  const detailsPanel = document.getElementById('search-details-panel');
  const clearBtn = document.getElementById('btn-clear-search');
  const resultsBox = document.getElementById('search-results-box');
  
  searchInput.value = '';
  resultsBox.innerHTML = '';
  resultsBox.classList.add('hidden');
  detailsPanel.classList.add('hidden');
  clearBtn.classList.add('hidden');
  
  if (searchHighlightLayer) {
    map.removeLayer(searchHighlightLayer);
    searchHighlightLayer = null;
  }
  currentSearchTarget = null;
  
  map.closePopup();
  map.setView(MAP_CENTER, 11.5);
}

function updateSearchDetailsCardLive() {
  if (currentSearchTarget && (currentSearchTarget.type === 'edge' || currentSearchTarget.type === 'osm')) {
    const road = currentSearchTarget.data;
    const state = getTrafficState(currentHour, currentMinute, currentDay, currentWeather, road);
    
    document.getElementById('search-item-speed').textContent = `${Math.round(state.speed)} km/h`;
    
    const statusEl = document.getElementById('search-item-status');
    let statusText = 'Clear Flow';
    statusEl.className = 'text-sm font-cyber font-bold ';
    
    if (state.color === 'yellow') {
      statusText = 'Minor Delays';
      statusEl.classList.add('text-cyber-yellow', 'glow-text-yellow');
    } else if (state.color === 'orange') {
      statusText = 'Construction';
      statusEl.classList.add('text-amber-500');
    } else if (state.color === 'purple') {
      statusText = 'Closed (Flooded)';
      statusEl.classList.add('text-purple-400', 'animate-pulse');
    } else {
      statusEl.classList.add('text-cyber-green', 'glow-text-green');
    }
    statusEl.textContent = statusText;
  }
}

// Fetch exact street geometry from Open Source Routing Machine (OSRM)
async function alignRoadsWithOSRM() {
  const fetchPromises = edges.map(async (edge) => {
    // Bypass OSRM for kottara_kuntikan to keep the NH 66 bypass straight and clean along the blue line route
    if (edge.id === 'kottara_kuntikan') return;

    const fromNode = nodes[edge.from];
    const toNode = nodes[edge.to];

    // OSRM expects longitude,latitude;longitude,latitude
    const url = `https://router.project-osrm.org/route/v1/driving/${fromNode.coords[1]},${fromNode.coords[0]};${toNode.coords[1]},${toNode.coords[0]}?overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('OSRM status error');
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        // Map [lng, lat] to [lat, lng]
        const streetCoords = data.routes[0].geometry.coordinates.map(pt => [pt[1], pt[0]]);

        // Update edge coordinates
        edge.coords = streetCoords;

        // Calculate exact OSRM distance (in meters, convert to km)
        edge.baseDistance = data.routes[0].distance / 1000;

        // Update Leaflet polylines
        const layer = roadLayers[edge.id];
        if (layer) {
          layer.glow.setLatLngs(streetCoords);
          layer.solid.setLatLngs(streetCoords);
        }
      }
    } catch (err) {
      console.warn(`OSRM alignment failed for edge ${edge.id}, using fallback coords`, err);
    }
  });

  // Wait for all routes to fetch in parallel
  await Promise.all(fetchPromises);

  // Re-run simulation and routing with updated street paths
  updateSimulation();
}

// Sync the simulation state to actual local time and day
function syncToActualTime() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[now.getDay()];

  const hr = now.getHours();
  const min = now.getMinutes();

  currentDay = today;
  currentHour = hr;
  currentMinute = min;

  const daySelect = document.getElementById('day-select');
  if (daySelect) {
    daySelect.value = today;
  }

  const slider = document.getElementById('time-slider');
  if (slider) {
    slider.value = hr * 60 + min;
  }

  updateForecastChart();
  updateSimulation();
}

// 11. USER INTERACTION HANDLERS & SIMULATION TIMERS
function initEventHandlers() {
  // Day Selector
  document.getElementById('day-select').addEventListener('change', e => {
    if (isLiveSyncActive) {
      const liveSyncBtn = document.getElementById('btn-live-sync');
      if (liveSyncBtn) {
        liveSyncBtn.classList.remove('bg-cyber-cyan/15', 'border-cyber-cyan/35', 'text-cyber-cyan');
        liveSyncBtn.classList.add('bg-slate-900/60', 'border-white/10', 'text-slate-400');
      }
      isLiveSyncActive = false;
    }
    currentDay = e.target.value;
    updateForecastChart();
    updateSimulation();
  });

  // Route Finder Buttons (Protected)
  const routeBtn = document.getElementById('btn-find-route');
  if (routeBtn) routeBtn.addEventListener('click', runRouteFinder);
  const clearRouteBtn = document.getElementById('btn-clear-route');
  if (clearRouteBtn) clearRouteBtn.addEventListener('click', clearActiveRouteLayers);

  // Time Slider Drag Action
  const slider = document.getElementById('time-slider');
  slider.addEventListener('input', e => {
    if (isLiveSyncActive) {
      const liveSyncBtn = document.getElementById('btn-live-sync');
      if (liveSyncBtn) {
        liveSyncBtn.classList.remove('bg-cyber-cyan/15', 'border-cyber-cyan/35', 'text-cyber-cyan');
        liveSyncBtn.classList.add('bg-slate-900/60', 'border-white/10', 'text-slate-400');
      }
      isLiveSyncActive = false;
    }
    const val = parseInt(e.target.value);
    currentHour = Math.floor(val / 60);
    currentMinute = val % 60;

    updateSimulation();
  });

  // Theme Layer Switcher (Cycles: Cyber -> Light)
  document.getElementById('view-theme-toggle').addEventListener('click', () => {
    if (activeTheme === 'cyber') {
      setMapTheme('light');
    } else {
      setMapTheme('cyber');
    }
  });

  // HUD Simulation Engine Speeds
  const speedBtns = document.querySelectorAll('.sim-speed-btn');
  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => {
        b.classList.remove('bg-cyber-cyan/25', 'text-cyber-cyan', 'border-cyber-cyan/30');
        b.classList.add('text-slate-400');
      });

      btn.classList.remove('text-slate-400');
      btn.classList.add('bg-cyber-cyan/25', 'text-cyber-cyan', 'border-cyber-cyan/30');

      simSpeedMultiplier = parseInt(btn.getAttribute('data-speed'));
    });
  });

  // AI Smart Search Engine Input & Buttons
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', handleSearchInput);
  }
  
  const clearSearchBtn = document.getElementById('btn-clear-search');
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', clearSearchEngine);
  }
  
  // Close search results on outside click
  document.addEventListener('click', (e) => {
    const resultsBox = document.getElementById('search-results-box');
    if (resultsBox && e.target !== searchInput && e.target !== resultsBox) {
      resultsBox.classList.add('hidden');
    }
  });

  // Live Time Sync Toggle Button
  const liveSyncBtn = document.getElementById('btn-live-sync');
  if (liveSyncBtn) {
    liveSyncBtn.addEventListener('click', () => {
      isLiveSyncActive = !isLiveSyncActive;

      if (isLiveSyncActive) {
        liveSyncBtn.classList.remove('bg-slate-900/60', 'border-white/10', 'text-slate-400');
        liveSyncBtn.classList.add('bg-cyber-cyan/15', 'border-cyber-cyan/35', 'text-cyber-cyan');

        // De-select simulation speed highlights (show paused/manual mode)
        const speedBtns = document.querySelectorAll('.sim-speed-btn');
        speedBtns.forEach(b => {
          b.classList.remove('bg-cyber-cyan/25', 'text-cyber-cyan', 'border-cyber-cyan/30');
          b.classList.add('text-slate-400');
        });
        const pauseBtn = document.getElementById('sim-pause');
        if (pauseBtn) {
          pauseBtn.classList.remove('text-slate-400');
          pauseBtn.classList.add('bg-cyber-cyan/25', 'text-cyber-cyan', 'border-cyber-cyan/30');
        }
        simSpeedMultiplier = 0;

        syncToActualTime();
      } else {
        liveSyncBtn.classList.remove('bg-cyber-cyan/15', 'border-cyber-cyan/35', 'text-cyber-cyan');
        liveSyncBtn.classList.add('bg-slate-900/60', 'border-white/10', 'text-slate-400');

        // Return to 1x speed
        const speedBtns = document.querySelectorAll('.sim-speed-btn');
        speedBtns.forEach(b => {
          b.classList.remove('bg-cyber-cyan/25', 'text-cyber-cyan', 'border-cyber-cyan/30');
          b.classList.add('text-slate-400');
        });
        const speed1x = document.getElementById('sim-speed-1x');
        if (speed1x) {
          speed1x.classList.remove('text-slate-400');
          speed1x.classList.add('bg-cyber-cyan/25', 'text-cyber-cyan', 'border-cyber-cyan/30');
        }
        simSpeedMultiplier = 1;
      }
    });
  }
}

// Simulated automated clock progression
function startSimulationTimer() {
  simTimer = setInterval(() => {
    if (isLiveSyncActive) {
      syncToActualTime();
      return;
    }

    if (simSpeedMultiplier === 0) return;

    // Increment minutes based on active speed multiplier
    let sliderValue = currentHour * 60 + currentMinute;
    sliderValue = (sliderValue + simSpeedMultiplier) % 1440;

    currentHour = Math.floor(sliderValue / 60);
    currentMinute = sliderValue % 60;

    // Update Slider track position UI
    document.getElementById('time-slider').value = sliderValue;

    updateSimulation();
  }, 1000);
}

// 12. ENTRY POINT INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  initMap();
  initEventHandlers();
  initChart();

  // Initialize weather API auto-check
  fetchLiveWeather();
  // Query open-meteo every 5 minutes automatically
  setInterval(fetchLiveWeather, 300000);

  // Align roads precisely with OpenStreetMap paths via OSRM API
  alignRoadsWithOSRM();

  // Download and render the entire Mangaluru road network dynamically from OSM
  // fetchOSMAllRoads(); // Disabled: keep only major highways, remove secondary streets

  // Enable Live Time Sync by default on load
  const liveSyncBtn = document.getElementById('btn-live-sync');
  if (liveSyncBtn) {
    liveSyncBtn.click();
  } else {
    updateSimulation();
  }
  startSimulationTimer();
});
