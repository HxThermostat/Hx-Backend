# Hx Graph Security

## Cryptographic Keys

Application-level crytpographic keys should be rotated at least once per calendar year. When rotating keys on this regular cadence, the new key should immediately be used to encrypt all relevant data. The previous key should be used for a reasonable period (context-dependent) to decrypt data that has been previously written.

Generally speaking, there should only be one active and one backup value in use at a time for a given key; however, there may be circumstances where multiple backup values are required.

If a key is suspected to have been compromised, it must be cycled immediately. A risk assessment will by engineering leadership will determine how long a backup key can be used (with a strong possibility that "0" is the correct answer).

All usage of cryptographic keys as a security mechanism must accomodoate key revocation in a manner that protects the end user experience. As an example, if the key used to encrypt JWTs is revoked, users will need to sign in again; however, their data will remain intact. This is a reasonable trade-off.

## Sensitive Data

No sensitive data (e.g. email addresses, physical addresses, passwords, etc.) should be stored within the application. All data should be managed by Ayla and only accessed via secure connections (i.e. encrypted by SSL). It should be impossible for the application to access data stored by Ayla without an access token provided by the user in the context of a single request. Access tokens should never be cached or stored by the Graph application.

## Logging

"Logs" include process logs that are written to stdout/stderr, as well as exceptions and other errors that are logged to third-party services

No PII (with the exception of user and device identifiers), application secrets, or user access tokens should be logged in any production environment.

All logs should be expired on a 30-day rolling basis.
