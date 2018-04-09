module.exports = (ctx) => ({
  plugins: {
    'precss': {},
    'postcss-cssnext': {features: {autoprefixer: false}},
    'cssnano': ctx.options.production ? {} : false,
  },
});
