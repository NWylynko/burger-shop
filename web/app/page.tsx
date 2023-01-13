import { Categories } from "./Categories"

export default async function HomePage() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Categories />
    </>
  )
}
