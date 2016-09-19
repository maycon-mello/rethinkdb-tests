import glob from 'glob';



/**
 *
 *
 */
export default function (app) {
  console.log("bootstrap routes");
  glob
    .sync(__dirname + '/**/controller.js')
    .forEach(controller => {
      require(controller).default(app);
    });
}
