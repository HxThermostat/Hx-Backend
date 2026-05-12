# Hx App Security

## Application Secrets

No secrets should be included in the binary output delivered to the App Store or Play Store. It should be assumed that all data included in those binary distributions is readily-accessible and therefore cannot serve as a security mechanism used to reliably identify the mobile applications or their users.

## Sensitive Data

No sensitive data should be stored in the clear. This includes (but may not be limited to) account credentials, access tokens, refresh tokens, PII, etc. Sensitive information that needs to be persisted must use platform best-practices and rely on OS security tools (e.g. the Keychain on iOS) where possible.

Secure data should be removed from the device when the user logs out of their account.

## Secure Transmission

All network communication from the app should use HTTPS where possible. (One obvious exception is communication with the thermostat during the provisioning flow.) This includes both communication with the Graph API, as well as third-party services for analytics, exception tracking, etc.

## Logging

"Logs" include process logs that are written to the mobile device, as well as exceptions and other errors that are logged to third-party services

No PII (with the exception of user and device identifiers), application secrets, or user access tokens should be logged in any production environment.

All logs should be expired on a 30-day rolling basis.
