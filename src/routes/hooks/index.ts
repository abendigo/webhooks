import { env } from '$env/dynamic/private';
import { db } from '../../lib/db';

// let etag: string | undefined;
let data = [];

// const knex = require('knex')({
//   client: 'sqlite3', // or 'better-sqlite3'
//   connection: {
//     filename: "./mydb.sqlite"
//   }
// });

export async function GET() {
  // console.log('hooks/index GET', { etag });

  const token = env.GITHUB_TOKEN;
  const repo = 'webhooks';

  const etag = db.data?.repos[repo]?.etag;
  console.log('etag', etag);

  // curl -i -H "Authorization: token <<token>>" \
  // https://api.github.com/repos/abendigo/traefik/hooks

  const response = await fetch(`https://api.github.com/repos/abendigo/${repo}/hooks`, {
    headers: {
      Authorization: `token ${token}`,
      'If-None-Match': etag
    }
  });
  // console.log('response', { response });

  if (response.status === 200) {
    const headers = response.headers;

    // console.log('=============================');
    // for (const [key, value] of headers.entries()) {
    //   console.log(key, value);
    // }
    // console.log('=============================');
    const newetag = headers.get('etag');

    data = await response.json();
    console.log('data', { data });

    db.data.repos[repo] = { etag: newetag, hooks: data };
    db.write();

    return {
      status: 200,
      body: {
        hooks: data
      }
    };
  }

  if (response.status === 304) {
    return {
      status: 200,
      body: {
        hooks: db.data?.repos[repo]?.hooks
      }
    };
  }
}

export async function POST({ request }) {
  const token = env.GITHUB_TOKEN;
  const repo = 'webhooks';

  const data = await request.formData();
  const id = data.get('id');
  const url = data.get('url');
  const secret = data.get('secret');

  return {
    status: 200
    // body: {
    //   hooks: db.data?.repos[repo]?.hooks
    // }
  };
}

export async function DELETE({ request }) {
  const token = env.GITHUB_TOKEN;
  const repo = 'webhooks';

  const data = await request.formData();
  const id = data.get('id');
  console.log('DELETE', id);

  const etag = db.data?.repos[repo]?.etag;
  console.log('etag', etag);

  const response = await fetch(`https://api.github.com/repos/abendigo/${repo}/hooks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${token}`
      // 'If-Match': etag
    }
  });

  console.log('response', response);

  return {
    status: 200
    // body: {
    //   hooks: db.data?.repos[repo]?.hooks
    // }
  };
}
