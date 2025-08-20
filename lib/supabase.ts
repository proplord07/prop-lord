import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Blog post interface for TypeScript
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  read_time: number;
  slug: string;
  published: boolean;
  author_id?: string;
}

// Database schema for blogs table (to be created in Supabase)
/*
CREATE TABLE blogs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  read_time TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
      published BOOLEAN DEFAULT true,
  author_id UUID REFERENCES auth.users(id),
  
  -- Add indexes for better performance
  CONSTRAINT blogs_slug_unique UNIQUE (slug)
);

-- Create indexes
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public blogs are viewable by everyone" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Users can insert their own blogs" ON blogs
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own blogs" ON blogs
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own blogs" ON blogs
  FOR DELETE USING (auth.uid() = author_id);
*/
