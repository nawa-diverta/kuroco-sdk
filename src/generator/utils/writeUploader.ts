import * as fs from 'fs';
import * as path from 'path';
import { Client } from '../client/interfaces/Client';
import { OPERATION_PATTERN } from '../client/interfaces/OperationPattern';
import { format } from './format';
import { Templates } from './readHandlebarsTemplates';

/**
 * Generate Uploader using the Handlebar template and write to disk.
 * @param client General configuration object.
 * @param templates The loaded handlebar templates.
 * @param outputPath Directory to write the generated files to.
 */
export function writeUploader(client: Client, templates: Templates, outputPath: string): void {
    const file = path.resolve(outputPath, `Uploader.ts`);
    const templateResult = templates.uploadHelper({
        firebaseConfig: client.etc.kurocoConfig.gcp.firebaseConfig,
        firebaseTokenApi: client.etc.specialOperation[OPERATION_PATTERN.FIREBASE_TOKEN],
    });
    fs.writeFileSync(file, format(templateResult));
}
