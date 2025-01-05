import { browser } from '$app/environment';

export class SessionState<T> {
	value = $state<T>() as T;
	constructor(key: string, defaultValue: T) {
		this.value = defaultValue;
		if (browser) {
			const stored = sessionStorage.getItem(key);
			if (stored !== null) {
				this.value = JSON.parse(stored);
			}
		}
		$effect(() => {
			sessionStorage.setItem(key, JSON.stringify(this.value));
		});
	}
}
