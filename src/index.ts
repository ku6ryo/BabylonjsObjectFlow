import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Color4,
  Color3,
  PBRMetallicRoughnessMaterial,
  HDRCubeTexture,
  PointLight,
} from "babylonjs"
import "babylonjs-loaders"
import envHdr from "./environment.hdr"

const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
const engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true})


const createScene = function(){
  const scene = new Scene(engine)
  const camera = new FreeCamera("camera1", new Vector3(0, 0, -10), scene)
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, false)
  new HemisphericLight("light1", new Vector3(0, 1, 0), scene)
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
  scene.fogDensity = 0.1
  scene.fogStart = 0.0;
  scene.fogEnd = 60.0;
  scene.fogColor = new Color3(0.9, 0.9, 0.9);
  scene.clearColor = new Color4(1, 1, 1, 1)
  return scene
}

const scene = createScene()

  let t = 0
  const light = new PointLight("light2", new Vector3(0, 0, 0), scene)
  light.intensity = 1000
  light.diffuse = new Color3(1, 0, 0)
  light.specular = new Color3(0, 0, 1)
  setInterval(() => {
    light.position = new Vector3(0, Math.sin(t * 0.001) * 10, 0)
    t += 10
  }, 10)
;(() => {

})()

;(() => {
  let time = 0
  setInterval(() => {
    const sphere = MeshBuilder.CreateSphere("sphere", {}, scene)
    const mat = new PBRMetallicRoughnessMaterial("pbr", scene);
    mat.baseColor = new Color3(Math.random(), 0, 200)
    mat.roughness = 0
    mat.metallic = 0.8
    mat.environmentTexture = new HDRCubeTexture(envHdr, scene, 512)
    mat.clearCoat.isEnabled = true
    mat.clearCoat.intensity = 1
    sphere.material = mat
    const x = Math.sin(time) * 5
    const z = Math.cos(time) * 5
    let y = -5 + Math.random() * 0.5
    let s = 1
    sphere.position = new Vector3(x, y, z)
    let startTime = new Date().getTime()
    const dt = 5
    const i = setInterval(() => {
      const t = new Date().getTime() - startTime
      y += 0.003 * dt
      sphere.position = new Vector3(x, y, z)
      s = 0.6 - Math.sin(t * 0.003) * 0.3
      sphere.scaling = new Vector3(s, s, s)
    }, dt)
    setTimeout(() => {
      clearInterval(i)
      scene.removeMaterial(mat)
      scene.removeMesh(sphere)
    }, 10000)
    time += 100
  }, 100)
})()

;(() => {
  let time = 0
  setInterval(() => {
    const sphere = MeshBuilder.CreateBox("box", {}, scene)
    const mat = new PBRMetallicRoughnessMaterial("pbr", scene);
    mat.baseColor = new Color3(Math.random(), 0, 200)
    mat.roughness = 0
    mat.metallic = 0.8
    mat.environmentTexture = new HDRCubeTexture(envHdr, scene, 512)
    mat.clearCoat.isEnabled = true
    mat.clearCoat.intensity = 1
    sphere.material = mat
    const x = Math.sin(time) * 8
    const z = Math.cos(time) * 8
    let y = -5 + Math.random() * 0.5
    sphere.position = new Vector3(x, y, z)
    sphere.scaling = new Vector3(0.5, 3 * Math.random() + 1, 0.5)
    const dt = 5
    const i = setInterval(() => {
      y += 0.01 * dt
      sphere.position = new Vector3(x, y, z)
    }, dt)
    setTimeout(() => {
      clearInterval(i)
      scene.removeMaterial(mat)
      scene.removeMesh(sphere)
    }, 10000)
    time += 100
  }, 110)
})()

engine.runRenderLoop(function() {
  console.log(engine.getFps().toFixed())
  scene.render()
})

window.addEventListener("resize", function(){
  engine.resize()
})