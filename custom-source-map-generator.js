class CustomSourceMapGenerator {
  constructor(outputFile) {
    this.outputFile = outputFile;
    this.mappings = [];
    this.sources = [];
  }

  addMapping(mapping) {
    this.mappings.push(mapping);
  }

  addSource(source, content) {
    this.sources.push({ source, content });
  }

  generate() {
    const sourceMap = {
      version: 3,
      file: this.outputFile,
      sources: this.sources.map((sourceObj) => sourceObj.source),
      sourcesContent: this.sources.map((sourceObj) => sourceObj.content),
      mappings: this.encodeMappings(),
    };

    return JSON.stringify(sourceMap);
  }

  encodeMappings() {
    // For simplicity, we assume that the mappings are in the correct order and properly formatted.
    // In a real-world implementation, you would need to handle sorting, merging, and validating mappings.
    return this.mappings
      .map(
        (mapping) =>
          `${mapping.generated.line},${mapping.generated.column};${mapping.original.line},${mapping.original.column}`
      )
      .join(";");
  }
}

module.exports = CustomSourceMapGenerator;
