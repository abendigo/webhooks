export async function GET() {
  console.log('hooks/index GET');

  // curl -i -H "Authorization: token <<token>>" \
  // https://api.github.com/repos/abendigo/traefik/hooks

  const response = await fetch('https://api.github.com/repos/abendigo/traefik/hooks', {
    headers: {
      Authorization: `token ${token}`
    }
  });
  console.log('response', { response });

  const data = await response.json();
  console.log('data', { data });

  return {
    status: 200,
    body: {
      hooks: data
    }
  };
}
