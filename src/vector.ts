export class Vector3 {
    xyz: number[];
    
    constructor(x: number, y: number, z: number) {
        this.xyz = [x, y, z];
    }

    get x() {
        return this.xyz[0];
    }

    get y() {
        return this.xyz[1];
    }

    get z() {
        return this.xyz[2];
    }

    set x(value: number) {
        this.xyz[0] = value
    }

    set y(value: number) {
        this.xyz[1] = value
    }

    set z(value: number) {
        this.xyz[2] = value
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    get(index: number) {
        return this.xyz[index];
    }

    set(index: number, value: number) {
        this.xyz[index] = value;
    }

    add(that: Vector3) {
        return new Vector3(this.x + that.x, this.y + that.y, this.z + that.z);
    }

    scalarMultiply(scalar: number) {
        return new Vector3(scalar * this.x, scalar * this.y, scalar * this.z);
    }

    normalize() {
        return new Vector3(this.x / this.magnitude, this.y / this.magnitude, this.z / this.magnitude);
    }

    inverse() {
        return new Vector3(-this.x, -this.y, -this.z);
    }

    cross(that: Vector3) {
        return new Vector3(this.y * that.z - this.z * that.y, this.z * that.x - this.x * that.z, this.x * that.y - this.y * that.x);
    }

    lerp(that: Vector3, t: number) {
        return new Vector3(
            (1 - t) * this.x + t + that.x,
            (1 - t) * this.y + t + that.y,
            (1 - t) * this.z + t + that.z
        )
    }

    static one() {
        return new Vector3(1, 1, 1)
    }

    static zero() {
        return new Vector3(0, 0, 0)
    }

    toString() {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}