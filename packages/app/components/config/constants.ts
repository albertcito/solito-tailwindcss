const contants = {
  articles: 'articles',
  books: 'books',
  tags: 'tags',
  featured: process.env.NEXT_PUBLIC_FEATURED
    ? Number.parseInt(process.env.NEXT_PUBLIC_FEATURED, 10)
    : -1,
};

export default contants;
