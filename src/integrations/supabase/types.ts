export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      distributions: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          created_at: string
          distribution_date: string
          id: string
          installment_number: number
          institution_id: string
          notes: string | null
          processed_at: string | null
          status: Database["public"]["Enums"]["distribution_status"] | null
          stellar_operation_id: string | null
          transaction_hash: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          distribution_date: string
          id?: string
          installment_number: number
          institution_id: string
          notes?: string | null
          processed_at?: string | null
          status?: Database["public"]["Enums"]["distribution_status"] | null
          stellar_operation_id?: string | null
          transaction_hash?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          distribution_date?: string
          id?: string
          installment_number?: number
          institution_id?: string
          notes?: string | null
          processed_at?: string | null
          status?: Database["public"]["Enums"]["distribution_status"] | null
          stellar_operation_id?: string | null
          transaction_hash?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "distributions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "distributions_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      foundation_settings: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      institutions: {
        Row: {
          city: string
          country: string | null
          created_at: string
          full_address: string
          has_computers: boolean | null
          has_internet: boolean | null
          has_library: boolean | null
          id: string
          infrastructure_score: number | null
          installment_value: number | null
          manager_id: string | null
          name: string
          postal_code: string
          school_days: number
          state: string
          status: Database["public"]["Enums"]["institution_status"]
          stellar_wallet: string | null
          student_count: number
          total_value: number | null
          type: Database["public"]["Enums"]["institution_type"]
          unit_value: number
          updated_at: string
        }
        Insert: {
          city: string
          country?: string | null
          created_at?: string
          full_address: string
          has_computers?: boolean | null
          has_internet?: boolean | null
          has_library?: boolean | null
          id?: string
          infrastructure_score?: number | null
          installment_value?: number | null
          manager_id?: string | null
          name: string
          postal_code: string
          school_days: number
          state: string
          status?: Database["public"]["Enums"]["institution_status"]
          stellar_wallet?: string | null
          student_count: number
          total_value?: number | null
          type: Database["public"]["Enums"]["institution_type"]
          unit_value: number
          updated_at?: string
        }
        Update: {
          city?: string
          country?: string | null
          created_at?: string
          full_address?: string
          has_computers?: boolean | null
          has_internet?: boolean | null
          has_library?: boolean | null
          id?: string
          infrastructure_score?: number | null
          installment_value?: number | null
          manager_id?: string | null
          name?: string
          postal_code?: string
          school_days?: number
          state?: string
          status?: Database["public"]["Enums"]["institution_status"]
          stellar_wallet?: string | null
          student_count?: number
          total_value?: number | null
          type?: Database["public"]["Enums"]["institution_type"]
          unit_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_institutions_manager"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_metrics: {
        Row: {
          attendance_rate: number | null
          community_engagement_score: number | null
          created_at: string
          eligibility_score: number | null
          id: string
          institution_id: string
          month: number
          notes: string | null
          nutrition_program_participation: number | null
          teacher_training_hours: number | null
          updated_at: string
          validated_at: string | null
          validated_by: string | null
          validation_status:
            | Database["public"]["Enums"]["validation_status"]
            | null
          year: number
        }
        Insert: {
          attendance_rate?: number | null
          community_engagement_score?: number | null
          created_at?: string
          eligibility_score?: number | null
          id?: string
          institution_id: string
          month: number
          notes?: string | null
          nutrition_program_participation?: number | null
          teacher_training_hours?: number | null
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
          validation_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
          year: number
        }
        Update: {
          attendance_rate?: number | null
          community_engagement_score?: number | null
          created_at?: string
          eligibility_score?: number | null
          id?: string
          institution_id?: string
          month?: number
          notes?: string | null
          nutrition_program_participation?: number | null
          teacher_training_hours?: number | null
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
          validation_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "monthly_metrics_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_metrics_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          institution_id: string | null
          name: string
          permissions: string[] | null
          role: Database["public"]["Enums"]["app_role"]
          stellar_wallet: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          institution_id?: string | null
          name: string
          permissions?: string[] | null
          role: Database["public"]["Enums"]["app_role"]
          stellar_wallet?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          institution_id?: string | null
          name?: string
          permissions?: string[] | null
          role?: Database["public"]["Enums"]["app_role"]
          stellar_wallet?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          certification_level: string | null
          created_at: string
          email: string | null
          id: string
          institution_id: string
          is_active: boolean | null
          name: string
          phone: string | null
          subject_areas: string[] | null
          training_hours: number | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          certification_level?: string | null
          created_at?: string
          email?: string | null
          id?: string
          institution_id: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          subject_areas?: string[] | null
          training_hours?: number | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          certification_level?: string | null
          created_at?: string
          email?: string | null
          id?: string
          institution_id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          subject_areas?: string[] | null
          training_hours?: number | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "foundation_manager" | "school_manager"
      distribution_status: "pending" | "processing" | "completed" | "failed"
      institution_status: "eligible" | "ineligible"
      institution_type: "community_school" | "quilombola" | "indigenous"
      validation_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["foundation_manager", "school_manager"],
      distribution_status: ["pending", "processing", "completed", "failed"],
      institution_status: ["eligible", "ineligible"],
      institution_type: ["community_school", "quilombola", "indigenous"],
      validation_status: ["pending", "approved", "rejected"],
    },
  },
} as const
