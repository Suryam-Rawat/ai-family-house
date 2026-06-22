// src/types/family.ts

export interface FamilyMember {
  id: string;
  user_id: string;
  name: string;
  role: string;
  appearance_url: string | null;
  religion: string;
  dialogues: string[];
  created_at: string;
}

export interface Conversation {
  id: string;
  family_member_id: string;
  user_message: string;
  ai_response: string;
  timestamp: string;
}

export interface CreateFamilyMemberInput {
  user_id: string;
  name: string;
  role: string;
  religion: string;
  appearance_url?: string;
  dialogues?: string[];
}
