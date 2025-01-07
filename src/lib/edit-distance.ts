function getEditDistance(
	source: string,
	target: string
): { distance: number; indices: Set<number> } {
	const n = source.length;
	const m = target.length;

	// Create DP table and auxiliary table for tracking decisions
	const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(Infinity));
	const parent: [number, number][][] = Array.from({ length: n + 1 }, () =>
		Array.from({ length: m + 1 }, () => [-1, -1])
	);

	// Base cases
	dp[0][0] = 0; // No operations needed for empty strings
	for (let i = 1; i <= n; i++) {
		dp[i][0] = i; // Removing all characters from source
		parent[i][0] = [i - 1, 0];
	}
	for (let j = 1; j <= m; j++) {
		dp[0][j] = 0; // Adding prefix is free
		parent[0][j] = [0, j - 1];
	}

	// Fill the DP table
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= m; j++) {
			// Insert a character into the source
			const cost = i === n ? 0 : 1;
			if (dp[i][j] > dp[i][j - 1] + cost) {
				dp[i][j] = dp[i][j - 1] + cost;
				parent[i][j] = [i, j - 1];
			}

			// Remove a character from the source
			if (dp[i][j] > dp[i - 1][j] + 1) {
				dp[i][j] = dp[i - 1][j] + 1;
				parent[i][j] = [i - 1, j];
			}

			// Characters match, no cost
			if (source[i - 1] === target[j - 1]) {
				if (dp[i][j] > dp[i - 1][j - 1]) {
					dp[i][j] = dp[i - 1][j - 1];
					parent[i][j] = [i - 1, j - 1];
				}
			} else {
				// Modify a character
				if (dp[i][j] > dp[i - 1][j - 1] + 1) {
					dp[i][j] = dp[i - 1][j - 1] + 1;
					parent[i][j] = [i - 1, j - 1];
				}
			}
		}
	}

	// Backtrack to find kept indices
	const indices: Set<number> = new Set();
	let i = n,
		j = m;
	while (i > 0 || j > 0) {
		const [prevI, prevJ] = parent[i][j];
		if (prevI === i - 1 && prevJ === j - 1 && source[i - 1] === target[j - 1]) {
			indices.add(j - 1); // Record the index in the target string
		}
		i = prevI;
		j = prevJ;
	}

	return { distance: dp[n][m], indices };
}

export default getEditDistance;
