var ts = require('typescript');
module.exports = function config(config) {
  const options = Array.isArray(config) ? config : [config];
  const funcNames = options.map(function(option) {
    return option.funcName;
  });
  return function() {
    return function(node) {
      let importDeclas = [];
      var visitor = function(node) {
        if (ts.isCallExpression(node)) {
          const idx = funcNames.indexOf(node.expression.text);
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
        return ts.updateSourceFileNode(
          node,
          importDeclas.map(importDecla => ts.createIdentifier(importDecla)).concat(node.statements)
        );
      };
      ts.visitNode(node, visitor);
      return importDeclas.length > 0 ? ts.visitNode(node, addVar) : node;
    };
  };
};
