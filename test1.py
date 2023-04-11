import osmnx as ox

# specify the place name
place_name = "Kelapa Gading Timur, Kelapa Gading, DKI Jakarta, Indonesia"

# download the road network
G = ox.graph_from_place(place_name, network_type='drive')

# G_nodes = ox.graph_to_gdfs(G_undirected, nodes = True, edges = False)
# G_edges = ox.graph_to_gdfs(G_undirected, nodes = False, edges = True)
# # save the graph in GraphML format
# G_edges.key = range(G_edges.shape[0])
# H = ox.gdfs_to_graph(gdf_edges=G_edges, gdf_nodes=G_nodes)
ox.save_graphml(G, "kelapa gading.graphml")
