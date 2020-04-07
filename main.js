let full = false;
let resized = false;

function main() 
{
    // Inisiasi kanvas WebGL
    var leftCanvas = document.getElementById("leftCanvas");
    var rightCanvas = document.getElementById("rightCanvas");
    var leftGL = leftCanvas.getContext("webgl");
    var rightGL = rightCanvas.getContext("webgl");
    resize();


    // Mendefinisikan objek
    var cubeVertices = 
    [    
      -0.6,   0.0,  0.1, //0
      -0.3,  -0.5,  0.1, //1
      0.3,  -0.5,  0.1, //2
      0.6,   0.0,  0.1, //3
      0.3,   0.5,  0.1, //4
      -0.3,   0.5, 0.1, //5   depan

      -0.6,  0.0, 0.0, // 6
      -0.3,  -0.5, 0.0, //7
      0.3,  -0.5, 0.0, //8
      0.6,   0.0, 0.0, //9
      0.3,   0.5, 0.0, // 10
      -0.3,  0.5, 0.0, // 11 belakang


      -0.6,   0.0, 0.0, //12
      -0.6,   0.0,  0.1,  //13
      -0.3,  -0.5,  0.1,  //14
      -0.3,  -0.5, 0.0,  //15 kiri bawah


      -0.6,   0.0, 0.0, // 16
      -0.6,   0.0,  0.1, // 17
      -0.3,  0.5,  0.1,  // 18
      -0.3,  0.5, 0.0,  // 19 kiri atas

      0.6,   0.0, 0.0, // 20
      0.6,   0.0,  0.1, // 21
      0.3,  -0.5,  0.1, // 22
      0.3,  -0.5, 0.0,  // 23 kanan bawah

      0.6,   0.0, 0.0, // 24
      0.6,   0.0,  0.1, //25
      0.3,   0.5,  0.1, //26
      0.3,   0.5, 0.0,  // 27kanan atas

      -0.3,  0.5, 0.0, // 28 atas
      -0.3,  0.5, 0.1,// 29
      0.3,  0.5, 0.1,// 30
      0.3,  0.5, 0.0, // 31

      -0.3,  -0.5, 0.0, // 32bawah
      -0.3,  -0.5,  0.1,// 33
      0.3,  -0.5,  0.1, //34
      0.3,  -0.5, 0.0, //35

      // i
      -0.41195,     0.14783, 0.1,//36
      -0.41195,   -0.05598, 0.1, //37
       -0.37541,   -0.05405, 0.1, //38
      -0.37734,   0.14591, 0.1,  //39
     
      // f
      -0.35466, 0.14847, 0.1,   //40
      -0.35166, -0.05738 ,0.1,//41
      -0.31559, -0.05738,0.1, //42
      -0.3186, 0.05381,0.1, //43
      -0.24948, 0.05381,0.1, //44
      -0.24948, 0.08236,0.1, //45
      -0.31559, 0.08386,0.1, //46
      -0.31559, 0.12143,0.1, //47
      -0.19539, 0.11842,0.1, //48
      -0.1984, 0.14847, 0.1, //49


      // strip
      -0.17642, 0.03631 ,0.1,  //50
      -0.1771, 0.01089 ,0.1,//51
      -0.09946, 0.00883 ,0.1, //52
      -0.09912, 0.03494 , 0.1, //53

      //1
      -0.03754, 0.13413, 0.1, //54
      -0.03754, 0.1117, 0.1,//55
      -0.00648 , 0.1117, 0.1, //56
      -0.00648, -0.06084, 0.1,//57
      0.02458, -0.06256, 0.1, //58
      0.02458, 0.14103, 0.1, //59 

      // 0
      0.06426, 0.13672, 0.1, //60
      0.06426, -0.06084, 0.1, //61
      0.22644, -0.0617, 0.1,//62
      0.22385, 0.13499, 0.1,//63
      0.09273, 0.10997, 0.1,//64
      0.09532, -0.03064, 0.1,//65
      0.19366,-0.02978, 0.1,//66
      0.19366, 0.10825, 0.1,//67

      //6
      0.42634, 0.1396, 0.1,     // 68
      0.25155, 0.13839, 0.1,    //69
      0.25396, -0.05689, 0.1,   //70
      0.42392, -0.06171, 0.1,  //71
      0.42392, 0.05883, 0.1,   //72
      0.27927, 0.05883, 0.1,   //73
      0.27927, 0.10464, 0.1,   //74
      0.42634, 0.10585, 0.1,   //75
      0.28169, 0.02629, 0.1,   //76
      0.28289, -0.02434, 0.1,   //77
      0.39258, -0.02796, 0.1,   //78
      0.39138, 0.02629, 0.1,   //79


      ];

      var cubeColors = [ 
        0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0,
        0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 
        0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24,
        0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24,
        0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24,
        0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24,
        0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24,
        0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24, 0.24,
        1,1,1,1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1,
        1,1,1,1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1,
        1,1,1,1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1,
        1,1,1,1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1,
        1,1,1,1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1,
        1,1,1,1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1,1,1,1, 1,1,1, 1,1,1, 1,1,1,
      ]; 
      var indices = [ 
        0, 1, 2, 2, 3, 0, 0, 5, 4, 4, 3, 0,
        6, 7, 8, 8, 9, 6, 6, 11, 10, 10, 9,6,
        12, 13, 14, 14, 15, 12,
        16, 17, 18, 18, 19, 16,
        20, 21, 22, 22, 23, 20,
        24, 25, 26, 26, 27, 24,
        28, 29, 30, 30, 31, 28,
        32, 33, 34, 34, 35, 32,
        36,37,38,38,39,36,
        40,41,42,42,47,40, 43,44,45,45,46,43, 47,48,49,49,40,47,
        50,51,52,52,53,50,
        54,55,56,56,59,54, 56,57,58,58,59,56,
        60,61,65,65,64,60, 61,62,66,66,65,61, 62,63,67,67,66,62, 63,60,64,64,67,63,
        68,69,74,74,75,68, 70,71,78,78,77,70, 69,70,77,77,74,69, 71,72,79,79,78,71, 72,73,76,76,79,72

      ];


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
        'gl_PointSize = 1.0;' +
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


   // ================================================================RIGHT CANVAS=======================================================================================//
  
    // Create and store data into vertex buffer
    var rightVertexBuffer = rightGL.createBuffer ();
    rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
    rightGL.bufferData(rightGL.ARRAY_BUFFER, new Float32Array(cubeVertices), rightGL.STATIC_DRAW);

    // Create and store data into color buffer
    var rightColorBuffer = rightGL.createBuffer ();
    rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightColorBuffer);
    rightGL.bufferData(rightGL.ARRAY_BUFFER, new Float32Array(cubeColors), rightGL.STATIC_DRAW);

    // Create and store data into index buffer
    var rightIndexBuffer = rightGL.createBuffer ();
    rightGL.bindBuffer(rightGL.ELEMENT_ARRAY_BUFFER, rightIndexBuffer);
    rightGL.bufferData(rightGL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), rightGL.STATIC_DRAW);

    /*=================== Shaders =========================*/

    var rightVertexShaderCode = 'attribute vec3 position;'+
        'uniform mat4 Amatrix;'+
        'uniform mat4 Bmatrix;'+
        'uniform mat4 Cmatrix;'+
        'attribute vec3 color;'+//the color of the point
        'varying vec3 vColor;'+

        'void main(void) { '+//pre-built function
          'gl_Position = Amatrix*Bmatrix*Cmatrix*vec4(position, 1.);'+
          'vColor = color;'+
        '}';

    var rightFragmentShaderCode = 'precision mediump float;'+
        'varying vec3 vColor;'+
        'void main(void) {'+
          'gl_FragColor = vec4(vColor, 1.);'+
        '}';

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

    /* ====== Associating attributes to vertex shader =====*/
    var Amatrix = rightGL.getUniformLocation(rightShaderProgram, "Amatrix");
    var Bmatrix = rightGL.getUniformLocation(rightShaderProgram, "Bmatrix");
    var Cmatrix = rightGL.getUniformLocation(rightShaderProgram, "Cmatrix");

    rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
    var position = rightGL.getAttribLocation(rightShaderProgram, "position");
    rightGL.vertexAttribPointer(position, 3, rightGL.FLOAT, false,0,0) ;

    // Position
    rightGL.enableVertexAttribArray(position);
    rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightColorBuffer);
    var color = rightGL.getAttribLocation(rightShaderProgram, "color");
    rightGL.vertexAttribPointer(color, 3, rightGL.FLOAT, false,0,0) ;

    // Color
    rightGL.enableVertexAttribArray(color);
    rightGL.useProgram(rightShaderProgram);
 
   //===================================================================================================================================//
    
   
   //Matriks
    function get_projection(angle, a, zMin, zMax) 
    {
      var ang = Math.tan((angle/6)*Math.PI/180);
      return [
          1.0/ang, 0 , 0, 0,
          0, 1.0*a/ang, 0, 0,
          0, 0, -(zMax+zMin)/(zMax-zMin), -1,
          0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
          ];
    }

    var proj_matrixL = get_projection(60, leftGL.canvas.width/leftGL.canvas.height, 1, 50);
    var proj_matrixR = get_projection(60, rightGL.canvas.width/rightGL.canvas.height, 1, 50);

    var mov_matrixL = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    var mov_matrixR = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
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

    function rotateX(m, angle) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var mv1 = m[1], mv5 = m[5], mv9 = m[9];

      m[1] = m[1]*c-m[2]*s;
      m[5] = m[5]*c-m[6]*s;
      m[9] = m[9]*c-m[10]*s;

      m[2] = m[2]*c+mv1*s;
      m[6] = m[6]*c+mv5*s;
      m[10] = m[10]*c+mv9*s;
   }

  function rotateY(m, angle) {
      var c = Math.cos(angle);
      var s = Math.sin(angle);
      var mv0 = m[0], mv4 = m[4], mv8 = m[8];

      m[0] = c*m[0]+s*m[2];
      m[4] = c*m[4]+s*m[6];
      m[8] = c*m[8]+s*m[10];

      m[2] = c*m[2]-s*mv0;
      m[6] = c*m[6]-s*mv4;
      m[10] = c*m[10]-s*mv8;
   }

    //Drawing 
    var time_old = 0;
    var animate = function(time) 
    {

      if (resized) 
      {
        leftGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, leftGL.canvas.width, leftGL.canvas.width);
        rightGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, rightGL.canvas.width, rightGL.canvas.width);
        resized = false;
      }

      var dt = time_old-time;
      var dt2 = time - time_old;
      rotateZ(mov_matrixL, dt*0.0005);
      rotateZ(mov_matrixR, dt*0.0005);
      rotateY(mov_matrixR, dt2*0.00075);
      rotateX(mov_matrixR, dt*0.00025);

      time_old = time;

      leftGL.enable(leftGL.DEPTH_TEST);
      leftGL.depthFunc(leftGL.LEQUAL);
      leftGL.clearColor(0.5, 0.5, 0.5, 0.9);
      leftGL.clearDepth(1.0);
      leftGL.viewport(0.0, 0.0, leftGL.canvas.width, leftGL.canvas.height);
      leftGL.clear(leftGL.COLOR_BUFFER_BIT | leftGL.DEPTH_BUFFER_BIT);
      leftGL.uniformMatrix4fv(Pmatrix, false, proj_matrixL);
      leftGL.uniformMatrix4fv(Vmatrix, false, view_matrix);
      leftGL.uniformMatrix4fv(Mmatrix, false, mov_matrixL);
      leftGL.bindBuffer(leftGL.ELEMENT_ARRAY_BUFFER, index_buffer);
      leftGL.drawElements(leftGL.TRIANGLES, indices.length, leftGL.UNSIGNED_SHORT, 0);


      rightGL.enable(rightGL.DEPTH_TEST);
      rightGL.depthFunc(rightGL.LEQUAL);
      rightGL.clearColor(0.5, 0.5, 0.5, 0.9);
      rightGL.clearDepth(1.0);

      rightGL.viewport(0.0, 0.0, rightGL.canvas.width, rightGL.canvas.height);
      rightGL.clear(rightGL.COLOR_BUFFER_BIT | rightGL.DEPTH_BUFFER_BIT);
      rightGL.uniformMatrix4fv(Amatrix, false, proj_matrixR);
      rightGL.uniformMatrix4fv(Bmatrix, false, view_matrix);
      rightGL.uniformMatrix4fv(Cmatrix, false, mov_matrixR);
      rightGL.bindBuffer(rightGL.ELEMENT_ARRAY_BUFFER, rightIndexBuffer);
      rightGL.drawElements(rightGL.TRIANGLES, indices.length, rightGL.UNSIGNED_SHORT, 0);
      window.requestAnimationFrame(animate);
    }
    animate(0);


  }

    function resize() {
      var leftCanvas = document.getElementById("leftCanvas");
      var rightCanvas = document.getElementById("rightCanvas");
      leftCanvas.width = rightCanvas.width = window.innerWidth / 2 - 3;
      leftCanvas.height = rightCanvas.height = window.innerHeight;
      resized = true;
    }
    
    function fullscreen() 
    {
      if (full) 
      {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
        }
      } 
      else 
      {
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen();
        } else if (document.body.mozRequestFullScreen) { /* Firefox */
          document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) { /* IE/Edge */
          document.body.msRequestFullscreen();
        }
      }
      full = !full;
    }