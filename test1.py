import osmnx as ox

# specify the place name
place_name = "Dago, Bandung, Indonesia"

# download the road network
G = ox.graph_from_place(place_name, network_type='drive')

# save the graph in GraphML format
ox.save_graphml(G, "san_francisco_drive.graphml")