import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ycmftsggapnmtdevdtkf.supabase.co';
const supabaseKey = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbWZ0c2dnYXBubXRkZXZkdGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNTI4NDgsImV4cCI6MjAyNTgyODg0OH0.X8mdkP7RXO_q4AHO89MZtn6hRdrbwnjVMoG0DGerrns';

export const supabase = createClient(supabaseUrl, supabaseKey);
