"""
FastAPI proxy: forwards /api/* requests to the Next.js server running on localhost:3000.
The Next.js app is a full-stack app that owns the actual API routes.
This proxy exists because the platform's ingress routes /api/* to port 8001.
"""
import os
import httpx
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

NEXT_TARGET = os.environ.get('NEXT_TARGET', 'http://localhost:3000')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Persistent client for connection pooling
_client: httpx.AsyncClient | None = None

@app.on_event("startup")
async def startup():
    global _client
    _client = httpx.AsyncClient(timeout=httpx.Timeout(60.0), follow_redirects=False)

@app.on_event("shutdown")
async def shutdown():
    global _client
    if _client:
        await _client.aclose()

HOP_BY_HOP = {
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade", "content-encoding", "content-length",
}

@app.get("/healthz")
async def health():
    return {"status": "ok", "target": NEXT_TARGET}

@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def proxy(path: str, request: Request):
    url = f"{NEXT_TARGET}/api/{path}"
    if request.url.query:
        url = f"{url}?{request.url.query}"
    body = await request.body()
    headers = {k: v for k, v in request.headers.items() if k.lower() not in {"host", "content-length"}}
    r = await _client.request(request.method, url, content=body, headers=headers)
    resp_headers = {k: v for k, v in r.headers.items() if k.lower() not in HOP_BY_HOP}
    return Response(content=r.content, status_code=r.status_code, headers=resp_headers, media_type=r.headers.get("content-type"))
