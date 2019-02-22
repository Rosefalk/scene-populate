# scene-populate

## What is ScenePopulate?
ScenePopulate is an object based recursive GLTF loader for Decentraland. In short you define what the scene should look like and ScenePopulate makes it happen for you automagically.

It could be considered to be a way to define a scene like in the XML version of the CLI, but in the Dynamic CLI instead. This way you get the best of both worlds; An easy way to populate a scene while maintaining a dynamic scene.

## How to use example

The following array covers most of the features this library:
```
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
```
Only name and path are requires, rest is optional.

Before calling populate you could define settings, for example use scenePopulate.settings = { debug: true } for a bit of logging output.

```
scenePopulate.setSettings = { debug: true }
```

Adding ignoreChildren to the object will ignore that object's children. Adding it to settings will ignore all children.


