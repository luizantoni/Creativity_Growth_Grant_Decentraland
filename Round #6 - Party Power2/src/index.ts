import {} from '@dcl/sdk/math'
import { engine, GltfContainer, Transform, ColliderLayer } from '@dcl/sdk/ecs'

export function main() {
  // Create entity for the model
  const myModel = engine.addEntity()

  // Add Transform component to position the model
  Transform.create(myModel, {
    position: { x: 0, y: 0, z: 32}, 
    scale: { x: 1, y: 1, z: 1},    
    rotation: { x: 0, y: 0, z: 0, w: 1 }  
  })

  // Add GltfContainer with collision masks
  GltfContainer.create(myModel, {
    src: 'assets/scene/island.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })


  // Create entity for the model
  const myGrass = engine.addEntity()

  // Add Transform component to position the model
  Transform.create(myGrass, {
    position: { x: 0, y: 0, z: 32}, 
    scale: { x: 1, y:1, z: 1},    
    rotation: { x: 0, y: 0, z: 0, w: 1 }  
  })

  // Add GltfContainer with collision masks
  GltfContainer.create(myGrass, {
    src: 'assets/scene/plants.glb',
    invisibleMeshesCollisionMask: ColliderLayer.CL_NONE,
    visibleMeshesCollisionMask: ColliderLayer.CL_NONE  })
}