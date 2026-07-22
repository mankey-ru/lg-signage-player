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

        if (item.type === 'video') {
            const video = document.createElement('video') as HTMLVideoElement;
            video.src = item.url;
            video.autoplay = true;
            video.controls = false;
            video.muted = true; // важно для autoplay на многих ТВ
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'contain';

            // Успешное окончание
            video.onended = () => {
                window.dispatchEvent(new Event('nextItem'));
            };

            // Ошибка загрузки / воспроизведения
            video.onerror = () => {
                Logger.error(`Ошибка видео: ${item.url}`, video.error);
                window.dispatchEvent(new Event('nextItem'));
            };

            this.container.appendChild(video);
            this.currentElement = video;

            // На всякий случай — если video.error уже есть
            video.load();
        }
        else if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.url;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';

            img.onload = () => {
                setTimeout(() => {
                    window.dispatchEvent(new Event('nextItem'));
                }, (item.duration || 10) * 1000);
            };

            img.onerror = () => {
                Logger.error(`Ошибка изображения: ${item.url}`);
                window.dispatchEvent(new Event('nextItem'));
            };

            this.container.appendChild(img);
            this.currentElement = img;
        }
        else if (item.type === 'web') {
            const iframe = document.createElement('iframe');
            iframe.src = item.url;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';

            // Для web-страниц используем duration
            setTimeout(() => {
                window.dispatchEvent(new Event('nextItem'));
            }, (item.duration || 20) * 1000);

            this.container.appendChild(iframe);
            this.currentElement = iframe;
        }
    }

    clear() {
        if (this.currentElement) {
            this.currentElement.remove();
            this.currentElement = null;
        }
        this.container.innerHTML = '';
    }
}
