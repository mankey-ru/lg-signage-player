export interface PlaylistItem {
	type: 'video' | 'image' | 'web';
	url: string;
	duration?: number; // секунды для картинок
	title?: string;
}

export const config = {
	cmsPlaylistUrl: 'https://your-cms.example.com/api/playlist.json', // ← измени
	localPlaylist: [
		{ type: 'image' as const, url: 'https://picsum.photos/id/1015/1920/1080', duration: 15 },
		{
			type: 'video' as const,
			url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		},
	] as PlaylistItem[],
	playlist: [] as PlaylistItem[], // будет заполняться
	currentIndex: 0,
};
