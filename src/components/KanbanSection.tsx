import { useState, useRef, useCallback, useEffect } from 'react';
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from '@/components/ui/shadcn-io/kanban';
import { Calendar, AlertCircle, Circle, ArrowUp } from 'lucide-react';

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
    name: 'Research market trends',
    column: 'backlog',
    description: 'Analyze current market trends and competitor analysis',
    priority: 'medium',
    assignee: {
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      initials: 'SC'
    },
    tags: ['Research', 'Analysis'],
    dueDate: '2025-09-30'
  },
  {
    id: '2',
    name: 'Design landing page',
    column: 'todo',
    description: 'Create wireframes and mockups for the new landing page',
    priority: 'high',
    assignee: {
      name: 'Alex Rodriguez',
      avatar: '👨‍🎨',
      initials: 'AR'
    },
    tags: ['Design', 'UI/UX'],
    dueDate: '2025-09-28'
  },
  {
    id: '3',
    name: 'Implement authentication',
    column: 'in-progress',
    description: 'Set up user login and registration functionality',
    priority: 'high',
    assignee: {
      name: 'Marcus Johnson',
      avatar: '👨‍💻',
      initials: 'MJ'
    },
    tags: ['Backend', 'Security']
  },
  {
    id: '4',
    name: 'Setup database schema',
    column: 'done',
    description: 'Define and implement the database structure',
    priority: 'medium',
    assignee: {
      name: 'Emily Park',
      avatar: '👩‍💻',
      initials: 'EP'
    },
    tags: ['Database', 'Backend']
  },
  {
    id: '5',
    name: 'Write API documentation',
    column: 'todo',
    description: 'Document all API endpoints and their usage',
    priority: 'low',
    assignee: {
      name: 'David Kim',
      avatar: '👨‍📚',
      initials: 'DK'
    },
    tags: ['Documentation', 'API']
  },
  {
    id: '6',
    name: 'User testing feedback',
    column: 'backlog',
    description: 'Collect and analyze user feedback from beta testing',
    priority: 'medium',
    assignee: {
      name: 'Lisa Wong',
      avatar: '👩‍🔬',
      initials: 'LW'
    },
    tags: ['Testing', 'UX Research'],
    dueDate: '2025-10-05'
  },
];

const KanbanSection = () => {
  const [data, setData] = useState(initialData);
  const [isReverting, setIsReverting] = useState(false);
  const [boardKey, setBoardKey] = useState(0);
  const revertTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Create a deep copy of the original data to ensure it doesn't get mutated
  const originalDataRef = useRef(JSON.parse(JSON.stringify(initialData)));

  const handleDataChange = useCallback((newData: KanbanItem[]) => {
    // Clear any existing timeout
    if (revertTimeoutRef.current) {
      clearTimeout(revertTimeoutRef.current);
    }

    // Update the data immediately
    setData(newData);

    // Set a timeout to revert the data after 3 seconds
    revertTimeoutRef.current = setTimeout(() => {
      setIsReverting(true);
      
      // Smooth transition back to original state
      setTimeout(() => {
        setData([...originalDataRef.current]);
        setBoardKey(prev => prev + 1); // Force re-render for clean state
        setIsReverting(false);
      }, 200); // Brief delay for smooth animation
    }, 3000);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (revertTimeoutRef.current) {
        clearTimeout(revertTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-mono tracking-tight">
            PROJECT_MANAGEMENT_BOARD
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-mono">
            {'>'} Track projects and tasks with interactive kanban interface
          </p>
          <p className="text-sm text-muted-foreground mt-2 font-mono">
            // Drag and drop cards between columns to update status
          </p>
        </div>

        <div className="h-96 w-full">
          <KanbanProvider
            key={boardKey}
            columns={initialColumns}
            data={data}
            onDataChange={handleDataChange}
            className="gap-6"
          >
            {(column) => (
              <KanbanBoard key={column.id} id={column.id}>
                <KanbanHeader className="bg-secondary border-b p-3">
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
                        className={`bg-card hover:shadow-lg border border-border transition-all duration-500 ${
                          isReverting ? 'opacity-70 scale-95' : 'opacity-100 scale-100'
                        }`}
                      >
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
                                {kanbanItem.assignee.name}
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
      </div>
    </section>
  );
};

export default KanbanSection;