import { supabase } from './supabase';

export interface Lead {
    id?: number;
    name: string;
    phone: string;
    email?: string;
    property_id: number;
    property_name: string;
    created_at?: string;
}

export class LeadsService {
    static async createLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
        const { data, error } = await supabase
            .from('leads')
            .insert([lead])
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to create lead: ${error.message}`);
        }

        return data;
    }

    static async getLeads(): Promise<Lead[]> {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(`Failed to fetch leads: ${error.message}`);
        }

        return data || [];
    }

    static async getLeadById(id: number): Promise<Lead | null> {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null; // No rows returned
            }
            throw new Error(`Failed to fetch lead: ${error.message}`);
        }

        return data;
    }
}
