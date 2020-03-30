/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @typedef {import("webpack/lib/Compiler")} Compiler */
/** @typedef {import("html-webpack-plugin").Options} HtmlWebpackOptions */

/**
 * @typedef {{
 *   routes: string[];
 * }} ReactRouterHtmlPluginOptions
 */

module.exports = class ReactRouterHtmlPlugin {
  /**
   * @param {ReactRouterHtmlPluginOptions & HtmlWebpackOptions} options
   */
  constructor(options) {
    this.options = options;

    this.fileNames = ['[route].html', '[route]/index.html', 'index.html'];
  }

  /**
   * @param {Compiler} compiler the compiler instance
   */
  apply(compiler) {
    // eslint-disable-next-line
    this.fileNames.reduce((fileNames, fileName) => {
      if (!fileName.includes('[route]')) {
        return fileNames.concat(fileName);
      }

      return fileNames.concat(this.options.routes.map(
        (route) => fileName
          .replace('[route]', route)
          .replace(/\/\/+/, '/')
          .replace(/^\//, '')
          .replace(/^\./, 'index.'),
      ));
    }, []).forEach((filename) => {
      // @ts-ignore
      new HtmlWebpackPlugin({ ...this.options, filename }).apply(compiler);
    });
  }
};
