import { PlaylistItem } from './config.js';
import { Logger } from './logger.js';

export class SignagePlayer {
	private container: HTMLElement;
	private currentElement: HTMLElement | null = null;

	constructor() {
		this.container = document.getElementById('player-container')!;
	}

	play(item: PlaylistItem) {
		this.clear();
		Logger.log(`Запуск ${item.type}: ${item.url.substring(0, 60)}...`);
		if (item.type === 'video') {
			const video = document.createElement('video') as HTMLVideoElement;
			video.src = item.url;
			video.autoplay = true;
			video.controls = false;
			video.style.width = '100%';
			video.style.height = '100%';
			video.style.objectFit = 'contain';
			video.onended = () => window.dispatchEvent(new Event('nextItem'));
			this.container.appendChild(video);
			this.currentElement = video;
		} else if (item.type === 'image') {
			const img = document.createElement('img');
			img.src = item.url;
			img.style.width = '100%';
			img.style.height = '100%';
			img.style.objectFit = 'contain';
			this.container.appendChild(img);
			this.currentElement = img;
			setTimeout(
				() => window.dispatchEvent(new Event('nextItem')),
				(item.duration || 10) * 1000,
			);
		} else {
			const iframe = document.createElement('iframe');
			iframe.src = item.url;
			iframe.style.width = '100%';
			iframe.style.height = '100%';
			iframe.style.border = 'none';
			this.container.appendChild(iframe);
			this.currentElement = iframe;
		}
	}

	clear() {
		if (this.currentElement) {
			this.currentElement.remove();
			this.currentElement = null;
		}
	}
}
