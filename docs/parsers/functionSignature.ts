import { Project } from 'ts-morph';

export function parseFunctionSignatures(filePath) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  const functions = sourceFile.getFunctions();

  const functionSignatures: Array<{
    name: string | undefined;
    parameters: Array<{
      name: string;
      type: string;
    }>;
    returnType: string;
    typeParameters: string[];
  }> = [];

  functions.forEach(func => {
    // Get all overload signatures
    const overloads = func.getOverloads();

    if (overloads.length > 0) {
      // If there are overloads, process each overload signature
      overloads.forEach(overload => {
        const name = overload.getName();

        const parameters = overload.getParameters().map(param => ({
          name: param.getName(),
          type: param.getType().getText(),
        }));
        const returnType = overload.getReturnType().getText();
        const typeParameters = overload.getTypeParameters().map(param => param.getName());

        functionSignatures.push({
          name,
          parameters,
          returnType,
          typeParameters,
        });
      });
    } else {
      // If there are no overloads, process the function signature
      const name = func.getName();
      const parameters = func.getParameters().map(param => ({
        name: param.getName(),
        type: param.getType().getText(),
      }));

      const returnType = func.getReturnType().getText();
      const typeParameters = func.getTypeParameters().map(param => param.getFullText());

      functionSignatures.push({
        name,
        parameters,
        returnType,
        typeParameters,
      });
    }
  });

  return functionSignatures;
}
