// Handle incoming fetch events with handleRequest function
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

// A list of allowed origins that can access our backend API
const allowedOrigins = [
  'https://donttext.app',
  'https://donttext-api.donttext.workers.dev',
]

// A function that returns a set of CORS headers
const corsHeaders = origin => ({
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': origin
})

// Check the origin for this request
// If it is included in our set of known and allowed origins, return it, otherwise
// return a known, good origin. This effectively does not allow browsers to
// continue requests if the origin they're requesting from doesn't match.
const checkOrigin = request => {
  const origin = request.headers.get("Origin")
  const foundOrigin = allowedOrigins.find(allowedOrigin => allowedOrigin.includes(origin))
  return foundOrigin ? foundOrigin : allowedOrigins[0]
}

// Make requests based on the request body to Unsplash API
const getTextData = async event => {
  // Parse the key "query" from a JSON body in the request
  const { sender } = await event.request.json()
  let isSpam = false;

  try {
    const checkSender = await database.get(sender);
    if (checkSender !== null) {
      isSpam = true
    }
  }
  catch (err) {
    console.log(err);
  }

  // Check that the request's origin is a valid origin, allowed to access this API
  const allowedOrigin = checkOrigin(event.request)

  return new Response(
    JSON.stringify({ "action": isSpam }),
    { headers: { 'Content-type': 'application/json', ...corsHeaders(allowedOrigin) } }
  )
}

async function handleRequest(event) {
  // If an OPTIONS request comes in, return a simple
  // response with the CORS information for our app
  // if (event.request.method === "OPTIONS") {
  //   // Check that the request's origin is a valid origin, allowed to access this API
  //   const allowedOrigin = checkOrigin(event.request)
  //   return new Response("OK", { headers: corsHeaders(allowedOrigin) })
  // }

  // If a POST request comes in, handle it using the getImages function
  if (event.request.method === "POST") return getTextData(event);

  // Redirect any other requests to homepage
  const destinationURL = "https://donttext.app"
  const statusCode = 301;
  return Response.redirect(destinationURL, statusCode);
}