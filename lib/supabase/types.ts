export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          company: string | null
          message: string
          source_page: string | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          company?: string | null
          message: string
          source_page?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          company?: string | null
          message?: string
          source_page?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      quote_requests_mini: {
        Row: {
          id: string
          created_at: string
          name: string
          company: string | null
          phone: string
          message: string
          source: string | null
          submitted_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          company?: string | null
          phone: string
          message: string
          source?: string | null
          submitted_at: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          company?: string | null
          phone?: string
          message?: string
          source?: string | null
          submitted_at?: string
        }
      }
      quote_requests_full: {
        Row: {
          id: string
          created_at: string
          name: string
          company: string
          phone: string
          email: string
          square_footage: string
          frequency: string
          services: string[]
          additional_notes: string | null
          mini_quote_uuid: string | null
          submitted_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          company: string
          phone: string
          email: string
          square_footage: string
          frequency: string
          services: string[]
          additional_notes?: string | null
          mini_quote_uuid?: string | null
          submitted_at: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          company?: string
          phone?: string
          email?: string
          square_footage?: string
          frequency?: string
          services?: string[]
          additional_notes?: string | null
          mini_quote_uuid?: string | null
          submitted_at?: string
        }
      }
      quote_requests: {
        Row: {
          id: string
          created_at: string
          // Step 1: Company Info
          company_name: string
          contact_name: string
          email: string
          phone: string
          // Step 2: Facility Info
          facility_type: string
          square_footage: string
          num_restrooms: string | null
          num_floors: string | null
          address: string | null
          // Step 3: Services
          services: string[]
          cleaning_frequency: string
          special_requirements: string | null
          // Step 4: Additional Info
          start_date: string | null
          current_provider: string | null
          budget_range: string | null
          how_heard: string | null
          additional_notes: string | null
          // Metadata
          source_page: string | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_name: string
          contact_name: string
          email: string
          phone: string
          facility_type: string
          square_footage: string
          num_restrooms?: string | null
          num_floors?: string | null
          address?: string | null
          services: string[]
          cleaning_frequency: string
          special_requirements?: string | null
          start_date?: string | null
          current_provider?: string | null
          budget_range?: string | null
          how_heard?: string | null
          additional_notes?: string | null
          source_page?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_name?: string
          contact_name?: string
          email?: string
          phone?: string
          facility_type?: string
          square_footage?: string
          num_restrooms?: string | null
          num_floors?: string | null
          address?: string | null
          services?: string[]
          cleaning_frequency?: string
          special_requirements?: string | null
          start_date?: string | null
          current_provider?: string | null
          budget_range?: string | null
          how_heard?: string | null
          additional_notes?: string | null
          source_page?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      career_applications: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          position: string
          experience_years: string | null
          availability: string | null
          resume_url: string | null
          resume_filename: string | null
          cover_letter: string | null
          source_page: string | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          position: string
          experience_years?: string | null
          availability?: string | null
          resume_url?: string | null
          resume_filename?: string | null
          cover_letter?: string | null
          source_page?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          position?: string
          experience_years?: string | null
          availability?: string | null
          resume_url?: string | null
          resume_filename?: string | null
          cover_letter?: string | null
          source_page?: string | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      page_feedback: {
        Row: {
          id: string
          created_at: string
          page_id: string
          vote: Database['public']['Enums']['feedback_vote']
          feedback: string | null
          submitted_at: string
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          page_id: string
          vote: Database['public']['Enums']['feedback_vote']
          feedback?: string | null
          submitted_at: string
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          page_id?: string
          vote?: Database['public']['Enums']['feedback_vote']
          feedback?: string | null
          submitted_at?: string
          user_agent?: string | null
        }
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          created_at: string
          email: string
          source_page: string | null
          ip_address: string | null
          user_agent: string | null
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          source_page?: string | null
          ip_address?: string | null
          user_agent?: string | null
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          source_page?: string | null
          ip_address?: string | null
          user_agent?: string | null
          status?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      feedback_vote: 'yes' | 'no'
    }
  }
}
