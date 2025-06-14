export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alertas_crm: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string
          type?: string
        }
        Relationships: []
      }
      clientes: {
        Row: {
          cnaes: string[] | null
          contato: string | null
          created_at: string | null
          documento: string
          email: string | null
          id: number
          nome: string
          regime: string | null
          status: string
          telefone: string | null
          tipo: string
        }
        Insert: {
          cnaes?: string[] | null
          contato?: string | null
          created_at?: string | null
          documento: string
          email?: string | null
          id?: number
          nome: string
          regime?: string | null
          status?: string
          telefone?: string | null
          tipo: string
        }
        Update: {
          cnaes?: string[] | null
          contato?: string | null
          created_at?: string | null
          documento?: string
          email?: string | null
          id?: number
          nome?: string
          regime?: string | null
          status?: string
          telefone?: string | null
          tipo?: string
        }
        Relationships: []
      }
      documentos: {
        Row: {
          caminho_arquivo: string | null
          categoria: string | null
          cliente_id: number | null
          created_at: string | null
          data_upload: string | null
          id: number
          nome: string
          servico_id: number | null
          status: string | null
          tamanho: string | null
          tipo: string | null
        }
        Insert: {
          caminho_arquivo?: string | null
          categoria?: string | null
          cliente_id?: number | null
          created_at?: string | null
          data_upload?: string | null
          id?: number
          nome: string
          servico_id?: number | null
          status?: string | null
          tamanho?: string | null
          tipo?: string | null
        }
        Update: {
          caminho_arquivo?: string | null
          categoria?: string | null
          cliente_id?: number | null
          created_at?: string | null
          data_upload?: string | null
          id?: number
          nome?: string
          servico_id?: number | null
          status?: string | null
          tamanho?: string | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      obrigacoes: {
        Row: {
          cliente_id: number | null
          created_at: string | null
          id: number
          status: string
          tipo: string
          valor: number | null
          vencimento: string
        }
        Insert: {
          cliente_id?: number | null
          created_at?: string | null
          id?: number
          status?: string
          tipo: string
          valor?: number | null
          vencimento: string
        }
        Update: {
          cliente_id?: number | null
          created_at?: string | null
          id?: number
          status?: string
          tipo?: string
          valor?: number | null
          vencimento?: string
        }
        Relationships: [
          {
            foreignKeyName: "obrigacoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      servicos: {
        Row: {
          cliente_id: number | null
          competence: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: number
          status: string
          type: string
          value: number | null
        }
        Insert: {
          cliente_id?: number | null
          competence?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: number
          status?: string
          type: string
          value?: number | null
        }
        Update: {
          cliente_id?: number | null
          competence?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: number
          status?: string
          type?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "servicos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      transacoes_financeiras: {
        Row: {
          categoria: string | null
          cliente_id: number | null
          created_at: string | null
          data: string
          descricao: string | null
          id: number
          status: string
          tipo: string
          valor: number
        }
        Insert: {
          categoria?: string | null
          cliente_id?: number | null
          created_at?: string | null
          data: string
          descricao?: string | null
          id?: number
          status?: string
          tipo: string
          valor: number
        }
        Update: {
          categoria?: string | null
          cliente_id?: number | null
          created_at?: string | null
          data?: string
          descricao?: string | null
          id?: number
          status?: string
          tipo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_financeiras_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
