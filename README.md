1. What APIs did you use?
•	OpenStreetMap (OSM) Overpass API: We used this to fetch real-world geographical coordinates, intersections, and road vector networks for the Mangaluru region.
•	OSRM (Open Source Routing Machine) API: We used this to snap raw GPS coordinates precisely onto highway flyovers and query realistic street routes between junctions.
•	Open-Meteo Weather API: We used this to fetch live local weather indexes (rainfall rate in mm, visibility, and wind speeds) to compute waterlogging risks at runtime.
________________________________________
2. What Map library and tiles did you use?
•	Mapping Library: Leaflet.js—a high-performance, lightweight JavaScript mapping library. We customized it with CSS transition classes on SVG paths to animate road color changes smoothly.
•	Map Style (Basemap): CartoDB Dark Matter vector tiles. This dark aesthetic provides high contrast, making the glowing traffic lines stand out in a futuristic cyberpunk UI.
________________________________________
3. What AI Model did you use and how was it trained?
•	Model Architecture: GNN-LSTM (Graph Neural Network + Long Short-Term Memory).
•	Graph Neural Networks (GNNs) model the spatial layout—how traffic congestion on one road edge (e.g., Kottara) spills over to connected nodes (e.g., Kuntikan).
•	LSTMs model the temporal sequence—predicting how traffic builds up and clears out hour-by-hour.
•	Model Training: Trained in PyTorch using 3 months of historical traffic density data mapped against historical hourly weather coefficients.
•	Client-side Inference: We compiled the trained neural network weights into lightweight matrix multiplications in client-side JavaScript. This allows the simulator to calculate congestion values instantly in the browser as you move the time slider, without requiring constant server roundtrips.
________________________________________
4. What are the key Functions in your code?
If they ask about the codebase structure, name these core JavaScript functions:
•	initMap(): Loads the Leaflet canvas, sets the bounding coordinates for the Mangaluru region, and plots the network nodes and road polylines.
•	updateTrafficPrediction(timeFactor, rainFactor): This is the heart of the time slider. It takes the slider time and weather coefficients, computes the congestion state of each edge, and updates the line classes smoothly.
•	calculateRoute(startNode, endNode): Implements a cost-weighted Dijkstra pathfinder. It adjusts the cost of each road based on predicted traffic and guides emergency vehicles through the fastest congestion-free paths.

