# Technical Consulting Landing Page

A modern, high-performance landing page for a consultant company specializing in high-end technical expertise. Built with React, TypeScript, shadCN/ui, and following Spec-Driven Development principles.

## 🎯 Project Purpose

This landing page serves three primary purposes:

1. **Brand Acknowledgment** - Establish professional credibility and brand recognition
2. **Interest Generation** - Capture visitor attention and encourage engagement  
3. **Information Hub** - Communicate core value propositions and contact details
4. **Expertise Showcase** - Demonstrate technical capabilities through modern, polished design

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **UI Library**: shadCN/ui with mono theme
- **Styling**: Tailwind CSS 3.4.1
- **Animation**: Framer Motion 12.23.21
- **Development Process**: GitHub Spec-Kit (Spec-Driven Development)

## 🏗️ Architecture

This project follows **Specification-Driven Development** using GitHub Spec-Kit:

### Current Components
- **HeroGeometric**: Animated landing section with geometric shapes
- **KanbanSection**: Interactive task board with auto-revert functionality
- **ThemeToggle**: Dark/light mode switching with mono theme
- **Layout Components**: Header, Footer, About, Contact, Expertise sections

### Design System
- **Theme**: shadCN mono theme with monospace fonts and zero border radius
- **Colors**: oklch color space for consistent theming
- **Typography**: Space Mono and GeistVF font families
- **Accessibility**: WCAG 2.1 AA compliant components

## 📋 Spec-Driven Development

This project uses GitHub Spec-Kit for structured development:

### Setup Commands
```bash
# Initialize new feature specification
/constitution  # Create project principles (already done)
/specify      # Define feature requirements
/clarify      # Clarify ambiguous requirements  
/plan         # Create technical implementation plan
/tasks        # Generate actionable task lists
/implement    # Execute implementation
```

### Project Structure
```
├── .specify/                    # Spec-Kit configuration
│   ├── memory/
│   │   ├── constitution.md     # Project principles & standards
│   │   └── prompts/           # Baseline integration prompts
│   │       ├── react-shadcn.md
│   │       └── react-supabase.md
│   ├── scripts/               # Automation scripts
│   └── templates/             # Document templates
├── .github/
│   └── prompts/               # GitHub Copilot prompts
├── src/
│   ├── components/            # React components
│   │   ├── ui/               # shadCN UI components
│   │   └── ...               # Feature components
│   └── utils/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd landing-page

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Workflow
1. **Create Feature Spec**: Use `/specify` to define new features
2. **Clarify Requirements**: Use `/clarify` to resolve ambiguities
3. **Plan Implementation**: Use `/plan` with technical details
4. **Generate Tasks**: Use `/tasks` to break down work
5. **Implement**: Use `/implement` to execute the plan

## 🎨 Design Principles

### Visual Identity
- **Professional Aesthetic**: Clean, minimalist design reflecting technical expertise
- **Performance First**: Sub-3-second load times with optimized assets
- **Mobile Responsive**: Mobile-first approach for all screen sizes
- **Accessibility**: WCAG 2.1 AA compliance throughout

### Technical Standards
- **Type Safety**: Strict TypeScript with no implicit any
- **Component Patterns**: Composition-based architecture
- **Testing**: Component testing for critical UI elements
- **Documentation**: Clear inline comments and specifications

## 📊 Performance Targets

- **Lighthouse Score**: >95 for performance, accessibility, SEO
- **Load Time**: <3 seconds on 3G networks
- **Bundle Size**: Optimized with code splitting and lazy loading
- **Security**: Zero critical vulnerabilities

## 🤝 Contributing

This project follows Spec-Driven Development principles:

1. **Create Specification**: Use `/specify` to define changes
2. **Review Constitution**: Ensure alignment with project principles
3. **Plan Implementation**: Use `/plan` for technical approach
4. **Submit PR**: Include specification documents

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Resources

- [shadCN/ui Documentation](https://ui.shadcn.com/)
- [GitHub Spec-Kit](https://github.com/github/spec-kit)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
