-- Safe Database Setup for Blog System
-- Run this in your Supabase SQL Editor
-- This script handles existing policies and tables gracefully

-- 1. Create the blogs table if it doesn't exist
CREATE TABLE IF NOT EXISTS blogs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    read_time INTEGER DEFAULT 5,
    published BOOLEAN DEFAULT true,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better performance (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_author_id ON blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);

-- 3. Enable RLS (this won't fail if already enabled)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies safely (using IF EXISTS)
DROP POLICY IF EXISTS "Public blogs are viewable by everyone" ON blogs;
DROP POLICY IF EXISTS "Users can insert their own blogs" ON blogs;
DROP POLICY IF EXISTS "Users can update their own blogs" ON blogs;
DROP POLICY IF EXISTS "Users can delete their own blogs" ON blogs;
DROP POLICY IF EXISTS "Allow blog creation" ON blogs;
DROP POLICY IF EXISTS "Allow viewing published blogs" ON blogs;
DROP POLICY IF EXISTS "Allow blog updates" ON blogs;
DROP POLICY IF EXISTS "Allow blog deletion" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can create blogs" ON blogs;
DROP POLICY IF EXISTS "Public access to published blogs" ON blogs;
DROP POLICY IF EXISTS "Users can view their own blogs" ON blogs;
DROP POLICY IF EXISTS "Users can update their own blogs" ON blogs;
DROP POLICY IF EXISTS "Users can delete their own blogs" ON blogs;

-- 5. Create RLS policies (these will be new)
-- Policy: Allow authenticated users to create blogs
CREATE POLICY "Authenticated users can create blogs" ON blogs
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: Allow ANYONE to view published blogs (public access)
CREATE POLICY "Public access to published blogs" ON blogs
    FOR SELECT 
    USING (published = true);

-- Policy: Allow authenticated users to view their own blogs (including drafts)
CREATE POLICY "Users can view their own blogs" ON blogs
    FOR SELECT 
    USING (auth.uid() = author_id);

-- Policy: Allow users to update their own blogs
CREATE POLICY "Users can update their own blogs" ON blogs
    FOR UPDATE 
    USING (auth.uid() = author_id);

-- Policy: Allow users to delete their own blogs
CREATE POLICY "Users can delete their own blogs" ON blogs
    FOR DELETE 
    USING (auth.uid() = author_id);

-- 6. Create storage bucket for blog images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Drop existing storage policies safely
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public access to blog images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own blog images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own blog images" ON storage.objects;

-- 8. Create storage policies (these will be new)
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
    FOR INSERT 
    WITH CHECK (
        bucket_id = 'blog-images' 
        AND auth.uid() IS NOT NULL
    );

-- Allow public access to view blog images
CREATE POLICY "Public access to blog images" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'blog-images');

-- Allow users to update their own images
CREATE POLICY "Users can update their own blog images" ON storage.objects
    FOR UPDATE 
    USING (
        bucket_id = 'blog-images' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Allow users to delete their own images
CREATE POLICY "Users can delete their own blog images" ON storage.objects
    FOR DELETE 
    USING (
        bucket_id = 'blog-images' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- 9. Create or replace functions
-- Function to automatically set author_id and timestamps
CREATE OR REPLACE FUNCTION set_author_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.author_id = auth.uid();
    NEW.created_at = COALESCE(NEW.created_at, NOW());
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Drop existing triggers safely
DROP TRIGGER IF EXISTS set_author_id_trigger ON blogs;
DROP TRIGGER IF EXISTS update_updated_at_trigger ON blogs;

-- 11. Create triggers
CREATE TRIGGER set_author_id_trigger
    BEFORE INSERT ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION set_author_id();

CREATE TRIGGER update_updated_at_trigger
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 12. Grant permissions (these won't fail if already granted)
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON blogs TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 13. Insert sample blog post for testing (only if none exist)
INSERT INTO blogs (title, slug, excerpt, content, category, image_url, read_time, published, author_id)
SELECT 
    'Welcome to Our Blog',
    'welcome-to-our-blog',
    'This is our first blog post to test the system.',
    'This is the content of our first blog post. It contains some sample text to test the blog system.',
    'General',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    3,
    true,
    NULL
WHERE NOT EXISTS (SELECT 1 FROM blogs WHERE slug = 'welcome-to-our-blog');

-- 14. Verify the setup
SELECT 
    'Database setup completed successfully!' as status,
    COUNT(*) as total_blogs,
    COUNT(CASE WHEN published = true THEN 1 END) as published_blogs,
    COUNT(CASE WHEN published = false THEN 1 END) as draft_blogs
FROM blogs;
