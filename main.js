let full = false;
let resized = false;

function resize()
{
	var leftCanvas = document.getElementById("leftCanvas");
	var rightCanvas = document.getElementById("rightCanvas");
	leftCanvas.width = rightCanvas.width = window.innerWidth / 2 - 3;
	leftCanvas.height = rightCanvas.height = window.innerHeight;
	resized = true;
}

function fullscreen()
{
	if (full) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) { 
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) { 
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	} else {
		if (document.body.requestFullscreen) {
			document.body.requestFullscreen();
		} else if (document.body.mozRequestFullScreen) { 
			document.body.mozRequestFullScreen();
		} else if (document.body.webkitRequestFullscreen) { 
			document.body.webkitRequestFullscreen();
		} else if (document.body.msRequestFullscreen) { 
			document.body.msRequestFullscreen();
		}
	}
	full = !full;
}

function rotateX(matrix, theta) {
	theta = theta * Math.PI / 180;
	return multiply(matrix, [
		1, 0, 0, 0,
		0, Math.cos(theta), -Math.sin(theta), 0,
		0, Math.sin(theta), Math.cos(theta), 0,
		0, 0, 0, 1
	]);
}

function rotateY(matrix, theta) {
	theta = theta * Math.PI / 180;
	return multiply(matrix, [
		Math.cos(theta), 0, -Math.sin(theta), 0,
		0, 1, 0, 0,
		Math.sin(theta), 0, Math.cos(theta), 0,
		0, 0, 0, 1
	]);
}

function rotateZ(matrix, theta) {
	theta = theta * Math.PI / 180;
	return multiply(matrix, [
		Math.cos(theta), -Math.sin(theta), 0, 0,
		Math.sin(theta), Math.cos(theta), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	]);
}

function scale(matrix, x, y, z) {
	return multiply(matrix, [
		x, 0, 0, 0,
		0, y, 0, 0,
		0, 0, z, 0,
		0, 0, 0, 1
	]);
}

function translate(matrix, x, y, z) {
	return multiply(matrix, [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		x, y, z, 1
	]);
}

function multiply(a, b) {
	return [
		a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
		a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
		a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
		a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],
		a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
		a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
		a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
		a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],
		a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
		a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
		a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
		a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],
		a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
		a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
		a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
		a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
	];
}


function main()
{
	// Inisiasi kanvas WebGL
	var leftCanvas = document.getElementById("leftCanvas");
	var rightCanvas = document.getElementById("rightCanvas");
	var leftGL = leftCanvas.getContext("webgl");
	var rightGL = rightCanvas.getContext("webgl");
	resize();
	
	// Mendefinisikan objek
    var leftVertices = [];
    var rightVertices = [];
	var vertices = [
	[-0.6, 0.0, 0.1], //0
	[-0.3,-0.5, 0.1], //1
	[0.3, -0.5, 0.1], //2
	[0.6,  0.0, 0.1], //3
	[0.3,  0.5, 0.1], //4
	[-0.3, 0.5, 0.1], //5   depan
  
	[-0.6,  0.0,  0.0], // 6
	[-0.3, -0.5, 0.0], //7
	[0.3,  -0.5, 0.0], //8
	[0.6,   0.0, 0.0], //9
	[0.3,   0.5, 0.0], // 10
	[-0.3,  0.5, 0.0], // 11 belakang
  
	[-0.6,   0.0, 0.0], //12
	[-0.6,   0.0, 0.1],  //13
	[-0.3,  -0.5, 0.1],  //14
	[-0.3,  -0.5, 0.0],  //15 kiri bawah

	[-0.6,   0.0, 0.0], // 16
	[-0.6,   0.0, 0.1], // 17
	[-0.3,  0.5, 0.1],  // 18
	[-0.3,  0.5, 0.0],  // 19 kiri atas

	[0.6,   0.0, 0.0], // 20
	[0.6,   0.0, 0.1], // 21
	[0.3,  -0.5, 0.1], // 22
	[0.3,  -0.5, 0.0], // 23 kanan bawah

	[0.6,   0.0, 0.0], // 24
	[0.6,   0.0, 0.1], //25
	[0.3,   0.5, 0.1], //26
	[0.3,   0.5, 0.0], // 27kanan atas

	[-0.3,  0.5, 0.0], // 28 atas
	[-0.3,  0.5,0.1],  // 29
	[0.3,  0.5,0.1],   // 30
	[0.3,  0.5, 0.0],  // 31

	[-0.3,  -0.5, 0.0], // 32bawah
	[-0.3,  -0.5, 0.1], // 33
	[0.3,  -0.5, 0.1],  //34
	[0.3,  -0.5, 0.0],  //35

	[-0.41195,  0.14783, 0.1001], //36
	[-0.41195, -0.05598, 0.1001], //37
	[-0.37541, -0.05405, 0.1001], //38
	[-0.37734,  0.14591, 0.1001], //39
	[-0.35466, 0.14847,0.1001],  //40
	[-0.35166, -0.05738 ,0.1001],//41
	[-0.31559, -0.05738,0.1001], //42
	[-0.3186, 0.05381,0.1001],   //43
	[-0.24948, 0.05381,0.1001],  //44
	[-0.24948, 0.08236,0.1001],  //45
	[-0.31559, 0.08386,0.1001],  //46
	[-0.31559, 0.12143,0.1001],  //47
	[-0.19539, 0.11842,0.1001],  //48
	[-0.1984,0.14847,0.1001],    //49
	[-0.17642, 0.03631 , 0.1001],  //50
	[-0.1771, 0.01089 , 0.1001],//51
	[-0.09946, 0.00883 , 0.1001], //52
	[-0.09912, 0.03494 , 0.1001], //53
	[-0.03754, 0.13413, 0.1001], //54
	[-0.03754, 0.1117, 0.1001],//55
	[-0.00648 , 0.1117, 0.1001], //56
	[-0.00648, -0.06084, 0.1001],//57
	[0.02458, -0.06256, 0.1001], //58
	[0.02458, 0.14103, 0.1001], //59 
	[0.06426, 0.13672, 0.1001],  //60
	[0.06426, -0.06084, 0.1001], //61
	[0.22644, -0.0617, 0.1001],  //62
	[0.22385, 0.13499, 0.1001],  //63
	[0.09273, 0.10997, 0.1001],  //64
	[0.09532, -0.03064, 0.1001], //65
	[0.19366,-0.02978, 0.1001],  //66
	[0.19366, 0.10825, 0.1001],  //67
	[0.42634, 0.1396,  0.1001],   // 68
	[0.25155, 0.13839, 0.1001],  //69
	[0.25396, -0.05689, 0.1001], //70
	[0.42392, -0.06171, 0.1001],  //71
	[0.42392, 0.05883, 0.1001],   //72
	[0.27927, 0.05883, 0.1001],   //73
	[0.27927, 0.10464, 0.1001],   //74
	[0.42634, 0.10585, 0.1001],   //75
	[0.28169, 0.02629, 0.1001],   //76
	[0.28289, -0.02434, 0.1001],   //77
	[0.39258, -0.02796, 0.1001],   //78
	[0.39138, 0.02629, 0.1001],   //79
	[-0.41195,  0.14783, -0.0001], //80
	[-0.41195, -0.05598, -0.0001], //81
	[-0.37541, -0.05405, -0.0001], //82
	[-0.37734,  0.14591, -0.0001], //83
	[-0.35466, 0.14847, -0.0001],  //84
	[-0.35166, -0.05738 , -0.001],//85
	[-0.31559, -0.05738,-0.001], //86
	[-0.3186, 0.05381,-0.001],   //87
	[-0.24948, 0.05381,-0.001],  //88
	[-0.24948, 0.08236,-0.001],  //89
	[-0.31559, 0.08386,-0.001],  //90
	[-0.31559, 0.12143,-0.001],  //91
	[-0.19539, 0.11842,-0.001],  //92
	[-0.1984,0.14847,-0.001],    //93
	[-0.17642, 0.03631 , -0.001],  //94
	[-0.1771, 0.01089 , -0.001],//95
	[-0.09946, 0.00883 , -0.001], //96
	[-0.09912, 0.03494 , -0.001], //97
	[-0.03754, 0.13413, -0.001], //98
	[-0.03754, 0.1117, -0.001],//99
	[-0.00648 , 0.1117, -0.001], //100
	[-0.00648, -0.06084, -0.001],//101
	[0.02458, -0.06256, -0.001], //102
	[0.02458, 0.14103, -0.001], //103
	[0.06426, 0.13672, -0.001],  //104
	[0.06426, -0.06084, -0.001], //105
	[0.22644, -0.0617, -0.001],  //106
	[0.22385, 0.13499, -0.001],  //107
	[0.09273, 0.10997, -0.001],  //108
	[0.09532, -0.03064, -0.001], //109
	[0.19366,-0.02978, -0.001],  //110
	[0.19366, 0.10825, -0.001],  //111
	[0.42634, 0.1396,  -0.001],   //112
	[0.25155, 0.13839, -0.001],  //113
	[0.25396, -0.05689, -0.001], //114
	[0.42392, -0.06171, -0.001],  //115
	[0.42392, 0.05883, -0.001],   //116
	[0.27927, 0.05883, -0.001],   //117
	[0.27927, 0.10464, -0.001],   //118
	[0.42634, 0.10585, -0.001],   //119
	[0.28169, 0.02629, -0.001],   //120
	[0.28289, -0.02434, -0.001],   //121
	[0.39258, -0.02796, -0.001],   //122
	[0.39138, 0.02629, -0.001],   //123

	[-0.5,-0.5,-0.5], // 124
	[-0.5,-0.4,0.5], // 125
	[0.5,-0.4,0.5], // 126
	[0.5,-0.5,-0.5] // 127

	];




	var colors = [
		[0,0,0] , [0,0,0] , [0,0,0], [1,0,0], [0,0,0], [0,0,0],  [0,0,0], 
		[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24],
		[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24], 
		[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] , [ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24],
		[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24],
		[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24],
		[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24],
		[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24] ,[ 0.24, 0.24, 0.24],
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1], [1,1,1],
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],   
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1] , [1,1,1],
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1], [1,1,1],
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1], 
		[1,1,1],  [1,1,1],  [1,1,1],  [1,1,1],  [1,1,1], [1,1,1], 
		//nrp 053  rgb 5, 48, 83 per 225
		[5/225, 48/225 ,83/225 ], [5/225, 48/225 ,83/225 ], [5/225, 48/225 ,83/225 ], [5/225, 48/225 ,83/225 ]
	
	];
	
	
	function isi(a,b,c,d)
	{
		var indices = [ a,b,c,c,d,a ];
		for (var i=0; i<indices.length; i++) {
			for (var j=0; j<3; j++) {
				leftVertices.push(vertices[indices[i]][j]);
				rightVertices.push(vertices[indices[i]][j])
			}
			//memasukkan warna
			for (var j=0;j<3;j++) {
				leftVertices.push(colors[a][j]);
				rightVertices.push(colors[a][j]);
			}
		}
	}

	isi(124,125,126,127);
	
	  function isikanan(a,b,c,d)
	  {
		var indices = [ a,b,c,c,d,a ];
		for (var i=0; i<indices.length; i++) {
            for (var j=0; j<3; j++) {
				rightVertices.push(vertices[indices[i]][j])
			}
            //memasukkan warna
            for (var j=0;j<3;j++) {
				rightVertices.push(colors[a][j]);
            }
        }
	  }

	  function isikiri(a,b,c,d)
	  {
		  var indices = [ a,b,c,c,d,a ];
		  for (var i=0; i<indices.length; i++) {
			  for (var j=0; j<3; j++) {
				  leftVertices.push(vertices[indices[i]][j])
				}
				//memasukkan warna
				for (var j=0;j<3;j++) {
					leftVertices.push(colors[a][j]);
				}
        }
	  }

	isikanan(0,1,2,3); //depan bawah
	isikanan(0,5,4,3);  //depan atas
	isikanan(6,7,8,9);  // belakang bawah
	isikanan(6,11,10,9); // belakang atas
	isikanan(12,13,14,15); // kiri bawah
	isikanan(16,17,18,19); // kiri atas
	isikanan(20,21,22,23); // kanan bawah 
	isikanan(24,25,26,27); // kanan atas
	isikanan(28,29,30,31); // atas
	isikanan(32,33,34,35); // bawah
	isikanan(36,37,38,39); 
	isikanan(40,41,42,47); 
	isikanan(43,44,45,46);
	isikanan(47,48,49,40);
	isikanan(50,51,52,53); 
	isikanan(54,55,56,59); 
	isikanan(56,57,58,59);
	isikanan(60,61,65,64); 
	isikanan(61,62,66,65);
	isikanan(62,63,67,66);
	isikanan(63,60,64,67); 
	isikanan(68,69,74,75); 
	isikanan(70,71,78,77);
	isikanan(69,70,77,74);
	isikanan(71,72,79,78);
	isikanan(72,73,76,79);
	isikiri(0,1,2,3); //depan bawah
	isikiri(0,5,4,3);  //depan atas
	isikiri(6,7,8,9);  // belakang bawah
	isikiri(6,11,10,9); // belakang atas
	isikiri(12,13,14,15); // kiri bawah
	isikiri(16,17,18,19); // kiri atas
	isikiri(20,21,22,23); // kanan bawah 
	isikiri(24,25,26,27); // kanan atas
	isikiri(28,29,30,31); // atas
	isikiri(32,33,34,35); // bawah
	isikiri(80,81,82,83);
	isikiri(84,85,86,91); // f
	isikiri(87,88,89,90);
	isikiri(91,92,93,84);
	isikiri(94,95,96,97); // strip
	isikiri(98,99,100,103); // 1
	isikiri(100,101,102,103);
	isikiri(104,105,109,108); //0
	isikiri(105,106,110,109);
	isikiri(106,107,111,110);
	isikiri(107,104,108,111); 
	isikiri(112,113,118,119); //6
	isikiri(114,115,122,121);
	isikiri(113,114,121,118);
	isikiri(115,116,123,122);
	isikiri(116,117,120,123);



	//===================================================LEFT CANVAS ===================================================================//

	var leftVertexBuffer = leftGL.createBuffer();
	leftGL.bindBuffer(leftGL.ARRAY_BUFFER, leftVertexBuffer);
	leftGL.bufferData(leftGL.ARRAY_BUFFER, new Float32Array(leftVertices), leftGL.STATIC_DRAW);
	leftGL.bindBuffer(leftGL.ARRAY_BUFFER, null);
	
	var leftVertexShaderCode = 
	'attribute vec3 aPosition;'+
	'attribute vec3 aColor;'+
	'uniform mat4 aMatrix;'+
	'varying vec3 vColor;'+
	'varying vec3 vLighting;'+
	'void main(void) {'+
		'vColor = aColor;'+
		'vec3 ambientLight = vec3(0.2,0.2,0.2);'+
		'gl_Position =  aMatrix * vec4(aPosition, 1.0);'+
		'vLighting = ambientLight;'+
	'}';
	
	var leftFragmentShaderCode = 
	'precision mediump float;'+
	'varying vec3 vColor;'+
	'varying vec3 vLighting;'+
	'void main() {'+
	'gl_FragColor = vec4(vColor*vLighting, 1.0);'+
	'}';

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
	leftGL.bindBuffer(leftGL.ARRAY_BUFFER, leftVertexBuffer);
	var leftPosition = leftGL.getAttribLocation(leftShaderProgram, "aPosition");
	leftGL.vertexAttribPointer(leftPosition, 3, leftGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
	leftGL.enableVertexAttribArray(leftPosition);
	var leftColor = leftGL.getAttribLocation(leftShaderProgram, "aColor");
	leftGL.vertexAttribPointer(leftColor, 3, leftGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
	leftGL.enableVertexAttribArray(leftColor);


	//=======================================================RIGHT CANVAS===================================================================//
	var rightVertexBuffer = rightGL.createBuffer();
	rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
	rightGL.bufferData(rightGL.ARRAY_BUFFER, new Float32Array(rightVertices), rightGL.STATIC_DRAW);
	rightGL.bindBuffer(rightGL.ARRAY_BUFFER, null);
	
	var rightVertexShaderCode = 
	'attribute vec3 aPosition;'+
	'attribute vec3 aColor;'+
	'varying vec3 vLighting;'+
	'uniform mat4 bMatrix;'+
	'uniform mat4 aMatrix;'+
	'varying vec3 vColor;'+
	'void main(void) {'+
		'vColor = aColor;'+
		'vec3 ambientLight = vec3(0.2,0.2,0.2);'+
		'gl_Position = bMatrix * aMatrix * vec4(aPosition, 1.0);'+
		'vLighting = ambientLight;'+
	'}';
	
	var rightFragmentShaderCode = 
	'precision mediump float;' +
	'varying vec3 vColor;'+
	'varying vec3 vLighting;'+
	'void main() {'+
	'gl_FragColor = vec4(vColor*vLighting, 1.0);'+
	'}'
	;
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
	rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
	var rightPosition = rightGL.getAttribLocation(rightShaderProgram, "aPosition");
	rightGL.vertexAttribPointer(rightPosition, 3, rightGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
	rightGL.enableVertexAttribArray(rightPosition);
	var rightColor = rightGL.getAttribLocation(rightShaderProgram, "aColor");
	rightGL.vertexAttribPointer(rightColor, 3, rightGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
	rightGL.enableVertexAttribArray(rightColor);
	
//=============================================================================================================================================//
	
	var n = 1, f = 50, fov = 60;
	var r = n * Math.tan(0.5 * fov * Math.PI / 180);
	var getProjection = [
		n/r, 0, 0, 0,
		0, n/r, 0, 0,
		0, 0, -(f+n)/(f-n), -1,
		0, 0, -2*f*n/(f-n), 0
	];
	var projection = rightGL.getUniformLocation(rightShaderProgram, "bMatrix");
	rightGL.uniformMatrix4fv(projection, false, new Float32Array(getProjection));
	
	var rotX = 0, rotY = 0, rotZ = 0;
	function animate() {
		if (resized) {
			leftGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, leftGL.canvas.width, leftGL.canvas.width);
			rightGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, rightGL.canvas.width, rightGL.canvas.width);
			resized = false;
		}
		// rotX += 0.25;
		// rotY += 0.75;
		// rotZ += 0.5;
		// if (rotX > 360) rotX -= 360;
		// if (rotY > 360) rotY -= 360;
		// if (rotZ > 360) rotZ -= 360;

		var mov_matrixL = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
		mov_matrixL = rotateZ(mov_matrixL, rotZ);
		var matrixL = leftGL.getUniformLocation(leftShaderProgram, "aMatrix");
		leftGL.uniformMatrix4fv(matrixL, false, new Float32Array(mov_matrixL));
		
		var mov_matrixR = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
		mov_matrixR = rotateX(mov_matrixR, rotX);
		mov_matrixR = rotateY(mov_matrixR, rotY);
		mov_matrixR = scale(mov_matrixR, 2, 2, 2);
		mov_matrixR = translate(mov_matrixR, 0, 0, -4);
		var matrixR = rightGL.getUniformLocation(rightShaderProgram, "aMatrix");
		rightGL.uniformMatrix4fv(matrixR, false, new Float32Array(mov_matrixR));
		
		leftGL.clear(leftGL.COLOR_BUFFER_BIT | leftGL.DEPTH_BUFFER_BIT);
		leftGL.drawArrays(leftGL.TRIANGLES, 0, leftVertices.length);
		leftGL.enable(leftGL.DEPTH_TEST);
		leftGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, leftGL.canvas.width, leftGL.canvas.width);
		leftGL.clearColor(0.5, 0.5, 0.5, 0.9);

		rightGL.clear(rightGL.COLOR_BUFFER_BIT | rightGL.DEPTH_BUFFER_BIT);
		rightGL.drawArrays(rightGL.TRIANGLES, 0, rightVertices.length);
		rightGL.enable(rightGL.DEPTH_TEST);
		rightGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, rightGL.canvas.width, rightGL.canvas.width);
		rightGL.clearColor(0.5, 0.5, 0.5, 0.9);
		requestAnimationFrame(animate);
	}
	animate();
}