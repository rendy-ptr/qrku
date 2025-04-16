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

// Export Cloudflare Worker entrypoint
export default {
  fetch: app.fetch,
  scheduled: async (controller: ScheduledController, env: Env, ctx: ExecutionContext) => {
    console.log('⏰ Cron dijalankan jam 17:00 UTC')

    const hasil = await hapusSemuaQrCodes(env)

    if (!hasil.success) {
      console.error('❌ Gagal hapus data:', hasil.error)
    } else {
      console.log('✅ Semua data qr_codes berhasil dihapus.')
    }
  },
}
