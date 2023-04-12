# Open the input file in read mode
# inp='test\\bonus 2 - dago.txt'
inp='src\Asset\\perumahan.txt'
with open(inp, 'r') as file:
    # Read the matrix from the file
    matrix = [[num for num in line.split()] for line in file]
temp = []
point=[]
for i in range(len(matrix[0])):
    temp.append(matrix[i])
for i in range(len(matrix[0]),len(matrix)):
    point.append(matrix[i])
matrix=temp
asu=0
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        if (int(matrix[i][j])-int(matrix[j][i]) != 0):
            matrix[j][i] = 1
            matrix[i][j] = 1
            print(i,j)
            asu=asu+1
        if(int(matrix[i][j])>0):
            matrix[i][j]=1
# print(asu)
j=0
with open(inp, 'w') as file:
    # Write the updated matrix to the file
    for row in matrix:
        file.write(' '.join(str(num) for num in row) + '\n')
    for row in point:
        if(j==len(point)-1):
            file.write(' '.join(str(num) for num in row))
        else :
            file.write(' '.join(str(num) for num in row) + '\n')
        j+=1