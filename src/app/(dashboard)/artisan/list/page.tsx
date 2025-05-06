import { api } from "~/trpc/server"

export const metadata = {
    title: "Artstay - ARTISAN",
}

export const dynamic = "force-dynamic"
export default function ArtisanPage() {

    void api.artisan.getAllArtisans.prefetch()
    return (
        <></>
    )
}