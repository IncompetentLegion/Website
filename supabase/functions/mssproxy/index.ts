const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-internal-key',
};

const MSS_API_KEY = Deno.env.get('MSS_ACCESS_TOKEN');
const INTERNAL_KEY = Deno.env.get('INTERNAL_KEY');
const BASE_URL = 'https://api.mysquadstats.com';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify internal key
  const providedKey = req.headers.get('x-internal-key');
  if (providedKey !== INTERNAL_KEY) {
    console.error('Unauthorized: Invalid or missing internal key');
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const { steamid, endpoint, ...params } = await req.json();

    if (!endpoint) {
      throw new Error('endpoint is required');
    }

    console.log(`Fetching MSS data for SteamID: ${steamid || 'N/A'}, endpoint: ${endpoint}`);

    let url = `${BASE_URL}/${endpoint}?accessToken=${MSS_API_KEY}`;

    switch (endpoint) {
      case 'players':
        url += `&search=${steamid}`;
        break;
      case 'playerWeapons':
        url += `&search=${steamid}`;
        if (params.season && params.season !== 'All Time') {
          url += `&season=${params.season}`;
        }
        break;
      case 'playerRibbons':
        url += `&search=${steamid}`;
        break;
      case 'allTimeLeaderboards':
        url += `&mod=Vanilla&search=${params.search || ''}&pageSize=${params.pageSize || 10}&page=${params.page || 1}&sortColumn=${params.sortColumn || 'totalScore'}&sortDirection=${params.sortDirection || 'desc'}`;
        break;
      case 'seasonLeaderboards':
        url += `&mod=Vanilla&search=${params.search || ''}&pageSize=${params.pageSize || 10}&page=${params.page || 1}&sortColumn=${params.sortColumn || 'seasonScore'}&sortDirection=${params.sortDirection || 'desc'}`;
        if (params.season) {
          const seasonParam = params.season === 'Current Season' ? 'Current' : params.season;
          url += `&season=${seasonParam}`;
        } else {
          url += `&season=Current`;
        }
        break;
      default:
        throw new Error(`Unsupported endpoint: ${endpoint}`);
    }

    console.log(`Request to: ${url.replace(MSS_API_KEY!, '[REDACTED]')}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`MSS API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ status: 'error', message: 'Upstream MSS error', statusCode: response.status }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log(`Successfully fetched ${endpoint} data`);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in mssproxy:', message);
    return new Response(JSON.stringify({ error: message, status: 'error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
