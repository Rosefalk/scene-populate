class ScenePopulate {
    constructor() {
        log('populate scene instanced')
    }

    private createEntity(objData: any) {
        let obj = new Entity()

        // Add Name
        obj.name = objData.name
        // Add Shape
        obj.add(new GLTFShape(objData.path))
        // Add Transforms (optional)
        if(objData.transforms) {
            obj.set(new Transform(objData.transforms))
        }
        // Add Animations (optional)
        if(objData.animations && objData.animations.length) {
            objData.animations.forEach((animation: any) => {
                const clip = new AnimationClip(animation.animation)
                if(animation.options) {
                    clip.setParams(animation.options)
                }
                obj.get(GLTFShape).addClip(clip)

                if(animation.autoplay) {
                    clip.play()
                }
            })
        }
        // Add Events (optional)
        if(objData.events) {
            objData.events.forEach((eventList: any) => {
                log('    - binding event', eventList.type.name)
                obj.set(new eventList.type((e: Event) => eventList.func(obj, e)))
            })
        }

        return obj
    }

    // Recursive addition of elements
    private addMeshEntity(objArray: Array<Object>, parent: Entity) {
        objArray.forEach((objData: any) => {
            let obj = this.createEntity(objData)
            log(parent ? `  • ${obj.name}` : `• ${obj.name}`)

            engine.addEntity(obj)

            if(parent) {
                obj.setParent(parent)
            }
            if(objData.children) {
                this.addMeshEntity(objData.children, obj)
            }
        })
    }

    public populate(objArray: Array<Object>) {
        this.addMeshEntity(objArray, undefined)
    }
}

export default ScenePopulate
