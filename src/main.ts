import {VertexAttributes} from './vertex-attributes';
import {VertexArray} from './vertex-array';
import {ShaderProgram} from './shader-program';
import {Trimesh} from './trimesh';
import {Matrix4} from './matrix';
import {Vector3} from './vector';
import { FirstPersonCamera } from './first-person-camera';
import * as gltf from './gltf';

let canvas: HTMLCanvasElement;
let vao: VertexArray;
let shader: ShaderProgram;
let attributes: VertexAttributes;
let object: Trimesh;
let backgroundColor = new Vector3(0.3, 0.0, 0.4);
let camera: FirstPersonCamera;
let moveDelta: number;
let turnDelta: number;

let worldFromModel: Matrix4;
let eyeFromWorld: Matrix4;
let clipFromEye: Matrix4;

async function initialize() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    window.gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
<<<<<<< HEAD
    //gl.enable(gl.DEPTH_TEST);

    //object = await Trimesh.readFromGltf('donut2.gltf');

    initializeShader();
	let combined_positions = []
	let combined_normals = []
	let combined_indices = []
	let model = await gltf.readModel('./donut_separate.gltf')
	console.log(model)
	attributes = new VertexAttributes();
	let x = 1
	for (let m of model.meshes) {
		console.log(m)
		console.log(x++)
		let offset = combined_positions.length / 3
		if (m.positions) {
			for (let p of m.positions.buffer) {
				combined_positions.push(p)
			}
		}
		if (m.normals) {
			for (let n of m.normals.buffer) {
				combined_normals.push(n)
			}
		}
		if (m.indices) {
			for (let i of m.indices.buffer) {
				combined_indices.push(i + offset)
			}
		}
		
	}
	attributes.addAttribute('position', combined_positions.length / 3, 3, combined_positions);
	attributes.addAttribute('normal', combined_normals.length / 3, 3, combined_normals);
	attributes.addIndices(combined_indices);
	vao = new VertexArray(shader, attributes);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);


    let from = new Vector3(0, 0, 10);
	let to = new Vector3(0, 0, -5);
	camera = new FirstPersonCamera(from, to, new Vector3(0, 1, 0));
=======
    gl.enable(gl.DEPTH_TEST);
    
    box = await Trimesh.readFromGltf('box.gltf');
>>>>>>> f24e69bfa596eed54b6da6e267af345bca497f1c
    
    let aspectRatio = canvas.width / canvas.height;
    worldFromModel = Matrix4.identity();
    eyeFromWorld = Matrix4.translate(0, 0, -150);
    clipFromEye = Matrix4.perspective(45, aspectRatio, 0.001, 100000);
    
    console.log(`${worldFromModel}`);
    console.log(`${eyeFromWorld}`);
    console.log(`${clipFromEye}`);
    // Initialize other graphics state as needed.
    //initializeShader();
    //initializeShape();

    // Event listeners
    window.addEventListener('resize', () => resizeCanvas());

    moveDelta = 1;
	turnDelta = 1;

	registerListeners();
    resizeCanvas();  
    // animate();
}

function animate() {
<<<<<<< HEAD
    worldFromModel = Matrix4.rotateY(1).multiplyMatrix(worldFromModel);
    camera.strafe(horizontal * moveDelta);
	camera.advance(vertical * moveDelta);
	camera.yaw(turn * turnDelta);
=======
    worldFromModel = Matrix4.rotateZ(1).multiplyMatrix(Matrix4.rotateY(1).multiplyMatrix(worldFromModel));
>>>>>>> f24e69bfa596eed54b6da6e267af345bca497f1c
    render();
    requestAnimationFrame(animate);
}

function render() {
    // gl.viewport(0, 0, canvas.width, canvas.height);
	// gl.clearColor(backgroundColor.x, backgroundColor.y, backgroundColor.z, 1);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
<<<<<<< HEAD
    // shader.bind();
    
    // shader.setUniformMatrix4fv('worldFromModel', worldFromModel.toFloats());
    // shader.setUniformMatrix4fv('eyeFromWorld', eyeFromWorld.toFloats());
    // shader.setUniformMatrix4fv('clipFromEye', clipFromEye.toFloats());

    // vao.bind();
    // vao.drawIndexed(gl.TRIANGLES);
    // vao.unbind();

    // shader.unbind();

    gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(backgroundColor.x, backgroundColor.y, backgroundColor.z, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//console.log(`${camera.eyeFromWorld}`);

	shader.bind();
	shader.setUniformMatrix4fv('clipFromEye', clipFromEye.toFloats());
	shader.setUniformMatrix4fv('eyeFromWorld', camera.eyeFromWorld.toFloats());
	shader.setUniformMatrix4fv('worldFromModel', worldFromModel.toFloats());
	vao.bind();
	vao.drawIndexed(gl.TRIANGLES);
	vao.unbind();
	shader.unbind();
}

function registerListeners() {
	window.addEventListener('resize', resizeCanvas);
	window.addEventListener('keydown', onKeyDown);
	//window.addEventListener('keyup', onKeyUp)
=======
    shader.setUniformMatrix4fv('eyeFromWorld', eyeFromWorld.toFloats());
    shader.setUniformMatrix4fv('clipFromEye', clipFromEye.toFloats());

    renderMengerSponge(3, 0, 0, 0);

    shader.unbind();
}

function renderCube(x: number, y: number, z: number) {
    let worldFromModelActual = worldFromModel.multiplyMatrix(Matrix4.translate(x, y, z));
    shader.setUniformMatrix4fv('worldFromModel', worldFromModelActual.toFloats());
    vao.bind();
    vao.drawIndexed(gl.TRIANGLES);
    vao.unbind();
}

function renderMengerSponge(depth: number, x: number, y: number, z: number) {
    if (depth === 1) {
        const offsets = [-2, 0, 2];
        for (const x_offset of offsets) {
            for (const y_offset of offsets) {
                if (x_offset === 0 && y_offset === 0) {
                    continue;
                }
                for (const z_offset of offsets) {
                    if ((x_offset === 0 && z_offset === 0) || (y_offset === 0 && z_offset === 0)) {
                        continue;
                    }

                    renderCube(x + x_offset, y + y_offset, z + z_offset);
                }
            }
        }
    } else {
        const offset = 2 * Math.pow(3, depth-1);
        const offsets = [-offset, 0, offset]

        for (const x_offset of offsets) {
            for (const y_offset of offsets) {
                if (x_offset === 0 && y_offset === 0) {
                    continue;
                }
                for (const z_offset of offsets) {
                    if ((x_offset === 0 && z_offset === 0) || (y_offset === 0 && z_offset === 0)) {
                        continue;
                    }

                    renderMengerSponge(depth - 1, x + x_offset, y + y_offset, z + z_offset);
                }
            }
        }
    }
>>>>>>> f24e69bfa596eed54b6da6e267af345bca497f1c
}

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    render();
}

let horizontal = 0;
let vertical = 0;
let turn = 0;

function onKeyDown(event: KeyboardEvent) {
	const key = event.key;

	if (key === 'w' || key === 'ArrowUp') {
		camera.advance(moveDelta);
	} else if (key === 's' || key === 'ArrowDown') {
		camera.advance(-moveDelta);
	} else if (key === 'a' || key === 'ArrowLeft') {
		camera.strafe(-moveDelta);
	} else if (key === 'd' || key === 'ArrowRight') {
		camera.strafe(moveDelta);
	} else if (key === 'q') {
		camera.yaw(turnDelta);
	} else if (key === 'e') {
		camera.yaw(-turnDelta);
	}

	console.log(`from: ${camera.from}`);
	console.log(`forward: ${camera.forward}`);

	render();
}

function onKeyUp(event: KeyboardEvent) {
	const key = event.key;
	if (key === 'w' || key === 's' || key === 'ArrowUp') {
		vertical = 0;
	} else if (key === 'a' || key === 'd' || key === 'ArrowLeft') {
		horizontal = 0;
	} else if (key === 'q' || key === 'e') {
		turn = 0;
	}
}

function initializeShader() {
    const vertexSource = `
    in vec3 position;
    in vec3 normal;

    uniform mat4 worldFromModel;
    uniform mat4 eyeFromWorld;
    uniform mat4 clipFromEye;

    out vec3 mixNormal;

    void main() {
        gl_PointSize = 3.0;
        gl_Position = clipFromEye * eyeFromWorld * worldFromModel * vec4(position, 1.0);
        mixNormal = normal;
    }
      `;

      const fragmentSource = `
    in vec3 mixNormal;
    out vec4 fragmentColor;

    void main() {
        vec3 normal = normalize(mixNormal) * 0.5 + 0.5;
        fragmentColor = vec4(normal, 1.0);
    }
    `;

    shader = new ShaderProgram(vertexSource, fragmentSource);
}

// function initializeShape() {
//     gl.enable(gl.CULL_FACE);

//     attributes = new VertexAttributes();

//     const positions = object.positions;
//     const normals = object.normals;
//     const indices = object.indices;

//     attributes.addAttribute('position', positions.length/3, 3, positions);
//     attributes.addAttribute('normal', normals.length/3, 3, normals);
//     attributes.addIndices(indices);

//     vao = new VertexArray(shader, attributes);
// }

window.addEventListener('load', () => initialize());
