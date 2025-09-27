import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const getPageContent = (mdFilePath: string) => {
	const content = fs.readFileSync(mdFilePath, 'utf8');
	const matterResult = matter(content);
	return matterResult;
};

export default getPageContent;