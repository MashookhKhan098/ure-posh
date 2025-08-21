const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.log('Please check your .env.local file has:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY (preferred) or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runPeopleData() {
  try {
    console.log('🚀 Starting people data insertion...');
    
    // First, check if the people table exists
    console.log('📋 Checking if people table exists...');
    const { data: tableCheck, error: tableError } = await supabase
      .from('people')
      .select('id')
      .limit(1);
    
    if (tableError) {
      console.error('❌ People table does not exist or is not accessible');
      console.error('Error:', tableError.message);
      console.log('Please run the 06-create-people-table.sql script first');
      return;
    }
    
    console.log('✅ People table exists');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '07-insert-sample-people-data.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.toLowerCase().includes('insert into people')) {
        console.log(`🔄 Executing statement ${i + 1}/${statements.length}...`);
        
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          console.error(`❌ Error executing statement ${i + 1}:`, error.message);
          // Try alternative approach for INSERT statements
          console.log('🔄 Trying alternative INSERT approach...');
          
          // Extract values from INSERT statement (simplified approach)
          const match = statement.match(/INSERT INTO people\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
          if (match) {
            const columns = match[1].split(',').map(col => col.trim());
            const values = match[2].split(',').map(val => {
              val = val.trim();
              if (val.startsWith("'") && val.endsWith("'")) {
                return val.slice(1, -1);
              }
              if (val === 'true') return true;
              if (val === 'false') return false;
              if (!isNaN(val)) return parseFloat(val);
              return val;
            });
            
            const insertData = {};
            columns.forEach((col, index) => {
              insertData[col] = values[index];
            });
            
            const { error: insertError } = await supabase
              .from('people')
              .insert([insertData]);
            
            if (insertError) {
              console.error('❌ Insert error:', insertError.message);
            } else {
              console.log('✅ Insert successful');
            }
          }
        } else {
          console.log('✅ Statement executed successfully');
        }
      }
    }
    
    // Verify the data was inserted
    console.log('🔍 Verifying inserted data...');
    const { data: people, error: verifyError } = await supabase
      .from('people')
      .select('name, title, category, rating, verified, featured')
      .order('created_at', { ascending: false });
    
    if (verifyError) {
      console.error('❌ Error verifying data:', verifyError.message);
    } else {
      console.log(`✅ Successfully inserted ${people.length} people records`);
      console.log('📊 Sample of inserted data:');
      people.slice(0, 5).forEach(person => {
        console.log(`  - ${person.name} (${person.title}) - Rating: ${person.rating}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Alternative approach: Insert data directly using Supabase client
async function insertPeopleDataDirectly() {
  console.log('🔄 Trying direct insertion approach...');
  
  const peopleData = [
    {
      name: 'CS Anchal Chopra',
      title: 'Company Secretary & Legal Expert',
      specialization: 'Corporate Law & Compliance',
      description: 'Expert in corporate governance and legal compliance with extensive experience in POSH implementation and workplace safety regulations.',
      detailed_description: 'With over a decade of experience in corporate law and compliance, CS Anchal Chopra has established herself as a leading authority in POSH implementation and workplace safety. Her comprehensive approach combines legal expertise with practical implementation strategies, helping organizations create safer, more inclusive work environments.',
      experience: '10+ years',
      category: 'legal',
      status: 'premium',
      verified: true,
      featured: true,
      availability: 'Available',
      email: 'anchal.chopra@ureposh.com',
      phone: '+91 98765 43210',
      location: 'New Delhi, India',
      website: 'www.anchalchopra.com',
      linkedin: 'linkedin.com/in/anchalchopra',
      rating: 4.9,
      review_count: 187,
      projects: 156,
      completion_rate: 98,
      response_time: '2 hours',
      hourly_rate: '₹5,000',
      monthly_rate: '₹1,50,000',
      project_rate: '₹25,000',
      icon_name: 'Scale',
      color_gradient: 'from-pink-500 to-rose-600',
      accent_color: 'pink',
      expertise: ['Corporate Governance', 'Legal Compliance', 'POSH Implementation', 'Risk Management', 'Company Law', 'Regulatory Advisory'],
      languages: ['English', 'Hindi', 'Punjabi'],
      education: [
        { degree: 'Company Secretary', institution: 'Institute of Company Secretaries of India', year: '2012' },
        { degree: 'LLB', institution: 'Delhi University', year: '2010' }
      ],
      certifications: ['Certified POSH Trainer', 'Corporate Governance Expert', 'Risk Management Professional'],
      skills: [
        { name: 'Corporate Law', level: 95 },
        { name: 'POSH Compliance', level: 98 },
        { name: 'Risk Management', level: 90 },
        { name: 'Training & Development', level: 92 }
      ],
      testimonials: [
        {
          id: 1,
          client: 'TechCorp Solutions',
          feedback: 'Exceptional expertise in POSH implementation. Made the entire process seamless.',
          rating: 5,
          date: '2024-01-15',
          projectType: 'POSH Implementation'
        }
      ],
      recent_projects: [
        { title: 'POSH Policy Implementation', client: 'Tech Solutions Ltd', duration: '3 months', status: 'Completed' }
      ],
      achievements: ['Top 10 Corporate Lawyers in Delhi - 2023', 'Excellence in POSH Implementation Award', 'Best Legal Advisor - Startup Category']
    },
    {
      name: 'CA Shweta Gupta',
      title: 'Chartered Accountant & Financial Advisor',
      specialization: 'Financial Compliance & Risk Management',
      description: 'Specialized in financial compliance and risk assessment for workplace safety programs with expertise in audit management and strategic financial planning.',
      detailed_description: 'CA Shweta Gupta brings comprehensive financial expertise to workplace safety and compliance programs. Her analytical approach to risk assessment and financial planning ensures organizations can implement effective POSH programs while maintaining fiscal responsibility.',
      experience: '8+ years',
      category: 'finance',
      status: 'standard',
      verified: true,
      featured: false,
      availability: 'Available',
      email: 'shweta.gupta@ureposh.com',
      phone: '+91 98765 43211',
      location: 'Mumbai, India',
      website: 'www.shwetaguptaca.com',
      linkedin: 'linkedin.com/in/shwetaguptaca',
      rating: 4.8,
      review_count: 134,
      projects: 112,
      completion_rate: 96,
      response_time: '3 hours',
      hourly_rate: '₹4,500',
      monthly_rate: '₹1,20,000',
      project_rate: '₹20,000',
      icon_name: 'Calculator',
      color_gradient: 'from-rose-500 to-pink-600',
      accent_color: 'rose',
      expertise: ['Financial Compliance', 'Risk Assessment', 'Audit Management', 'Strategic Planning', 'Tax Advisory', 'Financial Reporting'],
      languages: ['English', 'Hindi', 'Marathi'],
      education: [
        { degree: 'Chartered Accountant', institution: 'Institute of Chartered Accountants of India', year: '2015' },
        { degree: 'B.Com', institution: 'Mumbai University', year: '2013' }
      ],
      certifications: ['Certified Risk Management Professional', 'Financial Planning Expert', 'Audit Specialist'],
      skills: [
        { name: 'Financial Analysis', level: 94 },
        { name: 'Risk Assessment', level: 91 },
        { name: 'Audit Management', level: 88 },
        { name: 'Compliance Reporting', level: 93 }
      ],
      testimonials: [
        {
          id: 1,
          client: 'Financial Services Corp',
          feedback: 'Outstanding financial compliance expertise. Helped optimize our budget significantly.',
          rating: 5,
          date: '2024-01-10',
          projectType: 'Financial Audit'
        }
      ],
      recent_projects: [
        { title: 'Financial Compliance Audit', client: 'Banking Solutions', duration: '4 months', status: 'Completed' }
      ],
      achievements: ['Best CA in Financial Compliance - 2023', 'Excellence in Risk Management Award', 'Top Financial Advisor - Mumbai']
    }
  ];
  
  try {
    const { data, error } = await supabase
      .from('people')
      .insert(peopleData);
    
    if (error) {
      console.error('❌ Error inserting data:', error.message);
    } else {
      console.log('✅ Successfully inserted sample data');
      console.log('📊 Inserted records:', data?.length || peopleData.length);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the script
if (require.main === module) {
  console.log('🎯 People Data Insertion Script');
  console.log('================================');
  
  // Try the direct insertion first (more reliable)
  insertPeopleDataDirectly()
    .then(() => {
      console.log('✅ Script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error.message);
      process.exit(1);
    });
}

module.exports = { runPeopleData, insertPeopleDataDirectly };
