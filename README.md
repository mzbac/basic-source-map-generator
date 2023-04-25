# Basic Source Map Generator

A simple, custom-built Source Map Generator for educational purposes. This implementation is basic and has limited functionality compared to the `source-map` npm package. Please note that this example should not be used in production environments.

## Features

- Generate source maps for minified JavaScript files
- Add mappings between the generated and original code
- Add sources and their content to the source map
- Output source maps in the standard JSON format

## Usage

1. Create a basic JavaScript file, `app.js`, and its minified version, `app.min.js`, in your project folder.

2. Use the `CustomSourceMapGenerator` in `generate-custom-source-map.js` to generate a source map for your minified JavaScript file:

```javascript
const fs = require("fs");
const CustomSourceMapGenerator = require("./custom-source-map-generator");

// Read the content of the minified JavaScript file
const minifiedJsContent = fs.readFileSync("./app.min.js", "utf-8");

// Initialize the custom source map generator
const customSourceMapGenerator = new CustomSourceMapGenerator("app.min.js");

// Loop through each line of the minified JavaScript file
minifiedJsContent.split("\n").forEach((line, lineIndex) => {
  customSourceMapGenerator.addMapping({
    generated: { line: lineIndex + 1, column: 0 },
    original: { line: lineIndex + 1, column: 0 },
  });
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
```

3. Run the generate-custom-source-map.js script:

```
node generate-custom-source-map.js
```

This will generate an external source map file named app.min.js.map. To use this source map in your project, add the following line at the end of your minified JavaScript file:

```
//# sourceMappingURL=app.min.js.map
```

## Running the example

1. In the terminal, run the following command:

```
npx http-server .
```

This will start a web server on a default port (usually 8080).

2. Open your browser and navigate to <http://localhost:8080> to view the index.html file.

3. Open the browser's developer tools (usually by pressing F12 or Cmd+Option+I on Mac) to inspect and debug the original source code using the source map.
