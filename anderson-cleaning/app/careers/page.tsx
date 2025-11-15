// app/careers/page.tsx
import { redirect } from 'next/navigation'

export const dynamic = 'force-static' // static redirect at build

export default function CareersAlias() {
  redirect('/apply')
}
