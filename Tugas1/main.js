function main() 
{
  // Inisiasi kanvas WebGL
  var leftCanvas = document.getElementById("leftCanvas");
  var rightCanvas = document.getElementById("rightCanvas");
  var leftGL = leftCanvas.getContext("webgl");
  var rightGL = rightCanvas.getContext("webgl");

  // Mendefinisikan objek
  var cubeVertices = 
  [    
    -0.6,   0.0,  0.0,
    -0.3,  -0.6,  0.0,
     0.3,  -0.6,  0.0,
     0.6,   0.0,  0.0,
     0.3,   0.6,  0.0,
    -0.3,   0.6,  0.0  
  ];
  var cubePoints = 
  [
    [-0.6,  0.0,  0.2],   // A, 0
    [-0.3, -0.6,  0.2],   // B, 1
    [ 0.3, -0.6,  0.2],   // C, 2 
    [ 0.6,  0.0,  0.2],   // D, 3
    [ 0.3,  0.6,  0.2],   // E, 4
    [-0.3,  0.6,  0.2],   // F, 5
    [-0.6,  0.0, -0.2],   // G, 6
    [-0.3, -0.6, -0.2],   // H, 7
    [ 0.3, -0.6, -0.2],   // I, 8 
    [ 0.6,  0.0, -0.2],   // J, 9
    [ 0.3,  0.6, -0.2],   // K, 10
    [-0.3,  0.6, -0.2],   // L, 11
  ];
  var cubeColors = 
  [  
    [1.0, 0.0, 0.0],    // merah  //depan
    [1.0, 0.0, 0.0],    // merah
    [0.0, 1.0, 0.0],    // hijau
    [0.0, 1.0, 0.0],    // hijau
    [0.0, 0.0, 1.0],    // biru
    [1.0, 1.0, 0.0],    // kuning
    [1.0, 0.5, 0.0],    // oranye   //belakang
    [1.0, 0.5, 0.0],    // oranye
    [1.0, 1.0, 0.0],    // kuning
    [1.0, 1.0, 1.0],    // putih
    [] 
 ];

  var indices = [ 0, 1, 2, 2, 3, 0, 0, 5, 4, 4, 3, 0, ];
  function quad(a, b, c, d) 
  {
    var indices = [a, b, c, c, d, a];
    for (var i=0; i<indices.length; i++) 
    {
      for (var j=0; j<3; j++) 
      {
        cubeVertices.push(cubePoints[indices[i]][j]);
      }
      for (var j=0; j<3; j++) 
      {
        cubeVertices.push(cubeColors[a][j]);
      }
    }
  }

  quad(1, 2, 3, 0);   // Kubus depan bawah
  quad(0, 3, 4, 5);   // Kubus depan atas
  quad(7, 8, 9, 6);   // Kubus belakang bawah
  quad(6, 9, 10, 11); // Kubus belakang atas
  quad(5, 0, 6, 11);  // Kubus kanan atas
  quad(0, 1, 7, 6); // Kubus kiri bawah
  quad(1, 2, 8, 7); // Kubus bawah
  quad(2, 3, 9, 8); // Kubus kanan bawah
  quad(3, 4, 10, 9); // Kubus kanan atas
  quad(4, 5, 11,10); // Kubus atas

//=========================================================================LEFT CANVAS=================================================================================//
  
  //Create and store data into vertex buffer
  var vertex_buffer = leftGL.createBuffer ();
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, vertex_buffer);
  leftGL.bufferData(leftGL.ARRAY_BUFFER, new Float32Array(cubeVertices), leftGL.STATIC_DRAW);

  //Create and store data into color buffer
  var color_buffer = leftGL.createBuffer ();
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, color_buffer);
  leftGL.bufferData(leftGL.ARRAY_BUFFER, new Float32Array(cubeColors), leftGL.STATIC_DRAW);

  //Create and store data into index buffer
  var index_buffer = leftGL.createBuffer ();
  leftGL.bindBuffer(leftGL.ELEMENT_ARRAY_BUFFER, index_buffer);
  leftGL.bufferData(leftGL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), leftGL.STATIC_DRAW);

  //Shader
  var vertCode = 
    'attribute vec3 position;'+
    'uniform mat4 Pmatrix;'+
    'uniform mat4 Vmatrix;'+
    'uniform mat4 Mmatrix;'+
    'attribute vec3 color;'+
    'varying vec3 vColor;'+
    'void main(void) { '+
      'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);'+
      'vColor = color;'+
      'gl_PointSize = 5.0;' +
    '}';

  var fragCode = 
    'precision mediump float;'+
    'varying vec3 vColor;'+
    'void main(void) {'+
        'gl_FragColor = vec4(vColor, 1.);'+
    '}';

  var vertShader = leftGL.createShader(leftGL.VERTEX_SHADER);
  leftGL.shaderSource(vertShader, vertCode);
  leftGL.compileShader(vertShader);

  var fragShader = leftGL.createShader(leftGL.FRAGMENT_SHADER);
  leftGL.shaderSource(fragShader, fragCode);
  leftGL.compileShader(fragShader);

  var shaderProgram = leftGL.createProgram();
  leftGL.attachShader(shaderProgram, vertShader);
  leftGL.attachShader(shaderProgram, fragShader);
  leftGL.linkProgram(shaderProgram);
  leftGL.useProgram(shaderProgram);

  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, vertex_buffer);
  var coordinate = leftGL.getAttribLocation(shaderProgram, "coordinates");
  leftGL.vertexAttribPointer(coordinate, 3, leftGL.FLOAT, false, 0, 0);
  leftGL.enableVertexAttribArray(coordinate);

  // Atribut pada vertex shader
  var Pmatrix = leftGL.getUniformLocation(shaderProgram, "Pmatrix");
  var Vmatrix = leftGL.getUniformLocation(shaderProgram, "Vmatrix");
  var Mmatrix = leftGL.getUniformLocation(shaderProgram, "Mmatrix");
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, vertex_buffer);

  var position = leftGL.getAttribLocation(shaderProgram, "position");
  leftGL.vertexAttribPointer(position, 3, leftGL.FLOAT, false,0,0) ; 
  leftGL.enableVertexAttribArray(position);
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, color_buffer);

  var color = leftGL.getAttribLocation(shaderProgram, "color");
  leftGL.vertexAttribPointer(color, 3, leftGL.FLOAT, false,0,0) ; 
  leftGL.enableVertexAttribArray(color);
  leftGL.useProgram(shaderProgram);

  //Matriks
  function get_projection(angle, a, zMin, zMax) 
  {
    var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
    return [
        0.5/ang, 0 , 0, 0,
        0, 0.5*a/ang, 0, 0,
        0, 0, -(zMax+zMin)/(zMax-zMin), -1,
        0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
        ];
  }

  var proj_matrix = get_projection(10, leftGL.canvas.width/leftGL.canvas.height, 1, 10);
  var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

  //translasi Z
  view_matrix[14] = view_matrix[14]-6; //zoom

  // Rotasi 
  function rotateZ(m, angle) 
  {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv0 = m[0], mv4 = m[4], mv8 = m[8]; 
    m[0] = c*m[0]-s*m[1];
    m[4] = c*m[4]-s*m[5];
    m[8] = c*m[8]-s*m[9];
    m[1] = c*m[1]+s*mv0;
    m[5] = c*m[5]+s*mv4;
    m[9] = c*m[9]+s*mv8;
  }

  //Drawing
  var time_old = 0;
  var animate = function(time) 
  {
    var dt = time_old-time;
    rotateZ(mov_matrix, dt*0.002);
    time_old = time;

    leftGL.enable(leftGL.DEPTH_TEST);
    leftGL.depthFunc(leftGL.LEQUAL);
    leftGL.clearColor(0.5, 0.5, 0.5, 0.9);
    leftGL.clearDepth(1.0);
    leftGL.viewport(0.0, 0.0, leftGL.canvas.width, leftGL.canvas.height);
    leftGL.clear(leftGL.COLOR_BUFFER_BIT | leftGL.DEPTH_BUFFER_BIT);

    leftGL.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    leftGL.uniformMatrix4fv(Vmatrix, false, view_matrix);
    leftGL.uniformMatrix4fv(Mmatrix, false, mov_matrix);

    leftGL.bindBuffer(leftGL.ELEMENT_ARRAY_BUFFER, index_buffer);
    leftGL.drawArrays(leftGL.TRIANGLES_FAN, 0, 6);
    leftGL.drawElements(leftGL.TRIANGLES, indices.length, leftGL.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(animate);
  }
  animate(0);

    
// ================================================================RIGHT CANVAS=======================================================================================//
    
      // Inisiasi VBO (Vertex Buffer Object)
      var rightVertexBuffer = rightGL.createBuffer();
      rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
      rightGL.bufferData(rightGL.ARRAY_BUFFER, new Float32Array(cubeVertices), rightGL.STATIC_DRAW);
      rightGL.bindBuffer(rightGL.ARRAY_BUFFER, null);
    
      // Definisi Shaders
    
      var rightVertexShaderCode = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        void main(void) {
          vColor = aColor;
          gl_Position = vec4(aPosition.xy, aPosition.z + 1.0, 1.0);
        }
      `
      var rightFragmentShaderCode = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0);
        }
      `
      // Proses kompilasi, penautan (linking), dan eksekusi Shaders
      var vertexShader = rightGL.createShader(rightGL.VERTEX_SHADER);
      rightGL.shaderSource(vertexShader, rightVertexShaderCode);
      rightGL.compileShader(vertexShader);
      var fragmentShader = rightGL.createShader(rightGL.FRAGMENT_SHADER);
      rightGL.shaderSource(fragmentShader, rightFragmentShaderCode);
      rightGL.compileShader(fragmentShader);
      var rightShaderProgram = rightGL.createProgram();
      rightGL.attachShader(rightShaderProgram, vertexShader);
      rightGL.attachShader(rightShaderProgram, fragmentShader);
      rightGL.linkProgram(rightShaderProgram);
      rightGL.useProgram(rightShaderProgram);
    
      // Pengikatan VBO dan pengarahan pointer atribut posisi dan warna
      rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
      var rightPosition = rightGL.getAttribLocation(rightShaderProgram, "aPosition");
      rightGL.vertexAttribPointer(rightPosition, 3, rightGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
      rightGL.enableVertexAttribArray(rightPosition);
      var color = rightGL.getAttribLocation(rightShaderProgram, "aColor");
      rightGL.vertexAttribPointer(color, 3, rightGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      rightGL.enableVertexAttribArray(color);
    
      // Persiapan tampilan layar dan mulai menggambar secara berulang (animasi)
      function render() {
        rightGL.clear(rightGL.COLOR_BUFFER_BIT | rightGL.DEPTH_BUFFER_BIT);
        rightGL.drawArrays(rightGL.TRIANGLES, 0, 48);
        requestAnimationFrame(render);
      }
      rightGL.clearColor(0.0, 0.0, 0.0, 1.0);
      rightGL.enable(rightGL.DEPTH_TEST);
      rightGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, rightGL.canvas.width, rightGL.canvas.width);
      render();
  }