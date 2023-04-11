import osmnx as ox

# specify the place name
place_name = "Dago, Bandung, Indonesia"

# download the road network
G = ox.graph_from_place(place_name, network_type='drive')
G_undirected = ox.utils_graph.get_undirected(G)

# G_nodes = ox.graph_to_gdfs(G_undirected, nodes = True, edges = False)
# G_edges = ox.graph_to_gdfs(G_undirected, nodes = False, edges = True)
# # save the graph in GraphML format
# G_edges.key = range(G_edges.shape[0])
# H = ox.gdfs_to_graph(gdf_edges=G_edges, gdf_nodes=G_nodes)
ox.save_graphml(G_undirected, "dago.graphml", gephi=True)
