import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        fetch,
      },
    })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        fetch,
      },
      cookies: {
        getAll() {
          return data.cookies
        },
      },
    })

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let user = null;
  if (session) {
    const { data: u, error } = await supabase.auth.getUser();
    if (error) {
      console.log("failed to fetch user")
    } else {
      user = u.user;
    }
  }
  let profile = null;
  if (session) {
    const { data: p, error } = await supabase.from('profiles')
      .select(`username, full_name, website, avatar_url`)
      .eq('id', session?.user.id)
      .single()

    if (error) {
      console.log("failed to fetch profile")
    } else {
      profile = p;
    }
  }
  // if (profile && profile.avatar_url != null) {
  //   const { data: signedUrl, error } = await supabase.storage
  //     .from('avatars')
  //     .createSignedUrl(profile?.avatar_url, 60);
  //   if (!error) {
  //     profile.avatar_url = signedUrl.signedUrl;
  //   }
  // }
  //

  return { supabase, user, profile, session }
}
