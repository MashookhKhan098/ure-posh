const express = require('express');
const path = require('path');
const { createAdminClient } = require('./utils/supabase/admin');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve the writer portal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ureposh Writer Portal</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            .gradient-bg {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
        </style>
    </head>
    <body class="gradient-bg min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-12">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
                        <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                    </div>
                    <h1 class="text-4xl font-bold text-white mb-4">Ureposh Writer Portal</h1>
                    <p class="text-xl text-blue-100">Create, manage, and publish your content</p>
                </div>

                <!-- Login Form -->
                <div class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Writer Login</h2>
                    
                    <form id="loginForm" class="space-y-6">
                        <div>
                            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                required
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your username"
                            >
                        </div>
                        
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            >
                        </div>
                        
                        <button 
                            type="submit"
                            class="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Sign In to Writer Portal
                        </button>
                    </form>
                    
                    <div id="loginMessage" class="mt-4 text-center hidden"></div>
                </div>

                <!-- Features -->
                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">Write Articles</h3>
                        <p class="text-blue-100 text-sm">Create engaging content with rich text editor and media uploads</p>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">Track Performance</h3>
                        <p class="text-blue-100 text-sm">Monitor your article views, engagement, and audience insights</p>
                    </div>
                    
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">Manage Content</h3>
                        <p class="text-blue-100 text-sm">Organize, edit, and publish your articles with ease</p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="text-center text-blue-100">
                    <p>&copy; 2024 Ureposh Writer Portal. All rights reserved.</p>
                </div>
            </div>
        </div>

        <script>
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const messageDiv = document.getElementById('loginMessage');
                
                try {
                    const response = await fetch('http://localhost:4000/api/admin/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username, password })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                        // Store token
                        localStorage.setItem('writerToken', data.token);
                        localStorage.setItem('writerUser', JSON.stringify(data.user));
                        
                        messageDiv.className = 'mt-4 text-center text-green-600 font-semibold';
                        messageDiv.textContent = 'Login successful! Redirecting...';
                        messageDiv.classList.remove('hidden');
                        
                        // Redirect to writer dashboard
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 1500);
                    } else {
                        messageDiv.className = 'mt-4 text-center text-red-600 font-semibold';
                        messageDiv.textContent = data.error || 'Login failed';
                        messageDiv.classList.remove('hidden');
                    }
                } catch (error) {
                    messageDiv.className = 'mt-4 text-center text-red-600 font-semibold';
                    messageDiv.textContent = 'Connection error. Please try again.';
                    messageDiv.classList.remove('hidden');
                }
            });
        </script>
    </body>
    </html>
  `);
});

// Writer Dashboard
app.get('/dashboard', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Writer Dashboard - Ureposh</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            .gradient-bg {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h1 class="text-2xl font-bold text-gray-900">Writer Dashboard</h1>
                            <p class="text-sm text-gray-500">Manage your content and track performance</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span id="writerName" class="text-sm text-gray-700"></span>
                        <button onclick="logout()" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">Total Articles</dt>
                                    <dd id="totalArticles" class="text-lg font-medium text-gray-900">-</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                                    <dd id="totalViews" class="text-lg font-medium text-gray-900">-</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">Total Likes</dt>
                                    <dd id="totalLikes" class="text-lg font-medium text-gray-900">-</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">Total Comments</dt>
                                    <dd id="totalComments" class="text-lg font-medium text-gray-900">-</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="bg-white shadow rounded-lg p-6 mb-8">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onclick="createNewArticle()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Write New Article
                    </button>
                    <button onclick="viewAllArticles()" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                        View All Articles
                    </button>
                    <button onclick="openAnalytics()" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                        View Analytics
                    </button>
                </div>
            </div>

            <!-- Recent Articles -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-medium text-gray-900">Recent Articles</h2>
                </div>
                <div class="divide-y divide-gray-200">
                    <div id="articlesList" class="p-6">
                        <div class="text-center text-gray-500">Loading articles...</div>
                    </div>
                </div>
            </div>
        </main>

        <script>
            // Check authentication
            const token = localStorage.getItem('writerToken');
            const user = JSON.parse(localStorage.getItem('writerUser') || '{}');
            
            if (!token) {
                window.location.href = '/';
            }
            
            document.getElementById('writerName').textContent = user.username || 'Writer';
            
            // Load dashboard data
            loadDashboardData();
            
            function logout() {
                localStorage.removeItem('writerToken');
                localStorage.removeItem('writerUser');
                window.location.href = '/';
            }
            
            async function loadDashboardData() {
                try {
                    const response = await fetch('http://localhost:4000/api/posts', {
                        headers: {
                            'Authorization': \`Bearer \${token}\`
                        }
                    });
                    
                    const articles = await response.json();
                    
                    // Update stats
                    document.getElementById('totalArticles').textContent = articles.length;
                    
                    const totalViews = articles.reduce((sum, article) => sum + (article.view_count || 0), 0);
                    const totalLikes = articles.reduce((sum, article) => sum + (article.likes || 0), 0);
                    const totalComments = articles.reduce((sum, article) => sum + (article.comments_count || 0), 0);
                    
                    document.getElementById('totalViews').textContent = totalViews;
                    document.getElementById('totalLikes').textContent = totalLikes;
                    document.getElementById('totalComments').textContent = totalComments;
                    
                    // Update articles list
                    const articlesList = document.getElementById('articlesList');
                    if (articles.length === 0) {
                        articlesList.innerHTML = '<div class="text-center text-gray-500">No articles found</div>';
                    } else {
                        articlesList.innerHTML = articles.slice(0, 5).map(article => \`
                            <div class="flex items-center justify-between py-4">
                                <div class="flex-1">
                                    <h3 class="text-lg font-medium text-gray-900">\${article.title}</h3>
                                    <p class="text-sm text-gray-500">\${article.author} • \${new Date(article.created_at).toLocaleDateString()}</p>
                                </div>
                                <div class="flex items-center space-x-4 text-sm text-gray-500">
                                    <span>\${article.view_count || 0} views</span>
                                    <span>\${article.likes || 0} likes</span>
                                    <span>\${article.comments_count || 0} comments</span>
                                </div>
                            </div>
                        \`).join('');
                    }
                } catch (error) {
                    console.error('Error loading dashboard data:', error);
                }
            }
            
            function createNewArticle() {
                window.open('http://localhost:4000/admin', '_blank');
            }
            
            function viewAllArticles() {
                window.open('http://localhost:4000/admin', '_blank');
            }
            
            function openAnalytics() {
                window.open('http://localhost:4000/admin', '_blank');
            }
        </script>
    </body>
    </html>
  `);
});

// API routes for writer portal
app.get('/api/articles', async (req, res) => {
  try {
    const supabase = createAdminClient();
    const { data: articles, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(articles || []);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Writer Portal running on http://localhost:${PORT}`);
  console.log(`📝 Login page: http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
}); 