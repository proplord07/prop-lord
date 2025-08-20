import { supabase } from './supabase';

export interface Property {
    id: number;
    name: string;
    location: string;
    status: string;
    type: string;
    price_per_sqft: number;
    min_investment: string;
    investment_period: string;
    xirr: string;
    valuation: string;
    image_url: string | null;
    rera: boolean;
    description: string | null;
    amenities: string[] | null;
    total_area_sqft: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    parking_spaces: number | null;
    floor_number: number | null;
    total_floors: number | null;
    possession_date: string | null;
    developer: string | null;
    contact_person: string | null;
    contact_phone: string | null;
    contact_email: string | null;
    published: boolean;
    featured: boolean;
    author_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreatePropertyData {
    name: string;
    location: string;
    status: string;
    type: string;
    price_per_sqft: number;
    min_investment: string;
    investment_period: string;
    xirr?: string;
    valuation: string;
    image_url?: string;
    rera?: boolean;
    description?: string;
    amenities?: string[];
    total_area_sqft?: number;
    bedrooms?: number;
    bathrooms?: number;
    parking_spaces?: number;
    floor_number?: number;
    total_floors?: number;
    possession_date?: string;
    developer?: string;
    contact_person?: string;
    contact_phone?: string;
    contact_email?: string;
    published?: boolean;
    featured?: boolean;
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> { }

export interface PropertyFilters {
    location?: string;
    type?: string;
    status?: string;
    investment_period?: string;
    valuation?: string;
    min_price?: number;
    max_price?: number;
    published?: boolean;
    featured?: boolean;
    limit?: number;
    offset?: number;
}

export class PropertyService {
    // Create a new property
    static async createProperty(data: CreatePropertyData): Promise<Property> {
        try {
            // Get current user
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                throw new Error('User not authenticated');
            }

            const { data: property, error } = await supabase
                .from('properties')
                .insert([{
                    ...data,
                    author_id: user.id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }])
                .select()
                .single();

            if (error) {
                throw new Error(`Error creating property: ${error.message}`);
            }

            return property;
        } catch (error) {
            console.error('Error in createProperty:', error);
            throw error;
        }
    }

    // Get all published properties with optional filters
    static async getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
        try {
            let query = supabase
                .from('properties')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (filters.location) {
                query = query.eq('location', filters.location);
            }

            if (filters.type) {
                query = query.eq('type', filters.type);
            }

            if (filters.status) {
                query = query.eq('status', filters.status);
            }

            if (filters.investment_period) {
                query = query.eq('investment_period', filters.investment_period);
            }

            if (filters.valuation) {
                query = query.eq('valuation', filters.valuation);
            }

            if (filters.min_price) {
                query = query.gte('price_per_sqft', filters.min_price);
            }

            if (filters.max_price) {
                query = query.lte('price_per_sqft', filters.max_price);
            }

            if (filters.featured !== undefined) {
                query = query.eq('featured', filters.featured);
            }

            if (filters.limit) {
                query = query.limit(filters.limit);
            }

            if (filters.offset) {
                query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
            }

            const { data: properties, error } = await query;

            if (error) {
                throw new Error(`Error fetching properties: ${error.message}`);
            }

            return properties || [];
        } catch (error) {
            console.error('Error in getProperties:', error);
            throw error;
        }
    }

    // Get properties by current authenticated user
    static async getUserProperties(): Promise<Property[]> {
        try {
            // Get current user
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                throw new Error('User not authenticated');
            }

            let query = supabase
                .from('properties')
                .select('*')
                // .eq('author_id', user.id)
                .order('created_at', { ascending: false });

            const { data: properties, error } = await query;

            if (error) {
                throw new Error(`Error fetching user properties: ${error.message}`);
            }

            return properties || [];
        } catch (error) {
            console.error('Error in getUserProperties:', error);
            throw error;
        }
    }

    // Get a single property by ID
    static async getPropertyById(id: number): Promise<Property | null> {
        try {
            const { data: property, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // No rows returned
                    return null;
                }
                throw new Error(`Error fetching property: ${error.message}`);
            }

            return property;
        } catch (error) {
            console.error('Error in getPropertyById:', error);
            throw error;
        }
    }

    // Update a property
    static async updateProperty(id: number, data: UpdatePropertyData): Promise<Property> {
        try {
            // Get current user
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                throw new Error('User not authenticated');
            }

            const { data: property, error } = await supabase
                .from('properties')
                .update({
                    ...data,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id)
                .eq('author_id', user.id) // Ensure user owns the property
                .select()
                .single();

            if (error) {
                throw new Error(`Error updating property: ${error.message}`);
            }

            return property;
        } catch (error) {
            console.error('Error in updateProperty:', error);
            throw error;
        }
    }

    // Delete a property
    static async deleteProperty(id: number): Promise<void> {
        try {
            // Get current user
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                throw new Error('User not authenticated');
            }

            const { error } = await supabase
                .from('properties')
                .delete()
                .eq('id', id)
                .eq('author_id', user.id); // Ensure user owns the property

            if (error) {
                throw new Error(`Error deleting property: ${error.message}`);
            }
        } catch (error) {
            console.error('Error in deleteProperty:', error);
            throw error;
        }
    }

    // Get property locations for filtering
    static async getLocations(): Promise<string[]> {
        try {
            const { data: locations, error } = await supabase
                .from('properties')
                .select('location')
                .eq('published', true);

            if (error) {
                throw new Error(`Error fetching locations: ${error.message}`);
            }

            // Extract unique locations
            const uniqueLocations = [...new Set(locations?.map(l => l.location) || [])];
            return uniqueLocations.sort();
        } catch (error) {
            console.error('Error in getLocations:', error);
            throw error;
        }
    }

    // Get property types for filtering
    static async getTypes(): Promise<string[]> {
        try {
            const { data: types, error } = await supabase
                .from('properties')
                .select('type')
                .eq('published', true);

            if (error) {
                throw new Error(`Error fetching types: ${error.message}`);
            }

            // Extract unique types
            const uniqueTypes = [...new Set(types?.map(t => t.type) || [])];
            return uniqueTypes.sort();
        } catch (error) {
            console.error('Error in getTypes:', error);
            throw error;
        }
    }

    // Get property statuses for filtering
    static async getStatuses(): Promise<string[]> {
        try {
            const { data: statuses, error } = await supabase
                .from('properties')
                .select('status')
                .eq('published', true);

            if (error) {
                throw new Error(`Error fetching statuses: ${error.message}`);
            }

            // Extract unique statuses
            const uniqueStatuses = [...new Set(statuses?.map(s => s.status) || [])];
            return uniqueStatuses.sort();
        } catch (error) {
            console.error('Error in getStatuses:', error);
            throw error;
        }
    }

    // Get investment periods for filtering
    static async getInvestmentPeriods(): Promise<string[]> {
        try {
            const { data: periods, error } = await supabase
                .from('properties')
                .select('investment_period')
                .eq('published', true);

            if (error) {
                throw new Error(`Error fetching investment periods: ${error.message}`);
            }

            // Extract unique periods
            const uniquePeriods = [...new Set(periods?.map(p => p.investment_period) || [])];
            return uniquePeriods.sort();
        } catch (error) {
            console.error('Error in getInvestmentPeriods:', error);
            throw error;
        }
    }

    // Get valuations for filtering
    static async getValuations(): Promise<string[]> {
        try {
            const { data: valuations, error } = await supabase
                .from('properties')
                .select('valuation')
                .eq('published', true);

            if (error) {
                throw new Error(`Error fetching valuations: ${error.message}`);
            }

            // Extract unique valuations
            const uniqueValuations = [...new Set(valuations?.map(v => v.valuation) || [])];
            return uniqueValuations.sort();
        } catch (error) {
            console.error('Error in getValuations:', error);
            throw error;
        }
    }

    // Search properties by name or description
    static async searchProperties(searchTerm: string, limit: number = 10): Promise<Property[]> {
        try {
            const { data: properties, error } = await supabase
                .from('properties')
                .select('*')
                .eq('published', true)
                .or(`name.ilike.%${searchTerm}%,coalesce(description, '').ilike.%${searchTerm}%`)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                throw new Error(`Error searching properties: ${error.message}`);
            }

            return properties || [];
        } catch (error) {
            console.error('Error in searchProperties:', error);
            throw error;
        }
    }

    // Upload image to Supabase Storage
    static async uploadImage(file: File, fileName: string): Promise<string> {
        try {
            const fileExt = fileName.split('.').pop();
            const filePath = `property-images/${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('property-images')
                .upload(filePath, file);

            if (uploadError) {
                throw new Error(`Error uploading image: ${uploadError.message}`);
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('property-images')
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
                .from('property-images')
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
