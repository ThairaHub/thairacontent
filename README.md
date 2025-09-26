# ThairaContent - AI-Powered Social Media Content Creation Platform

A comprehensive social media content creation and management platform that combines AI-powered content generation with sophisticated content organization and publishing capabilities for X (Twitter), LinkedIn, Threads, and Medium.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Key Features](#key-features)
4. [Core Components](#core-components)
5. [Content Management System](#content-management-system)
6. [AI Integration](#ai-integration)
7. [Setup and Installation](#setup-and-installation)
8. [Usage Guide](#usage-guide)

## Project Overview

ThairaContent is a Next.js-based social media content creation platform that leverages AI to help content creators generate, organize, and publish engaging content across multiple social media platforms. The platform features trend discovery, AI-powered content generation, kanban-style content organization, and direct publishing capabilities.

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS v4
- **UI Components**: Radix UI, Shadcn/ui
- **AI Integration**: Ollama (local), Gemini API (cloud)
- **Backend**: FastAPI (Python)
- **Database**: SQLite/PostgreSQL
- **Content Management**: Custom kanban system
- **Build Tool**: Next.js with Turbopack

## Architecture

### Component Hierarchy
\`\`\`
ThairaContent App
├── LandingHero (Entry Point & Trend Discovery)
├── ChatInterface (AI-Powered Content Assistant)
│   ├── ChatMessage components
│   ├── OllamaModelSelector
│   └── ContentBlocksView
├── KanbanView (Content Organization)
│   └── ContentViewer (Content Management & Publishing)
└── PreviewPane (Content Display & Management)
    ├── FileTreeNodeWithSelection
    ├── CodeViewer (syntax highlighting)
    └── RawView/Preview modes
\`\`\`

### Data Flow
1. **Trend Discovery** → LandingHero → Trending topics from API/fallback
2. **Content Generation** → ChatInterface → AI providers (Ollama/Gemini)
3. **Content Organization** → KanbanView → Platform-specific columns
4. **Content Management** → ContentViewer → Edit, copy, publish actions
5. **Database Integration** → FastAPI backend → Content storage and retrieval

## Key Features

### 1. Trend Discovery & Inspiration
- **Real-time Trending Topics**: Discover trending topics across different areas (technology, health, business, etc.)
- **Engagement Metrics**: View engagement statistics for each trending topic
- **Platform-Specific Trends**: See which platforms are driving specific trends
- **One-Click Content Generation**: Click any trend to instantly generate content

### 2. AI-Powered Content Creation
- **Multi-Provider Support**: Choose between Ollama (local) and Gemini (cloud) AI providers
- **Platform-Specific Optimization**: Content tailored for X (Twitter), LinkedIn, Threads, and Medium
- **Context-Aware Generation**: Use existing content as context for new generation
- **Streaming Responses**: Real-time content generation with live updates
- **Specialized Prompts**: Platform-specific content structures and best practices

### 3. Kanban-Style Content Organization
- **Platform Columns**: Organize content by social media platform
- **Visual Content Management**: Drag-and-drop style interface for content organization
- **Color-Coded Platforms**: Each platform has distinctive visual styling
- **Content Preview**: Quick preview of content within kanban cards
- **Responsive Design**: Works seamlessly on desktop and mobile

### 4. Advanced Content Management
- **In-Line Editing**: Edit content directly within the interface
- **Copy to Clipboard**: One-click copying for easy sharing
- **Direct Publishing**: Post content directly to social media platforms via API
- **Content Versioning**: Track different versions of content
- **Section Parsing**: Automatically parse content into structured sections

### 5. Database Integration
- **Content Storage**: Persistent storage of all generated content
- **Advanced Filtering**: Filter content by platform, date, and content type
- **Content History**: Access previously generated content
- **Bulk Operations**: Load and manage multiple content pieces

## Core Components

### LandingHero - Entry Point & Trend Discovery
**Location**: `components/LandingHero.tsx`

**Features**:
- Modern landing page with compelling statistics (10K+ creators, 500K+ posts, 95% engagement boost)
- Trending topics discovery with search functionality
- Area-specific trend filtering (technology, health, business, etc.)
- One-click content generation from trending topics
- Responsive design with mobile-first approach

**Key Functions**:
- `fetchTrends()`: Retrieves trending topics from backend API with fallback data
- Trend area search and filtering
- Direct integration with ChatInterface for content generation

### ChatInterface - AI-Powered Content Assistant
**Location**: `components/ChatInterface.tsx`

**Features**:
- Dual-pane layout (chat + content management)
- Multi-provider AI support (Ollama local, Gemini cloud)
- Context-aware content generation using selected files
- Database integration for loading existing content
- Advanced filtering and search capabilities
- Mobile-responsive with adaptive layouts

**Key Functions**:
- `handleSubmit()`: Processes user input and generates AI responses
- `loadContentFromDatabase()`: Retrieves stored content with filtering
- Context management for AI conversations
- Real-time streaming response handling

### KanbanView - Content Organization
**Location**: `components/KanbanView.tsx`

**Features**:
- Platform-specific columns with custom styling:
  - **X (Twitter)**: Blue theme with Twitter icon
  - **LinkedIn**: Professional blue theme with LinkedIn icon
  - **Threads**: Purple theme with MessageSquare icon
  - **Medium**: Green theme with BookOpen icon
- Horizontal scrolling for multiple platforms
- Content count per platform
- Responsive card layout

**Platform Configuration**:
\`\`\`typescript
const platformConfig = {
  twitter: { name: "X (Twitter)", icon: Twitter, color: "bg-blue-500/10" },
  linkedin: { name: "LinkedIn", icon: Linkedin, color: "bg-blue-600/10" },
  threads: { name: "Threads", icon: MessageSquare, color: "bg-purple-500/10" },
  medium: { name: "Medium", icon: BookOpen, color: "bg-green-500/10" }
}
\`\`\`

### ContentViewer - Content Management & Publishing
**Location**: `components/gpt-version/ContentViewer.tsx`

**Features**:
- **Content Display**: Structured content parsing with sections
- **Editing Capabilities**: In-line content editing with save/cancel
- **Copy Functionality**: One-click clipboard copying
- **Direct Publishing**: API integration for posting to social platforms
- **Status Feedback**: Real-time posting status and error handling
- **Mobile Optimization**: Responsive design with collapsible actions

**Content Parsing**:
- Automatically detects content sections (Introduction, Current State, etc.)
- Formats content with proper typography and spacing
- Handles platform-specific content structures

## Content Management System

### Content Structure
The platform uses a sophisticated content block system:

\`\`\`typescript
interface CodeStructBlock {
  type: 'file' | 'folder'
  language: string        // Platform identifier (twitter, linkedin, etc.)
  filename?: string       // Content title/identifier
  content?: string        // Actual content text
  children?: CodeStructBlock[]
}
\`\`\`

### Content Organization
- **Platform-Based Grouping**: Content automatically organized by target platform
- **Hierarchical Structure**: Support for nested content organization
- **Version Management**: Track content versions and updates
- **Metadata Handling**: Store creation dates, platform info, and content types

### Database Schema
The backend manages content with the following structure:
- **Content Storage**: Title, platform, content type, text, version tracking
- **Filtering Support**: Platform-based and date-based filtering
- **API Integration**: RESTful API for content CRUD operations

## AI Integration

### Supported Providers
1. **Ollama (Local)**
   - Local AI model execution
   - Privacy-focused content generation
   - No API key required
   - Models: deepseek-r1:8b, gemma2:2b, etc.

2. **Gemini (Cloud)**
   - Google's Gemini AI models
   - Requires API key
   - Cloud-based processing
   - Advanced content generation capabilities

### Content Generation Framework
The platform specializes in social media content with:
- **Platform-Specific Prompts**: Tailored for each social media platform
- **Storytelling Structures**: Introduction, problem statement, solutions, implications
- **Engagement Optimization**: Content designed for maximum social media engagement
- **Context Integration**: Use existing content as context for new generation

### AI Features
- **Streaming Responses**: Real-time content generation with live updates
- **Context Awareness**: Include selected content as context for AI
- **Error Handling**: Comprehensive error management and fallback options
- **Provider Switching**: Seamless switching between AI providers

## Setup and Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+ (for backend)
- Ollama (optional, for local AI)

### Frontend Setup
1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd thairacontent
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

### Backend Setup (Optional)
1. **Navigate to API directory**
\`\`\`bash
cd api
\`\`\`

2. **Install Python dependencies**
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. **Start FastAPI server**
\`\`\`bash
uvicorn main:app --reload --port 8000
\`\`\`

### Ollama Setup (Optional)
1. **Install Ollama**
\`\`\`bash
curl -fsSL https://ollama.ai/install.sh | sh
\`\`\`

2. **Pull AI models**
\`\`\`bash
ollama pull deepseek-r1:8b
ollama pull gemma2:2b
\`\`\`

### Environment Configuration
- **Gemini API**: Add API key in the application interface
- **Backend URL**: Configure API endpoints (defaults to localhost:8000)
- **Database**: SQLite for development, PostgreSQL for production

## Usage Guide

### Getting Started
1. **Launch the Application**
   - Open the landing page
   - Browse trending topics or search for specific areas
   - Click any trend to start content generation

2. **Content Generation Workflow**
   - Select AI provider (Ollama or Gemini)
   - Enter content request or click trending topic
   - Review generated content in real-time
   - Edit content as needed

3. **Content Organization**
   - Switch to Kanban view to see organized content
   - Content automatically sorted by platform
   - Use drag-and-drop for manual organization

4. **Publishing Content**
   - Use ContentViewer to review final content
   - Copy to clipboard or publish directly
   - Track posting status and results

### Advanced Features

#### Database Integration
- Load existing content with advanced filtering
- Filter by platform, date, or content type
- Use existing content as context for new generation

#### Context-Aware Generation
\`\`\`typescript
// Example: Using existing content as context
const context = selectedFiles.map(file => 
  `Platform: ${file.language}\nContent: ${file.content}`
).join('\n\n');
\`\`\`

#### Custom Content Structures
The platform supports various content structures:
- **Twitter/X**: Short-form, engaging posts with hashtags
- **LinkedIn**: Professional content with industry insights
- **Threads**: Story-driven content with multiple parts
- **Medium**: Long-form articles with structured sections

### Mobile Experience
- **Responsive Design**: Optimized for mobile devices
- **Touch-Friendly**: Large buttons and touch targets
- **Adaptive Layout**: Different layouts for mobile vs desktop
- **Offline Capability**: Core features work without internet (with Ollama)

## API Documentation

### Content Endpoints
- `GET /content/` - Retrieve content with optional filtering
- `POST /content/` - Create new content
- `PUT /content/{id}` - Update existing content
- `DELETE /content/{id}` - Delete content

### Trend Endpoints
- `GET /trends?area={area}` - Get trending topics for specific area
- `POST /post-content/` - Publish content to social media platforms

### Query Parameters
- `platform`: Filter by social media platform
- `date`: Filter by creation date
- `content_type`: Filter by content type

---

**ThairaContent** - Empowering content creators with AI-driven social media content generation and management.
