const editDistance = (
	source: string,
	target: string,
	insertCost: number = 0.5,
	modifyCost: number = 1,
	removeCost: number = 1
): number => {
	const n = source.length;
	const m = target.length;

	// Create DP table
	const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(Infinity));

	const dpp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(Infinity));

	// Base cases
	dp[0][0] = 0; // No operations needed for empty strings
	dpp[0][0] = 0;

	for (let i = 1; i <= n; i++) {
		dp[i][0] = i * removeCost; // Removing all characters from source
		dpp[i][0] = dp[i][0];
	}

	for (let j = 1; j <= m; j++) {
		dp[0][j] = insertCost; // Single insert operation for entire target prefix
		dpp[0][j] = insertCost;
	}

	// Fill the DP table
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= m; j++) {
			// Case 1: Characters match, no cost
			if (source[i - 1] === target[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				// Case 2: Modify a character
				dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1] + modifyCost);
			}

			// Case 3: Remove a character from the source
			dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + removeCost);

			// Case 4: Insert a substring into the source
			dp[i][j] = Math.min(dp[i][j], dpp[i][j - 1] + insertCost);

			// Update pfxs for current cell
			dpp[i][j] = Math.min(dpp[i][j - 1], dp[i][j]);
		}
	}

	return dp[n][m];
};

export default editDistance;
