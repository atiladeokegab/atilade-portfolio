"use client";
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

// Preload assets to prevent loading lag on first render
useGLTF.preload("/about/Lanyard/card.glb");
useTexture.preload("/about/Lanyard/lanyards.png");
useTexture.preload("/about/Lanyard/card-front.png");

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  /** Card turned to its back face. */
  flipped?: boolean;
  /** Called on a tap on the card, or a drag released while spinning. */
  onFlip?: () => void;
  /** Real DOM for the back face, laid out at backWidth px wide (the card is 1.6 x 2.25 units). */
  back?: ReactNode;
  backWidth?: number;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  flipped = false,
  onFlip,
  back,
  backWidth = 320,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // The back face is page DOM laid over the canvas; Band moves it onto the card every frame.
  const backFace = useRef<HTMLDivElement>(null);
  return (
    <div className="relative z-0 w-full h-full flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position, fov, rotation: [0, 0, 0] }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} flipped={flipped} onFlip={onFlip} backFace={back ? backFace : undefined} backWidth={backWidth} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
      {back && (
        <div
          ref={backFace}
          style={{ position: "absolute", left: 0, top: 0, transformOrigin: "0 0", visibility: "hidden", pointerEvents: "none" }}
        >
          {back}
        </div>
      )}
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  flipped?: boolean;
  onFlip?: () => void;
  backFace?: React.RefObject<HTMLDivElement | null>;
  backWidth?: number;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, flipped = false, onFlip, backFace, backWidth = 320 }: BandProps) {
  const turn = useRef<THREE.Group>(null);
  const [tl, tr, bl] = useState(() => [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])[0];
  const press = useRef<{ x: number; y: number } | null>(null);
  // The last pointer sample while dragging (event time), for the release speed of a flick.
  const last = useRef({ x: 0, t: 0, vx: 0 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const band = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fixed = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j1 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j2 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j3 = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF("/about/Lanyard/card.glb") as any;
  const texture = useTexture("/about/Lanyard/lanyards.png");
  // The model's own texture is the template author's card; ours shares its UV layout.
  const cardFront = useTexture("/about/Lanyard/card-front.png");
  cardFront.flipY = false;
  cardFront.colorSpace = materials.base.map.colorSpace;
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  // The card's thin edge and bevel faces caught the strip lights and sampled the photo, reading as dashes.
  // Light them like the face and point their UVs at plain card stock (the front vertex nearest the top-left).
  const cardGeometry = useMemo(() => {
    const g = nodes.card.geometry.clone();
    const n = g.attributes.normal, uv = g.attributes.uv, pos = g.attributes.position;
    let stock = 0, best = Infinity;
    for (let i = 0; i < n.count; i++) {
      const d = (pos.getX(i) + 0.25) ** 2 + (pos.getY(i) - 0.98) ** 2;
      if (n.getZ(i) >= 0.95 && d < best) [best, stock] = [d, i];
    }
    for (let i = 0; i < n.count; i++) {
      if (Math.abs(n.getZ(i)) >= 0.95) continue;
      n.setXYZ(i, 0, 0, 1);
      uv.setXY(i, uv.getX(stock), uv.getY(stock));
    }
    n.needsUpdate = uv.needsUpdate = true;
    return g;
  }, [nodes]);
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          // Capped at 1: on a slow frame (delta over 40ms) the lerp overshot, diverged and the strap vanished.
          Math.min(1, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      if (turn.current) {
        turn.current.rotation.y = THREE.MathUtils.damp(turn.current.rotation.y, flipped ? Math.PI : 0, 7, delta);
        const el = backFace?.current;
        if (el) {
          const shown = turn.current.rotation.y > Math.PI / 2;
          el.style.visibility = shown ? "visible" : "hidden";
          if (shown) {
            // Project three corners of the card's back (model space, mirrored as seen from behind) to
            // canvas pixels and map the DOM card onto them with one affine matrix.
            // The mesh spans x ±0.358, y 0.023..1.023; a hair larger at the DOM card's 1.6:2.25 so no edge peeks out.
            const hw = 0.36, cy = 0.523, hh = (hw * 2.25) / 1.6, z = 0.013;
            const { width: W, height: H } = state.size;
            const px = (v: THREE.Vector3) => {
              v.applyMatrix4(turn.current!.matrixWorld).project(state.camera);
              v.set(((v.x + 1) / 2) * W, ((1 - v.y) / 2) * H, 0);
            };
            px(tl.set(hw, cy + hh, z));
            px(tr.set(-hw, cy + hh, z));
            px(bl.set(hw, cy - hh, z));
            const w = backWidth, h = (backWidth * 2.25) / 1.6;
            el.style.transform = `matrix(${(tr.x - tl.x) / w},${(tr.y - tl.y) / w},${(bl.x - tl.x) / h},${(bl.y - tl.y) / h},${tl.x},${tl.y})`;
          }
        }
      }
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type={"fixed" as RigidBodyProps["type"]}
        />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic" as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
              // A tap (under 6px of travel) flips; so does a drag let go while the card spins.
              // The group sees one event per card part under the pointer; act on the first only.
              const p = press.current;
              if (!p) return;
              press.current = null;
              const tap = Math.hypot(e.clientX - p.x, e.clientY - p.y) < 6;
              // A flick: let go within 100ms of moving sideways faster than 900px/s.
              const l = last.current;
              const flick = e.nativeEvent.timeStamp - l.t < 100 && Math.abs(l.vx) > 900;
              if (tap || flick || Math.abs(card.current?.angvel().y ?? 0) > 4) onFlip?.();
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onPointerMove={(e: any) => {
              if (!press.current) return;
              const t = e.nativeEvent.timeStamp, l = last.current;
              if (t > l.t) last.current = { x: e.clientX, t, vx: ((e.clientX - l.x) / (t - l.t)) * 1000 };
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              press.current = { x: e.clientX, y: e.clientY };
              last.current = { x: e.clientX, t: e.nativeEvent.timeStamp, vx: 0 };
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            {/* Only the card turns: the clip and clamp seen from behind render as a black mass. */}
            <group ref={turn}>
            <mesh geometry={cardGeometry}>
              <meshPhysicalMaterial
                map={cardFront}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            </group>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
