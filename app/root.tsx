import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import { MantineProvider } from "@mantine/core"

import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Best Waffle",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <body className="h-full">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </MantineProvider>
    </html>
  )
}
