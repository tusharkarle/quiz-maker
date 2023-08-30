module.exports = {
	root: true,
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: ['tsconfig.*?.json', 'tsconfig.json'],
				createDefaultProgram: true,
			},
			extends: [
				'plugin:@angular-eslint/recommended',
				'plugin:@typescript-eslint/recommended',
				'prettier',
				'plugin:prettier/recommended',
			],
			rules: {
				'max-len': ['error', { code: 180, ignoreComments: true }],
				'no-inferrable-types': 0,
				'no-console': ['error', { allow: ['warn', 'error'] }],
				'no-debugger': 'error',
				'no-empty': 'error',
				eqeqeq: 'error',
				'consistent-return': 'error',
				'no-multi-spaces': 'error',
				'no-empty-function': 'off',
				'@typescript-eslint/no-empty-function': ['error'],
				'brace-style': 'off',
				'@typescript-eslint/brace-style': ['error'],
				quotes: 'off',
				'@typescript-eslint/quotes': [
					'error',
					'single',
					{
						avoidEscape: true,
						allowTemplateLiterals: true,
					},
				],
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'default',
						format: ['camelCase'],
					},
					{
						selector: 'variable',
						format: ['camelCase', 'UPPER_CASE'],
					},
					{
						selector: 'parameter',
						format: ['camelCase'],
						leadingUnderscore: 'forbid',
					},

					{
						selector: 'memberLike',
						modifiers: ['private'],
						format: ['camelCase'],
						leadingUnderscore: 'allow',
					},

					{
						selector: 'typeLike',
						format: ['PascalCase'],
					},
					{
						selector: 'variable',
						modifiers: ['const', 'global', 'exported'],
						format: ['UPPER_CASE'],
					},
					{
						selector: 'enumMember',
						format: ['UPPER_CASE'],
					},
				],

				'no-console': ['error', { allow: ['warn', 'error'] }],
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': 'error',
				'@typescript-eslint/no-empty-interface': 'error',
				'@typescript-eslint/no-inferrable-types': 'off',
				'no-unused-expressions': 'off',
				'@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
				'@typescript-eslint/restrict-plus-operands': 'error',
				'@typescript-eslint/semi': ['error'],
				'@typescript-eslint/prefer-function-type': 'error',
				'@typescript-eslint/type-annotation-spacing': 'error',
				'@typescript-eslint/unified-signatures': 'error',
				'@typescript-eslint/no-namespace': 'off',
				complexity: ['error', { max: 12 }],
			},
		},
		{
			files: ['*.html'],
			parser: '@html-eslint/parser',
			extends: ['plugin:@html-eslint/recommended'],
			rules: {
				'@html-eslint/require-img-alt': 'error',
				'@html-eslint/id-naming-convention': 'error',
			},
		},
		{
			files: ['*.component.ts'],
			extends: ['plugin:@angular-eslint/template/process-inline-templates'],
		},
	],
	plugins: ['html', 'eslint-plugin-html'],
};
