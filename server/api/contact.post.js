// Contact form → Bird (https://bird.com/docs/api): an email to the studio.
// The key stays on the server (runtimeConfig, never `public`).

const MAX = { name: 120, company: 160, email: 200, phone: 40, message: 5000 }
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/

const clean = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max)
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

async function bird(config, key, path, body, idempotencyKey) {
    const res = await fetch(`https://${config.birdRegion || 'eu1'}.platform.bird.com${path}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(body),
    })
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Bird ${path} → ${res.status} ${text.slice(0, 500)}`)
    }
    return res.json().catch(() => ({}))
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody(event).catch(() => null)
    if (!body || typeof body !== 'object') throw createError({ statusCode: 400, statusMessage: 'Invalid body' })

    // Honeypot: bots fill every field; pretend it worked
    if (body.website) return { ok: true }

    const f = {
        name: clean(body.name, MAX.name),
        company: clean(body.company, MAX.company),
        email: clean(body.email, MAX.email),
        phone: clean(body.phone, MAX.phone),
        message: clean(body.message, MAX.message),
    }
    if (!f.name || !f.message || !EMAIL_RE.test(f.email)) {
        throw createError({ statusCode: 400, statusMessage: 'Nom, email valide et message requis' })
    }

    // One id per submission (sent by the form) so a retried request is not delivered twice
    const id = /^[\w-]{8,64}$/.test(body.submissionId || '') ? body.submissionId : globalThis.crypto.randomUUID()

    if (!config.birdEmailApiKey || !config.contactEmailFrom || !config.contactEmailTo) {
        console.error('[contact] Bird email is not configured')
        throw createError({ statusCode: 500, statusMessage: 'Envoi indisponible' })
    }

    const rows = [['Nom', f.name], ['Entreprise', f.company], ['Email', f.email], ['Téléphone', f.phone]].filter(([, v]) => v)
    const text = rows.map(([k, v]) => `${k} : ${v}`).join('\n') + `\n\n${f.message}`
    const html =
        '<table style="font:15px/1.5 sans-serif;border-collapse:collapse">' +
        rows.map(([k, v]) => `<tr><td style="padding:2px 16px 2px 0;color:#5c5c5c">${k}</td><td>${escapeHtml(v)}</td></tr>`).join('') +
        `</table><p style="font:15px/1.6 sans-serif;white-space:pre-wrap">${escapeHtml(f.message)}</p>`

    try {
        await bird(config, config.birdEmailApiKey, '/v1/email/messages', {
            from: { email: config.contactEmailFrom, name: 'La Petite Tribu — site' },
            to: config.contactEmailTo.split(',').map((s) => s.trim()).filter(Boolean),
            reply_to: [{ email: f.email, name: f.name }],
            subject: `Nouveau message — ${f.name}${f.company ? ' (' + f.company + ')' : ''}`,
            text,
            html,
            category: 'transactional',
        }, `contact-email/${id}`)
    } catch (e) {
        console.error('[contact] email failed:', e.message)
        throw createError({ statusCode: 502, statusMessage: "Le message n'a pas pu être envoyé" })
    }
    return { ok: true }
})
