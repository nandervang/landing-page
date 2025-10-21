import { useState, useRef, useCallback, useEffect } from 'react';
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from '@/components/ui/shadcn-io/kanban';
import { Calendar, AlertCircle, Circle, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper function to get priority colors and icons
const getPriorityConfig = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return {
        color: 'text-destructive bg-secondary border-destructive',
        icon: AlertCircle,
        label: 'HIGH'
      };
    case 'medium':
      return {
        color: 'text-muted-foreground bg-muted border-border',
        icon: Circle,
        label: 'MED'
      };
    case 'low':
      return {
        color: 'text-primary bg-secondary border-primary',
        icon: ArrowUp,
        label: 'LOW'
      };
  }
};

// Sample data for the Kanban board
const initialColumns = [
  { id: 'backlog', name: 'Backlog' },
  { id: 'todo', name: 'To Do' },
  { id: 'in-progress', name: 'In Progress' },
  { id: 'done', name: 'Done' },
];

interface KanbanItem {
  id: string;
  name: string;
  column: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  tags: string[];
  dueDate?: string;
  [key: string]: unknown;
}

const initialData: KanbanItem[] = [
  {
    id: '1',
    name: 'Grow in numbers',
    column: 'backlog',
    description: 'Scale team size and expand our consulting capacity',
    priority: 'medium',
    assignee: {
      name: 'Niklas Andervang',
      avatar: '👨‍',
      initials: 'NA'
    },
    tags: ['Growth', 'Strategy']
  },
  {
    id: '2',
    name: 'Connect & Network',
    column: 'backlog',
    description: 'Build strategic partnerships and expand professional network',
    priority: 'low',
    assignee: {
      name: 'John Doe',
      avatar: '👨‍💼',
      initials: 'JD'
    },
    tags: ['Networking', 'Partnerships']
  },
  {
    id: '3',
    name: 'Acquire senior talents',
    column: 'todo',
    description: 'Recruit senior full-stack developers, tech leads, and architects',
    priority: 'high',
    assignee: {
      name: 'Sandra Andervang',
      avatar: '👩',
      initials: 'SA'
    },
    tags: ['Recruitment', 'Leadership'],
    dueDate: '2025-10-15'
  },
  {
    id: '4',
    name: 'Website case studies',
    column: 'todo',
    description: 'Improve website with detailed case studies and client success stories',
    priority: 'medium',
    assignee: {
      name: 'Sandra Andervang',
      avatar: '👩',
      initials: 'SA'
    },
    tags: ['Content', 'Marketing'],
    dueDate: '2025-11-01'
  },
  {
    id: '5',
    name: 'Blog & Mini-Podcasts',
    column: 'todo',
    description: 'Launch blog and mini-podcast features to share insights and expertise',
    priority: 'low',
    assignee: {
      name: 'Sandra Andervang',
      avatar: '👩',
      initials: 'SA'
    },
    tags: ['Content', 'Branding']
  },
  {
    id: '6',
    name: 'AI Agent Framework',
    column: 'in-progress',
    description: 'Developing AI agent framework for enterprise client implementation',
    priority: 'high',
    assignee: {
      name: 'Niklas Andervang',
      avatar: '👨',
      initials: 'NA'
    },
    tags: ['AI', 'Development']
  },
  {
    id: '7',
    name: 'Post & Telestyrelsen Collab',
    column: 'in-progress',
    description: 'Continuing digitalization partnership with Post and Telestyrelsen for Digitaldag.se',
    priority: 'high',
    assignee: {
      name: 'John Doe',
      avatar: '👨‍💼',
      initials: 'JD'
    },
    tags: ['Government', 'Digitalization']
  },
  {
    id: '8',
    name: 'Accessibility Consulting',
    column: 'in-progress',
    description: 'Regular accessibility specialist services for various partner organizations',
    priority: 'medium',
    assignee: {
      name: 'Niklas Andervang',
      avatar: '👨‍💻',
      initials: 'NA'
    },
    tags: ['Accessibility', 'Consulting']
  },
  {
    id: '9',
    name: 'Website v0.01',
    column: 'done',
    description: 'Completed initial website launch with core features and functionality',
    priority: 'high',
    assignee: {
      name: 'Niklas Andervang',
      avatar: '👨‍',
      initials: 'NA'
    },
    tags: ['Web Dev', 'Launch']
  },
  {
    id: '10',
    name: 'IAAP Accessibility Certification',
    column: 'done',
    description: 'Successfully obtained IAAP professional accessibility certification',
    priority: 'medium',
    assignee: {
      name: 'Niklas Andervang',
      avatar: '👨‍💻',
      initials: 'NA'
    },
    tags: ['Certification', 'Accessibility']
  },
  {
    id: '11',
    name: 'Service Network Established',
    column: 'done',
    description: 'Built professional network and established service partnerships',
    priority: 'medium',
    assignee: {
      name: 'John Doe',
      avatar: '👨‍💼',
      initials: 'JD'
    },
    tags: ['Network', 'Services']
  }
];

const KanbanSection = () => {
  const [data, setData] = useState(initialData);
  const [isReverting, setIsReverting] = useState(false);
  const [boardKey, setBoardKey] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(2); // Default to "In Progress"
  const revertTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [revertingItems, setRevertingItems] = useState<Set<string>>(new Set());
  
  // Create a deep copy of the original data to ensure it doesn't get mutated
  const originalDataRef = useRef(JSON.parse(JSON.stringify(initialData)));

  // Animated revert function that moves items one by one
  const animatedRevert = useCallback((currentData: KanbanItem[]) => {
    const originalData = originalDataRef.current;
    const changedItems = currentData.filter((item, index) => {
      const originalItem = originalData[index];
      return !originalItem || item.column !== originalItem.column || item.id !== originalItem.id;
    });

    if (changedItems.length === 0) return;

    setIsReverting(true);
    setRevertingItems(new Set(changedItems.map(item => item.id)));

    // Move items back one by one with staggered timing
    changedItems.forEach((item, index) => {
      setTimeout(() => {
        // First, highlight the item that's about to be moved
        setRevertingItems(prev => new Set([...prev, item.id]));
        
        // Then after a brief "grab" delay, actually move it
        setTimeout(() => {
          setData(prevData => {
            const newData = [...prevData];
            const itemIndex = newData.findIndex(dataItem => dataItem.id === item.id);
            const originalItem = originalData.find((origItem: KanbanItem) => origItem.id === item.id);
            
            if (itemIndex !== -1 && originalItem) {
              // Move the item back to its original column and position
              newData[itemIndex] = { ...originalItem };
              
              // Sort the array to match original order
              newData.sort((a, b) => {
                const aIndex = originalData.findIndex((orig: KanbanItem) => orig.id === a.id);
                const bIndex = originalData.findIndex((orig: KanbanItem) => orig.id === b.id);
                return aIndex - bIndex;
              });
            }
            
            return newData;
          });

          // Remove from reverting items after animation completes
          setTimeout(() => {
            setRevertingItems(prev => {
              const newSet = new Set(prev);
              newSet.delete(item.id);
              return newSet;
            });
          }, 700); // Match CSS transition duration
        }, 200); // Brief "grab" delay before moving
      }, index * 400); // Stagger animations by 400ms for more realistic timing
    });

    // Clean up after all animations complete
    setTimeout(() => {
      setIsReverting(false);
      setRevertingItems(new Set());
      setBoardKey(prev => prev + 1); // Force re-render for clean state
    }, changedItems.length * 400 + 1200); // Account for new stagger timing and grab delays
  }, []);

  const handleDataChange = useCallback((newData: KanbanItem[]) => {
    // Clear any existing timeout
    if (revertTimeoutRef.current) {
      clearTimeout(revertTimeoutRef.current);
    }

    // Update the data immediately
    setData(newData);

    // Set a timeout to revert the data after 3 seconds
    revertTimeoutRef.current = setTimeout(() => {
      animatedRevert(newData);
    }, 3000);
  }, [animatedRevert]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (revertTimeoutRef.current) {
        clearTimeout(revertTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 px-4 bg-white dark:bg-kanban-board">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-mono tracking-tight">
            COMPANY <span className="relative -left-[21px]">_MANAGEMENT_BOARD</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-mono">
            {'>'} Real-time snapshot of our company's active initiatives
          </p>
          <p className="text-sm text-muted-foreground mt-2 font-mono">
            // Just a fun way of showing a glimpse of what's "cooking".
          </p>
          
          {/* Status Indicator */}
          {isReverting && revertingItems.size > 0 && (
            <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-primary font-mono animate-pulse">
                🤖 Auto-reverting {revertingItems.size} item{revertingItems.size !== 1 ? 's' : ''} back to original position...
              </p>
            </div>
          )}
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden mb-6">
          <div className="flex border-b border-border">
            {initialColumns.map((column, index) => (
              <button
                key={column.id}
                onClick={() => setActiveTabIndex(index)}
                className={`flex-1 py-2 px-2 text-xs font-medium transition-colors ${
                  activeTabIndex === index
                    ? 'text-primary border-b-2 border-primary bg-secondary/50'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-center">
                  <span>{column.name}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Navigation arrows for mobile */}
          <div className="flex justify-between items-center mt-4 px-4">
            <button
              onClick={() => setActiveTabIndex(Math.max(0, activeTabIndex - 1))}
              disabled={activeTabIndex === 0}
              className="flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-xs text-muted-foreground font-mono">
              {activeTabIndex + 1} of {initialColumns.length}
            </span>
            <button
              onClick={() => setActiveTabIndex(Math.min(initialColumns.length - 1, activeTabIndex + 1))}
              disabled={activeTabIndex === initialColumns.length - 1}
              className="flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop: Full Kanban Board */}
        <div className="hidden md:block h-[550px] w-full">
          <KanbanProvider
            key={boardKey}
            columns={initialColumns}
            data={data}
            onDataChange={handleDataChange}
            className="gap-6"
          >
            {(column) => (
              <KanbanBoard key={column.id} id={column.id}>
                <KanbanHeader className="bg-secondary dark:bg-kanban-column border-b p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {column.name}
                      </h3>
                      <span className="bg-muted text-muted-foreground px-2 py-0.5 text-xs font-medium border border-border">
                        {data.filter((item) => item.column === column.id).length}
                      </span>
                    </div>
                    {column.id === 'backlog' && <span className="text-lg">📋</span>}
                    {column.id === 'todo' && <span className="text-lg">📝</span>}
                    {column.id === 'in-progress' && <span className="text-lg">⚡</span>}
                    {column.id === 'done' && <span className="text-lg">✅</span>}
                  </div>
                </KanbanHeader>
                <KanbanCards id={column.id}>
                  {(item) => {
                    const kanbanItem = item as KanbanItem;
                    return (
                      <KanbanCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        column={item.column}
                        className={`bg-card hover:shadow-lg border border-border transition-all duration-700 ease-in-out relative ${
                          revertingItems.has(item.id) 
                            ? 'opacity-95 scale-105 shadow-xl ring-2 ring-primary/40 animate-gentle-bounce z-10' 
                            : isReverting 
                              ? 'opacity-90 scale-[0.98]' 
                              : 'opacity-100 scale-100'
                        }`}
                      >
                        {/* Sparkle effect for reverting items */}
                        {revertingItems.has(item.id) && (
                          <div className="absolute -top-1 -right-1 text-xs animate-ping">
                            ✨
                          </div>
                        )}
                        <div className="space-y-3">
                          {/* Header with title and priority */}
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-card-foreground text-sm leading-tight flex-1 pr-2">
                              {item.name}
                            </h4>
                            {(() => {
                              const priorityConfig = getPriorityConfig(kanbanItem.priority);
                              const PriorityIcon = priorityConfig.icon;
                              return (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${priorityConfig.color}`}>
                                  <PriorityIcon className="w-3 h-3" />
                                  <span>{priorityConfig.label}</span>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Description */}
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {kanbanItem.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {kanbanItem.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-secondary text-secondary-foreground border border-border"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Footer with assignee and due date */}
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-secondary border border-border flex items-center justify-center text-xs">
                                {kanbanItem.assignee.avatar}
                              </div>
                              <span className="text-xs text-muted-foreground font-mono">
                                {kanbanItem.assignee.initials}
                              </span>
                            </div>
                            {kanbanItem.dueDate && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span className="font-mono">{new Date(kanbanItem.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </KanbanCard>
                    );
                  }}
                </KanbanCards>
              </KanbanBoard>
            )}
          </KanbanProvider>
        </div>

        {/* Mobile: Single Column View with Tabs */}
        <div className="md:hidden">
          {initialColumns.map((column, index) => (
            <div
              key={column.id}
              className={`${activeTabIndex === index ? 'block' : 'hidden'}`}
            >
              <div className="border border-border bg-card dark:bg-kanban-column overflow-hidden">
                <div className="bg-secondary dark:bg-kanban-column border-b p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {column.id === 'backlog' && '📋'}
                        {column.id === 'todo' && '📝'}
                        {column.id === 'in-progress' && '⚡'}
                        {column.id === 'done' && '✅'}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {column.name}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {data.filter((item) => item.column === column.id).length} tasks
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-4 max-h-[550px] overflow-y-auto">
                  {data
                    .filter((item) => item.column === column.id)
                    .map((item) => {
                      const kanbanItem = item as KanbanItem;
                      return (
                        <div
                          key={item.id}
                          className="bg-background border border-border p-4 transition-all duration-200 hover:shadow-md"
                        >
                          <div className="space-y-3">
                            {/* Header with title and priority */}
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-card-foreground leading-tight flex-1 pr-2">
                                {item.name}
                              </h4>
                              {(() => {
                                const priorityConfig = getPriorityConfig(kanbanItem.priority);
                                const PriorityIcon = priorityConfig.icon;
                                return (
                                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${priorityConfig.color}`}>
                                    <PriorityIcon className="w-3 h-3" />
                                    <span>{priorityConfig.label}</span>
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground">
                              {kanbanItem.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {kanbanItem.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 text-xs bg-secondary text-secondary-foreground border border-border"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Footer with assignee and due date */}
                            <div className="flex items-center justify-between pt-3 border-t border-border">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary border border-border flex items-center justify-center">
                                  {kanbanItem.assignee.avatar}
                                </div>
                                <span className="text-sm text-muted-foreground font-mono">
                                  {kanbanItem.assignee.name}
                                </span>
                              </div>
                              {kanbanItem.dueDate && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span className="font-mono">
                                    {new Date(kanbanItem.dueDate).toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  
                  {data.filter((item) => item.column === column.id).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <span className="text-2xl mb-2 block">📝</span>
                      <p className="text-sm">No tasks in this column</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KanbanSection;