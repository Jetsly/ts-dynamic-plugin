import * as ts from 'typescript';
export type IConfig =
  | Array<{ funcName: string; importDecla: string }>
  | { funcName: string; importDecla: string };
export default function config(config: IConfig) {
  const options = Array.isArray(config) ? config : [config];
  const funcNames = options.map(function(option) {
    return option.funcName;
  });
  return function() {
    return function(node) {
      let importDeclas = [];
      var visitor = function(node) {
        if (ts.isCallExpression(node)) {
          const idx = funcNames.indexOf(node.expression.getText());
          if (idx > -1 && importDeclas.indexOf(options[idx].importDecla) === -1) {
            importDeclas.push(options[idx].importDecla);
          }
        }
        return ts.forEachChild(node, visitor);
      };
      var addVar = function(node) {
        if (!ts.isSourceFile(node)) {
          return node;
        }
        const importStatement: ts.Statement[] = importDeclas.map(importDecla =>
          ts.createStatement(ts.createIdentifier(importDecla))
        );
        return ts.updateSourceFileNode(node, importStatement.concat(node.statements));
      };
      ts.visitNode(node, visitor);
      return importDeclas.length > 0 ? ts.visitNode(node, addVar) : node;
    };
  };
}
