function checkInput(inputString,keterangan) {
    // Split the input string into lines
    const lines = inputString.trim().split("\n");
  
    // menghapus baris kosong
    for(let i = 0; i < lines.length; i++) {
      if(lines[i]=='' || lines[i]=='\r'){
        lines.splice(i, 1);
      }
    }
  
    const rows=lines[0].trim().split(" ").length;
    const matrix=[]
  
    for(let i=0;i<rows;i++) {
      matrix.push(lines[i].trim().split(" "))
    }
    // mengecek baris dan kolom harus sama
    for(let i=0;i<rows;i++){
      if(matrix[i].length!=rows){
        return false;
      }
    }
  
    // elemen 1/0
    for(let i=0;i<rows;i++){
      for(let j=0;j<rows;j++){
        if(matrix[i][j]!=1 && matrix[i][j]!=0){
          return false
        }
      }
    }
  
    // mengecek (x,y) = (y,x)
    for(let i=0;i<rows;i++){
      for(let j=0;j<rows;j++){
        if(matrix[i][j]!=matrix[j][i]){
          return false;
        }
      }
    }
    // console.log("asu",rows,lines.length)
    // console.log(lines)
    // console.log(matrix)
    
    // kalau jumlah point dan row beda 
    if(rows*2!=lines.length){
        return false;
    }
  
    const point=[]
    for(let i=rows;i<lines.length;i++){
      point.push(lines[i].trim().split(" "))
    }
  
    // kalau banyak titik tidak 2
    for(let i=0;i<point.length;i++){
      if(point[i].length!=2){
        return false;
      }
    }
    
    if(!keterangan){
      for(let i=0;i<point.length;i++){
        if(Math.abs(point[i][0])>180 || Math.abs(point[i][1])>180){
          return false;
        }
      }
    }
    return true
}

export default checkInput;