module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},

	plugins: [
		'@typescript-eslint',
		'prettier',
		'jest',
		'jest-formatting',
		'regexp',
		'import',
		'react'
	],

	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'prettier',
		'plugin:prettier/recommended',
		'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
		'plugin:eslint-comments/recommended',
		'plugin:regexp/recommended',
		'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-formatting/strict',
	],

	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json', './tsconfig.node.json'],
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			jsx: true
		}
	},

	settings: {
		react: {
			createClass: "createReactClass",
			pragma: "React",
			fragment: "Fragment",
			version: "detect",
			flowVersion: "0.53"
		},
	},

	rules: {
		"react/jsx-uses-react": "error",
   		"react/jsx-uses-vars": "error",
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'variable',
				format: ['camelCase', 'UPPER_CASE'],
			},
			{
				selector: 'parameter',
				format: ['camelCase'],
				leadingUnderscore: 'allow',
			},
			{
				selector: 'classProperty',
				modifiers: ['static', 'readonly'],
				format: ['UPPER_CASE'],
				leadingUnderscore: 'allowDouble',
			},
			{
				selector: 'typeLike',
				format: ['PascalCase'],
			},
		],
		'max-classes-per-file': 'error',
		'max-depth': 'error',
		'max-lines': 'error',
		'max-lines-per-function': ['error', {
			max: 70,
		}],
		'max-nested-callbacks': ['error', {
			max: 4,
		}],
		'max-params': 'error',
		'max-statements': ['error', {
			max: 25
		}],
		'react/react-in-jsx-scope': 'off'
	}
};
