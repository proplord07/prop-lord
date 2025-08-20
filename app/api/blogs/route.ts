import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/blog-service';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
        const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;

        const filters = {
            category: category || undefined,
            limit,
            offset,
        };

        const blogs = await BlogService.getBlogs(filters);

        return NextResponse.json({
            success: true,
            data: blogs,
            count: blogs.length,
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch blogs',
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, excerpt, content, category, image_url, read_time, published = true } = body;

        // Validate required fields
        if (!title || !excerpt || !content || !category || !image_url || !read_time) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields',
                },
                { status: 400 }
            );
        }

        // Generate slug from title
        const slug = BlogService.generateSlug(title);

        const blogData = {
            title,
            excerpt,
            content,
            category,
            image_url,
            read_time,
            slug,
            published,
        };

        const blog = await BlogService.createBlog(blogData);

        return NextResponse.json({
            success: true,
            data: blog,
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create blog',
            },
            { status: 500 }
        );
    }
}
