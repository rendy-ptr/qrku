import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createSupabaseClient } from './utils/supabase'
import { ScheduledController } from '@cloudflare/workers-types'

// Definisi interface untuk environment variables
type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

// Middleware CORS
app.use(
  '*',
  cors({
    origin: '*', 
    allowMethods: ['GET', 'POST', 'OPTIONS'],
  }),
)

// Endpoint untuk QR codes
app.post('/qr-codes', async (c) => {
  try {
    // Ambil env dari request
    const env = c.env as unknown as Env

    // Validasi input
    const { value, password } = await c.req.json()
    if (!value || !password) {
      return c.json({ error: 'Value dan password wajib diisi' }, 400)
    }

    // Buat client Supabase
    const supabase = createSupabaseClient(env)

    // Insert data ke Supabase
    const { data, error } = await supabase
      .from('qr_codes')
      .insert([{ value, password }])
      .select()
      .single()

    if (error) {
      console.error('Gagal simpan ke Supabase:', error)
      return c.json({ error: 'Gagal simpan data' }, 500)
    }

    return c.json(data, 201)
  } catch (err) {
    console.error('Error server:', err)
    return c.json({ error: 'Error server' }, 500)
  }
})

app.get('/qr-codes', async (c) => {
  try {
    // Ambil env dari request
    const env = c.env as unknown as Env

    // Buat client Supabase
    const supabase = createSupabaseClient(env)

    // Query data dari Supabase
    const { data, error } = await supabase
      .from('qr_codes')
      .select('value, password')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Gagal ambil data:', error)
      return c.json({ error: 'Gagal ambil data' }, 500)
    }

    return c.json(data, 200)
  } catch (err) {
    console.error('Error server:', err)
    return c.json({ error: 'Error server' }, 500)
  }
})

// Fungsi untuk menghapus semua QR codes
async function hapusSemuaQrCodes(env: Env) {
  try {
    const supabase = createSupabaseClient(env)
    const { error } = await supabase.from('qr_codes').delete().neq('id', 0)

    if (error) {
      console.error('Gagal hapus qr_codes:', error)
      return { success: false, error }
    }

    console.log('Berhasil hapus semua qr_codes')
    return { success: true }
  } catch (err) {
    console.error('Error server:', err)
    return { success: false, error: 'Error server' }
  }
}

// Export default untuk Cloudflare Workers
export default {
  fetch: app.fetch, // untuk Hono routes
  scheduled: async (
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ) => {
    console.log('⏰ Cron dijalankan jam 17:00 UTC')

    // Panggil fungsi hapus data
    const hasil = await hapusSemuaQrCodes(env)

    if (!hasil.success) {
      console.error('❌ Gagal hapus data:', hasil.error)
    } else {
      console.log('✅ Semua data qr_codes berhasil dihapus.')
    }
  },
}
