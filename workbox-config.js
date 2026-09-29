module.exports = {
	globDirectory: 'dist',
	globPatterns: [
		'**/*.{js,html,json,svg,png,jpg,css}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^nothing/
	]
};