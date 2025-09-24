import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/shadcn-io/marquee";

interface Client {
  name: string;
  logo: string;
  alt: string;
  website?: string;
}

// Using placeholder company names for demonstration
const clients: Client[] = [
  {
    name: "TechFlow Solutions",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UZWNoRmxvdzwvdGV4dD48L3N2Zz4=",
    alt: "TechFlow Solutions",
  },
  {
    name: "DataCore Systems",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EYXRhQ29yZTwvdGV4dD48L3N2Zz4=",
    alt: "DataCore Systems",
  },
  {
    name: "CloudVision Inc",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DbG91ZFZpc2lvbjwvdGV4dD48L3N2Zz4=",
    alt: "CloudVision Inc",
  },
  {
    name: "Neural Networks Co",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5OZXVyYWxOZXQ8L3RleHQ+PC9zdmc+",
    alt: "Neural Networks Co",
  },
  {
    name: "SecureDevOps Ltd",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TZWN1cmVEZXZPcHM8L3RleHQ+PC9zdmc+",
    alt: "SecureDevOps Ltd",
  },
  {
    name: "QuantumScale",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5RdWFudHVtU2NhbGU8L3RleHQ+PC9zdmc+",
    alt: "QuantumScale",
  },
  {
    name: "EdgeCompute Pro",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FZGdlQ29tcHV0ZTwvdGV4dD48L3N2Zz4=",
    alt: "EdgeCompute Pro",
  },
  {
    name: "BlockChain Dynamics",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiIG9wYWNpdHk9IjAuMSIvPjx0ZXh0IHg9IjYwIiB5PSIyNCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iY3VycmVudENvbG9yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CbG9ja0NoYWluPC90ZXh0Pjwvc3ZnPg==",
    alt: "BlockChain Dynamics",
  }
];

const ClientShowcase = () => {
  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've partnered with exceptional organizations to deliver high-impact technical solutions
            and drive innovation across diverse industries.
          </p>
        </div>
        
        <Marquee className="py-8">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent 
            speed={40} 
            pauseOnHover={true}
            className="flex items-center gap-16"
          >
            {clients.map((client, index) => (
              <MarqueeItem
                key={index}
                className="flex items-center justify-center group"
              >
                <img
                  src={client.logo}
                  alt={client.alt}
                  className="h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 text-muted-foreground"
                  loading="lazy"
                />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground font-mono">
            Ready to join this prestigious group? Let's discuss your next project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;