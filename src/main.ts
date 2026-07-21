import { SignagePlayer } from './player.js';
import { PlaylistManager } from './playlist.js';
import { initAdmin } from './admin.js';
import { Logger } from './logger.js';
import { config } from './config.js';

const player = new SignagePlayer();
const playlistManager = new PlaylistManager();

async function init() {
	Logger.init();
	initAdmin();

	Logger.log('Signage Player запущен', 'info');
	Logger.log('Версия: 0.1.0 | Режим: Fullscreen + Admin Overlay');

	try {
		await playlistManager.loadPlaylist();
		Logger.log(`Плейлист загружен: ${config.playlist.length} элементов`, 'info');
	} catch (err) {
		Logger.error(`Ошибка загрузки плейлиста: ${err}`);
	}

	playlistManager.startAutoRefresh(10);

	playNext();
}

function playNext() {
	try {
		const item = playlistManager.getNext();
		Logger.log(`Воспроизведение → ${item.type}: ${item.url.substring(0, 70)}...`);
		player.play(item);
	} catch (err) {
		Logger.error(`Ошибка воспроизведения: ${err}`);
		setTimeout(playNext, 3000);
	}
}

window.addEventListener('nextItem', playNext);
(window as any).playNext = playNext;
(window as any).Logger = Logger;

init();
