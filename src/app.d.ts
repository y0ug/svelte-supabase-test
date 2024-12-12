// See https://svelte.dev/docs/kit/types#app.d.ts

import type { User } from "@supabase/supabase-js";
// 
import { SupabaseClient } from '@supabase/ssr'

// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      safeGetSession(): Promise<{ session: Session | null; user: User | null }>
    }

    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
