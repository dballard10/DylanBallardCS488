import { Vector3 } from './vector.js'; 
import { Quaternion } from './quaternion.js';


export class Matrix4 {
    list: Float32Array;
    /*
        0  4  8  12
        1  5  9  13
        2  6  10 14
        3  7  11 15
    */
    constructor() {
        this.list = new Float32Array(16).fill(0);
    }
    
    get(row: number, column: number) {
        return this.list[row + column * 4];
    }

    set(row: number, column: number, value: number){
        this.list[row + column * 4] = value;
    }
    
    toFloats() {
        return this.list
    }

    multiplyMatrix(that: Matrix4) {
        let matrix = new Matrix4 
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                matrix.set(r, c, 
                    this.get(r, 0) * that.get(0, c) + 
                    this.get(r, 1) * that.get(1, c) + 
                    this.get(r, 2) * that.get(2, c) + 
                    this.get(r, 3) * that.get(3, c)
                );
            }
        }
        return matrix;
    }

    multiplyVector3(vector: Vector3, w: number) {
        let result = new Vector3(0, 0, 0);
        for (let r = 0; r < 3; r++) {
            result.set(r, 
                this.get(r, 0) * vector.x + 
                this.get(r, 1) * vector.y + 
                this.get(r, 2) * vector.z + 
                this.get(r, 3) * w
            );
        }

        return result;
    }

    static scale(x: number, y: number, z: number) {
        let matrix = new Matrix4;

        matrix.set(0, 0, x);
        matrix.set(1, 1, y);
        matrix.set(2, 2, z);
        matrix.set(3, 3, 1);

        return matrix;
    }

    static translate(x: number, y: number, z: number) {
        let matrix = Matrix4.identity();

        matrix.set(0, 3, x);
        matrix.set(1, 3, y);
        matrix.set(2, 3, z);
        
        return matrix;
    }

    static rotateX(degrees: number){
        let matrix = new Matrix4();
        let theta = degrees * Math.PI/180;
        
        matrix.set(0, 0, 1);
        matrix.set(1, 1, Math.cos(theta));
        matrix.set(1, 2, -Math.sin(theta));
        matrix.set(2, 1, Math.sin(theta));
        matrix.set(2, 2, Math.cos(theta));
        matrix.set(3, 3, 1);

        return matrix;
    }
    
    static rotateY(degrees: number){
        let matrix = new Matrix4();
        let theta = degrees * Math.PI/180;
        
        matrix.set(0, 0, Math.cos(theta));
        matrix.set(0, 2, -Math.sin(theta));
        matrix.set(1, 1, 1);
        matrix.set(2, 0, Math.sin(theta));
        matrix.set(2, 2, Math.cos(theta));
        matrix.set(3, 3, 1);

        return matrix;
    }

    static rotateZ(degrees: number){
        let matrix = new Matrix4();
        let theta = degrees * Math.PI/180;

        matrix.set(0, 0, Math.cos(theta));
        matrix.set(0, 1, -Math.sin(theta));
        matrix.set(1, 0, Math.sin(theta));
        matrix.set(1, 1, Math.cos(theta));
        matrix.set(2, 2, 1);
        matrix.set(3, 3, 1);

        return matrix;
    }
    
    static identity() {
        let matrix = new Matrix4;
        
        matrix.set(0, 0, 1);
        matrix.set(1, 1, 1);
        matrix.set(2, 2, 1);
        matrix.set(3, 3, 1);

        return matrix;
    }

    static rotateAroundAxis(axis: Vector3, degrees: number) {
        let radians = degrees * Math.PI / 180;
        let s = Math.sin(radians);
        let c = Math.cos(radians);
        let d = 1 - c;

        let R = new Matrix4;

        R.set(0, 0, d * axis.x * axis.x + c);
        R.set(0, 1, d * axis.x * axis.y - s * axis.z);
        R.set(0, 2, d * axis.x * axis.z + s * axis.y);

        R.set(1, 0, d * axis.x * axis.y + s * axis.z);
        R.set(1, 1, d * axis.y * axis.y + c);
        R.set(1, 2, d * axis.y * axis.z - s * axis.x);

        R.set(2, 0, d * axis.x * axis.z - s * axis.y);
        R.set(2, 1, d * axis.y * axis.z + s * axis.x);
        R.set(2, 2, d * axis.z * axis.z + c);

        R.set(3, 3, 1);

        return R;
    }

    // right = aspectRatio * top
    // top = tan(fov/2) * near

    static perspective(fov: number, aspectRatio: number, near: number, far: number) {
        let matrix = new Matrix4;
        let top = Math.tan(fov * Math.PI / 360) * near;
        let right = aspectRatio * top;
        matrix.set(0, 0, near/right);
        matrix.set(1, 1, near/top);
        matrix.set(2, 2, (near + far) / (near - far));
        matrix.set(2, 3, (2 * near * far) / (near - far));
        matrix.set(3, 2, -1);

        return matrix;
    }

    static fromBuffer(buffer: Float32Array | Uint16Array) {
        let m = Matrix4.identity();
        for (let i = 0; i < 16; ++i) {
          m.list[i] = buffer[i];
        }
        return m;
      }
      
      static fromElements(elements: number[]) {
        let m = Matrix4.identity();
        for (let i = 0; i < 16; ++i) {
          // TODO: rename floats to your Float32 array
          m.list[i] = elements[i];
        }
        return m;
      }
      
      static fromQuaternion(q: Quaternion) {
        let m = Matrix4.identity();
      
        let x2 = q.get(0) + q.get(0);
        let y2 = q.get(1) + q.get(1);
        let z2 = q.get(2) + q.get(2);
      
        let xx = q.get(0) * x2;
        let yx = q.get(1) * x2;
        let yy = q.get(1) * y2;
        let zx = q.get(2) * x2;
        let zy = q.get(2) * y2;
        let zz = q.get(2) * z2;
        let wx = q.get(3) * x2;
        let wy = q.get(3) * y2;
        let wz = q.get(3) * z2;
      
        return Matrix4.fromElements([
          1 - yy - zz, yx + wz, zx - wy, 0,
          yx - wz, 1 - xx - zz, zy + wx, 0,
          zx + wy, zy - wx, 1 - xx - yy, 0,
          0, 0, 0, 1
        ]);
      }

    toString() {
        let str = '';
        for(let row = 0; row < 4; row++){
            for( let col = 0; col < 4; col++) {
                str += this.get(row, col).toFixed(3) + ' ';
            }
            str += '\n';
        }     
        return str;
    }
}

