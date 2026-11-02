# Security Policy

## Reporting a vulnerability

Please email **tyler@preissersolutions.com** with a description and steps to reproduce. Do not open a public issue for a suspected vulnerability. You will get an acknowledgement and a follow-up once the report has been reviewed.

The same contact is published at `/.well-known/security.txt` on https://preissersolutions.com.

## Controls in place

- HTTPS only, with HSTS (one year, includeSubDomains, preload).
- Response headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and a Content-Security-Policy in report-only mode.
- Form endpoints check the request origin, cap request size, validate input on the server, and escape user text before it is placed in any message.
- Credentials are kept in the hosting provider's secret store and CI secrets, never in this repository.
- Production is built and published from `main` only after the validation workflow passes.
- Production dependencies are audited and kept on patched releases.
