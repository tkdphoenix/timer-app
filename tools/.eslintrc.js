module.exports = {
	extends: ['@open-wc/eslint-config', 'eslint-config-prettier', 'plugin:lit/recommended'],
	rules: {
		'arrow-body-style': ['off', 'as-needed'],
		camelcase: 'off',
		'class-methods-use-this': 'off',
		eqeqeq: 'error',
		'func-names': 'off',
		'import/extensions': ['error', 'never', { js: 'never', json: 'always' }],
		'import/newline-after-import': 'off', // requires a newline after require statement
		'import/no-extraneous-dependencies': 'off',
		'lit/no-invalid-html': 'off',
		'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
		'no-debugger': 'error',
		'no-else-return': 'off',
		'no-param-reassign': 'off',
		'no-undef': 'warn',
		'no-unused-vars': 'warn', // some components throw errors if params aren't present
		'object-shorthand': 'off',
		'prefer-destructuring': [
			'error',
			{
				array: true,
				object: true,
			},
		],
		'prefer-object-spread': 2,
	},
}
