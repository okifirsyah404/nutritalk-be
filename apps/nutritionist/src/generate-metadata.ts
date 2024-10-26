import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [
    new ReadonlyVisitor({
      introspectComments: true,
      pathToSource: __dirname,
      parameterProperties: true,
      controllerKeyOfComment: 'description',
      classValidatorShim: true,
      dtoFileNameSuffix: [
        '.dto.ts',
        '.entity.ts',
        '.request.ts',
        '.response.ts',
      ],
    }),
  ],
  outputDir: __dirname,
  watch: false,
  tsconfigPath: 'apps/nutritionist/tsconfig.app.json',
});
