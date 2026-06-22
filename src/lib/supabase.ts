// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js';
import { FamilyMember, Conversation, CreateFamilyMemberInput } from '../types/family';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function createFamilyMember(input: CreateFamilyMemberInput): Promise<FamilyMember> {
  const { data, error } = await supabase
    .from('family_members')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getFamilyMembers(userId: string): Promise<FamilyMember[]> {
  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getFamilyMember(id: string): Promise<FamilyMember | null> {
  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}
