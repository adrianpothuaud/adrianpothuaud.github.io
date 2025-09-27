import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const getArticleContent = (year: string, month: string, slug: string) => {
	const file = path.join("articles", year, month, `${slug}.md`);
	const content = fs.readFileSync(file, 'utf8');
	const matterResult = matter(content);
	return matterResult;
};

export default getArticleContent;