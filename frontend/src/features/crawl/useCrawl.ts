// useCrawl.ts - Hook wrapper for crawl functionality
import { useCrawlDomainMutation } from './crawlApi';

export const useCrawl = () => {
  return useCrawlDomainMutation();
};
