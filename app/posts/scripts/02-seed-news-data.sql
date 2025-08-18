-- Insert categories
INSERT INTO categories (name, slug, color) VALUES
('Breaking News', 'breaking-news', '#DC2626'),
('Politics', 'politics', '#7C3AED'),
('Technology', 'technology', '#059669'),
('Business', 'business', '#D97706'),
('Sports', 'sports', '#2563EB'),
('Entertainment', 'entertainment', '#DB2777'),
('Health', 'health', '#16A34A'),
('Science', 'science', '#0891B2')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tags
INSERT INTO tags (name, slug) VALUES
('Trending', 'trending'),
('Exclusive', 'exclusive'),
('Investigation', 'investigation'),
('Analysis', 'analysis'),
('Opinion', 'opinion'),
('Breaking', 'breaking'),
('Update', 'update'),
('Interview', 'interview')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample articles
INSERT INTO articles (title, slug, excerpt, content, image_url, author, category_id, is_breaking, is_hot, views) VALUES
(
  'Major Tech Companies Announce Revolutionary AI Partnership',
  'major-tech-companies-ai-partnership',
  'Leading technology giants join forces to develop next-generation artificial intelligence solutions that could reshape the industry.',
  'In a groundbreaking move that could reshape the technology landscape, five major tech companies have announced an unprecedented partnership to develop next-generation artificial intelligence solutions. The collaboration brings together industry leaders with a combined market value exceeding $5 trillion...',
  '/placeholder.svg?height=400&width=600',
  'Sarah Chen',
  (SELECT id FROM categories WHERE slug = 'technology'),
  TRUE,
  TRUE,
  15420
),
(
  'Global Climate Summit Reaches Historic Agreement',
  'global-climate-summit-historic-agreement',
  'World leaders unite on ambitious climate targets with binding commitments for carbon neutrality by 2040.',
  'After weeks of intense negotiations, world leaders at the Global Climate Summit have reached a historic agreement that sets the most ambitious climate targets in international history. The accord includes binding commitments for achieving carbon neutrality by 2040...',
  '/placeholder.svg?height=400&width=600',
  'Michael Rodriguez',
  (SELECT id FROM categories WHERE slug = 'politics'),
  TRUE,
  FALSE,
  12890
),
(
  'Breakthrough Medical Treatment Shows 95% Success Rate',
  'breakthrough-medical-treatment-success-rate',
  'Revolutionary gene therapy demonstrates unprecedented results in clinical trials for previously incurable conditions.',
  'A revolutionary gene therapy treatment has shown remarkable success in Phase III clinical trials, achieving a 95% success rate in treating previously incurable genetic conditions. The breakthrough represents a major milestone in personalized medicine...',
  '/placeholder.svg?height=400&width=600',
  'Dr. Emily Watson',
  (SELECT id FROM categories WHERE slug = 'health'),
  FALSE,
  TRUE,
  8750
),
(
  'Stock Markets Surge Following Economic Recovery Signals',
  'stock-markets-surge-economic-recovery',
  'Major indices reach record highs as economic indicators point to robust recovery and sustained growth.',
  'Global stock markets experienced their strongest rally in months today, with major indices reaching record highs following the release of encouraging economic data. The surge reflects growing investor confidence in the economic recovery...',
  '/placeholder.svg?height=400&width=600',
  'James Thompson',
  (SELECT id FROM categories WHERE slug = 'business'),
  FALSE,
  TRUE,
  6420
),
(
  'Championship Finals Set Record Viewership Numbers',
  'championship-finals-record-viewership',
  'Historic sports finale draws largest global audience in tournament history with over 2 billion viewers worldwide.',
  'The championship finals have shattered all previous viewership records, drawing an unprecedented global audience of over 2 billion viewers. The historic match showcased exceptional athleticism and drama that captivated fans worldwide...',
  '/placeholder.svg?height=400&width=600',
  'Alex Martinez',
  (SELECT id FROM categories WHERE slug = 'sports'),
  FALSE,
  FALSE,
  9340
),
(
  'New Space Mission Discovers Potentially Habitable Exoplanet',
  'space-mission-habitable-exoplanet-discovery',
  'Advanced telescope array identifies Earth-like planet in habitable zone with signs of atmospheric water vapor.',
  'Scientists using an advanced telescope array have discovered a potentially habitable exoplanet located in the Goldilocks zone of a nearby star system. Initial observations suggest the presence of atmospheric water vapor and conditions that could support life...',
  '/placeholder.svg?height=400&width=600',
  'Dr. Lisa Park',
  (SELECT id FROM categories WHERE slug = 'science'),
  FALSE,
  TRUE,
  11200
);

-- Link articles with tags
INSERT INTO article_tags (article_id, tag_id) VALUES
((SELECT id FROM articles WHERE slug = 'major-tech-companies-ai-partnership'), (SELECT id FROM tags WHERE slug = 'breaking')),
((SELECT id FROM articles WHERE slug = 'major-tech-companies-ai-partnership'), (SELECT id FROM tags WHERE slug = 'exclusive')),
((SELECT id FROM articles WHERE slug = 'global-climate-summit-historic-agreement'), (SELECT id FROM tags WHERE slug = 'breaking')),
((SELECT id FROM articles WHERE slug = 'global-climate-summit-historic-agreement'), (SELECT id FROM tags WHERE slug = 'analysis')),
((SELECT id FROM articles WHERE slug = 'breakthrough-medical-treatment-success-rate'), (SELECT id FROM tags WHERE slug = 'trending')),
((SELECT id FROM articles WHERE slug = 'breakthrough-medical-treatment-success-rate'), (SELECT id FROM tags WHERE slug = 'exclusive')),
((SELECT id FROM articles WHERE slug = 'stock-markets-surge-economic-recovery'), (SELECT id FROM tags WHERE slug = 'trending')),
((SELECT id FROM articles WHERE slug = 'championship-finals-record-viewership'), (SELECT id FROM tags WHERE slug = 'update')),
((SELECT id FROM articles WHERE slug = 'space-mission-habitable-exoplanet-discovery'), (SELECT id FROM tags WHERE slug = 'exclusive')),
((SELECT id FROM articles WHERE slug = 'space-mission-habitable-exoplanet-discovery'), (SELECT id FROM tags WHERE slug = 'trending'));
