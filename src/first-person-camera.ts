import { Vector3 } from "./vector.js";
import { Matrix4 } from "./matrix.js";

export class FirstPersonCamera {
    from: Vector3;
    to: Vector3;
    worldUp: Vector3;

    forward: Vector3 = new Vector3(0, 0, 0);
    right: Vector3 = new Vector3(0, 0, 0);
    up: Vector3 = new Vector3(0, 0, 0);

    eyeFromWorld: Matrix4 = new Matrix4;

    constructor(from: Vector3, to: Vector3, worldUp: Vector3) {
        this.from = from;
        this.to = to;
        this.worldUp = worldUp
        this.forward = this.to.add(this.from.inverse()).normalize();
        this.reorient();
    }

    reorient() {
        this.right = this.forward.cross(this.worldUp).normalize();
        this.up = this.right.cross(this.forward).normalize();

        let eyeFromWorld = new Matrix4();

        eyeFromWorld.set(0, 0, this.right.x);
        eyeFromWorld.set(0, 1, this.right.y);
        eyeFromWorld.set(0, 2, this.right.z);
        eyeFromWorld.set(0, 3, -this.from.x);

        eyeFromWorld.set(1, 0, this.up.x);
        eyeFromWorld.set(1, 1, this.up.y);
        eyeFromWorld.set(1, 2, this.up.z);
        eyeFromWorld.set(1, 3, -this.from.y);

        eyeFromWorld.set(2, 0, -this.forward.x);
        eyeFromWorld.set(2, 1, -this.forward.y);
        eyeFromWorld.set(2, 2, -this.forward.z);
        eyeFromWorld.set(2, 3, -this.from.z);

        eyeFromWorld.set(3, 3, 1);

        this.eyeFromWorld = eyeFromWorld;
    }

    strafe(distance: number) {
        this.from = this.from.add(this.right.scalarMultiply(distance));
        this.reorient();
    }

    advance(distance: number) {
        this.from = this.from.add(this.forward.scalarMultiply(distance));
        this.reorient();
    }

    elevate(elevation: number) {
        this.from.y = elevation;
        this.reorient();
    }

    yaw(degrees: number) {
        this.forward = Matrix4.rotateAroundAxis(this.worldUp, degrees).multiplyVector3(this.forward, 0).normalize();
        this.reorient();
    }

    pitch(degrees: number) {
        this.forward = Matrix4.rotateAroundAxis(this.right, degrees).multiplyVector3(this.forward, 0).normalize();
        this.reorient();
    }

    roll(degrees: number) {
        this.forward = Matrix4.rotateAroundAxis(this.forward, degrees).multiplyVector3(this.forward, 0).normalize();
        this.reorient();
    }
}