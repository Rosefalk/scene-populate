/* objData is the required format for scene-populate */
interface objData {
    name: string,
    path: string,
    transforms?: object,
    children?: objData[],
    events?: {
        type: Function,
        func: Function
      }[],
    animations?: {
        autoplay: boolean,
        animation: string,
        options?: object
    }[]
}[]

interface settings {
    debug?: boolean,
    ignoreChildren?: boolean
}

class ScenePopulate {
    private _settings: settings = {
        debug: false,
        ignoreChildren: false
    }

    constructor() {
    }

    private _logEvent(event: string): void {
        if(this._settings.debug) {
            log(event)
        }
    }

    private _createEntity(objData: objData): Entity {
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
                this._logEvent(`    - binding event ${eventList.type.name}`)
                obj.set(new eventList.type((e: Event) => eventList.func(obj, e)))
            })
        }

        return obj
    }

    // Recursive addition of elements
    private _addMeshEntity(objArray: object[], parent: Entity): void {
        objArray.forEach((objData: objData) => {
            let obj = this._createEntity(objData)
            this._logEvent(parent ? `  • ${obj.name}` : `• ${obj.name}`)

            engine.addEntity(obj)

            if(parent) {
                obj.setParent(parent)
            }
            if(!this._settings.ignoreChildren && objData.children) {
                this._addMeshEntity(objData.children, obj)
            }
        })
    }

    public populate(objArray: objData[]): void {
        this._addMeshEntity(objArray, undefined)
    }

    public set setSettings(settings: settings) {
        this._settings = {...this._settings, ...settings}
    }

    public get getSettings(): settings {
        return this._settings
    }
}

export default ScenePopulate
