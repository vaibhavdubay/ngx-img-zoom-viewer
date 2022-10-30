import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { applyToUpdateRecorder } from "@schematics/angular/utility/change";
import { addImportToModule } from "@schematics/angular/utility/ast-utils";
import { createSourceFile, ScriptTarget } from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript'

export function ngAdd(): Rule{
    return (tree: Tree, context: SchematicContext)=>{
        const modulePath = "/src/app/app.module.ts"
        if(!tree.exists(modulePath)){
            context.logger.info(`couldn't find ${modulePath}`)
        } else  {
            const recorder = tree.beginUpdate(modulePath);
            const text = tree.read(modulePath);
            if( text === null ){
                context.logger.info(`couldn't find ${modulePath}`)
            }
            else {
                const source = createSourceFile(modulePath, text.toString(), ScriptTarget.Latest, true)
                applyToUpdateRecorder( recorder, addImportToModule( source, modulePath, 'NGXImgZoomViewerModule','ngx-img-zoom-viewer'))
            }
        }
        context.addTask(new NodePackageInstallTask())
        return tree
    }
}