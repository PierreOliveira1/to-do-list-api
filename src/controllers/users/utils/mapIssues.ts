import { ZodError } from 'zod';

function mapIssues(errors: ZodError) {
	const  issues = errors.issues.map(issue => {
		return {
			path: issue.path[0],
			message: issue.message,
		};
	});

	return issues;
}

export { mapIssues };
