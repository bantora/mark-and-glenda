const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const ADMIN_PASS = 'markglenda2026';

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export async function handleRequest(request, env) {
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // POST /api/rsvp - D1 database insertion into rsvps table
  if (request.method === 'POST' && url.pathname === '/api/rsvp') {
    try {
      const body = await request.json();
      const id = 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

      if (!body.full_name || !body.email) {
        return jsonResponse({ success: false, error: 'Full name and email are required' }, 400);
      }

      if (env && env.DB) {
        await env.DB.prepare(
          `INSERT INTO rsvps (id, full_name, email, attending, guest_count, plus_one_name, message) VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id,
          body.full_name,
          body.email,
          body.attending ? 1 : 0,
          body.guest_count || 1,
          body.plus_one_name || '',
          body.message || ''
        ).run();
      }

      return jsonResponse({ success: true, id });
    } catch (err) {
      return jsonResponse({ success: false, error: err.message }, 500);
    }
  }

  // POST /api/admin/login - Authenticate admin passphrase
  if (request.method === 'POST' && url.pathname === '/api/admin/login') {
    try {
      const body = await request.json();
      const expectedPass = (env && env.ADMIN_PASSPHRASE) || ADMIN_PASS;
      if (body.password === expectedPass) {
        return jsonResponse({ success: true, token: 'authed' });
      }
      return jsonResponse({ success: false, error: 'Invalid admin password' }, 401);
    } catch (err) {
      return jsonResponse({ success: false, error: err.message }, 500);
    }
  }

  // GET /api/admin/rsvps - Return all saved RSVPs
  if (request.method === 'GET' && url.pathname === '/api/admin/rsvps') {
    try {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.includes('Bearer authed')) {
        return jsonResponse({ success: false, error: 'Unauthorized' }, 401);
      }

      if (env && env.DB) {
        const { results } = await env.DB.prepare(`SELECT * FROM rsvps ORDER BY created_at DESC`).all();
        return jsonResponse(results || []);
      }

      return jsonResponse([]);
    } catch (err) {
      return jsonResponse({ success: false, error: err.message }, 500);
    }
  }

  return new Response('Not found', { status: 404, headers: corsHeaders });
}

// Export default Worker handler
export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env);
  },
};

// Also export Cloudflare Pages Functions style handlers for compatibility
export async function onRequest(context) {
  return handleRequest(context.request, context.env);
}

export async function onRequestPost(context) {
  return handleRequest(context.request, context.env);
}

export async function onRequestGet(context) {
  return handleRequest(context.request, context.env);
}
