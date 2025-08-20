import { NextRequest, NextResponse } from 'next/server';
import { PropertyService } from '@/lib/property-service';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Extract query parameters
        const location = searchParams.get('location') || undefined;
        const type = searchParams.get('type') || undefined;
        const status = searchParams.get('status') || undefined;
        const investmentPeriod = searchParams.get('investment_period') || undefined;
        const valuation = searchParams.get('valuation') || undefined;
        const minPrice = searchParams.get('min_price') ? parseInt(searchParams.get('min_price')!) : undefined;
        const maxPrice = searchParams.get('max_price') ? parseInt(searchParams.get('max_price')!) : undefined;
        const featured = searchParams.get('featured') ? searchParams.get('featured') === 'true' : undefined;
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
        const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;
        const search = searchParams.get('search') || undefined;

        let properties;

        if (search) {
            // If search term is provided, use search functionality
            properties = await PropertyService.searchProperties(search, limit || 50);
        } else {
            // Otherwise use filtered properties
            properties = await PropertyService.getProperties({
                location,
                type,
                status,
                investment_period: investmentPeriod,
                valuation,
                min_price: minPrice,
                max_price: maxPrice,
                featured,
                limit,
                offset,
            });
        }

        return NextResponse.json({
            success: true,
            data: properties,
            count: properties.length,
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch properties',
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const property = await PropertyService.createProperty(body);

        return NextResponse.json({
            success: true,
            data: property,
        });
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create property',
            },
            { status: 500 }
        );
    }
}
