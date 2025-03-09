# NewsHub - News Aggregator

A modern news aggregator built with Next.js, TypeScript, and Tailwind CSS that pulls articles from various sources and displays them in a clean, easy-to-read format.

## Features

- **Article Search and Filtering**: Search for articles by keyword and filter results by date, category, and source
- **Personalized News Feed**: Customize your news feed by selecting preferred sources and categories
- **Mobile-Responsive Design**: Optimized for viewing on all device sizes
- **Multiple News Sources**: Integrates with NewsAPI, The Guardian, and New York Times APIs

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Docker (optional, for containerized deployment)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

NEXT_PUBLIC_NYT_API_KEY=exFDZVtRysle714M4YUG5W7vPbzbIa9J
NEXT_PUBLIC_GUARDIAN_API_KEY=2377d327-0f16-42a6-abfc-43d771e53f7f
NEXT_PUBLIC_NEWS_API_KEY=7d0e4c9494374e7ca378eed0a137597e
