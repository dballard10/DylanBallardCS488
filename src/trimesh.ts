import { readFromUrl } from './utils.js';
import { Vector3 } from './vector.js';

export class Trimesh {
    positions: number[];
    indices: number[];
    normals: number[];

    constructor(positions: number[], indices: number[], normals: number[]) {
        this.positions = positions;
        this.indices = indices;
        this.normals = normals;
    }

    static async readFromGltf(url: string) {
        let text = await readFromUrl(url);
        console.log(text);
        const gltf = JSON.parse(text);
        console.log(gltf);
        const positionAccessorIndex = gltf['meshes'][0]['primitives'][0]['attributes']['POSITION']
        const indicesAccessorIndex = gltf['meshes'][0]['primitives'][0]['indices'];
        const normalAccessorIndex = gltf['meshes'][0]['primitives'][0]['attributes']['NORMAL']
        
        let positionVectors = await this.extractVector3s(gltf, positionAccessorIndex);
        let indices = await this.extractScalars(gltf, indicesAccessorIndex);
        let normalVectors = await this.extractVector3s(gltf, normalAccessorIndex);
        
        let positions = positionVectors.flatMap(vector => vector.xyz)
        let normals = normalVectors.flatMap(vector => vector.xyz);

        return new Trimesh(positions, Array.from(indices), normals);
    }

    static async extractScalars(gltf: any, accessorIndex: number): Promise<Uint16Array> {
      const accessor = gltf.accessors[accessorIndex];
      const bufferView = gltf.bufferViews[accessor.bufferView];
      const buffer = gltf.buffers[bufferView.buffer];
    
      let arrayBuffer = await fetch(buffer.uri)
        .then(response => response.blob())
        .then(blob => new Response(blob).arrayBuffer());
    
      const slice = arrayBuffer.slice(bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength);
      const scalars = new Uint16Array(slice);
    
      return scalars;
    }

    static async extractVector3s(gltf: any, accessorIndex: number): Promise<Vector3[]> {
        const accessor = gltf.accessors[accessorIndex];
        const bufferView = gltf.bufferViews[accessor.bufferView];
        const buffer = gltf.buffers[bufferView.buffer];
      
        let arrayBuffer = await fetch(buffer.uri)
          .then(response => response.blob())
          .then(blob => new Response(blob).arrayBuffer());
      
        const slice = arrayBuffer.slice(bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength);
        const scalars = new Float32Array(slice);
      
        const vectors = [];
        for (let i = 0; i < scalars.length; i += 3) {
          vectors.push(new Vector3(scalars[i], scalars[i + 1], scalars[i + 2]));
        }
      
        return vectors;
      }
}