import glob from 'glob';
import assert from 'assert';

function shouldSkip(fileName) {
  return fileName.search(/(\.spec|\/util)\.js/) > -1;
}

/**
 *
 *
 */
export function bootstrapRoutes(app) {
  console.log("bootstrap routes");

  glob
    .sync(__dirname + '/**/*.js')
    .forEach(routeFile => {
      if (shouldSkip(routeFile)) return;

      require(routeFile).default(app);
    });
}
