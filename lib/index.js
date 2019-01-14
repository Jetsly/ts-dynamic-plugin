"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
function config(config) {
    var options = Array.isArray(config) ? config : [config];
    var funcNames = options.map(function (option) {
        return option.funcName;
    });
    return function () {
        return function (node) {
            var importDeclas = [];
            var visitor = function (node) {
                if (ts.isCallExpression(node)) {
                    var idx = funcNames.indexOf(node.expression.getText());
                    if (idx > -1 && importDeclas.indexOf(options[idx].importDecla) === -1) {
                        importDeclas.push(options[idx].importDecla);
                    }
                }
                return ts.forEachChild(node, visitor);
            };
            var addVar = function (node) {
                if (!ts.isSourceFile(node)) {
                    return node;
                }
                var importStatement = importDeclas.map(function (importDecla) {
                    return ts.createStatement(ts.createIdentifier(importDecla));
                });
                return ts.updateSourceFileNode(node, importStatement.concat(node.statements));
            };
            ts.visitNode(node, visitor);
            return importDeclas.length > 0 ? ts.visitNode(node, addVar) : node;
        };
    };
}
exports.default = config;
//# sourceMappingURL=index.js.map