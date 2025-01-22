# Content Provider API

A RESTful API service that provides unified access to multiple content providers.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env.example` to `.env` and adjust the values as needed.

3. Build and run:
```bash
npm run build
npm start
```

For development:
```bash
npm run dev
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy to Vercel:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

## API Endpoints

### Rule34 Provider

#### Search
- `GET /api/rule34/search?query=<your-query>&page=<page-number>&perPage=<items-per-page>`
  - Query params:
    - `query` (required): Search term
    - `page` (optional): Page number (default: 1)
    - `perPage` (optional): Results per page (default: 42)

#### Autocomplete
- `GET /api/rule34/autocomplete`
  - Query params:
    - `query` (required): Search term

#### Get Info
- `GET /api/rule34/info/:id`
  - Path params:
    - `id` (required): Content ID

### Hanime Provider

#### Recent Videos
- `GET /api/hanime/recent`
  - Query params:
    - `page` (optional): Page number (default: 1)
    - `perPage` (optional): Results per page (default: 10)

#### Search
- `GET /api/hanime/search?query=<your-query>&page=<page-number>&perPage=<items-per-page>`
  - Query params:
    - `query` (required): Search term
    - `page` (optional): Page number (default: 1)
    - `perPage` (optional): Results per page (default: 10)

#### Get Info
- `GET /api/hanime/info/:slug`
  - Path params:
    - `slug` (required): Content slug

#### Get Episode
- `GET /api/hanime/episode/:slug`
  - Path params:
    - `slug` (required): Episode slug

### HentaiHaven Provider

#### Search
- `GET /api/hentai-haven/search?query=<your-query>&page=<page-number>&perPage=<items-per-page>`
  - Query params:
    - `query` (required): Search term

#### Get Info
- `GET /api/hentai-haven/info/:id`
  - Path params:
    - `id` (required): Content ID
  - Query params:
    - `episodesSort` (optional): Sort order for episodes ('ASC' or 'DESC')

## Health Check

- `GET /health`
  - Returns: `{ "status": "ok" }`

## Rate Limiting

The API implements rate limiting to prevent abuse. By default, it allows 100 requests per IP address per 15-minute window.

## Security

The API implements several security measures:
- CORS protection
- Helmet middleware for HTTP security headers
- Input validation using Zod
- Rate limiting

## Error Handling

All endpoints return standardized error responses:
- 400: Invalid input parameters
- 500: Server error

Error response format:
```json
{
  "error": "Error message",
  "details": [] // Optional validation error details
}
```

## Environment Variables

Required environment variables:
- `NODE_ENV`: Set to 'production' for production deployment
- `PORT`: (Optional) Port number for local development

Optional provider-specific variables:
- `HANIME_BASE_URL`: Custom base URL for Hanime provider
- `HENTAI_HAVEN_BASE_URL`: Custom base URL for HentaiHaven provider
- `RULE34_BASE_URL`: Custom base URL for Rule34 provider
