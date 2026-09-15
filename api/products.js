export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle browser preflight checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.PRINTIFY_API_KEY;
  let shopId = process.env.PRINTIFY_SHOP_ID;

  if (!apiKey) {
    return res.status(500).json({ error: 'PRINTIFY_API_KEY environment variable is missing.' });
  }

  try {
    // If shop ID is not preset, auto-retrieve the primary shop
    if (!shopId) {
      const shopsRes = await fetch('https://api.printify.com/v1/shops.json', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'TinDry-Store/1.0.0'
        }
      });
      const shops = await shopsRes.json();
      if (!Array.isArray(shops) || shops.length === 0) {
        return res.status(404).json({ error: 'No Printify shops found for this account.' });
      }
      shopId = shops[0].id;
    }

    // Fetch published products
    const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'TinDry-Store/1.0.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'Printify API Error', details: errorText });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Server Error', message: err.message });
  }
}
