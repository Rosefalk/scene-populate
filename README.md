# scene-populate
An object based scene populator for Decentraland

## How to use example
import ScenePopulate from "scene-populate"

const objects = [{
  name: 'object name',
  path:'path to gltf',
  transforms: {
    position: new Vector3(5, 0, 9)
  },
  children: [{
    name: 'object name',
    path:'path to gltf',
    events: [{
      type: OnClick,
      func: someFunction
    }],
    animations: [{
      animation: 'animation name',
      options: {
        weight: 0.5
      },
      autoplay: true
    }]
  }]
}]


const scenePopulate = new ScenePopulate()
scenePopulate.populate(objects)
