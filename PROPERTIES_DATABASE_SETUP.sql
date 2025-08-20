-- Properties Database Setup for Prop Lord
-- This script creates the properties table and sets up Row Level Security

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    price_per_sqft INTEGER NOT NULL,
    min_investment VARCHAR(50) NOT NULL,
    investment_period VARCHAR(50) NOT NULL,
    xirr VARCHAR(50) DEFAULT 'XIRR',
    valuation VARCHAR(100) NOT NULL,
    image_url TEXT,
    rera BOOLEAN DEFAULT true,
    description TEXT,
    amenities TEXT[],
    total_area_sqft INTEGER,
    bedrooms INTEGER,
    bathrooms INTEGER,
    parking_spaces INTEGER,
    floor_number INTEGER,
    total_floors INTEGER,
    possession_date DATE,
    developer VARCHAR(255),
    contact_person VARCHAR(255),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_published ON properties(published);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_author_id ON properties(author_id);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published properties
DROP POLICY IF EXISTS "Public can view published properties" ON properties;
CREATE POLICY "Public can view published properties" ON properties
    FOR SELECT USING (published = true);

-- Policy: Authenticated users can create properties
DROP POLICY IF EXISTS "Authenticated users can create properties" ON properties;
CREATE POLICY "Authenticated users can create properties" ON properties
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: Users can update their own properties
DROP POLICY IF EXISTS "Users can update own properties" ON properties;
CREATE POLICY "Users can update own properties" ON properties
    FOR UPDATE USING (auth.uid() = author_id);

-- Policy: Users can delete their own properties
DROP POLICY IF EXISTS "Users can delete own properties" ON properties;
CREATE POLICY "Users can delete own properties" ON properties
    FOR DELETE USING (auth.uid() = author_id);

-- Policy: Users can view their own unpublished properties
DROP POLICY IF EXISTS "Users can view own properties" ON properties;
CREATE POLICY "Users can view own properties" ON properties
    FOR SELECT USING (auth.uid() = author_id OR published = true);

-- Create storage bucket for property images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Anyone can view property images
DROP POLICY IF EXISTS "Public can view property images" ON storage.objects;
CREATE POLICY "Public can view property images" ON storage.objects
    FOR SELECT USING (bucket_id = 'property-images');

-- Policy: Authenticated users can upload property images
DROP POLICY IF EXISTS "Authenticated users can upload property images" ON storage.objects;
CREATE POLICY "Authenticated users can upload property images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

-- Policy: Users can update their own property images
DROP POLICY IF EXISTS "Users can update own property images" ON storage.objects;
CREATE POLICY "Users can update own property images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

-- Policy: Users can delete their own property images
DROP POLICY IF EXISTS "Users can delete own property images" ON storage.objects;
CREATE POLICY "Users can delete own property images" ON storage.objects
    FOR DELETE USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

-- Insert sample properties data
INSERT INTO properties (
    name, location, status, type, price_per_sqft, min_investment, 
    investment_period, valuation, image_url, rera, description,
    total_area_sqft, bedrooms, bathrooms, parking_spaces,
    developer, published, featured
) VALUES 
(
    'Sai Amogha By Sri Dwaraka',
    'Margondanahalli',
    'Under Construction',
    'Apartment',
    6599,
    '30.4 L',
    '4 Years',
    'Fairly Valued',
    '/services/service1.jpg',
    true,
    'Premium residential project with modern amenities and excellent connectivity',
    1200,
    2,
    2,
    1,
    'Sri Dwaraka Developers',
    true,
    true
),
(
    'Sumadhura Folium',
    'Whitefield',
    'Under Construction',
    'Apartment',
    14241,
    '1.0 Cr',
    '4 Years',
    'Overvalued',
    '/services/service2.jpg',
    true,
    'Luxury apartments in prime Whitefield location with world-class facilities',
    1500,
    3,
    3,
    2,
    'Sumadhura Group',
    true,
    true
),
(
    'Bhoo Aabharana',
    'Kyalasanahalli',
    'Under Construction',
    'Apartment',
    6500,
    '35.4 L',
    '4 Years',
    'Fairly Valued',
    '/services/service3.jpg',
    true,
    'Affordable luxury with modern design and excellent investment potential',
    1100,
    2,
    2,
    1,
    'Bhoo Developers',
    true,
    false
),
(
    'South City',
    'JP Nagar',
    'Ready to Move',
    'House',
    6500,
    '35.4 L',
    '4 Years',
    'Undervalued',
    '/services/service3.jpg',
    true,
    'Ready to move house in prime JP Nagar location with immediate possession',
    1800,
    3,
    3,
    2,
    'South City Developers',
    true,
    false
)
ON CONFLICT (name) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_properties_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_properties_updated_at_trigger ON properties;
CREATE TRIGGER update_properties_updated_at_trigger
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_properties_updated_at();
