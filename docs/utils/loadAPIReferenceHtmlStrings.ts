import { readFileSync } from 'node:fs';
import { parseJSDoc } from '../parsers/comment';
import { parseFunctionSignatures } from '../parsers/functionSignature';
import { createAPIReferenceHtmlStrings } from './createAPIReferenceHtmlStrings';

export async function loadAPIReferenceHtmlStrings(path: string) {
  const fileString = readFileSync(path, 'utf-8');
  const functionSignatures = parseFunctionSignatures(path);
  const { description, exampleSpecs, paramSpecs, returnsSpecs, throwsSpecs } = parseJSDoc(fileString);
  const {
    descriptionHtmlString,
    functionSignaturesHtmlString,
    paramHtmlString,
    returnsHtmlString,
    throwsHtmlString,
    exampleHtmlString,
  } = await createAPIReferenceHtmlStrings({
    description,
    functionSignatures,
    paramSpecs,
    returnsSpecs,
    throwsSpecs,
    exampleSpecs,
  });

  return {
    name: functionSignatures[0].name,
    description: descriptionHtmlString,
    functionSignatures: functionSignaturesHtmlString,
    param: paramHtmlString,
    returns: returnsHtmlString,
    throws: throwsHtmlString,
    example: exampleHtmlString,
  };
}
