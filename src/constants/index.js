const sandbox = `https://laksong.justplaybase.com/api-web`
const production = `https://laksong.justplaybase.com/api-web`

export const apiURL = process.env.NODE_ENV === 'development' ? sandbox : production