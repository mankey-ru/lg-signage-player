export class Logger {
	private static logs: string[] = [];
	private static maxLogs = 200;
	private static statusElement: HTMLElement | null = null;

	static init() {
		this.statusElement = document.getElementById('status');
	}

	/**
	 * Основной метод, поддерживает любое количество аргументов как console.log
	 */
	static log(...args: any[]) {
		this._log('info', ...args);
	}

	static warn(...args: any[]) {
		this._log('warn', ...args);
	}

	static error(...args: any[]) {
		this._log('error', ...args);
	}

	private static _log(level: 'info' | 'warn' | 'error', ...args: any[]) {
		const timestamp = new Date().toLocaleTimeString('ru-RU', { hour12: false });
		const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

		// Формируем строку для UI
		const message = args
			.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
			.join(' ');

		const entry = `${prefix} ${message}`;

		// Сохраняем в историю
		this.logs.unshift(entry);
		if (this.logs.length > this.maxLogs) this.logs.pop();

		// Дублируем в консоль браузера
		if (level === 'error') {
			console.error(...args);
		} else if (level === 'warn') {
			console.warn(...args);
		} else {
			console.log(...args);
		}

		// Обновляем UI
		this.updateUI();
	}

	static updateUI() {
		if (!this.statusElement) return;

		const logsHtml = this.logs.map((log) => `<div>${log}</div>`).join('');

		this.statusElement.innerHTML = `
            <h3>📜 Логи (${this.logs.length}) — Alt+A для скрытия</h3>
            <div style="background:#111; padding:12px; max-height:65vh; overflow:auto; font-size:13px; line-height:1.35; white-space:pre-wrap; font-family:monospace;">
                ${logsHtml || '<div style="color:#666;">Логов пока нет...</div>'}
            </div>
            <button onclick="Logger.clear()" style="margin-top:10px;">Очистить логи</button>
        `;
	}

	static clear() {
		this.logs = [];
		this.updateUI();
		console.clear();
		this.log('Логи очищены');
	}
}
