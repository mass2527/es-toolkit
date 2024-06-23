import { Spec } from 'comment-parser';

import { parseFunctionSignatures } from '../parsers/functionSignature';

export async function createAPIReferenceHtmlStrings({
  description,
  functionSignatures,
  exampleSpecs,
  returnsSpecs,
  paramSpecs,
  throwsSpecs,
}: {
  description: string;
  functionSignatures: ReturnType<typeof parseFunctionSignatures>;
  exampleSpecs: Spec[];
  returnsSpecs: Spec[];
  paramSpecs: Spec[];
  throwsSpecs: Spec[];
}) {
  const config = globalThis.VITEPRESS_CONFIG;
  const vitepress = await import('vitepress');
  const md = await vitepress.createMarkdownRenderer(config.srcDir, config.markdown, config.site.base, config.logger);

  const descriptionHtmlString = md.render(description);
  const functionSignaturesHtmlString = md.render(
    `\`\`\`typescript
${functionSignatures.map(signature => `function ${signature.name}${signature.typeParameters.length > 0 ? `<${signature.typeParameters.join(',')}>` : ''}(${signature.parameters.map(parameter => `${parameter.name}: ${parameter.type}`).join(', ')}): ${signature.returnType};`).join('\n')}`
  );
  const paramHtmlString = md.render(
    `${paramSpecs.map(spec => `- \`${spec.name}\` (\`${spec.type}\`): ${spec.description.replace(/^-\s/, '')}`).join('\n')}`
  );
  const returnsHtmlString = md.render(
    `${returnsSpecs.map(returnsSpec => `- (\`${returnsSpec?.type}\`): ${returnsSpec?.description}`).join('\n')}`
  );
  const throwsHtmlString = md.render(`${throwsSpecs.map(spec => spec.description).join('<br/>')}`);
  const exampleSources = exampleSpecs.map(spec => spec.source);
  const exampleHtmlString = md.render(
    `\`\`\`typescript
${exampleSources
  .map(sources =>
    sources
      .slice(1, sources.length - 1)
      .map(source => source.tokens.description)
      .join('\n')
  )
  .join('\n\n')}`
  );

  return {
    descriptionHtmlString,
    functionSignaturesHtmlString,
    paramHtmlString,
    returnsHtmlString,
    throwsHtmlString,
    exampleHtmlString,
  };
}
