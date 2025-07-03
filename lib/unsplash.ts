import { createClient } from '@unsplash/js';

const unsplash = createClient({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export const getImageByQuery = async (query: string) => {
  try {
    const response = await unsplash.search.getPhotos({
      query: query,
      perPage: 1,
      orientation: 'portrait',
    });

    const results = await response.response;
    return results.results[0]?.urls.regular || null;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
};
