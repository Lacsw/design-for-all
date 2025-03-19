import sendRequest from './utils';
import { domain } from 'utils/config';

export async function getTree(options) {
  const endpoint = `tree_${options}.json`;
  return sendRequest(domain + '/' + endpoint);
}

export async function getTitles() {
  const endpoint = `main_categories.json`;
  return sendRequest(domain+ '/' +endpoint);
}
