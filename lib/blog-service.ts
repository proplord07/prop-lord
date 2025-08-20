import { supabase } from './supabase';
import { BlogPost } from './supabase';

export interface CreateBlogData {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    image_url: string;
    read_time: number;
    slug: string;
    published?: boolean;
}

export interface UpdateBlogData extends Partial<CreateBlogData> {
    id: number;
}

export interface BlogFilters {
    category?: string;
    published?: boolean;
    limit?: number;
    offset?: number;
}

export class BlogService {
    // Generate a URL-friendly slug from title
    static generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim();
    }

    // Create a new blog post
    static async createBlog(data: CreateBlogData): Promise<BlogPost> {
        try {
            // Get current user
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                throw new Error('User not authenticated');
            }

            const { data: blog, error } = await supabase
                .from('blogs')
                .insert([{
                    ...data,
                    author_id: user.id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }])
                .select()
                .single();

            if (error) {
                throw new Error(`Error creating blog: ${error.message}`);
            }

            return blog;
        } catch (error) {
            console.error('Error in createBlog:', error);
            throw error;
        }
    }

    // Get all published blog posts with optional filters
    static async getBlogs(filters: BlogFilters = {}): Promise<BlogPost[]> {
        try {
            let query = supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (filters.category) {
                query = query.eq('category', filters.category);
            }

            if (filters.limit) {
                query = query.limit(filters.limit);
            }

            if (filters.offset) {
                query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
            }

            const { data: blogs, error } = await query;

            if (error) {
                throw new Error(`Error fetching blogs: ${error.message}`);
            }

            return blogs || [];
        } catch (error) {
            console.error('Error in getBlogs:', error);
            throw error;
        }
    }

    // Get all blogs (including drafts) for admin management
    static async getAllBlogs(): Promise<BlogPost[]> {
        try {
            const { data: blogs, error } = await supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(`Error fetching all blogs: ${error.message}`);
            }

            return blogs || [];
        } catch (error) {
            console.error('Error in getAllBlogs:', error);
            throw error;
        }
    }

    // Get a single blog post by slug
    static async getBlogBySlug(slug: string): Promise<BlogPost | null> {
        try {
            const { data: blog, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slug)
                .eq('published', true)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // No rows returned
                    return null;
                }
                throw new Error(`Error fetching blog: ${error.message}`);
            }

            return blog;
        } catch (error) {
            console.error('Error in getBlogBySlug:', error);
            throw error;
        }
    }

    // Get a single blog post by ID (for admin operations)
    static async getBlogById(id: number): Promise<BlogPost | null> {
        try {
            const { data: blog, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return null;
                }
                throw new Error(`Error fetching blog: ${error.message}`);
            }

            return blog;
        } catch (error) {
            console.error('Error in getBlogById:', error);
            throw error;
        }
    }

    // Update a blog post
    static async updateBlog(data: UpdateBlogData): Promise<BlogPost> {
        try {
            const { id, ...updateData } = data;

            const { data: blog, error } = await supabase
                .from('blogs')
                .update({
                    ...updateData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(`Error updating blog: ${error.message}`);
            }

            return blog;
        } catch (error) {
            console.error('Error in updateBlog:', error);
            throw error;
        }
    }

    // Delete a blog post
    static async deleteBlog(id: number): Promise<void> {
        try {
            const { error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', id);

            if (error) {
                throw new Error(`Error deleting blog: ${error.message}`);
            }
        } catch (error) {
            console.error('Error in deleteBlog:', error);
            throw error;
        }
    }

    // Get blog categories
    static async getCategories(): Promise<string[]> {
        try {
            const { data: categories, error } = await supabase
                .from('blogs')
                .select('category')
                .eq('published', true);

            if (error) {
                throw new Error(`Error fetching categories: ${error.message}`);
            }

            // Extract unique categories
            const uniqueCategories = [...new Set(categories?.map(c => c.category) || [])];
            return uniqueCategories.sort();
        } catch (error) {
            console.error('Error in getCategories:', error);
            throw error;
        }
    }

    // Search blogs by title or content
    static async searchBlogs(searchTerm: string, limit: number = 10): Promise<BlogPost[]> {
        try {
            const { data: blogs, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                throw new Error(`Error searching blogs: ${error.message}`);
            }

            return blogs || [];
        } catch (error) {
            console.error('Error in searchBlogs:', error);
            throw error;
        }
    }

    // Get blog statistics
    static async getBlogStats(): Promise<{
        total: number;
        published: number;
        drafts: number;
        categories: number;
    }> {
        try {
            const [totalResult, publishedResult, categoriesResult] = await Promise.all([
                supabase.from('blogs').select('id', { count: 'exact' }),
                supabase.from('blogs').select('id', { count: 'exact' }).eq('published', true),
                supabase.from('blogs').select('category').eq('published', true)
            ]);

            if (totalResult.error || publishedResult.error || categoriesResult.error) {
                throw new Error('Error fetching blog statistics');
            }

            const total = totalResult.count || 0;
            const published = publishedResult.count || 0;
            const drafts = total - published;
            const categories = new Set(categoriesResult.data?.map(c => c.category) || []).size;

            return { total, published, drafts, categories };
        } catch (error) {
            console.error('Error in getBlogStats:', error);
            throw error;
        }
    }

    // Upload image to Supabase Storage
    static async uploadImage(file: File, fileName: string): Promise<string> {
        try {
            const fileExt = fileName.split('.').pop();
            const filePath = `blog-images/${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) {
                throw new Error(`Error uploading image: ${uploadError.message}`);
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error in uploadImage:', error);
            throw error;
        }
    }

    // Delete image from Supabase Storage
    static async deleteImage(filePath: string): Promise<void> {
        try {
            const { error } = await supabase.storage
                .from('blog-images')
                .remove([filePath]);

            if (error) {
                throw new Error(`Error deleting image: ${error.message}`);
            }
        } catch (error) {
            console.error('Error in deleteImage:', error);
            throw error;
        }
    }
}
