export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          enrolled_at: string
          event_id: number
          id: number
          status: string
          user_id: number
        }
        Insert: {
          enrolled_at?: string
          event_id: number
          id?: number
          status?: string
          user_id: number
        }
        Update: {
          enrolled_at?: string
          event_id?: number
          id?: number
          status?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Event: {
        Row: {
          category: string | null
          createdAt: string
          createdById: number | null
          date: string
          description: string | null
          distance: string | null
          id: number
          image_url: string | null
          location: string | null
          max_participants: number | null
          participants: number | null
          time: string | null
          title: string
        }
        Insert: {
          category?: string | null
          createdAt?: string
          createdById?: number | null
          date: string
          description?: string | null
          distance?: string | null
          id?: number
          image_url?: string | null
          location?: string | null
          max_participants?: number | null
          participants?: number | null
          time?: string | null
          title: string
        }
        Update: {
          category?: string | null
          createdAt?: string
          createdById?: number | null
          date?: string
          description?: string | null
          distance?: string | null
          id?: number
          image_url?: string | null
          location?: string | null
          max_participants?: number | null
          participants?: number | null
          time?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Event_createdById_fkey"
            columns: ["createdById"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      guardian_connections: {
        Row: {
          connected_at: string
          guardian_id: number
          id: number
          relation: string | null
          senior_id: number
          status: string
        }
        Insert: {
          connected_at?: string
          guardian_id: number
          id?: number
          relation?: string | null
          senior_id: number
          status?: string
        }
        Update: {
          connected_at?: string
          guardian_id?: number
          id?: number
          relation?: string | null
          senior_id?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardian_connections_guardian_id_fkey"
            columns: ["guardian_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guardian_connections_senior_id_fkey"
            columns: ["senior_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Medicine: {
        Row: {
          createdAt: string
          dosage: string | null
          endDate: string | null
          frequency: string | null
          id: number
          name: string
          next_due: string | null
          startDate: string | null
          taken: boolean | null
          time_of_day: string | null
          userId: number
        }
        Insert: {
          createdAt?: string
          dosage?: string | null
          endDate?: string | null
          frequency?: string | null
          id?: number
          name: string
          next_due?: string | null
          startDate?: string | null
          taken?: boolean | null
          time_of_day?: string | null
          userId: number
        }
        Update: {
          createdAt?: string
          dosage?: string | null
          endDate?: string | null
          frequency?: string | null
          id?: number
          name?: string
          next_due?: string | null
          startDate?: string | null
          taken?: boolean | null
          time_of_day?: string | null
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Medicine_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Message: {
        Row: {
          content: string
          id: number
          receiverId: number
          senderId: number
          sentAt: string
        }
        Insert: {
          content: string
          id?: number
          receiverId: number
          senderId: number
          sentAt?: string
        }
        Update: {
          content?: string
          id?: number
          receiverId?: number
          senderId?: number
          sentAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Message_receiverId_fkey"
            columns: ["receiverId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Message_senderId_fkey"
            columns: ["senderId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: number
          isAdmin: boolean
          name: string
          passwordHash: string
          role: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          id?: number
          isAdmin?: boolean
          name: string
          passwordHash: string
          role?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: number
          isAdmin?: boolean
          name?: string
          passwordHash?: string
          role?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
