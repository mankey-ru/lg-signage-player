import { Logger } from './logger.js';

let isAdminOpen = false;
const overlay = document.getElementById('admin-overlay')!;

export function initAdmin() {
	Logger.init();

	document.addEventListener('keydown', (e: KeyboardEvent) => {
		if (e.key === 'Escape' && isAdminOpen) {
			hideAdmin();
		}
		if (e.altKey && e.key.toLowerCase() === 'a') {
			e.preventDefault();
			toggleAdmin();
		}
	});
}

export function toggleAdmin() {
	isAdminOpen = !isAdminOpen;
	overlay.style.display = isAdminOpen ? 'block' : 'none';

	if (isAdminOpen) {
		Logger.updateUI(); // ← теперь публичный метод
	}
}

function hideAdmin() {
	isAdminOpen = false;
	overlay.style.display = 'none';
}
