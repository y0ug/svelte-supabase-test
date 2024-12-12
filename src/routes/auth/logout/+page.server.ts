import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals: { safeGetSession, supabase } }) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return fail(500, error.message);
  }
  return redirect(303, '/');
}

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const { supabase } = locals;
    const { error } = await supabase.auth.signOut();
    if (error) {
      return fail(500, error.message);
    }
    return redirect(303, '/');
  },
};
