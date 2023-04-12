import osmnx as ox
import networkx as nx

# Load the OSM data from a file
osm_file = 'map.osm'
G = ox.graph_from_xml(osm_file, simplify=False)
ox.save_graphml(G, "perumahan.graphml")