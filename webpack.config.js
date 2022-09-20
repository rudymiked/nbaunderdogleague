module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./app.tsx",
    output: {
      filename: "bundle.js"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { 
            test: /\.tsx?$/,
            use: 'ts-loader',
            // eslint-disable-next-line no-undef
            exclude: path.resolve(__dirname, '/node_modules')
        }
      ]
    },
    watch: true
  };