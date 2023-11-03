import { FirstPersonCamera } from "./first-person-camera.js";
import { Vector3 } from "./vector.js";


let from = new Vector3(0,0,0);
let forward = new Vector3(0,0,-1);
//let right = new Vector3(0.6585, 0, -0.7526);

let fpc = new FirstPersonCamera(from, from.add(forward), new Vector3(0,1,0));




