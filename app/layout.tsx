import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
const serif=IBM_Plex_Serif({subsets:["latin"],weight:["600"],variable:"--serif"});
const sans=IBM_Plex_Sans({subsets:["latin"],weight:["400","500","600"],variable:"--sans"});
const mono=IBM_Plex_Mono({subsets:["latin"],weight:["500","600"],variable:"--mono"});
export const metadata: Metadata={title:"How the X algorithm actually works",description:"The For You feed, explained for the person scrolling it — not the engineer who built it."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${serif.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>}
