function main() {

    // Inisiasi kanvas WebGL
    var leftCanvas = document.getElementById("leftCanvas");
    var rightCanvas = document.getElementById("rightCanvas");
    var leftGL = leftCanvas.getContext("webgl");
    var rightGL = rightCanvas.getContext("webgl");
  
    // Inisiasi verteks heksagonal
    var rectangleVertices =
     [  -0.6,   0.0,  
        -0.3,  -0.6,  
         0.3,  -0.6, 
         0.6,   0.0,  
         0.3,   0.6,
        -0.3,   0.6, 
    ];
  
    // Inisiasi verteks prisma
    var cubeVertices = [];
    var cubePoints = [
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
    var cubeColors = [
        [1.0, 0.0, 0.0],    // merah  //depan
        [1.0, 0.0, 0.0],    // merah
        [0.0, 1.0, 0.0],    // hijau
        [0.0, 1.0, 0.0],    // hijau
        [0.0, 0.0, 1.0],    // biru
        [1.0, 1.0, 0.0],    // kuning
        [1.0, 0.5, 0.0],    // oranye  //blkng
        [1.0, 0.5, 0.0],    // oranye
        [1.0, 1.0, 0.0],    // kuning
        [1.0, 1.0, 1.0],    // putih
        []
    ];

 
    function quad(a, b, c, d) {
        var indices = [a, b, c, c, d, a];
        for (var i=0; i<indices.length; i++) {
            for (var j=0; j<3; j++) {
                cubeVertices.push(cubePoints[indices[i]][j]);
            }
            for (var j=0; j<3; j++) {
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

  

  
    // Inisiasi VBO (Vertex Buffer Object)
    var leftVertexBuffer = leftGL.createBuffer();
    leftGL.bindBuffer(leftGL.ARRAY_BUFFER, leftVertexBuffer);
    leftGL.bufferData(leftGL.ARRAY_BUFFER, new Float32Array(rectangleVertices), leftGL.STATIC_DRAW);
    leftGL.bindBuffer(leftGL.ARRAY_BUFFER, null);
    var rightVertexBuffer = rightGL.createBuffer();
    rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
    rightGL.bufferData(rightGL.ARRAY_BUFFER, new Float32Array(cubeVertices), rightGL.STATIC_DRAW);
    rightGL.bindBuffer(rightGL.ARRAY_BUFFER, null);
  
    // Definisi Shaders
    var leftVertexShaderCode = `
    attribute vec2 aPosition;
    void main(void) {
      gl_Position = vec4(aPosition, -0.5, 1.0);
    }
  `
  var leftFragmentShaderCode = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0);
    }
  `
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
    var vertexShader = leftGL.createShader(leftGL.VERTEX_SHADER);
    leftGL.shaderSource(vertexShader, leftVertexShaderCode);
    leftGL.compileShader(vertexShader);
    var fragmentShader = leftGL.createShader(leftGL.FRAGMENT_SHADER);
    leftGL.shaderSource(fragmentShader, leftFragmentShaderCode);
    leftGL.compileShader(fragmentShader);
    var leftShaderProgram = leftGL.createProgram();
    leftGL.attachShader(leftShaderProgram, vertexShader);
    leftGL.attachShader(leftShaderProgram, fragmentShader);
    leftGL.linkProgram(leftShaderProgram);
    leftGL.useProgram(leftShaderProgram);
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
    leftGL.bindBuffer(leftGL.ARRAY_BUFFER, leftVertexBuffer);
    var leftPosition = leftGL.getAttribLocation(leftShaderProgram, "aPosition");
    leftGL.vertexAttribPointer(leftPosition, 2, leftGL.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    leftGL.enableVertexAttribArray(leftPosition);
    rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
    var rightPosition = rightGL.getAttribLocation(rightShaderProgram, "aPosition");
    rightGL.vertexAttribPointer(rightPosition, 3, rightGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    rightGL.enableVertexAttribArray(rightPosition);
    var color = rightGL.getAttribLocation(rightShaderProgram, "aColor");
    rightGL.vertexAttribPointer(color, 3, rightGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    rightGL.enableVertexAttribArray(color);
  
    // Persiapan tampilan layar dan mulai menggambar secara berulang (animasi)
    function render() {
      leftGL.clear(leftGL.COLOR_BUFFER_BIT);
      leftGL.drawArrays(leftGL.TRIANGLE_FAN, 0, 6);
      rightGL.clear(rightGL.COLOR_BUFFER_BIT | rightGL.DEPTH_BUFFER_BIT);
      rightGL.drawArrays(rightGL.TRIANGLES, 0, 48);
      requestAnimationFrame(render);
    }
    leftGL.clearColor(0.7, 0.7, 0.7, 1.0);
    leftGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, leftGL.canvas.width, leftGL.canvas.width);
    rightGL.clearColor(0.0, 0.0, 0.0, 1.0);
    rightGL.enable(rightGL.DEPTH_TEST);
    rightGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, rightGL.canvas.width, rightGL.canvas.width);
    render();
  }