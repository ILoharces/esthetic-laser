import yaml from '../../../public/cms-config.yml?raw';

export const prerender = true;

export async function GET() {
  return new Response(yaml, {
    status: 200,
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
    },
  });
}
