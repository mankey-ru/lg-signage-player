export interface PlaylistItem {
	type: 'video' | 'image' | 'web';
	url: string;
	duration?: number; // секунды для картинок
	title?: string;
}

export const config = {
	cmsPlaylistUrl:
		'https://111111111raw.githubusercontent.com/mankey-ru/lg-signage-player/refs/heads/main/assets/example-playlist.json',
	localPlaylist: [
		{ type: 'image' as const, url: 'https://picsum.photos/id/1015/1920/1080', duration: 15 },
        {
            type: 'video' as const,
            // Надёжный тестовый файл
            url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            title: 'Flower (MDN)'
        },
		{
			type: 'video' as const,
			url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		},
        {
            type: 'image' as const,
            url: 'https://picsum.photos/id/237/1920/1080',
            duration: 8,
            title: 'Собака'
        }
	] as PlaylistItem[],
	playlist: [] as PlaylistItem[], // будет заполняться
	currentIndex: 0,
};
