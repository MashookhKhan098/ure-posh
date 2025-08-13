const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.log('Please make sure you have:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.log('\nYou can add them to your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample poster categories
const categories = [
  { name: "Motivational", description: "Inspirational and motivational posters", icon: "💪", color: "#FF6B6B" },
  { name: "Business", description: "Professional business posters", icon: "💼", color: "#4ECDC4" },
  { name: "Educational", description: "Learning and educational content", icon: "📚", color: "#45B7D1" },
  { name: "Artistic", description: "Creative and artistic designs", icon: "🎨", color: "#96CEB4" },
  { name: "Technology", description: "Tech-related posters", icon: "💻", color: "#FFEAA7" },
  { name: "Health", description: "Health and wellness posters", icon: "🏥", color: "#DDA0DD" },
  { name: "Sports", description: "Sports and fitness posters", icon: "⚽", color: "#98D8C8" },
  { name: "Nature", description: "Nature and environmental posters", icon: "🌿", color: "#F7DC6F" }
];

// Sample posters with high-quality images
const posters = [
  {
    title: "Success Mindset Blueprint",
    description: "A comprehensive motivational poster designed to inspire success and achievement. Perfect for offices, classrooms, and personal spaces.",
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    category: "Motivational",
    tags: ["motivation", "success", "mindset", "achievement"],
    price: 299.00,
    featured: true,
    status: "active"
  },
  {
    title: "Business Strategy Framework",
    description: "Professional business strategy poster with modern design elements. Ideal for corporate environments and business meetings.",
    image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
    category: "Business",
    tags: ["business", "strategy", "professional", "corporate"],
    price: 399.00,
    featured: true,
    status: "active"
  },
  {
    title: "Digital Innovation Hub",
    description: "Modern technology innovation poster showcasing the future of digital transformation and technological advancement.",
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    category: "Technology",
    tags: ["technology", "innovation", "digital", "future"],
    price: 349.00,
    featured: false,
    status: "active"
  },
  {
    title: "Health & Wellness Guide",
    description: "Comprehensive health and wellness poster promoting healthy lifestyle choices and well-being practices.",
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    category: "Health",
    tags: ["health", "wellness", "fitness", "lifestyle"],
    price: 249.00,
    featured: false,
    status: "active"
  },
  {
    title: "Creative Design Principles",
    description: "Artistic and creative design poster featuring modern design principles and creative inspiration.",
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    category: "Artistic",
    tags: ["art", "design", "creative", "inspiration"],
    price: 199.00,
    featured: true,
    status: "active"
  },
  {
    title: "Sports Excellence",
    description: "Dynamic sports and fitness poster celebrating athletic achievement and physical excellence.",
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    category: "Sports",
    tags: ["sports", "fitness", "athletic", "excellence"],
    price: 279.00,
    featured: false,
    status: "active"
  },
  {
    title: "Nature Conservation",
    description: "Beautiful nature and environmental poster promoting conservation and environmental awareness.",
    image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    category: "Nature",
    tags: ["nature", "environment", "conservation", "sustainability"],
    price: 229.00,
    featured: false,
    status: "active"
  },
  {
    title: "Educational Excellence",
    description: "Comprehensive educational poster designed to inspire learning and academic achievement.",
    image_url: "https://images.unsplash.com/photo-1523240797358-5bbd9f0c3b0d?w=800&h=600&fit=crop",
    category: "Educational",
    tags: ["education", "learning", "academic", "knowledge"],
    price: 189.00,
    featured: false,
    status: "active"
  }
];

async function addSampleData() {
  try {
    console.log('🚀 Starting to add sample data...\n');

    // Add categories
    console.log('📂 Adding poster categories...');
    for (const category of categories) {
      const { error } = await supabase
        .from('poster_categories')
        .upsert(category, { onConflict: 'name' });
      
      if (error) {
        console.error(`❌ Error adding category ${category.name}:`, error.message);
      } else {
        console.log(`✅ Added category: ${category.name}`);
      }
    }

    console.log('\n📄 Adding sample posters...');
    for (const poster of posters) {
      const { error } = await supabase
        .from('posters')
        .insert(poster);

      if (error) {
        console.error(`❌ Error adding poster ${poster.title}:`, error.message);
      } else {
        console.log(`✅ Added poster: ${poster.title}`);
      }
    }

    console.log('\n🎉 Sample data added successfully!');
    console.log(`📊 Added ${categories.length} categories and ${posters.length} posters`);
    console.log('\n🌐 You can now visit /posters to see your beautiful poster collection!');

  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
}

// Run the script
addSampleData();
