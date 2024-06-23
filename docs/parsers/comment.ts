import { parse } from 'comment-parser';
import { Options } from 'comment-parser/parser/index';

export function parseJSDoc(source: string, options: Partial<Options> = { spacing: 'preserve' }) {
  const block = parse(source, options)[0];
  const { description, tags: specs } = block;

  const exampleSpecs = specs.filter(spec => spec.tag === 'example');
  const returnsSpecs = specs.filter(spec => spec.tag === 'returns');
  const paramSpecs = specs.filter(spec => spec.tag === 'param');
  const throwsSpecs = specs.filter(spec => spec.tag === 'throws');

  return {
    description,
    exampleSpecs,
    returnsSpecs,
    paramSpecs,
    throwsSpecs,
  };
}
