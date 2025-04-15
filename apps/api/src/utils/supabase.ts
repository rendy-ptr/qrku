// File: src/utils/supabase.ts
import { createClient } from '@supabase/supabase-js'
// import { config } from 'dotenv'



export const createSupabaseClient = (env: {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}) => {
  const supabaseUrl = env.SUPABASE_URL
  const supabaseKey = env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL dan SUPABASE_KEY harus diset di env')
  }

  return createClient(supabaseUrl, supabaseKey)
}
