import { neon } from '@netlify/neon';

export default async (req, context) => {
  try {
    const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL
    const url = new URL(req.url);
    const postId = url.searchParams.get('id');

    if (!postId) {
      return new Response(JSON.stringify({ error: 'Post ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
