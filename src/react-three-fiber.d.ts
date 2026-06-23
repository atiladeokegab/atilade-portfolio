import { MeshLineGeometry, MeshLineMaterial } from "meshline";

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: MeshLineGeometry;
    meshLineMaterial: MeshLineMaterial;
  }
}
