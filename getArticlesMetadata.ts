import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const getArticleFiles = (): {
	year: string;
	month: string;
	slug: string;
	filePath: string;
}[] => {
	// articles are stored in /articles/YEAR/MONTH/SLUG.md
	// ex: /articles/2024/01/test.md
	const articlesDir = path.join(process.cwd(), 'articles');
	const years = fs.readdirSync(articlesDir);
	let files: {
		year: string;
		month: string;
		slug: string;
		filePath: string;
	}[] = [];
	years.forEach((year) => {
		const yearDir = path.join(articlesDir, year);
		const months = fs.readdirSync(yearDir);
		months.forEach((month) => {
			const monthDir = path.join(yearDir, month);
			const slugs = fs.readdirSync(monthDir);
			slugs.forEach((slugFile) => {
				if (slugFile.endsWith('.md')) {
					const slug = slugFile.replace('.md', '');
					const filePath = path.join(monthDir, slugFile);
					files.push({ year, month, slug, filePath });
				}
			});
		});
	});
	return files;
}

const getArticlesMetadata = (): {
	year: string;
	month: string;
	slug: string;
	title: string;
	bio: string;
}[] => {
	const articleFiles = getArticleFiles();
	const articlesMetadata = articleFiles.map(({ year, month, slug, filePath }) => {
		const content = fs.readFileSync(filePath, 'utf8');
		const matterResult = matter(content);
		return {
			year,
			month,
			slug,
			title: matterResult.data.title || 'No title',
			bio: matterResult.data.bio || 'No bio',
		};
	});
	// Sort articles by date (newest first)
	articlesMetadata.sort((a, b) => {
		if (a.year !== b.year) {
			return parseInt(b.year) - parseInt(a.year);
		}
		if (a.month !== b.month) {
			return parseInt(b.month) - parseInt(a.month);
		}
		return 0;
	});
	return articlesMetadata;
};

export default getArticlesMetadata;