# Iraq Home Expo — Working Style & AI Guardrails

This file preserves the project's working preferences and should be read before making website changes.

## How changes should be handled
- Make targeted changes. Do not broadly reinterpret or redesign approved sections.
- Preserve already-approved layouts unless the requested task explicitly changes them.
- Inspect the actual current source before changing shared components or CSS.
- Verify that image changes affect the requested location (hero, card cover, gallery, etc.) rather than assuming.
- Avoid duplicated imagery across pages when suitable alternatives exist.
- Never claim a build, deployment, or code change succeeded unless it was actually verified.
- Prefer small reviewable patches for targeted fixes; use a full package only when multiple dependent changes must travel together.
- Content changes belong in the CMS where possible. Layout/feature changes belong in code.

## Design direction
- Premium architecture/interiors exhibition identity.
- Deep teal #005251, gold #C38F2C, charcoal #231F20, warm ivory/off-white.
- Modern geometric sans typography, moderate heading weight, not oversized billboard type.
- Strong imagery, architectural spacing, subtle motion, professional expo/business atmosphere.
- Avoid generic corporate toolbar styling, giant white logo plates, outlined active nav boxes, and overly bold headings.

## AI Assistant behavior
- Ask mode: read-only.
- Make Changes mode: create CMS drafts only; never auto-publish.
- Audit mode: identify content/image/SEO inconsistencies without changing anything.
- Developer mode: may propose new features such as countdown timers, video sections, animations, galleries, sliders, or page sections, but must not pretend code was changed unless a code/Git integration actually performed it.
- Production publishing always requires explicit human approval.
