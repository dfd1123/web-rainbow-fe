const chokidar = require('chokidar');
const { SvgComponentGenerator } = require('../dist/modules/index.cjs.js');

let watcher = null; // 전역 또는 모듈 수준의 변수로 watcher를 관리

console.info("✨[Svg Component Generator] is Stopped...");

const svgCompGenertor = new SvgComponentGenerator({
  svgFileDir: 'src/assets/svgs',
  outputDir: 'src/components/icons',
  typescript: true
})

if (process.env.NODE_ENV === 'development') {
  if (!watcher) { // Watcher가 이미 존재하지 않는 경우에만 생성
    watcher = chokidar.watch('src/assets/svgs', { persistent: true, ignored: /\/svg\/types\// });
  }

  watcher.on('add', svgCompGenertor.generate);
  watcher.on('unlink', svgCompGenertor.generate);
} else {
  console.info("✨[Svg Component Generator] is Running...");
  void svgCompGenertor.generate();
}


process.once('SIGINT', () => {
	if (watcher) {
		watcher.close();
	}

  console.info("✨[Svg Component Generator] is Stopped...");

	process.exit(0);
});