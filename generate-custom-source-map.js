const fs = require("fs");
const CustomSourceMapGenerator = require("./custom-source-map-generator");

// Read the content of the minified JavaScript file
const minifiedJsContent = fs.readFileSync("./app.min.js", "utf-8");

// Initialize the custom source map generator
const customSourceMapGenerator = new CustomSourceMapGenerator("app.min.js");

// Add a mapping for the 'function hello()' part
customSourceMapGenerator.addMapping({
  generated: { line: 1, column: 0 },
  original: { line: 1, column: 0 },
});

// Add a mapping for the 'console.log("Hello, world!");' part
customSourceMapGenerator.addMapping({
  generated: { line: 1, column: 16 },
  original: { line: 2, column: 2 },
});

// Add a mapping for the 'hello();' part
customSourceMapGenerator.addMapping({
  generated: { line: 1, column: 44 },
  original: { line: 4, column: 0 },
});

// Add the original source file and its content
customSourceMapGenerator.addSource(
  "app.js",
  fs.readFileSync("./app.js", "utf-8")
);

// Generate the source map
const customSourceMap = customSourceMapGenerator.generate();

// Save the source map as an external file
fs.writeFileSync("./app.min.js.map", customSourceMap, "utf-8");

console.log("Custom source map generated successfully.");
