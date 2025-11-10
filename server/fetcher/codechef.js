import axios from 'axios';
import { load } from 'cheerio';

export async function fetchCodeChef(username) {
  try {
    const url = `https://www.codechef.com/users/${username}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const html = response.data;
    const $ = load(html);

    // Current rating - first rating-number
    const currentRatingText = $('.rating-header .rating-number').first().text().trim();
    const currentRating = currentRatingText.match(/\d+/)?.[0];
    // Highest rating - extract from small tag text like "(Highest Rating 1136)"
    const highestRatingText = $('.rating-header small').text().trim();
    const highestRating = highestRatingText.match(/\d+/)?.[0] || currentRating;
    
    // Total problems solved
    const totalSolvedText = $("h3:contains('Total Problems Solved')").text().trim();
    const totalSolved = totalSolvedText.match(/\d+/)?.[0] || '0';

    return {
      rating: currentRating,
      highestRating: highestRating,
      totalSolved: totalSolved,
    };
  } catch (error) {
    console.error(`CodeChef error for ${username}:`, error.message);
    throw error;
  }
}