import { Hono } from 'hono'
import { hash, compare } from 'bcryptjs'
import { createSupabaseClient } from '../utils/supabase'

// Definisi interface untuk environment variables
type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}
const qr = new Hono<{ Bindings: Env }>()

// Endpoint untuk QR codes
qr.post('/qr-codes', async (c) => {
  try {
    // Ambil env dari request
    const env = c.env as unknown as Env
    // Tangkap data dari request
    const { value, password } = await c.req.json()
    // Validasi input
    if (!value || !password) {
      return c.json({ error: 'Value dan password wajib diisi' }, 400)
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Buat client Supabase
    const supabase = createSupabaseClient(env)

    // Insert data ke Supabase
    const { data, error } = await supabase
      .from('qr_codes')
      .insert([{ value, password: hashedPassword }])
      .select()
      .single()

    if (error) {
      console.error('Gagal simpan ke Supabase:', error)
      return c.json({ error: 'Gagal simpan data' }, 500)
    }

    return c.json(data, 200)
  } catch (err) {
    console.error('Error server:', err)
    return c.json({ error: 'Error server' }, 500)
  }
})

qr.get('/qr-codes', async (c) => {
  try {
    // Ambil env dari request
    const env = c.env as unknown as Env

    // Buat client Supabase
    const supabase = createSupabaseClient(env)

    // Query data dari Supabase
    const { data, error } = await supabase
      .from('qr_codes')
      .select('id')
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

qr.post('/qr-codes/verify', async (c) => {
  const env = c.env as unknown as Env
  const { id, password } = await c.req.json()

  if (!id || !password) {
    return c.json({ error: 'password wajib diisi' }, 400)
  }
  const supabase = createSupabaseClient(env)
  const { data, error } = await supabase
    .from('qr_codes')
    .select('id, value, password')
    .eq('id', id)
    .single()
  if (error || !data) {
    return c.json({ error: 'Data tidak ditemukan' }, 404)
  }
  const isPasswordValid = await compare(password, data.password)
  if (!isPasswordValid) {
    return c.json({ error: 'Password salah' }, 401)
  }

  return c.json(
    {
      success: true,
      res: {
        qrid: data.id,
        qrvalue: data.value,
      },
    },
    200,
  )
})

qr.delete('/qr-codes/verify', async (c) => {
  const env = c.env as unknown as Env
  const { id, password } = await c.req.json()

  if (!id || !password) {
    return c.json({ error: 'password wajib diisi' }, 400)
  }
  const supabase = createSupabaseClient(env)
  const { data, error } = await supabase
    .from('qr_codes')
    .select('id, password')
    .eq('id', id)
    .single()

  if (error || !data) {
    return c.json({ error: 'Data tidak ditemukan' }, 404)
  }

  const isPasswordValid = await compare(password, data.password)
  if (!isPasswordValid) {
    return c.json({ error: 'Password salah' }, 401)
  }
  const { error: deleteError } = await supabase
    .from('qr_codes')
    .delete()
    .eq('id', id)

  if (deleteError) {
    return c.json({ error: 'Gagal hapus data' }, 500)
  }
  return c.json({ success: true }, 200)
})

export default qr
