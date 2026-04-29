// app/sitemap.js

export default async function sitemap() {
  const baseUrl = "https://levioosa.uk";

  // 1. Static Pages (Home, About, Contact)
  const staticPages = ["", "/about", "/contact", "/cart"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }));

  // 2. Dynamic Product Pages
  // Yahan aap apne database se products fetch karein
  // Maslan: const products = await getProducts() 
  
  // Dummy example for logic:
  const products = [
    { id: 'royal-noir-jacket' },
    { id: 'moss-drift' }
  ];

  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}