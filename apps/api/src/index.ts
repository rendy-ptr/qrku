import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { ScheduledController } from '@cloudflare/workers-types'
import qr from './routes/qr'
import { createSupabaseClient } from './utils/supabase'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

// Global Middleware
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  }),
)

// Routing utama
app.route('/api', qr)

// Cron job function
async function hapusSemuaQrCodes(env: Env) {
  try {
    const supabase = createSupabaseClient(env)
    console.log('Supabase client initialized:', { url: env.SUPABASE_URL })

    // Cek jumlah baris sebelum hapus
    const { data: before, error: countError, count: beforeCount } = await supabase
      .from('qr_codes')
      .select('id', { count: 'exact' })

    if (countError) {
      console.error('Gagal cek jumlah qr_codes:', JSON.stringify(countError, null, 2))
      return { success: false, error: countError }
    }
    console.log(`Sebelum hapus: ${beforeCount || 0} baris`, { sample: before?.slice(0, 2) })

    // Hapus semua baris dengan WHERE clause
    const { error, count } = await supabase
      .from('qr_codes')
      .delete({ count: 'exact' })
      .not('id', 'is', null)

    if (error) {
      console.error('Gagal hapus qr_codes:', JSON.stringify(error, null, 2))
      return { success: false, error }
    }

    console.log(`Berhasil hapus ${count || 0} qr_codes`)
    return { success: true, count }
  } catch (err) {
    console.error('Error server:', JSON.stringify(err, null, 2))
    return { success: false, error: 'Error server' }
  }
}

// Export Cloudflare Worker entrypoint
export default {
  fetch: app.fetch,
  scheduled: async (controller: ScheduledController, env: Env, ctx: ExecutionContext) => {
    console.log(`⏰ Cron dijalankan pada ${new Date().toISOString()} (UTC)`)

    const hasil = await hapusSemuaQrCodes(env)

    if (!hasil.success) {
      console.error('❌ Gagal hapus data:', JSON.stringify(hasil.error, null, 2))
    } else {
      console.log(`✅ Berhasil hapus ${hasil.count || 0} data qr_codes.`)
    }
  },
}
