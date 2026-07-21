import { config, PlaylistItem } from './config.js';
import { Logger } from './logger.js';

export class PlaylistManager {
	async loadPlaylist(): Promise<PlaylistItem[]> {
		try {
			Logger.log('Загружаем плейлист из CMS...');
			const response = await fetch(config.cmsPlaylistUrl, {
				method: 'GET',
				cache: 'no-cache',
				headers: { 'Cache-Control': 'no-cache' },
			});

			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const remotePlaylist: PlaylistItem[] = await response.json();
			if (remotePlaylist.length > 0) {
				config.playlist = remotePlaylist;
				Logger.log(`Загружено ${remotePlaylist.length} элементов из сети`);
				return remotePlaylist;
			}
		} catch (err) {
			Logger.warn('Не удалось загрузить удалённый плейлист, используем локальный', err);
		}

		// Fallback
		config.playlist = [...config.localPlaylist];
		return config.playlist;
	}

	getNext(): PlaylistItem {
		if (config.playlist.length === 0) {
			config.playlist = [...config.localPlaylist];
		}
		const item = config.playlist[config.currentIndex];
		config.currentIndex = (config.currentIndex + 1) % config.playlist.length;
		return item;
	}

	// Периодическое обновление
	startAutoRefresh(intervalMinutes = 10) {
		setInterval(
			() => {
				this.loadPlaylist().catch(Logger.error);
			},
			intervalMinutes * 60 * 1000,
		);
	}
}
