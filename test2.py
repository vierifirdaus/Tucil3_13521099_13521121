import networkx as nx

def convert_graphml_to_txt(graphml_file, txt_file):
    # Load the GraphML file
    G = nx.read_graphml(graphml_file)

    # Get the adjacency matrix
    adj_matrix = nx.to_numpy_array(G)

    # Convert the adjacency matrix to integers
    adj_matrix = adj_matrix.astype(int)

    
    # print(G.nodes['5444616312'])
    # Write the adjacency matrix to a text file
    with open(txt_file, 'w') as f:
        for row in adj_matrix:
            row_str = ' '.join(str(x) for x in row.tolist())
            f.write(row_str + '\n')

        # Write the node positions to the file
        
        for node in G.nodes():
              x = G.nodes[node]['x']
              y = G.nodes[node]['y']
              f.write(f"\n{y} {x}")

convert_graphml_to_txt('perumahan.graphml', 'perumahan.txt')