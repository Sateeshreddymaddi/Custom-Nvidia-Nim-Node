const { src, dest, parallel, series, watch } = require('gulp');

function buildIcons() {
  return src('nodes/NvidiaNim/nvidia-nim.png', { encoding: false })
    .pipe(dest('dist/nodes/NvidiaNim/'));
}

exports['build:icons'] = buildIcons;
exports.default = series(buildIcons);