import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://hckgewqktoxpppajityk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhja2dld3FrdG94cHBwYWppdHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0NzQ1ODMsImV4cCI6MjAzMzA1MDU4M30.RE6NC3o7xlQbof1XzBVzaBZrjU11hc5xarEH17_wN4Y';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
