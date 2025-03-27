import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://utxhytofyndcgnbhiomw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eGh5dG9meW5kY2duYmhpb213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTA2MTUsImV4cCI6MjA1NzIyNjYxNX0.swAc9SnsEwdKxGmH6ejsHjGmkC-dWxMofY5_aRF7wgA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;